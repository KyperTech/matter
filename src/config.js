import merge from 'lodash/object/merge';
import has from 'lodash/object/has';

let defaultConfig = {
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
			logLevel: 'warn'
		}
	},
	tokenName: 'tessellate',
	tokenDataName: 'tessellate-tokenData',
	tokenUserDataName: 'tessellate-currentUser',
};
let instance = null;
let envName = 'prod';
class Config {
	constructor() {
		if (!instance) {
      instance = this;
    }
		// console.log({description: 'Config object created.', config: merge(this, defaultConfig), func: 'constructor', obj: 'Config'});
		return merge(instance, defaultConfig);
	}
	get serverUrl() {
		let url = defaultConfig.envs[envName].serverUrl
		if (typeof window !== 'undefined' && has(window, 'location') && window.location.host === url) {
			url = '';
		}
		return url;
	}
	get logLevel() {
		return defaultConfig.envs[envName].logLevel;
	}
	set envName(newEnv) {
		envName = newEnv;
		// this.envName = newEnv;
		// console.log('Environment name set:', envName);
	}
	get env() {
		return defaultConfig.envs[envName];
	}
}
let config = new Config();

export default config;
