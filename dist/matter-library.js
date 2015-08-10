(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('firebase'), require('axios')) : typeof define === 'function' && define.amd ? define(['firebase', 'axios'], factory) : global.Matter = factory(global.Firebase, global.axios);
})(this, function (Firebase, axios) {
	'use strict';

	var serverUrl = 'http://localhost:4000';
	var fbUrl = 'https://pruvit.firebaseio.com';

	if (typeof Firebase == 'undefined') {
		console.error('Firebase is required to use Matter');
	}
	if (typeof axios == 'undefined') {
		console.error('Axios is required to use Matter');
	}

	//TODO: Set axios interceptor
	//headers: {
	//'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InNjb3R0Iiwicm9sZSI6ImFkbWluIiwidXNlcklkIjoiNTU4YWM1Mzk5MTc1YTQ4OTBhYWIyNWEwIiwic2Vzc2lvbklkIjoiNTVjOGI2ZDg4ODM1MDg0ZjgyNDM2NjQxIiwiaWF0IjoxNDM5MjE3MzY4fQ.JlB7DxEbWECF0Ip5qoeIPnM99sRZdwjQmfnrJ2VrJns'
	//}
	var matter_library__Matter = {
		signup: function signup(signupData) {
			axios.post(serverUrl + '/signup', {}).then(function (response) {
				console.log(response);
			})['catch'](function (response) {
				console.log(response);
			});
		},

		login: function login(loginData) {
			if (!loginData || !loginData.password || !loginData.username) {
				throw new Error('Username/Email and Password are required to login');
			}
			return axios.put(serverUrl + '/login', loginData, {}).then(function (response) {
				//TODO: Save token locally
				console.log(response);
				if (localStorage.getItem('matter') === null) {
					window.localStorage.setItem('matter', response.data.token);
					console.log('token set to storage:', window.localStorage.getItem('matter'));
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

		},

		getApps: function getApps() {
			//TODO:Set authentication header
			axios.get(serverUrl + '/apps', {}).then(function (response) {
				console.log(response);
			})['catch'](function (response) {
				console.log(response);
			});
		}

	};

	var matter_library = matter_library__Matter;

	return matter_library;
});
//# sourceMappingURL=matter-library.js.map