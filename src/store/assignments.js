import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(utc)
dayjs.extend(advancedFormat)

// ──── STORE ─────────────────────────────────────────────────────────────────────────────
const init = () => ({
  assignments: {
    loading: false,
    error: false,
    completed: [],
    confirmed: [],
    shifts: [],
    selectedAssignment: null
  }
})

const assignments = store => {
  store.on('@init', init)
  store.on('assignments/reset', () => init())

  store.on('assignments/update/loading', (state, loading) => ({ assignments: { ...state.assignments, loading } }))
  store.on('assignments/update/data', (state, data) => ({ assignments: { ...state.assignments, ...data } }))
  store.on('assignments/update/error', (state, error) => ({ assignments: { ...state.assignments, error } }))
  store.on('assignments/update/selectAssignment', (state, selectedAssignment) => ({ assignments: { ...state.assignments, selectedAssignment } }))

  store.on('assignments/get', async (state) => {
    if (state.auth.isAuthenticated) {
      // reset state
      store.dispatch('assignments/reset')

      // set loading status
      store.dispatch('assignments/update/loading', true)

      // get assignments data
      return window.fetch(
          `https://api.dev.pde.aws.chgit.com/providers-service/providers/${state.auth.data.sub}/assignment/schedule`,
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
            store.dispatch('assignments/update/error', true)
          }

          store.dispatch('assignments/update/data', formatAssignments(data.result))
          store.dispatch('assignments/update/loading', false)
        })
        .catch(() => {
          store.dispatch('assignments/update/error', true)
        })
    }
  })
}

export default assignments

// ########################################################################################
// ──── FORMAT FUNCTIONS ──────────────────────────────────────────────────────────────────
// ########################################################################################
const formatAssignments = data => {
  return {
    confirmed: sortAssignments(data.confirmed),
    completed: sortAssignments(data.completed.concat(data.archived))
  }
}

const sortAssignments = xs => xs.sort((x1, x2) => dayjs.utc(x1.startDate).diff(dayjs.utc(x2.startDate)))
