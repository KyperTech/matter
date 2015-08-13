import axios from 'axios';

const serverUrl = 'http://hypercube.elasticbeanstalk.com';
const tokenName = 'matter';

let user;
let token;

if (typeof axios == 'undefined') {
	console.error('Axios is required to use Matter');
} else {
	// Add a request interceptor
	axios.interceptors.request.use(function(config) {
		// Do something before request is sent
		//TODO: Handle there already being headers
		if (localStorage.getItem(tokenName)) {
			config.headers = {'Authorization': 'Bearer ' + localStorage.getItem(tokenName)};
			console.log('Set auth header through interceptor');
		}
		return config;
	}, function(error) {
		// Do something with request error
		return Promise.reject(error);
	});
}

class Matter {
	signup(signupData) {
		return axios.post(serverUrl + '/signup', signupData)
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
		return axios.put(serverUrl + '/login', loginData)
		.then(function(response) {
			//TODO: Save token locally
			console.log(response);
			token = response.data.token;
			if (window.localStorage.getItem(tokenName) === null) {
				window.localStorage.setItem(tokenName, response.data.token);
				console.log('token set to storage:', window.localStorage.getItem(tokenName));
			}
			return response.data;
		})['catch'](function(errRes) {
			console.error('[login()] Error logging in: ', errRes);
		  return Promise.reject(errRes);
		});
	}

	logout() {
		return axios.put(serverUrl + '/logout', {
		}).then(function(response) {
		  console.log('[logout()] Logout successful: ', response);
		  if (typeof window != 'undefined' && typeof window.localStorage.getItem(tokenName) != null) {
				window.localStorage.setItem(tokenName, null);
			}
		  return response.body;
		})['catch'](function(errRes) {
		  console.error('[logout()] Error logging out: ', errRes);
		  return Promise.reject(errRes);
		});
	}

	getCurrentUser() {
		//TODO: Check Current user variable
		return axios.get(serverUrl + '/user', {
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
		if (typeof window == 'undefined' || typeof window.localStorage.getItem(tokenName) == 'undefined') {
			return null;
		}
		return window.localStorage.getItem(tokenName);
	}

};
var matter = new Matter();
export default matter;

