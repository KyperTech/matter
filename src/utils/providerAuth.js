import { put, get } from './cruder'
import logger from './logger'
import config from '../config'
import { isBrowser, asyncLoadJs } from './dom'
// import { OAuth, User } from 'oauthio-web' // window/document undefined error

// Load oauthio library if env is browser
if (isBrowser()) {
  loadOAuthio().then(() => {
    initializeOAuth()
  })
}

/**
 * @description Signup using a token generated from the server (so server and client are both aware of auth state)
 */
export function authWithServer (provider) {
  initializeOAuth()
  return get(`${config.serverUrl}/stateToken`)().then(params => {
    return new Promise((resolve, reject) => {
      window.OAuth.popup(provider, { state: params.token }).done(result => {
        logger.info({
          description: 'Result from oauth:', result, provider, params,
          func: 'authWithServer', obj: 'providerAuth'
        })
        put(`${config.serverUrl}/auth`)({ provider, code: result.code, stateToken: params.token }).then(loggedInData => {
          logger.warn({
            description: 'logged in info', result: loggedInData,
            func: 'authWithServer', obj: 'providerAuth'
          })
          resolve(loggedInData)
        }, error => {
          reject(error)
        })
      }).fail(error => {
        logger.error({
          description: 'error with request', error,
          func: 'authWithServer', obj: 'providerAuth'
        })
        return Promise.reject(error)
      })
    })
  }, error => {
    logger.error({
      description: 'error with request', error,
      func: 'authWithServer', obj: 'providerAuth'
    })
    return Promise.reject(error)
  })
}

/**
 * @description Run initial setup of OAuth Library
 */
function initializeOAuth () {
  if (isBrowser() && window.OAuth) {
    console.log('initializing oauth')
    window.OAuth.initialize(config.oauthioKey)
  }
}

/**
 * @description Load OAuthio-web Library into body as script element
 */
function loadOAuthio () {
  // console.log('loading oauthio into script tag:', config.oauthioCDN)
  if (typeof window.OAuth !== 'undefined') {
    return Promise.resolve()
  }
  return asyncLoadJs(config.oauthioCDN).then(() => {
    if (window.OAuth) {
      window.OAuth.initialize(config.oauthioKey)
    }
  })
}
