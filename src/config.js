import { merge, find } from 'lodash'

const defaultConfig = {
  envs: {
    local: {
      serverUrl: 'http://localhost:4000',
      logLevel: 'trace'
    },
    dev: {
      serverUrl: 'http://tessellate-stage.elasticbeanstalk.com',
      logLevel: 'debug'
    },
    stage: {
      serverUrl: 'http://tessellate-stage.elasticbeanstalk.com',
      logLevel: 'info'
    },
    prod: {
      serverUrl: 'http://tessellate.elasticbeanstalk.com',
      logLevel: 'error'
    }
  },
  tokenName: 'tessellate',
  tokenDataName: 'tessellate-tokenData',
  tokenUserDataName: 'tessellate-currentUser',
  oauthioKey: 'sxwuB9Gci8-4pBH7xjD0V_jooNU',
  oauthioCDN: 'https://s3.amazonaws.com/kyper-cdn/js/libs/oauthio-web/v0.5.0/oauth.min.js'
}

let instance = null
let envName = 'prod'
let level = null
class Config {
  constructor () {
    if (!instance) {
      merge(this, defaultConfig)
      instance = this
    }
    return instance
  }

  get serverUrl () {
    if (typeof window !== 'undefined' && window.location && window.location.host && window.location.host !== '') {
      const matchingEnv = find(defaultConfig.envs, env => {
        return env.serverUrl === window.location.host
      })
      if (matchingEnv) {
        return ''
      }
    }
    return defaultConfig.envs[this.envName].serverUrl
  }

  set logLevel (setLevel) {
    level = setLevel
  }

  get logLevel () {
    if (level) {
      return level
    }
    return defaultConfig.envs[this.envName].logLevel
  }

  set envName (newEnv) {
    envName = newEnv
  }

  get envName () {
    return envName
  }

  get env () {
    if (defaultConfig.envs[this.envName]) {
      return defaultConfig.envs[this.envName]
    }
  }

  applySettings (settings) {
    if (settings) {
      merge(this, settings)
    }
  }

}

let config = new Config()

export default config
