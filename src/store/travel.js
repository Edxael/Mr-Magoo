import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(utc)
dayjs.extend(advancedFormat)

// ──── STORE ─────────────────────────────────────────────────────────────────────────────
const init = () => ({
  travel: {
    loading: false,
    error: false,
    data: []
  }
})

const travel = store => {
  store.on('@init', init)
  store.on('travel/reset', () => init())

  store.on('travel/update/loading', (state, loading) => ({ travel: { ...state.travel, loading } }))
  store.on('travel/update/data', (state, data) => ({ travel: { ...state.travel, data } }))
  store.on('travel/update/error', (state, error) => ({ travel: { ...state.travel, error } }))
  store.on('travel/get', async (state, { includeAllTravel }) => {
    if (state.auth.isAuthenticated) {
      // reset state
      store.dispatch('travel/reset')

      // set loading status
      store.dispatch('travel/update/loading', true)

      // get travel data
      return window.fetch(
          `https://api.dev.pde.aws.chgit.com/providers-service/providers/${state.auth.data.sub}/travel?includeAll=${includeAllTravel}&sort`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              brand: 'comphealth',
              'correlation-object': '{"correlationId": "0367ac54-f54d-4ca3-8cc8-733fc2f12bca"}',
              Authorization: `Bearer ${state.auth.oidc.access_token}`
            }
          }
      )
        .then(response => response.json())
        .then(data => {
          if (data?.message === 'Unauthorized') {
            store.dispatch('travel/update/error', true)
            return
          }

          store.dispatch('travel/update/data', formatTravelData(data))
          store.dispatch('travel/update/loading', false)
        })
        .catch(() => {
          store.dispatch('travel/update/error', true)
        })
    }
  })
}

// ########################################################################################
// ──── HELPER FUNCTIONS ──────────────────────────────────────────────────────────────────
// ########################################################################################
const DISPLAY_DATE_FORMAT = 'dddd, MMMM Do'
const SORT_DATE_FORMAT = 'MMM-DD-YYYY'
const flattenArray = arr => {
  let flatList = []
  arr.forEach(a => {
    flatList = flatList.concat(a)
  })
  return flatList
}
const devLog = msg => x => (console.log(msg, x), x)
const pipe = fns => input => fns.reduce((acc, fn) => fn(acc), input)
const isBookingConfirmed = booking => (!booking.status) || (booking.status.toLowerCase() === 'confirmed')
const convertToArrayOfTravelDetailObjects = itinerary => itinerary.map(([day, travelDetails]) => ({ displayDate: formatDateAndTime(day, DISPLAY_DATE_FORMAT), sortDate: day, travelDetails }))

// ########################################################################################
// ──── FORMAT FUNCTIONS ──────────────────────────────────────────────────────────────────
// ########################################################################################
const formatDateAndTime = (value, formatStr) => dayjs.utc(value).format(formatStr)

const formatTravelData = data => {
  return data
    .sort((a, b) => new Date(a.StartDate) >= new Date(b.StartDate) ? 1 : -1)
    .map((d, i) => ({
      title: `${d.DepartureCity.replace(' -', ',')} - ${d.ArrivalCity.replace(' -', ',')}`,
      description: `${formatDateAndTime(d.StartDate, 'MMM DD')} - ${formatDateAndTime(d.EndDate, 'MMM DD, YYYY')}`,
      editedOn: formatDateAndTime(d.ModifiedDate, 'MMMM DD, YYYY') + ' ' + formatDateAndTime(d.ModifiedDate, 'h:mmA'),
      btnLink: { name: 'Full Itinerary', url: d.PDFUrl },
      location: {
        name: d.clientCommonName,
        googleUrl: `https://google.com/maps?q=${d.clientAddress1},${d.clientCity},${d.clientZip}`
      },
      details: d.Bookings ? formatTravelDetails(d.Bookings) : [],
      cancelledBookings: d.Bookings
        ? flattenArray(Object.values(d.Bookings).map(bookings => {
            return bookings.filter(booking => !isBookingConfirmed(booking))
          }))
        : [],
      isExpanded: i === 0
    }))
}

const formatTravelDetails = (bookings) =>
  pipe([
    groupBookingsByDay,
    convertToArrayOfTravelDetailObjects,
    sortDays
  ])(bookings)

const formatFlight = f => ({
  ...f,
  type: 'flight',
  conf: f.confirmationNumber,
  loyalty: f.loyaltyId,
  flightName: f.name,
  departureTime: formatDateAndTime(f.departureDateAndTime, 'h:mmA'),
  departureTimeRaw: f.departureDateAndTime,
  arrivalTime: formatDateAndTime(f.arrivalDateAndTime, 'h:mmA'),
  arrivalTimeRaw: f.arrivalDateAndTime,
  pickupTime: f.pickupDateTime
})

const carDisplayAddress = c =>
  c.address !== ''
    ? `${c.address}, ${c.city}, ${c.province}`
    : c.airportCode
      ? `${c.city}, ${c.province} (${c.airportCode})`
      : `${c.city}, ${c.province}`

const carMapAddress = (carRentalName, c) =>
  c.address !== ''
    ? `${carRentalName} Car Rental, ${c.address}, ${c.city}, ${c.province}`
    : c.airportCode
      ? `${carRentalName} Car Rental, ${c.airportCode}, ${c.city}, ${c.province}`
      : `${carRentalName} Car Rental, ${c.city}, ${c.province}`

const formatCar = (c, cType) => ({
  ...c,
  type: 'carRental',
  conf: c.confirmationNumber,
  loyalty: c.loyaltyId,
  company: c.name,
  address: c[cType].address,
  city: c[cType].city,
  province: c[cType].province,
  country: c[cType].country,
  displayAddress: carDisplayAddress(c[cType]),
  mapAddress: carMapAddress(c.name, c[cType]),
  time: formatDateAndTime(c[cType].time, 'h:mmA')
})

const formatHotel = (h) => ({
  ...h,
  type: 'hotel',
  checkInTime: formatDateAndTime(h.sortDate, SORT_DATE_FORMAT) !== formatDateAndTime(h.checkinDateTime, SORT_DATE_FORMAT) ? formatDateAndTime(h.checkinDateTime, 'hA (MMM DD)') : formatDateAndTime(h.checkinDateTime, 'hA'),
  loyalty: h.loyaltyId,
  paymentLink: ' ',
  company: h.name,
  fullAddress: h.address,
  checkOutTime: formatDateAndTime(h.checkoutDateTime, 'hA')
})

// ########################################################################################
// ──── SORT FUNCTIONS ────────────────────────────────────────────────────────────────────
// ########################################################################################
const sortDays = days =>
  days.sort((d1, d2) => dayjs.utc(d1.sortDate).diff(dayjs.utc(d2.sortDate)))

// ########################################################################################
// ──── GROUP FUNCTIONS ───────────────────────────────────────────────────────────────────
// ########################################################################################
const groupBookingsByDay = bookings =>
  Object.entries(bookings).map(([key, value]) => {
    const formattedBookings = value.map(booking => {
      if (booking.type === 'hotel') {
        return formatHotel(booking)
      } else if (booking.type === 'car') {
        const type = booking.isPickup ? 'pickup' : 'dropoff'
        return formatCar(booking, type)
      } else {
        return formatFlight(booking)
      }
    })

    return [key, formattedBookings]
  })

export default travel
