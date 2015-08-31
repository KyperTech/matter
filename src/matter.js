import config from './config';
import request from './utils/request';
import token from './utils/token';
import _ from 'underscore';

let user;
let endpoints;

class Matter {
	/* Constructor
	 * @param {string} appName Name of application
	 */
	constructor(appName, opts) {
		if (!appName) {
			throw new Error('Application name is required to use Matter');
		} else {
			this.name = appName;
		}
		if (opts) {
			this.options = opts;
		}
	}
	/* Endpoint getter
	 *
	 */
	get endpoint() {
		let serverUrl = config.serverUrl;
		if (_.has(this, 'options') && this.options.localServer) {
			serverUrl = 'http://localhost:4000';
		}
		if (this.name == 'tessellate') {
			//Remove url if host is server
			if (window && _.has(window, 'location') && window.location.host == serverUrl) {
				console.warn('Host is Server, serverUrl simplified!');
				serverUrl = '';
			}
		} else {
			serverUrl = config.serverUrl + '/apps/' + this.name;
		}
		return serverUrl;
	}
	/* Signup
	 *
	 */
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
	/** Login
	 *
	 */
	login(loginData) {
		if (!loginData || !loginData.password || !loginData.username) {
			console.error('Username/Email and Password are required to login');
		  return Promise.reject({message: 'Username/Email and Password are required to login'});
		}
		return request.put(this.endpoint + '/login', loginData)
		.then(function(response) {
			//TODO: Save token locally
			if (_.has(response, 'data') && _.has(response.data, 'status') && response.data.status == 409) {
				console.error('[Matter.login()] Account not found: ', response);
				return Promise.reject(response.data);
			} else {
				if (_.has(response, 'token')) {
					token.string = response.token;
				}
				console.log('[Matter.login()] Successful login: ', response);
				return response;
			}
		})['catch'](function(errRes) {
			if (errRes.status == 409 || errRes.status == 400) {
				errRes = errRes.response.text;
			}
		  return Promise.reject(errRes);
		});
	}
	/** Logout
	 */
	logout() {
		return request.put(this.endpoint + '/logout').then(function(response) {
		  console.log('[Matter.logout()] Logout successful: ', response);
		  token.delete();
		  return response;
		})['catch'](function(errRes) {
		  console.error('[Matter.logout()] Error logging out: ', errRes);
		  token.delete();
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
		return token.string;
	}
};
export default Matter;
