import auth0 from 'auth0-js'
import astrochimp from 'astrochimp'

const AUTH_KEY = 'a24_press_auth0_section'
const MAILCHIMP_URL = 'https://a24films.us14.list-manage.com/subscribe/post?u=d6a612d44078d0634d5fa0663&id=2b211ff970'

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

  if (Date.now() < parsed.expiresAt) return parsed
  
  localStorage.removeItem(AUTH_KEY)
  return { expired: true }
}

export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    auth0Client.client.login({ realm: 'Username-Password-Authentication', username, password, scope: 'openid profile email' }, 
    (error, response) => error ? reject(error) : setSession(response) || resolve(response))
  })
}

export const signup = (email, password, user_metadata) => {
  return new Promise((resolve, reject) => {
    auth0Client.signup({ connection: 'Username-Password-Authentication', email, password, user_metadata }, 
    (error, response) => error ? reject(error) : resolve(response))
  })
}

export const logout = () => {
  localStorage.removeItem(AUTH_KEY)
  auth0Client ? auth0Client.logout({ returnTo: window.location.origin }) : (window.location.href = '/')
}

export const subscribe = (data) => {
  return new Promise((resolve, reject) => {
    try {
      astrochimp(MAILCHIMP_URL, data, (error, response) => {
        if (error) {
          console.error('MailChimp Error:', error)
          reject(error)
        } else {
          resolve(response)
        }
      })
    } catch (error) {
      console.error('Subscription Error:', error)
      reject(error)
    }
  })
}

export const getError = (error) => {
  if (typeof error.description === 'string') return error.description
  if (error.policy) return error.policy
  if (typeof error.error_description === 'string') return error.error_description

  return error.message || JSON.stringify(error)
}

export const recovery = (email) => {
  return new Promise((resolve, reject) => {
    auth0Client.changePassword({ connection: 'Username-Password-Authentication', email }, (error, response) => error ? reject(error) : resolve(response))
  })
}