import {merge, has, find} from 'lodash';

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
			logLevel: 'error'
		}
	},
	tokenName: 'tessellate',
	tokenDataName: 'tessellate-tokenData',
	tokenUserDataName: 'tessellate-currentUser',
	externalAuth: {
		tessellate: {
			google: '582741153619-9b3vifnmv2a32v49l63got889tgmnrhs.apps.googleusercontent.com',
			// redirectUrl: 'http://tessellate.kyper.io/#/oauth'
			redirectUrl: 'http://localhost:3000/oauth'
		},
		devshare: {
			google: '54741256621-d511263ke51ni32g1jalb9or85ckf5gr.apps.googleusercontent.com',
			redirectUrl: 'http://devshare.io/oauth'
		}
	}
};
let instance = null;
let envName = 'prod';
let level = null;
class Config {
	constructor() {
		if (!instance) {
			instance = this;
		}
		// console.log({description: 'Config object created.', config: merge(this, defaultConfig), func: 'constructor', obj: 'Config'});
		return merge(instance, defaultConfig);
	}
	get serverUrl() {
		let url = defaultConfig.envs[envName].serverUrl;
		if (typeof window !== 'undefined' && has(window, 'location') && has(window.location, 'host') && window.location.host !== '') {
			let matchingEnv = find(defaultConfig.envs, (e) => {
				return e.serverUrl === window.location.host;
			});
			if (matchingEnv) {
				url = '';
			}
		}
		return url;
	}
	set logLevel(setLevel) {
		level = setLevel;
	}
	get logLevel() {
		if (level) {
			return level;
		}
		return defaultConfig.envs[envName].logLevel;
	}
	set envName(newEnv) {
		envName = newEnv;
		// this.envName = newEnv;
		// console.log('Environment name set:', envName);
	}
	get envName() {
		return envName;
	}
	get env() {
		if(defaultConfig.envs[envName]){
			return defaultConfig.envs[envName];
		}
	}
	applySettings(settings) {
		merge(instance, settings);
	}

}
let config = new Config();

export default config;
