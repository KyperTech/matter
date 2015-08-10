(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('firebase'), require('axios'), require('babelify/polyfill')) : typeof define === 'function' && define.amd ? define(['firebase', 'axios', 'babelify/polyfill'], factory) : global.Matter = factory(global.Firebase, global.axios, global.polyfill);
})(this, function (Firebase, axios, polyfill) {
	'use strict';

	var serverUrl = 'http://localhost:4000';
	var fbUrl = 'https://pruvit.firebaseio.com';
	var tokenName = 'matter';

	if (typeof Firebase == 'undefined') {
		console.error('Firebase is required to use Matter');
	}
	if (typeof axios == 'undefined') {
		console.error('Axios is required to use Matter');
	} else {
		// Add a request interceptor
		axios.interceptors.request.use(function (config) {
			// Do something before request is sent
			//TODO: Handle there already being headers
			if (localStorage.getItem(tokenName)) {
				config.headers = { 'Authorization': 'Bearer ' + localStorage.getItem(tokenName) };
				console.log('Set auth header through interceptor');
			}
			return config;
		}, function (error) {
			// Do something with request error
			return polyfill.reject(error);
		});
	}

	var matter_library__Matter = {
		signup: function signup(signupData) {
			return axios.post(serverUrl + '/signup', signupData).then(function (response) {
				console.log(response);
			})['catch'](function (response) {
				console.log(response);
			});
		},

		login: function login(loginData) {
			if (!loginData || !loginData.password || !loginData.username) {
				throw new Error('Username/Email and Password are required to login');
			}
			return axios.put(serverUrl + '/login', loginData).then(function (response) {
				//TODO: Save token locally
				console.log(response);
				if (localStorage.getItem(tokenName) === null) {
					window.localStorage.setItem(tokenName, response.data.token);
					console.log('token set to storage:', window.localStorage.getItem(tokenName));
				}
				return response.data;
			})['catch'](function (response) {
				console.log(response);
			});
		},

		logout: function logout() {
			axios.put(serverUrl + '/logout', {}).then(function (response) {
				console.log(response);
			})['catch'](function (response) {
				console.log(response);
			});
		},

		getCurrentUser: function getCurrentUser() {
			//TODO: Check Current user variable
			axios.get(serverUrl + '/user', {}).then(function (response) {
				//TODO: Save user information locally
				console.log(response);
			})['catch'](function (response) {
				console.log(response);
			});
		},

		getAuthToken: function getAuthToken() {
			//TODO: Load token from storage
			if (typeof window.localStorage.getItem(tokenName) == 'undefined') {
				return null;
			}
			return localStorage.getItem(tokenName);
		},

		getApps: function getApps() {
			//TODO:Set authentication header
			return axios.get(serverUrl + '/apps', {}).then(function (response) {
				console.log('Apps loaded:', response.data);
				return response.data;
			})['catch'](function (errRes) {
				console.log(errRes);
				return errRes;
			});
		}

	};

	var matter_library = matter_library__Matter;

	return matter_library;
});
//# sourceMappingURL=matter-library.js.map