const randomId = () => Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)

const init = () => ({
  auth: {
    isAuthenticated: false,
    jwt: '',
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
    store.dispatch('auth/isAuthenticated', false)    
  })

  store.on('auth/data/update', (state, data) => ({ auth: { ...state.auth, data } }))
  store.on('auth/oidc/update', (state, oidc) => ({ auth: { ...state.auth, oidc } }))
  store.on('auth/isAuthenticated', (state, isAuthenticated) => ({ auth: { ...state.auth, isAuthenticated } }))
}

export default auth
