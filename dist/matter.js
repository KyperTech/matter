var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('underscore'), require('superagent')) : typeof define === 'function' && define.amd ? define(['underscore', 'superagent'], factory) : global.Matter = factory(global._, global.superagent);
})(this, function (_, superagent) {
	'use strict';

	_ = 'default' in _ ? _['default'] : _;
	superagent = 'default' in superagent ? superagent['default'] : superagent;

	var config = {
		serverUrl: 'http://tessellate.elasticbeanstalk.com',
		tokenName: 'tessellate'
	};

	var logger = {
		log: function log() {
			var msgStr = buildMessageStr(logData);
			if (config.envName == 'local') {
				console.log(logData);
			} else {
				console.log(msgStr);
			}
		},
		info: function info() {
			var msgStr = buildMessageStr(logData);
			if (config.envName == 'local') {
				console.info(logData);
			} else {
				console.info(msgStr);
			}
		},
		warn: function warn() {
			var msgStr = buildMessageStr(logData);
			if (config.envName == 'local') {
				console.warn(logData);
			} else {
				console.warn(msgStr);
			}
		},
		debug: function debug() {
			var msgStr = buildMessageStr(logData);
			if (config.envName == 'local') {
				console.log(logData);
			} else {
				console.log(msgStr);
			}
		},
		error: function error() {
			var msgStr = buildMessageStr(logData);
			if (config.envName == 'local') {
				console.error(logData);
			} else {
				// console.error(msgStr);
				//TODO: Log to external logger
			}
		}
	};

	function buildMessageStr(logData) {
		var msg = '';
		//TODO: Attach time stamp
		if (_.isObject(logData)) {
			if (_.has(logData, 'func')) {
				if (_.has(logData, 'obj')) {
					msg += '[' + logData.obj + '.' + logData.func + '()] ';
				} else if (_.has(logData, 'file')) {
					msg += '[' + logData.file + ' > ' + logData.func + '()] ';
				} else {
					msg += '[' + logData.func + '()] ';
				}
			}
			//Print each key and its value other than obj and func
			_.each(_.omit(_.keys(logData), 'obj', 'func'), function (key, ind, list) {
				if (_.isString(logData[key])) {
					msg += key + ': ' + logData[key] + ', ';
				} else {
					//Print objects differently
					msg += key + ': ' + logData[key] + ', ';
				}
				if (ind != list.length - 1) {
					msg += '\n';
				}
			});
		} else if (_.isString(logData)) {
			msg = logData;
		}
		return msg;
	}

	var data = {};
	// TODO: Store objects within local storage.
	var storage = Object.defineProperties({
		/**
   * @description
   * Safley sets item to session storage.
   *
   * @param {String} itemName The items name
   * @param {String} itemValue The items value
   *
   */
		item: function item(itemName, itemValue) {
			//TODO: Handle itemValue being an object instead of a string
			data[itemName] = itemValue;
			if (this.localExists) {
				window.sessionStorage.setItem(itemName, itemValue);
			}
		},
		/**
   * @description
   * Safley sets item to session storage. Alias: item()
   *
   * @param {String} itemName The items name
   * @param {String} itemValue The items value
   *
   */
		setItem: function setItem(itemName, itemValue) {
			//TODO: Handle itemValue being an object instead of a string
			// this.item(itemName) = itemValue;
		},

		/**
   * @description
   * Safley gets an item from session storage. Alias: item()
   *
   * @param {String} itemName The items name
   *
   * @return {String}
   *
   */
		getItem: function getItem(itemName) {
			if (data[itemName]) {
				return data[itemName];
			} else if (this.localExists) {
				return window.sessionStorage.getItem(itemName);
			} else {
				return null;
			}
		},
		/**
   * @description
   * Safley removes item from session storage.
   *
   * @param {String} itemName - The items name
   *
   */
		removeItem: function removeItem(itemName) {
			//TODO: Only remove used items
			if (data[itemName]) {
				data[itemName] = null;
			}
			if (this.localExists) {
				try {
					//Clear session storage
					window.sessionStorage.removeItem(itemName);
				} catch (err) {
					logger.error({ description: 'Error removing item from session storage', error: err, obj: 'storage', func: 'removeItem' });
				}
			}
		},
		/**
   * @description
   * Safley removes item from session storage.
   *
   * @param {String} itemName the items name
   * @param {String} itemValue the items value
   *
   */
		clear: function clear() {
			//TODO: Only remove used items
			data = {};
			if (this.localExists) {
				try {
					//Clear session storage
					window.sessionStorage.clear();
				} catch (err) {
					logger.warn('Session storage could not be cleared.', err);
				}
			}
		}

	}, {
		localExists: {
			get: function get() {
				var testKey = 'test';
				if (typeof window != 'undefined' && typeof window.sessionStorage != 'undefined') {
					try {
						window.sessionStorage.setItem(testKey, '1');
						window.sessionStorage.removeItem(testKey);
						return true;
					} catch (err) {
						logger.error({ description: 'Error saving to session storage', error: err, obj: 'storage', func: 'localExists' });
						return false;
					}
				} else {
					return false;
				}
			},
			configurable: true,
			enumerable: true
		}
	});

	var token = (function () {
		function token() {
			_classCallCheck(this, token);
		}

		_createClass(token, [{
			key: 'string',

			//TODO: Decode token
			value: function string(tokenStr) {
				console.log('Token was set', tokenStr);
				return storage.setItem(config.tokenName, tokenStr);
			}
		}, {
			key: 'save',
			value: function save(tokenStr) {
				this.string = tokenStr;
				storage.setItem(config.tokenName, tokenStr);
			}
		}, {
			key: 'delete',
			value: function _delete() {
				storage.removeItem(config.tokenName);
				console.log('Token was removed');
			}
		}, {
			key: 'string',
			get: function get() {
				return storage.getItem(config.tokenName);
			}
		}, {
			key: 'data',
			get: function get() {}
		}]);

		return token;
	})();

	var request = {
		get: function get(endpoint, queryData) {
			var req = superagent.get(endpoint);
			if (queryData) {
				req.query(queryData);
			}
			req = addAuthHeader(req);
			return handleResponse(req);
		},
		post: function post(endpoint, data) {
			var req = superagent.post(endpoint).send(data);
			req = addAuthHeader(req);
			return handleResponse(req);
		},
		put: function put(endpoint, data) {
			var req = superagent.put(endpoint).send(data);
			req = addAuthHeader(req);
			return handleResponse(req);
		},
		del: function del(endpoint, data) {
			var req = superagent.put(endpoint).send(data);
			req = addAuthHeader(req);
			return handleResponse(req);
		}

	};

	function handleResponse(req) {
		return new Promise(function (resolve, reject) {
			req.end(function (err, res) {
				if (!err) {
					// console.log('Response:', res);
					return resolve(res.body);
				} else {
					if (err.status == 401) {
						logger.warn('Unauthorized. You must be signed into make this request.');
					}
					return reject(err);
				}
			});
		});
	}
	function addAuthHeader(req) {
		if (storage.getItem(config.tokenName)) {
			req = req.set('Authorization', 'Bearer ' + storage.getItem(config.tokenName));
			logger.info({ message: 'Set auth header', func: addAuthHeader, file: request });
		}
		return req;
	}

	var user = undefined;
	var endpoints = undefined;

	var Matter = (function () {
		/* Constructor
   * @param {string} appName Name of application
   */

		function Matter(appName, opts) {
			_classCallCheck(this, Matter);

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

		_createClass(Matter, [{
			key: 'signup',

			/* Signup
    *
    */
			value: function signup(signupData) {
				return request.post(this.endpoint + '/signup', signupData).then(function (response) {
					console.log(response);
				})['catch'](function (errRes) {
					console.error('[signup()] Error signing up:', errRes);
					return Promise.reject(errRes);
				});
			}

			/** Login
    *
    */
		}, {
			key: 'login',
			value: function login(loginData) {
				if (!loginData || !loginData.password || !loginData.username) {
					console.error('Username/Email and Password are required to login');
					return Promise.reject({ message: 'Username/Email and Password are required to login' });
				}
				return request.put(this.endpoint + '/login', loginData).then(function (response) {
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
				})['catch'](function (errRes) {
					if (errRes.status == 409 || errRes.status == 400) {
						errRes = errRes.response.text;
					}
					return Promise.reject(errRes);
				});
			}

			/** Logout
    */
		}, {
			key: 'logout',
			value: function logout() {
				return request.put(this.endpoint + '/logout').then(function (response) {
					console.log('[Matter.logout()] Logout successful: ', response);
					token['delete']();
					return response;
				})['catch'](function (errRes) {
					console.error('[Matter.logout()] Error logging out: ', errRes);
					token['delete']();
					return Promise.reject(errRes);
				});
			}
		}, {
			key: 'getCurrentUser',
			value: function getCurrentUser() {
				//TODO: Check Current user variable
				return request.get(this.endpoint + '/user', {}).then(function (response) {
					//TODO: Save user information locally
					console.log('[getCurrentUser()] Current User:', response.data);
					user = response.data;
					return user;
				})['catch'](function (errRes) {
					console.error('[getCurrentUser()] Error getting current user: ', errRes);
					return Promise.reject(errRes);
				});
			}
		}, {
			key: 'getAuthToken',
			value: function getAuthToken() {
				return token.string;
			}
		}, {
			key: 'endpoint',
			get: function get() {
				var serverUrl = config.serverUrl;
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
		}]);

		return Matter;
	})();

	;

	return Matter;
});
//# sourceMappingURL=matter.js.map