var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('axios')) : typeof define === 'function' && define.amd ? define(['axios'], factory) : global.Matter = factory(global.axios);
})(this, function (axios) {
	'use strict';

	var serverUrl = 'http://hypercube.elasticbeanstalk.com';
	var tokenName = 'matter';

	var matter_library__user = undefined;
	var matter_library__token = undefined;

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
			return Promise.reject(error);
		});
	}

	var Matter = (function () {
		function Matter() {
			_classCallCheck(this, Matter);
		}

		_createClass(Matter, [{
			key: 'signup',
			value: function signup(signupData) {
				return axios.post(serverUrl + '/signup', signupData).then(function (response) {
					console.log(response);
				})['catch'](function (errRes) {
					console.error('[signup()] Error signing up:', errRes);
					return Promise.reject(errRes);
				});
			}
		}, {
			key: 'login',
			value: function login(loginData) {
				if (!loginData || !loginData.password || !loginData.username) {
					console.error('Username/Email and Password are required to login');
				}
				return axios.put(serverUrl + '/login', loginData).then(function (response) {
					//TODO: Save token locally
					console.log(response);
					matter_library__token = response.data.token;
					if (window.localStorage.getItem(tokenName) === null) {
						window.localStorage.setItem(tokenName, response.data.token);
						console.log('token set to storage:', window.localStorage.getItem(tokenName));
					}
					return response.data;
				})['catch'](function (errRes) {
					console.error('[login()] Error logging in: ', errRes);
					return Promise.reject(errRes);
				});
			}
		}, {
			key: 'logout',
			value: function logout() {
				return axios.put(serverUrl + '/logout', {}).then(function (response) {
					console.log('[logout()] Logout successful: ', response);
					if (typeof window != 'undefined' && typeof window.localStorage.getItem(tokenName) != null) {
						window.localStorage.setItem(tokenName, null);
					}
					return response.body;
				})['catch'](function (errRes) {
					console.error('[logout()] Error logging out: ', errRes);
					return Promise.reject(errRes);
				});
			}
		}, {
			key: 'getCurrentUser',
			value: function getCurrentUser() {
				//TODO: Check Current user variable
				return axios.get(serverUrl + '/user', {}).then(function (response) {
					//TODO: Save user information locally
					console.log('[getCurrentUser()] Current User:', response.data);
					matter_library__user = response.data;
					return matter_library__user;
				})['catch'](function (errRes) {
					console.error('[getCurrentUser()] Error getting current user: ', errRes);
					return Promise.reject(errRes);
				});
			}
		}, {
			key: 'getAuthToken',
			value: function getAuthToken() {
				//TODO: Load token from storage
				if (typeof window == 'undefined' || typeof window.localStorage.getItem(tokenName) == 'undefined') {
					return null;
				}
				return window.localStorage.getItem(tokenName);
			}
		}]);

		return Matter;
	})();

	;
	var matter = new Matter();
	var matter_library = matter;

	return matter_library;
});
//# sourceMappingURL=matter-library.js.map