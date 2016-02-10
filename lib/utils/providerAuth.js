'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.authWithServer = authWithServer;

var _request = require('./request');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _dom = require('./dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { OAuth, User } from 'oauthio-web'; // window/document undefined error
// const OAuthLib = isBrowser ? require('oauthio-web') : undefined; //document undefined error

if ((0, _dom.isBrowser)()) {
	loadOAuthio().then(function () {
		_logger2.default.debug({ description: 'OAuthIo script loaded:' });
		initializeOAuth();
	});
}

/**
 * @description Signup using a token generated from the server (so server and client are both aware of auth state)
 */
function authWithServer(provider) {
	initializeOAuth();
	return (0, _request.get)(_config2.default.serverUrl + '/stateToken').then(function (params) {
		OAuth.popup(provider, { state: params.token }).done(function (result) {
			return (0, _request.put)(_config2.default.serverUrl + '/auth', { provider: provider, code: result.code, stateToken: params.token });
		}).fail(function (error) {
			_logger2.default.error({
				description: 'error with request', error: error,
				func: 'authWithServer', obj: 'providerAuth'
			});
			return new Promise.reject(error);
		});
	}, function (error) {
		_logger2.default.error({
			description: 'error with request', error: error,
			func: 'authWithServer', obj: 'providerAuth'
		});
		return new Promise.reject(error);
	});
}

/**
 * @description Run initial setup of OAuth Library
 */
function initializeOAuth() {
	if ((0, _dom.isBrowser)() && window.OAuth) {
		console.log('initializing oauth');
		window.OAuth.initialize(_config2.default.oauthioKey);
	}
}

/**
 * @description Load OAuthio-web Library into body as script element
 */
function loadOAuthio() {
	console.log('loading oauthio into script tag:', _config2.default.oauthioCDN);
	if (typeof window.OAuth !== 'undefined') {
		return Promise.resolve();
	}
	return (0, _dom.asyncLoadJs)(_config2.default.oauthioCDN).then(function () {
		if (window.OAuth) {
			window.OAuth.initialize(_config2.default.oauthioKey);
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