const randomId = () => Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)

const init = () => ({
  auth: {
    isAuthenticated: false,
    data: {
      sub: '00u10tnoserc3yRCg0h8'
    },
    oidc: {
      access_token: 'eyJraWQiOiJDN2dSLXY5OVZxamgyU0VzNElQT3FEWWNtdkpTRWJwVW01SWpqek51QU5jIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULkpNOEMwV3lFZUJnb193ZDBrQXlXM2Z4akxQRmRNbjdBN0FpdkM1QnhvMzAiLCJpc3MiOiJodHRwczovL2NoZ2hlYWx0aGNhcmUub2t0YXByZXZpZXcuY29tL29hdXRoMi9hdXNrbXRqYWNmRWk4ZmZNNjBoNyIsImF1ZCI6ImFwaTovL2RlZmF1bHQiLCJpYXQiOjE2Mjg4Njg5OTMsImV4cCI6MTYyODg3MjU5MywiY2lkIjoiMG9hd2pkOXc5M1VRZGU1dGgwaDciLCJ1aWQiOiIwMHUxMHRub3NlcmMzeVJDZzBoOCIsInNjcCI6WyJvcGVuaWQiXSwic3ViIjoiY2hncGRldGVhbStkc2F0Y2hlckBnbWFpbC5jb20iLCJuYW1lIjoiRG91Z2xhcyBTYXRjaGVyIiwiZ3JvdXBzIjpbIkV2ZXJ5b25lIiwiUk9MRV9ETVNfUkVBRF9PTkxZIiwiUk9MRV9ETVNfV1JJVEUiLCJEZXYgQ29tcGhlYWx0aCBQcm92aWRlcnMiLCJEZXYgV2VhdGhlcmJ5IFByb3ZpZGVycyJdfQ.As7C_lMONwcK2ZTbB3oY-UMqa8eCPm9m6WpBbB2LxpgILFGuJIqyjyhP4CPKvOBjJzAMMclE8rRnjjS784lLLJc5Ta5thXJWGpSwPx8mq2JT-oQDoe0WfgI9BHZyp0V_T0AFYL_RaMJaoyUFoFFwaoqTLZ7ly2V_EpB4xnou6fD9OlKmihunad9-eC3UjO8vdyf3XKYzGRweqNYWvrnsOpccjOWcSP3SEAh_A3hiB1ZoG-pBj7TG_L7NSt-qV6i1f84kCe4P-xBaFaqEJz4z4JabGAcDEKqA_ODp4V8VuvWc2UGpSaoWF5NP5LQxQgwkWk-z6h9ak0sKuxTxS1sBRg'
    }
  }
})

const auth = store => {
  store.on('@init', init)
  store.on('auth/login', async (state, { username, password }) => {
    // const response = await window.fetch('https://api.dev.pde.aws.chgit.com/identity-service/v1/login', {
    //   method: 'POST',
    //   body: JSON.stringify({ username, password }),
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     brand: 'comphealth',
    //     'correlation-object': '{"correlationId": "0367ac54-f54d-4ca3-8cc8-733fc2f12bca"}'
    //   }
    // })

    // const { result } = await response.json()

    // const clientId = '0oawjd9w93UQde5th0h7'
    // const redirectUri = 'http://localhost:3000/oidc/'
    // const loginState = randomId()
    // const nonce = randomId()
    // const { authServerEndpoint, sessionToken } = result

    // const redirectUrl = `${authServerEndpoint}/v1/authorize?client_id=${clientId}&response_type=token&scope=openid pde_provider global_transactional_email_service&prompt=none&redirect_uri=${redirectUri}&state=${loginState}&nonce=${nonce}&sessionToken=${sessionToken}`

    // store.dispatch('auth/data/update', result)

    // window.location.assign(redirectUrl)

    store.dispatch('auth/isAuthenticated', true)
  })

  store.on('auth/logout', async (state, { username, password }) => {
    // Here we will need to clear all data on the store
    store.on('auth/reset', () => init()) 
    store.dispatch('auth/reset')
    store.dispatch('auth/isAuthenticated', false)    
  })

  store.on('auth/data/update', (state, data) => ({ auth: { ...state.auth, data } }))
  store.on('auth/oidc/update', (state, oidc) => ({ auth: { ...state.auth, oidc } }))
  store.on('auth/isAuthenticated', (state, isAuthenticated) => ({ auth: { ...state.auth, isAuthenticated } }))
}

export default auth
