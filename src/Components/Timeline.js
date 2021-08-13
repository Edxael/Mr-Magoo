
import React from 'react'
import { View, Text, Pressable } from 'react-native'
import tw from '../lib/tailwind'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlane, faChevronRight, faCircle, faCheck, faCar, faHotel } from '@fortawesome/free-solid-svg-icons'

const TsaText = () => <Text style={tw`ml-4 text-black-400`}>TSA <FontAwesomeIcon style={tw`text-black-400`} icon={faCheck} size={13} /></Text>

const loyaltyNumber = (loyaltyId) => loyaltyId && loyaltyId.toLowerCase() !== '@web' && loyaltyId.toLowerCase().indexOf('@xxxx') < 0 ? loyaltyId : '-'

const googleMapUrl = h => `${h.company}, ${h.fullAddress}`

const Flight = ({ booking }) => {
  return (
    <View style={tw`mb-32 bg-transparent`}>
      <View style={tw`flex-row justify-between`}>
        <View style={tw`w-3/4`}>
          <View style={tw`pb-12 flex-row items-center relative`}>
            <View style={tw`mr-24 w-24 h-24 bg-pureblack-0 justify-center items-center`}>
              <FontAwesomeIcon icon={faPlane} style={tw`text-black-400`} size='16' />
            </View>
            <View style={tw`absolute w-2 h-full left-12 top-24 z-40 bg-black-400 -ml-1`} />
            <Text style={tw`text-black-800 font-500 text-14`}>{booking.departureTime} • {booking.departureAirportCode} <FontAwesomeIcon icon={faChevronRight} style={tw``} size={10} /> {booking.arrivalAirportCode}</Text>
          </View>

          <View style={tw`flex-row items-center relative z-20`}>
            <View style={tw`mr-24 w-24 h-24 bg-pureblack-0 justify-center items-center`}>
              <FontAwesomeIcon icon={faCircle} style={tw`text-black-400`} size='8' />
            </View>

            <Text style={tw`text-black-800 font-400 text-14`}>{booking.arrivalTime} • {booking.arrivalCity} ({booking.arrivalAirportCode}) • {booking.flightName} {booking.flightNumber}</Text>
          </View>

        </View>

        <View style={tw`flex-1`}>
          <Text style={tw`mb-4`}>Conf: {booking.conf} {booking.tsaPreCheck && <TsaText />}</Text>
          <Text style={tw``}>FF: {booking.loyalty}</Text>
        </View>
      </View>

      {booking.checkinLink &&
        <Pressable
          style={s => tw.style(
            'h-32 px-16 justify-center items-center border border-primary-100 ml-48 mt-16 rounded-3 w-max',
            s.hovered ? 'bg-primary-50' : ''
          )}
        >
          <Text style={tw`text-12 text-primary-500`}>Check In</Text>
        </Pressable>}

    </View>
  )
}

const Car = ({ booking }) => {
  return (
    <View style={tw`mb-32`}>
      <View style={tw`flex-row justify-between`}>
        <View style={tw`w-3/4`}>
          <View style={tw`pb-12 flex-row items-center`}>
            <View style={tw`mr-24 w-24 h-24 bg-pureblack-0 justify-center items-center`}>
              <FontAwesomeIcon icon={faCar} style={tw`text-black-400`} size='16' />
            </View>
            <Text style={tw`text-black-800 font-500 text-14`}>{booking.company}</Text>
          </View>

          <View style={tw`ml-48`}>
            {booking.isPickup
              ? <Text style={tw`text-black-700 mb-4`}>Pick up: {booking.time}</Text>
              : <Text style={tw`text-black-700 mb-4`}>Drop off by {booking.time}</Text>}

            <Text style={tw`text-highlight-800`} href={booking.mapAddress}>{booking.displayAddress}</Text>
          </View>

        </View>

        <View style={tw`flex-1`}>
          <Text style={tw`mb-4`}>Conf: {booking.conf}</Text>
          <Text style={tw``}>Loyalty: {loyaltyNumber(booking.loyalty)}</Text>
        </View>
      </View>

    </View>
  )
}

const Hotel = ({ booking }) => {
  return (
    <View style={tw`mb-32`}>
      <View style={tw`flex-row justify-between`}>
        <View style={tw`w-3/4`}>
          <View style={tw`pb-12 flex-row items-center`}>
            <View style={tw`mr-24 w-24 h-24 bg-pureblack-0 justify-center items-center`}>
              <FontAwesomeIcon icon={faHotel} style={tw`text-black-400`} size='16' />
            </View>
            <Text style={tw`text-black-800 font-500 text-14`}>{booking.company}</Text>
          </View>

          <View style={tw`ml-48`}>
            <Text style={tw`text-highlight-800 mb-4`} href={googleMapUrl(booking)}>{booking.fullAddress}</Text>

            {booking.isCheckin
              ? <Text style={tw`text-black-700`}>Check in: {booking.checkInTime}</Text>
              : <Text style={tw`text-black-700`}>Check out by {booking.checkOutTime}</Text>}
          </View>

        </View>

        <View style={tw`flex-1`}>
          <Text style={tw`mb-4`}>{booking.phone}</Text>
          <Text style={tw``}>Loyalty: {booking.loyalty || '-'}</Text>
        </View>
      </View>

      {booking.paymentLink &&
        <Pressable
          style={s => tw.style(
            'h-32 px-16 justify-center items-center border border-primary-100 ml-48 mt-16 rounded-3 w-max',
            s.hovered ? 'bg-primary-50' : ''
          )}
        >
          <Text style={tw`text-12 text-primary-500`}>Resend Hotel Payment</Text>
        </Pressable>}

    </View>
  )
}

const TimeLine = ({ bookings }) => {
  return (
    <View style={tw`relative my-16`}>

      <View style={tw`absolute w-1 h-full left-12 -ml-1 top-0 bg-pureblack-10`} />

      {bookings.map((booking, index) => {
        if (booking.type === 'flight') {
          return <Flight key={booking.id} booking={booking} />
        }

        if (booking.type === 'carRental') {
          return <Car key={booking.id} booking={booking} />
        }

        if (booking.type === 'hotel') {
          return <Hotel key={booking.id} booking={booking} />
        }
      })}
    </View>
  )
}

export default TimeLine
