import { put, get } from './request';
import logger from './logger';
import config from '../config';
import { isBrowser, asyncLoadJs } from './dom';

// import { OAuth, User } from 'oauthio-web'; // window/document undefined error
// const OAuthLib = isBrowser ? require('oauthio-web') : undefined; //document undefined error


if(isBrowser()){
	loadOAuthio().then(() => {
		logger.debug({description: 'OAuthIo script loaded:'});
		initializeOAuth();
	});
}

/**
 * @description Signup using a token generated from the server (so server and client are both aware of auth state)
 */
export function authWithServer(provider) {
	initializeOAuth();
	return get(`${config.serverUrl}/stateToken`).then(params => {
		OAuth.popup(provider, { state: params.token }).done(result => {
			return put(`${config.serverUrl}/auth`, { provider, code: result.code, stateToken: params.token });
		}).fail(error => {
			logger.error({
				description: 'error with request', error,
				func: 'authWithServer', obj: 'providerAuth'
			});
			return new Promise.reject(error);
		});
	}, error => {
		logger.error({
			description: 'error with request', error,
			func: 'authWithServer', obj: 'providerAuth'
		});
		return new Promise.reject(error);
	});
}

/**
 * @description Run initial setup of OAuth Library
 */
function initializeOAuth() {
	if(isBrowser() && window.OAuth){
		console.log('initializing oauth');
		window.OAuth.initialize(config.oauthioKey);
	}
}

/**
 * @description Load OAuthio-web Library into body as script element
 */
function loadOAuthio() {
	console.log('loading oauthio into script tag:', config.oauthioCDN);
	if(typeof window.OAuth !== 'undefined'){
		return Promise.resolve();
	}
	return asyncLoadJs(config.oauthioCDN).then(() => {
		if(window.OAuth){
			window.OAuth.initialize(config.oauthioKey);
		}
	});
}

/**
 * @description Signup with external provider
 * @param {String} provider Provider with which to signup through (Google/Github Etc)
 */
// export async function signup(provider) {
// 	try {
// 		const res = await OAuth.popup(provider, {cache: true})
// 		logger.debug({
// 			description: 'Popup response.', res,
// 			func: 'signup', obj: 'providerAuth'
// 		});
// 		const newUser = await User.signup(res);
// 		return newUser;
// 	} catch(error) {
// 		logger.error({
// 			description: 'error in oauth request', error
// 		});
// 		return error;
// 	}
// }

/**
 * @description Login to external provider
 * @param {String} provider Provider with which to log into (Google/Github Etc)
 */
// export async function login(provider) {
// 	try {
// 		const res = await OAuth.popup(provider, {cache: true})
// 		const newUser = await User.signin(res);
// 		console.log('user:', newUser);
// 		return newUser;
// 	} catch(error) {
// 		console.error('error in oauth request', error);
// 		return error;
// 	}
// }

/**
 * @description Logout external provider service (Stormpath/oauthio)
 */
// export async function logout() {
// 	if(!currentlyLoggedIn()) return;
// 	try {
// 		const user = User.getIdentity();
// 		return await user.logout();
// 	} catch(error) {
// 		console.error('error logging out', error);
// 		return error;
// 	}
// }

/**
 * @description Get currently connected user
 */
// export function getCurrentUser() {
// 	return User.getIdentity();
// }

/**
 * @description Local user data from external provider service (Stormpath/oauthio)
 */
// export async function getUserData(provider) {
// 	try {
// 		const result = await OAuth.popup(provider, {cache: true});
// 		return await result.me();
// 	} catch(error) {
// 		console.error('error in oauth request', error);
// 	}
// }

/**
 * @description Update user with external provider service (Stormpath/oauthio)
 */
// export async function updateUserData(newData) {
// 	try {
// 		user = User.getIdentity();
// 		user.data = newData;
// 		return await user.save();
// 	} catch(error) {
// 		console.error('error updating user data', error);
// 	}
// }

/**
 * @description Check to see if a user is currently logged in to external provider service (Stormpath/oauthio)
 */
// export function currentlyLoggedIn() {
// 	return User.isLogged();
// }
