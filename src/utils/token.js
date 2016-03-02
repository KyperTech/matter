import config from '../config'
import logger from './logger'
import * as cookiesUtil from './cookies'
import * as envStorage from './envStorage'
import jwtDecode from 'jwt-decode'
import { isString } from 'lodash'

let token = {

  /** Get string value of token
   * @return {String}
   * @example
   * console.log('String value of current token', token.string)
   */
  get string () {
    // Handle static file
    if (window.location.host === '') {
      return envStorage.getItem(config.tokenName)
    }
    const cookie = cookiesUtil.getCookie(config.tokenName)
    if (cookie === '') return null
    return cookie
  },

  /**
   * @description Get decoded data within token (unencrypted data only)
   * @return {Object}
   * @example
   * console.log('Data of current token:', token.data)
   */
  get data () {
    if (!this.string) return null
    if (envStorage.getItem(config.tokenDataName)) {
      return envStorage.getItem(config.tokenDataName)
    } else {
      return decodeToken(this.string)
    }
  },

  /**
   * @description Set token data
   */
  set data (tokenData) {
    envStorage.setItem(config.tokenDataName, tokenData)
    logger.debug({
      description: 'Token data was set to session storage.', tokenData,
      func: 'data', obj: 'token'
    })
  },

  /**
   * @description Set token value as a string
   */
  set string (tokenStr) {
    // Handle object being passed
    if (!isString(tokenStr)) {
      // Token is included in object
      logger.log({
        description: 'Token data is not string.',
        tokenStr, func: 'string', obj: 'token'
      })
      throw new Error('Token data should be a string')
    }
    // Handle cookies not working with static file
    if (window.location.host === '') {
      envStorage.setItem(config.tokenName, tokenStr)
    } else {
      cookiesUtil.setCookie(config.tokenName, tokenStr, 7)
    }
    this.data = decodeToken(tokenStr)
    logger.debug({
      description: 'Token was set to cookies.',
      func: 'string', obj: 'token'
    })
  },

  /** Save token data
   */
  save (tokenStr) {
    this.string = tokenStr
  },

  /** Delete token data
   */
  delete () {
    // Remove string token
    // Handle cookies not working with static file
    if (window.location.host === '') {
      envStorage.removeItem(config.tokenName)
    } else {
      cookiesUtil.deleteCookie(config.tokenName)
    }
    // Remove user data
    envStorage.removeItem(config.tokenDataName)
    logger.log({
      description: 'Token was removed.',
      func: 'delete', obj: 'token'
    })
  }
}

export default token

/** Safley decode a JWT string
 * @private
 * @return {Object}
 */
function decodeToken (tokenStr) {
  if (!tokenStr || tokenStr === '') return null
  try {
    return jwtDecode(tokenStr)
  } catch (error) {
    logger.error({
      description: 'Error decoding token.',
      error, func: 'decodeToken', file: 'token'
    })
    return null
  }
}
