import merge from 'lodash/object/merge';
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
		console.warn({description: 'Config object created.', config: merge(this, defaultConfig), func: 'constructor', obj: 'Config'});
		return merge(instance, defaultConfig);
	}
	get serverUrl() {
		console.log('defaultConfig:', defaultConfig);
		return defaultConfig.envs[envName].serverUrl;
	}
	get logLevel() {
		return defaultConfig.envs[envName].logLevel;
	}
	set envName(newEnv) {
		envName = newEnv;
		this.envName = newEnv;
	}
	get env() {
		return defaultConfig.envs[envName];
	}
}
let config = new Config();


config.serverUrl
export default config;
