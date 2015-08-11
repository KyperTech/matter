import Firebase from 'firebase';
import axios from 'axios';
import Promise from 'babelify/polyfill';
require('babel-core/register')({
  optional: ['es7.asyncFunctions']
});
const serverUrl = 'http://localhost:4000';
const fbUrl = 'https://pruvit.firebaseio.com';
const tokenName = 'matter';

var user;
var token;

if (typeof Firebase == 'undefined') {
	console.error('Firebase is required to use Matter');
}
if (typeof axios == 'undefined') {
	console.error('Axios is required to use Matter');
} else {
	// Add a request interceptor
	axios.interceptors.request.use((config) => {
		// Do something before request is sent
		//TODO: Handle there already being headers
		if (localStorage.getItem(tokenName)) {
			config.headers = {'Authorization': 'Bearer ' + localStorage.getItem(tokenName)};
			console.log('Set auth header through interceptor');
		}
		return config;
	}, (error) => {
		// Do something with request error
		return Promise.reject(error);
	});
}

class Matter {
	async function signup(signupData) {
		try {
			return await axios.post(`${serverUrl}/signup`, signupData);
		} catch (err) {
			throw new Error(err);
		}
	}

	async login(loginData) {
		if (!loginData || !loginData.password || !loginData.username) {
			console.error('Username/Email and Password are required to login');
		}
		try {
			let loginRes = await axios.put(serverUrl + '/login', loginData);
			if (window.localStorage.getItem(tokenName) === null) {
				window.localStorage.setItem(tokenName, response.data.token);
				console.log('token set to storage:', window.localStorage.getItem(tokenName));
			}
			return loginRes.data;
		} catch (err) {
			console.error('[login()] Error logging in: ', err);
			throw new Error(err);
		}
	}

	async logout() {
		try {
			let logoutRes = await axios.put(serverUrl + '/logout');
			console.log('[logout()] Logout successful: ', logoutRes);
		  if (typeof window != 'undefined' && typeof window.localStorage.getItem(tokenName) != null) {
				window.localStorage.setItem(tokenName, null);
			}
		  return logoutRes.body;
		} catch (err) {
			console.error('[logout()] Error logging out: ', errRes);
		  return errRes;
		}
	}

	async getCurrentUser() {
		//TODO: Check Current user variable
		try {
			let userRes = await axios.get(serverUrl + '/user');
			console.log('[getCurrentUser()] Current User:', userRes.data);
			user = userRes.data;
			return user;
		} catch (errRes) {
			console.error('[getCurrentUser()] Error getting current user: ', errRes);
			return errRes;
		}
	}

	getAuthToken() {
		//TODO: Load token from storage
		if (typeof window == 'undefined' || typeof window.localStorage.getItem(tokenName) == 'undefined') {
			return null;
		}
		return window.localStorage.getItem(tokenName);
	}

	async getApps() {
		try {
			let appRes = await axios.get(serverUrl + '/apps');
			console.log('[getApps()] Apps:', appRes.data);
			return appRes.data;
		} catch (errRes) {
			console.error('[getApps()] Error getting apps list: ', errRes);
			return errRes;
		}
	}

};

export default Matter;

