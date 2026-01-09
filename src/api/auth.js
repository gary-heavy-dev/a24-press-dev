import auth0 from 'auth0-js'
import astrochimp from 'astrochimp'

const AUTH_KEY = 'auth0_session'

export const isBrowser = () => typeof window !== 'undefined'

const auth0Client = isBrowser() ? new auth0.WebAuth({
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  redirectUri: window.location.origin,
  responseType: 'token id_token',
  scope: 'openid profile email'
}) : null

const setSession = (authResult) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify({
    ...authResult,
    user: authResult.idTokenPayload,
    expiresAt: Date.now() + (authResult.expiresIn * 1000)
  }))
  window.location.href = '/'
}

export const getLocalSession = () => {
  const session = isBrowser() && localStorage.getItem(AUTH_KEY)
  if (!session) return null
  const parsed = JSON.parse(session)
  return Date.now() < parsed.expiresAt ? parsed : (localStorage.removeItem(AUTH_KEY), null)
}

export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    auth0Client.client.login({ realm: 'Username-Password-Authentication', username, password, scope: 'openid profile email' }, 
    (err, res) => err ? reject(err) : setSession(res) || resolve(res))
  })
}

export const signup = (email, password, user_metadata) => {
  return new Promise((resolve, reject) => {
    auth0Client.signup({ connection: 'Username-Password-Authentication', email, password, user_metadata }, 
    (err, res) => err ? reject(err) : resolve(res))
  })
}

export const logout = () => {
  localStorage.removeItem(AUTH_KEY)
  auth0Client ? auth0Client.logout({ returnTo: window.location.origin }) : (window.location.href = '/')
}

export const subscribe = (data) => {
  astrochimp(`https://a24films.us14.list-manage.com/subscribe/post?u=d6a612d44078d0634d5fa0663&id=2b211ff970`, data, (err) => err && console.error(err))
}

export const getError = (err) => {
  if (typeof err.description === 'string') return err.description
  if (err.policy) return err.policy
  if (typeof err.error_description === 'string') return err.error_description
  return err.message || JSON.stringify(err)
}

export const recovery = (email) => {
  return new Promise((resolve, reject) => {
    auth0Client.changePassword({ connection: 'Username-Password-Authentication', email }, (err, res) => err ? reject(err) : resolve(res))
  })
}