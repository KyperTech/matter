import config from './config';
import request from './utils/request';
import _ from 'underscore';

let user;
let token;
let endpoints;

class Matter {
	constructor(appName) {
		if (!appName) {
			throw new Error('Application name is required to use Matter');
		} else {
			this.name = appName;
		}
	}
	get endpoint() {
		return config.serverUrl + '/apps/' + this.name;
	}
	// async signup(signupData) {
	// 	try {
	// 		var response = await request.post(endpoints.signup, signupData);
	// 		console.log('Successful signup call:', response);
	// 	} catch(err) {
	// 	  console.error('[signup()] Error signing up:', errRes);
	// 	  throw err;
	// 	}
	// }
	signup(signupData) {
		return request.post(this.endpoint + '/signup', signupData)
		.then(function(response) {
		  console.log(response);
		})
		['catch'](function(errRes) {
		  console.error('[signup()] Error signing up:', errRes);
		  return Promise.reject(errRes);
		});
	}

	login(loginData) {
		if (!loginData || !loginData.password || !loginData.username) {
			console.error('Username/Email and Password are required to login');
		}
		return request.put(this.endpoint + '/login', loginData)
		.then(function(response) {
			//TODO: Save token locally
			console.log(response);
			if (_.has(response, 'data') && _.has(response.data, 'status') && response.data.status == 409) {
				console.error('[login()] Account not found: ', response);
				return Promise.reject(response.data);
			} else {
				token = response.data.token;
				if (window.localStorage.getItem(config.tokenName) === null) {
					window.localStorage.setItem(config.tokenName, response.data.token);
					console.log('token set to storage:', window.localStorage.getItem(config.tokenName));
				}
				return response.data;
			}
		})['catch'](function(errRes) {
			if (errRes.status == 409) {
				errRes = errRes.response.text;
			}
		  return Promise.reject(errRes);
		});
	}

	logout() {
		return request.put(this.endpoint + '/logout', {
		}).then(function(response) {
		  console.log('[logout()] Logout successful: ', response);
		  if (typeof window != 'undefined' && typeof window.localStorage.getItem(config.tokenName) != null) {
				window.localStorage.setItem(config.tokenName, null);
			}
		  return response.body;
		})['catch'](function(errRes) {
		  console.error('[logout()] Error logging out: ', errRes);
		  return Promise.reject(errRes);
		});
	}

	getCurrentUser() {
		//TODO: Check Current user variable
		return request.get(this.endpoint + '/user', {
		}).then(function(response) {
			//TODO: Save user information locally
			console.log('[getCurrentUser()] Current User:', response.data);
			user = response.data;
			return user;
		})['catch'](function(errRes) {
			console.error('[getCurrentUser()] Error getting current user: ', errRes);
		  return Promise.reject(errRes);
		});
	}

	getAuthToken() {
		//TODO: Load token from storage
		if (typeof window == 'undefined' || typeof window.localStorage.getItem(config.tokenName) == 'undefined') {
			return null;
		}
		return window.localStorage.getItem(config.tokenName);
	}

};
export default Matter;

