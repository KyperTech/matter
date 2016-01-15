import request from './request';
import logger from './logger';
import * as dom from './dom';
import config from '../config';
// import hello from 'hellojs'; //Modifies objects to have id parameter?
export default class ProviderAuth {
	constructor(actionData) {
		const { app, redirectUrl, provider } = actionData;
		this.app = app;
		this.provider = provider;
		const externalAuth = config.externalAuth[this.app.name] ? config.externalAuth[this.app.name] : null;
		this.redirectUrl = externalAuth ? externalAuth.redirectUrl : '/oauthcallback';
		if(redirectUrl){
			this.redirectUrl = redirectUrl;
		}
	}
	getAuthUrl() {
		const endpointUrl = `${this.app.endpoint}/authUrl?provider=${this.provider}&redirectUrl=${this.redirectUrl}`;
		logger.log({
			description: 'Requesting Auth url.',  endpointUrl,
			func: 'getAuthUrl', obj: 'providerAuth'
		});
		return request.get(endpointUrl).then((authUrl) => {
			logger.log({
				description: 'Get auth url request successful.',  authUrl,
				func: 'getAuthUrl', obj: 'providerAuth'
			});
			return authUrl;
		})
		['catch'](error => {
			logger.error({
				description: 'Error requesting auth url.', error,
				func: 'getAuthUrl', obj: 'providerAuth'
			});
			return Promise.reject('External authentication not available.');
		});
	}
	accountFromCode(code) {
		logger.log({
			description: 'Requesting Auth url.',  code,
			func: 'accountFromCode', obj: 'providerAuth'
		});
		return request.post(`${this.app.endpoint}/oauth2`, { code }).then(account => {
			logger.log({
				description: 'Get auth url request successful.',  account,
				func: 'accountFromCode', obj: 'providerAuth'
			});
			return account;
		})
		['catch'](error => {
			logger.error({
				description: 'Error requesting auth url.', error,
				func: 'accountFromCode', obj: 'providerAuth'
			});
			return Promise.reject('External authentication not available.');
		});
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
		return this.getAuthUrl().then(url => {
			logger.info({
				description: 'Login response.', url,
				func: 'login', obj: 'providerAuth'
			});
			return url;
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
		if(this.provider === 'google'){
			return this.googleAuth();
		} else {
			return Promise.reject('Invalid provider');
		}
	}
	googleAuth() {
		const clientId = (this.app && this.app.name && config.externalAuth[this.app.name]) ? config.externalAuth[this.app.name].google : null;
		if(!clientId){
			logger.error({
				description: 'ClientId is required to authenticate with Google.',
				func: 'googleSignup', obj: 'providerAuth'
			});
			return Promise.reject('Client id is required to authenticate with Google.');
		}
		if(typeof window !== 'undefined'){
			window.OnLoadCallback = (data) => {
				logger.log({
					description: 'Google load callback:', data,
					func: 'googleSignup', obj: 'providerAuth'
				});
			};
		}
		const scriptSrc = 'https://apis.google.com/js/client.js?onload=OnLoadCallback'
		return new Promise((resolve, reject) => {
			dom.asyncLoadJs(scriptSrc).then(() => {
				window.gapi.auth.authorize({client_id: clientId, scope: 'https://www.googleapis.com/auth/plus.me'}, (auth) => {
					if(!auth || auth.error || auth.message){
						logger.error({
							description: 'Error authorizing with google',
							func: 'googleSignup', obj: 'providerAuth'
						});
						return reject(auth.error || auth.message);
					}
					logger.log({
						description: 'Auth with google successful.', auth,
						func: 'googleSignup', obj: 'providerAuth'
					});
					window.gapi.client.load('plus', 'v1', () => {
	          let request = gapi.client.plus.people.get({
	            'userId': 'me'
	          });
	          request.execute((account) => {
							logger.log({
								description: 'Account loaded from google.', account,
								func: 'googleSignup', obj: 'providerAuth'
							});
							//TODO: Signup/Login to Tessellate server with this information
							resolve(account);
	          });
	        });
				});
			});
		});
	}
}
