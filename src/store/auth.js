const randomId = () => Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)

const init = () => ({
  auth: {
    isAuthenticated: false,
    data: {
      sub: '00u10tnoserc3yRCg0h8'
    },
    oidc: {
      access_token: 'eyJraWQiOiJDN2dSLXY5OVZxamgyU0VzNElQT3FEWWNtdkpTRWJwVW01SWpqek51QU5jIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULllDTWw0cmtFVHlGWmFYTkN3RTFSMjVLa3lfYnJhS0VXSFBTM2tobzhuWUUiLCJpc3MiOiJodHRwczovL2NoZ2hlYWx0aGNhcmUub2t0YXByZXZpZXcuY29tL29hdXRoMi9hdXNrbXRqYWNmRWk4ZmZNNjBoNyIsImF1ZCI6ImFwaTovL2RlZmF1bHQiLCJpYXQiOjE2MjkxMjU5NTIsImV4cCI6MTYyOTEyOTU1MiwiY2lkIjoiMG9hd2pkOXc5M1VRZGU1dGgwaDciLCJ1aWQiOiIwMHUxMHRub3NlcmMzeVJDZzBoOCIsInNjcCI6WyJvcGVuaWQiXSwic3ViIjoiY2hncGRldGVhbStkc2F0Y2hlckBnbWFpbC5jb20iLCJuYW1lIjoiRG91Z2xhcyBTYXRjaGVyIiwiZ3JvdXBzIjpbIkV2ZXJ5b25lIiwiUk9MRV9ETVNfUkVBRF9PTkxZIiwiUk9MRV9ETVNfV1JJVEUiLCJEZXYgQ29tcGhlYWx0aCBQcm92aWRlcnMiLCJEZXYgV2VhdGhlcmJ5IFByb3ZpZGVycyJdfQ.et-tcKc8deJJVsmvFKf3Oe-sRMuemoNyT5C-QbU0WKwm72CyVhilfxMg5-nv-7LwAYjWinZTze6Z4Dp9PdCpM1WEG0_oMA77FD9T1-w-KQ1Xkybklby-0O796a_u_zoc2GYDtFXC9UW5L5Jnh2Gs5KsAypP70HfRvqFfprGWNbY7EYDutWnxDp_NhwU_AcVVWJJDFxQfBWQTfnwRdKw-OLEXq3DHMR_5nUcfjQ15VojfUYoMSR1elQh_AhLT0JKrWu84ZRG-Tvw-0V_qg8ggXAN19cyi2JNhsBlRX_kKq0-KSpJWASw2WKNvqOz_40JAC1b0OuiW-JdfDnoTzyyFiQ'
    }
  }
})

const auth = store => {
  store.on('@init', init)
  store.on('auth/reset', () => init())
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
    store.dispatch('auth/reset')
    store.dispatch('auth/isAuthenticated', false)
  })

  store.on('auth/data/update', (state, data) => ({ auth: { ...state.auth, data } }))
  store.on('auth/oidc/update', (state, oidc) => ({ auth: { ...state.auth, oidc } }))
  store.on('auth/isAuthenticated', (state, isAuthenticated) => ({ auth: { ...state.auth, isAuthenticated } }))
}

export default auth
