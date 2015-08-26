import config from './config';
import request from './utils/request';

let user;
let token;

class Matter {
	signup(signupData) {
		return request.post(config.serverUrl + '/signup', signupData)
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
		return request.put(config.serverUrl + '/login', loginData)
		.then(function(response) {
			//TODO: Save token locally
			console.log(response);
			token = response.data.token;
			if (window.localStorage.getItem(config.tokenName) === null) {
				window.localStorage.setItem(config.tokenName, response.data.token);
				console.log('token set to storage:', window.localStorage.getItem(config.tokenName));
			}
			return response.data;
		})['catch'](function(errRes) {
			console.error('[login()] Error logging in: ', errRes);
		  return Promise.reject(errRes);
		});
	}

	logout() {
		return request.put(config.serverUrl + '/logout', {
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
		return request.get(config.serverUrl + '/user', {
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
var matter = new Matter();
export default matter;

