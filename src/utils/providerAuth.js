import request from './request';
import logger from './logger';
import dom from './dom';
import config from '../config';
import hello from 'hellojs'; //Modifies objects to have id parameter?
//Private object containing clientIds
let clientIds = {};
class ProviderAuth {
	constructor(actionData) {
		this.app = actionData.app ? actionData.app : null;
		this.redirectUri = actionData.redirectUri ? actionData.redirectUri : 'redirect.html';
		this.provider = actionData.provider ? actionData.provider : null;
	}
	helloLoginListener() {
		//Login Listener
		hello.on('auth.login', (auth) => {
			logger.info({
				description: 'User logged in to google.', auth,
				func: 'loadHello', obj: 'Google'
			});
			// Call user information, for the given network
			hello(auth.network).api('/me').then(userData => {
				// Inject it into the container
				//TODO:Send account informaiton to server
				userData.provider = auth.network;
				logger.log({
					description: 'Provider request successful.',  userData,
					func: 'helloLoginListener', obj: 'providerAuth'
				});
				//Login or Signup endpoint
				return request.post(this.endpoint + '/provider', userData).then(response => {
					logger.log({
						description: 'Provider request successful.',  response,
						func: 'helloLoginListener', obj: 'providerAuth'
					});
					return response;
				})
				['catch'](error => {
					logger.error({
						description: 'Error requesting login.', error,
						func: 'signup', obj: 'Matter'
					});
					return Promise.reject(error);
				});
			});
		});
	}
	requestProviders() {
		return request.get(`${this.app.endpoint}/providers`).then(response => {
			logger.log({
				description: 'Provider request successful.',  response,
				func: 'requestProviders', obj: 'ProviderAuth'
			});
			return response;
		}, error => {
			logger.error({
				description: 'Error loading hellojs.', error,
				func: 'requestProviders', obj: 'ProviderAuth'
			});
			return Promise.reject({
				message: 'Error requesting application third party providers.'
			});
		});
	}
	/** Initialize hellojs library and request app providers
	 */
	initHello() {
		logger.debug({
			description: 'Hellojs library loaded.', app: this.app,
			func: 'initHello', obj: 'ProviderAuth'
		});
		if(config.externalProviders[this.app.name]){
			const providerData = config.externalProviders[this.app.name];
			logger.debug({
				description: 'Provider config exists in local config.',
				providerData, func: 'initHello', obj: 'ProviderAuth'
			});
			return new Promise((resolve) => {
				hello.init(providerData, {redirect_uri: 'redirect.html', scope: 'email'});
				resolve();
			});
		} else {
			//Get providers data from tessellate
			return this.requestProviders().then(providers => {
				logger.log({
					description: 'Provider request successful.',  providers,
					func: 'initHello', obj: 'ProviderAuth'
				});
				const { provider } = this;
				const providerData = providers[this.provider];
				if (!provider) {
					logger.error({
						description: 'Provider is not setup.\n' +
						'Visit build.kyper.io to enter your client id for ' + provider,
						provider, providers, func: 'initHello', obj: 'ProviderAuth'
					});
					return Promise.reject({
						message: 'Provider is not setup.'
					});
				}
				logger.debug({
					description: 'Initializing hellojs.', provider,
					providers, providerData, func: 'initHello', obj: 'ProviderAuth'
				});
				return hello.init(providerData, {redirect_uri: 'redirect.html'});
			}, error => {
				logger.error({
					description: 'Error getting provider data from Tessellate.', error,
					func: 'initHello', obj: 'ProviderAuth'
				});
				return Promise.reject({message: 'Error requesting application third party providers.'});
			});
		}
	}
  /** External provider login
   * @example
   * //Login to account that was started through external account signup (Google, Facebook, Github)
   * matter.login('google').then(function(loginRes){
   * 		console.log('Successful login:', loginRes)
   * }, function(err){
   * 		console.error('Error with provider login:', err);
   * });
   */
	login() {
		return this.initHello().then(() => {
			logger.debug({
				description: 'Init hello successful.',
				func: 'login', obj: 'providerAuth'
			});
			return hello.login(this.provider).then(userData => {
				logger.info({
					description: 'Login response.', userData,
					func: 'login', obj: 'providerAuth'
				});
				return userData;
			}, error => {
				logger.debug({
					description: 'Init hello successful.', error,
					func: 'login', obj: 'providerAuth'
				});
				return Promise.reject(error);
			});
		}, error => {
			logger.error({
				description: 'Error initalizing hellojs.', error,
				func: 'login', obj: 'providerAuth'
			});
			return Promise.reject('Error with third party login.');
		});
	}
	/** Signup using external provider account (Google, Facebook, Github)
   * @example
   * //Signup using external account (Google, Facebook, Github)
   * matter.signup('google').then(function(signupRes){
   * 		console.log('Successful signup:', signupRes)
   * }, function(err){
   * 		console.error('Error with provider signup:', err);
   * });
	 */
	signup() {
		//TODO: send info to server
		return this.login();
	}
}
export default ProviderAuth;
