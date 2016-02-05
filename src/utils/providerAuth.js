import request from './request';
import logger from './logger';
import * as dom from './dom';
import config from '../config';

export default class ProviderAuth {
	constructor(actionData) {
		const { project, redirectUrl, provider } = actionData;
		const externalAuth = config.externalAuth[project.name] ? config.externalAuth[project.name] : null;
		this.project = project;
		this.provider = provider;
		this.redirectUrl = externalAuth ? externalAuth.redirectUrl : '/oauthcallback';
		if (redirectUrl) {
			this.redirectUrl = redirectUrl;
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
	localGoogleLogin() {
		if(this.provider !== 'google'){
			logger.error({
				description: 'Invalid provider.',
				func: 'localGoogleLogin', obj: 'providerAuth'
			});
			return Promise.reject({message: 'Invalid provider'});
		}
		return this.googleAuth().then(googleAccount => {
			if(!googleAccount){
				return Promise.reject({message: 'Error loading Google account.'});
			}
			const { image, emails } = googleAccount;
			const email = (emails && emails[0] && emails[0].value) ? emails[0].value : '';
			const account = {
				image, email,
				username: email.split('@')[0],
				provider: this.provider,
				google: googleAccount
			};
			logger.info({
				description: 'Google account loaded, signing up.', account,
				googleAccount, func: 'localGoogleLogin', obj: 'providerAuth'
			});
			return request.post(`${this.project.endpoint}/login`, account);
		}, error => {
			logger.error({
				description: 'Error authenticating with Google.', error,
				func: 'signup', obj: 'providerAuth'
			});
			return Promise.reject({message: 'Error getting external account.'});
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
	localGoogleSignup() {
		if(this.provider !== 'google'){
			logger.error({
				description: 'Invalid provider.',
				func: 'localGoogleSignup', obj: 'providerAuth'
			});
			return Promise.reject({message: 'Invalid provider'});
		}
		return this.googleAuth().then(googleAccount => {
			if(!googleAccount){
				return Promise.reject({message: 'Error loading Google account.'});
			}
			const { image, emails } = googleAccount;
			const email = (emails && emails[0] && emails[0].value) ? emails[0].value : '';
			const account = {
				image, email,
				username: email.split('@')[0],
				provider: this.provider,
				google: googleAccount
			};
			logger.info({
				description: 'Google account loaded, signing up.', account,
				googleAccount, func: 'signup', obj: 'providerAuth'
			});localGoogleSignup
			return request.post(`${this.project.endpoint}/signup`, account);
		}, error => {
			logger.error({
				description: 'Error authenticating with Google.', error,
				func: 'signup', obj: 'providerAuth'
			});
			return Promise.reject({message: 'Error getting external account.'});
		});
	}

	/**
	 * @description Authenticate with Google on client side (using Google Library)
	 */
	googleAuth() {
		const clientId = (this.project && this.project.name && config.externalAuth[this.project.name]) ? config.externalAuth[this.project.name].google : null;
		if(!clientId){
			logger.error({
				description: 'ClientId is required to authenticate with Google.',
				func: 'googleSignup', obj: 'providerAuth'
			});
			return Promise.reject('Client id is required to authenticate with Google.');
		}
		if (typeof window !== 'undefined' && typeof window.gapi === 'undefined') {
			return this.addGoogleLib().then(() => {
				return this.googleAuth();
			});
		}
		return new Promise((resolve, reject) => {
			window.gapi.auth.authorize({client_id: clientId, scope: 'email profile'}, (auth) => {
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
          request.execute(account => {
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
	}

	/**
	 * @description Add Google API lib script tag to DOM
	 */
	addGoogleLib() {
		const scriptSrc = 'https://apis.google.com/js/client.js?onload=OnLoadCallback';
		return new Promise((resolve) => {
			dom.asyncLoadJs(scriptSrc);
			if (typeof window !== 'undefined') {
				window.OnLoadCallback = () => {
					logger.log({
						description: 'Google library loaded',
						func: 'googleSignup', obj: 'providerAuth'
					});
					resolve();
				};
			}
		});
	}
}
