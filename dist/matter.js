var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('lodash'), require('superagent'), require('jwt-decode')) : typeof define === 'function' && define.amd ? define(['lodash', 'superagent', 'jwt-decode'], factory) : global.Matter = factory(global._, global.superagent, global.jwtDecode);
})(this, function (_, superagent, jwtDecode) {
	'use strict';

	var ___default = 'default' in _ ? _['default'] : _;
	superagent = 'default' in superagent ? superagent['default'] : superagent;
	jwtDecode = 'default' in jwtDecode ? jwtDecode['default'] : jwtDecode;

	var defaultConfig = {
		envs: {
			local: {
				serverUrl: 'http://localhost:4000',
				logLevel: 'trace'
			},
			dev: {
				serverUrl: 'http://tessellate-stage.elasticbeanstalk.com',
				logLevel: 'debug'
			},
			stage: {
				serverUrl: 'http://tessellate-stage.elasticbeanstalk.com',
				logLevel: 'info'
			},
			prod: {
				serverUrl: 'http://tessellate.elasticbeanstalk.com',
				logLevel: 'warn'
			}
		},
		tokenName: 'tessellate',
		tokenDataName: 'tessellate-tokenData',
		tokenUserDataName: 'tessellate-currentUser'
	};
	var instance = null;
	var envName = 'prod';

	var Config = (function () {
		function Config() {
			_classCallCheck(this, Config);

			if (!instance) {
				instance = this;
			}
			// console.log({description: 'Config object created.', config: merge(this, defaultConfig), func: 'constructor', obj: 'Config'});
			return _.merge(instance, defaultConfig);
		}

		_createClass(Config, [{
			key: 'applySettings',
			value: function applySettings(settings) {
				_.merge(instance, settings);
			}
		}, {
			key: 'serverUrl',
			get: function get() {
				var url = defaultConfig.envs[envName].serverUrl;
				if (typeof window !== 'undefined' && _.has(window, 'location') && window.location.host === url) {
					url = '';
				}
				return url;
			}
		}, {
			key: 'logLevel',
			get: function get() {
				return defaultConfig.envs[envName].logLevel;
			}
		}, {
			key: 'envName',
			set: function set(newEnv) {
				envName = newEnv;
				// this.envName = newEnv;
				// console.log('Environment name set:', envName);
			}
		}, {
			key: 'env',
			get: function get() {
				return defaultConfig.envs[envName];
			}
		}]);

		return Config;
	})();

	var config = new Config();

	//Set default log level to debug
	var logLevel = 'debug';
	//Set log level from config

	var logger = {
		log: function log(logData) {
			var msgArgs = buildMessageArgs(logData);
			if (config.envName == 'production') {
				runConsoleMethod('log', msgArgs);
			} else {
				runConsoleMethod('log', msgArgs);
			}
		},
		info: function info(logData) {
			var msgArgs = buildMessageArgs(logData);
			if (config.envName == 'production') {
				runConsoleMethod('info', msgArgs);
			} else {
				runConsoleMethod('info', msgArgs);
			}
		},
		warn: function warn(logData) {
			var msgArgs = buildMessageArgs(logData);
			if (config.envName == 'production') {
				runConsoleMethod('warn', msgArgs);
			} else {
				runConsoleMethod('warn', msgArgs);
			}
		},
		debug: function debug(logData) {
			var msgArgs = buildMessageArgs(logData);
			if (config.envName == 'production') {
				// runConsoleMethod('debug', msgArgs);
				//Do not display console debugs in production
			} else {
					runConsoleMethod('debug', msgArgs);
				}
		},
		error: function error(logData) {
			var msgArgs = buildMessageArgs(logData);
			if (config.envName == 'production') {
				//TODO: Log to external logger
				runConsoleMethod('error', msgArgs);
			} else {
				runConsoleMethod('error', msgArgs);
			}
		}
	};

	function runConsoleMethod(methodName, methodData) {
		//Safley run console methods or use console log
		if (methodName && console[methodName]) {
			return console[methodName].apply(console, methodData);
		} else {
			return console.log.apply(console, methodData);
		}
	}
	function buildMessageArgs(logData) {
		var msgStr = '';
		var msgObj = {};
		//TODO: Attach time stamp
		//Attach location information to the beginning of message
		if (___default.isObject(logData)) {
			if (logLevel == 'debug') {
				if (___default.has(logData, 'func')) {
					if (___default.has(logData, 'obj')) {
						//Object and function provided
						msgStr += '[' + logData.obj + '.' + logData.func + '()]\n ';
					} else if (___default.has(logData, 'file')) {
						msgStr += '[' + logData.file + ' > ' + logData.func + '()]\n ';
					} else {
						msgStr += '[' + logData.func + '()]\n ';
					}
				}
			}
			//Print each key and its value other than obj and func
			___default.each(___default.omit(___default.keys(logData)), function (key) {
				if (key != 'func' && key != 'obj') {
					if (key == 'description' || key == 'message') {
						msgStr += logData[key];
					} else if (___default.isString(logData[key])) {
						// msgStr += key + ': ' + logData[key] + ', ';
						msgObj[key] = logData[key];
					} else {
						//Print objects differently
						// msgStr += key + ': ' + logData[key] + ', ';
						msgObj[key] = logData[key];
					}
				}
			});
			msgStr += '\n';
		} else if (___default.isString(logData)) {
			msgStr = logData;
		}
		var msg = [msgStr, msgObj];

		return msg;
	}

	var domUtil = {
		/**
   * @description
   * Appends given css source to DOM head.
   *
   * @param {String} src - url src for css to append
   *
   */
		loadCss: function loadCss(src) {
			if (typeof document == 'undefined') {
				logger.error({ description: 'Document does not exsist to load assets into.', func: 'loadCss', obj: 'dom' });
				throw new Error('Document object is required to load assets.');
			} else {
				var css = document.createElement('link');
				css.rel = 'stylesheet';
				css.type = 'text/css';
				css.href = src;
				document.getElementsByTagName('head')[0].insertBefore(css, document.getElementsByTagName('head')[0].firstChild);
				logger.log({ description: 'CSS was loaded into document.', element: css, func: 'loadCss', obj: 'dom' });
				return css; //Return link element
			}
		},
		/**
   * @description
   * Appends given javascript source to DOM head.
   *
   * @param {String} src - url src for javascript to append
   *
   */
		loadJs: function loadJs(src) {
			if (typeof window == 'undefined' || !___default.has(window, 'document')) {
				logger.error({ description: 'Document does not exsist to load assets into.', func: 'loadCss', obj: 'dom' });
				throw new Error('Document object is required to load assets.');
			} else {
				var js = window.document.createElement('script');
				js.src = src;
				js.type = 'text/javascript';
				window.document.getElementsByTagName('head')[0].appendChild(js);
				logger.log({ description: 'JS was loaded into document.', element: js, func: 'loadCss', obj: 'dom' });
				return js; //Return script element
			}
		},
		/**
   * @description
   * Appends given javascript source to DOM head.
   *
   * @param {String} src - url src for javascript to append
   *
   */
		asyncLoadJs: function asyncLoadJs(src) {
			if (typeof window == 'undefined' || !___default.has(window, 'document')) {
				logger.error({ description: 'Document does not exsist to load assets into.', func: 'loadCss', obj: 'dom' });
				throw new Error('Document object is required to load assets.');
			} else {
				var js = window.document.createElement('script');
				js.src = src;
				js.type = 'text/javascript';
				window.document.getElementsByTagName('head')[0].appendChild(js);
				logger.log({ description: 'JS was loaded into document.', element: js, func: 'loadCss', obj: 'dom' });
				return new Promise(function (resolve) {
					window.setTimeout(resolve, 30);
				});
			}
		}
	};

	var data = {};

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
			return this.setItem(itemName, itemValue);
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
			data[itemName] = itemValue;
			if (this.localExists) {
				//Convert object to string
				if (___default.isObject(itemValue)) {
					itemValue = JSON.stringify(itemValue);
				}
				window.sessionStorage.setItem(itemName, itemValue);
			}
		},
		/**
   * @description
   * Safley gets an item from session storage. Alias: item()
   *
   * @param {String} itemName The items name
   * @return {String}
   *
   */
		getItem: function getItem(itemName) {
			if (data[itemName]) {
				return data[itemName];
			} else if (this.localExists) {
				var itemStr = window.sessionStorage.getItem(itemName);
				//Check that str is not null before parsing
				if (itemStr) {
					var isObj = false;
					var itemObj = null;
					//Try parsing to object
					try {
						itemObj = JSON.parse(itemStr);
						isObj = true;
					} catch (err) {
						// logger.log({message: 'String could not be parsed.', error: err, func: 'getItem', obj: 'storage'});
						//Parsing failed, this must just be a string
						isObj = false;
					}
					if (isObj) {
						return itemObj;
					}
				}
				return itemStr;
			} else {
				return null;
			}
		},
		/**
   * @description Safley removes item from session storage.
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
					logger.warn({
						description: 'Session storage could not be cleared.', error: err
					});
				}
			}
		}
	}, {
		localExists: {
			/** Gets whether or not local storage exists.
    * @param {String} itemName The items name
    * @param {String} itemValue The items value
    * @return {Boolean}
    *
    */

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

	var token = Object.defineProperties({
		/** Save token data
   */
		save: function save(tokenStr) {
			this.string = tokenStr;
		},
		/** Delete token data
   */
		'delete': function _delete() {
			//Remove string token
			storage.removeItem(config.tokenName);
			//Remove user data
			storage.removeItem(config.tokenDataName);
			logger.log({
				description: 'Token was removed.',
				func: 'delete', obj: 'token'
			});
		}
	}, {
		string: {
			/** Get string value of token
    * @return {String}
    * @example
    * console.log('String value of current token', token.string);
    */

			get: function get() {
				return storage.getItem(config.tokenName);
			},

			/** Set token value as a string
    */
			set: function set(tokenData) {
				var tokenStr = undefined;
				//Handle object being passed
				if (!___default.isString(tokenData)) {
					//Token is included in object
					logger.log({
						description: 'Token data is not string.',
						token: tokenData, func: 'string', obj: 'token'
					});
					if (___default.isObject(tokenData) && ___default.has(tokenData, 'token')) {
						tokenStr = tokenData.token;
					} else {
						//Input is either not an string or object that contains nessesary info
						logger.error({
							description: 'Invalid value set to token.',
							token: tokenData, func: 'string', obj: 'token'
						});
						return;
					}
				} else {
					tokenStr = tokenData;
				}
				logger.log({
					description: 'Token was set.', token: tokenData,
					tokenStr: tokenStr, func: 'string', obj: 'token'
				});
				storage.setItem(config.tokenName, tokenStr);
				this.data = jwtDecode(tokenStr);
			},
			configurable: true,
			enumerable: true
		},
		data: {
			/** Get decoded data within token (unencrypted data only)
    * @return {Object}
    * @example
    * console.log('Data of current token:', token.data);
    */

			get: function get() {
				if (storage.getItem(config.tokenDataName)) {
					return storage.getItem(config.tokenDataName);
				} else {
					return decodeToken(this.string);
				}
			},

			/** Set token data
    */
			set: function set(tokenData) {
				if (___default.isString(tokenData)) {
					var tokenStr = tokenData;
					tokenData = decodeToken(tokenStr);
					logger.info({
						description: 'Token data was set as string. Decoding token.',
						token: tokenStr, tokenData: tokenData, func: 'data', obj: 'token'
					});
				} else {
					logger.log({
						description: 'Token data was set.', data: tokenData,
						func: 'data', obj: 'token'
					});
					storage.setItem(config.tokenDataName, tokenData);
				}
			},
			configurable: true,
			enumerable: true
		}
	});

	/** Safley decode a JWT string
  * @private
  * @return {Object}
  */
	function decodeToken(tokenStr) {
		var tokenData = undefined;
		if (tokenStr && tokenStr != '') {
			try {
				tokenData = jwtDecode(tokenStr);
			} catch (err) {
				logger.error({
					description: 'Error decoding token.', data: tokenData,
					error: err, func: 'decodeToken', file: 'token'
				});
				throw new Error('Invalid token string.');
			}
		}
		return tokenData;
	}

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
			var req = superagent.put(endpoint, data);
			req = addAuthHeader(req);
			return handleResponse(req);
		},
		del: function del(endpoint, data) {
			var req = superagent.put(endpoint, data);
			req = addAuthHeader(req);
			return handleResponse(req);
		}
	};

	function handleResponse(req) {
		return new Promise(function (resolve, reject) {
			req.end(function (err, res) {
				if (!err) {
					// logger.log({description: 'Response:', response:res, func:'handleResponse', file: 'request'});
					return resolve(res.body);
				} else {
					if (err.status == 401) {
						logger.warn({ description: 'Unauthorized. You must be signed into make this request.', func: 'handleResponse' });
					}
					if (err && err.response) {
						return reject(err.response.text);
					}
					logger.warn({ description: 'Unauthorized. You must be signed into make this request.', error: err, func: 'handleResponse' });
					return reject(err);
				}
			});
		});
	}
	function addAuthHeader(req) {
		if (token.string) {
			req = req.set('Authorization', 'Bearer ' + token.string);
			// console.info({message: 'Set auth header', func: 'addAuthHeader', file: 'request'});
		}
		return req;
	}

	// import hello from 'hellojs'; //Modifies objects to have id parameter?
	// import hello from 'hellojs'; //After es version of module is created
	//Private object containing clientIds
	var clientIds = {};

	var ProviderAuth = (function () {
		function ProviderAuth(actionData) {
			_classCallCheck(this, ProviderAuth);

			this.app = actionData.app ? actionData.app : null;
			this.redirectUri = actionData.redirectUri ? actionData.redirectUri : 'redirect.html';
			this.provider = actionData.provider ? actionData.provider : null;
		}

		/** Load hellojs library script into DOM
   */

		_createClass(ProviderAuth, [{
			key: 'loadHello',
			value: function loadHello() {
				//Load hellojs script
				//TODO: Replace this with es6ified version
				if (typeof window != 'undefined' && !window.hello) {
					return domUtil.asyncLoadJs('https://s3.amazonaws.com/kyper-cdn/js/hello.js');
				} else {
					return Promise.reject();
				}
			}
		}, {
			key: 'helloLoginListener',
			value: function helloLoginListener() {
				//Login Listener
				window.hello.on('auth.login', function (auth) {
					logger.info({ description: 'User logged in to google.', func: 'loadHello', obj: 'Google' });
					// Call user information, for the given network
					window.hello(auth.network).api('/me').then(function (r) {
						// Inject it into the container
						//TODO:Send account informaiton to server
						var userData = r;
						userData.provider = auth.network;
						//Login or Signup endpoint
						return request.post(this.endpoint + '/provider', userData).then(function (response) {
							logger.log({ description: 'Provider request successful.', response: response, func: 'signup', obj: 'GoogleUtil' });
							return response;
						})['catch'](function (errRes) {
							logger.error({ description: 'Error requesting login.', error: errRes, func: 'signup', obj: 'Matter' });
							return Promise.reject(errRes);
						});
					});
				});
			}

			/** Initialize hellojs library and request app providers
    */
		}, {
			key: 'initHello',
			value: function initHello() {
				var _this = this;

				return this.loadHello().then(function () {
					return request.get(_this.app.endpoint + '/providers').then(function (response) {
						logger.log({
							description: 'Provider request successful.', response: response,
							func: 'initHello', obj: 'ProviderAuth'
						});
						var provider = response[_this.provider];
						if (!provider) {
							logger.error({
								description: 'Provider is not setup.\n' + 'Visit build.kyper.io to enter your client id for ' + _this.provider,
								provider: _this.provider, clientIds: clientIds,
								func: 'login', obj: 'ProviderAuth'
							});
							return Promise.reject({ message: 'Provider is not setup.' });
						}
						logger.log({
							description: 'Providers config built', providersConfig: response,
							func: 'initHello', obj: 'ProviderAuth'
						});
						return window.hello.init(response, { redirect_uri: 'redirect.html' });
					}, function (errRes) {
						logger.error({
							description: 'Error loading hellojs.', error: errRes,
							func: 'initHello', obj: 'ProviderAuth'
						});
						return Promise.reject({ message: 'Error requesting application third party providers.' });
					})['catch'](function (errRes) {
						logger.error({
							description: 'Error loading hellojs.', error: errRes, func: 'initHello', obj: 'ProviderAuth'
						});
						return Promise.reject({ message: 'Error loading third party login capability.' });
					});
				});
			}

			/** External provider login
    * @example
    * //Login to account that was started through external account signup (Google, Facebook, Github)
    * ProviderAuth('google').login().then(function(loginRes){
    * 		console.log('Successful login:', loginRes)
    * }, function(err){
    * 		console.error('Error with provider login:', err);
    * });
    */
		}, {
			key: 'login',
			value: function login() {
				var _this2 = this;

				return this.initHello().then(function () {
					return window.hello.login(_this2.provider);
				}, function (err) {
					logger.error({ description: 'Error initalizing hellojs.', error: err, func: 'login', obj: 'Matter' });
					return Promise.reject({ message: 'Error with third party login.' });
				});
			}

			/** Signup using external provider account (Google, Facebook, Github)
     * @example
     * //Signup using external account (Google, Facebook, Github)
     * ProviderAuth('google').signup().then(function(signupRes){
     * 		console.log('Successful signup:', signupRes)
     * }, function(err){
     * 		console.error('Error with provider signup:', err);
     * });
    */
		}, {
			key: 'signup',
			value: function signup() {
				//TODO: send info to server
				return this.login();
			}
		}]);

		return ProviderAuth;
	})();

	var Matter = (function () {
		/** Constructor
   * @param {String} appName Name of application
   */

		function Matter(appName, opts) {
			_classCallCheck(this, Matter);

			if (!appName) {
				logger.error({
					description: 'Application name requires to use Matter.',
					func: 'constructor', obj: 'Matter'
				});
				throw new Error('Application name is required to use Matter');
			} else {
				this.name = appName;
			}
			if (opts) {
				this.options = opts;
			}
			this.config = config;
		}

		/** Endpoint generation that handles default/provided settings and environment
   * @return {String} endpoint - endpoint for tessellate application
   */

		_createClass(Matter, [{
			key: 'signup',

			/** Signup a new user
    * @param {Object} signupData - Object containing data to use while signing up to application.
    * @param {String} signupData.username - Username of new user (error will be returned if username is taken)
    * @param {String} signupData.email - Email of new user (error will be returned if email is already used)
    * @param {String} signupData.password - Password to be used with account (will be encrypted).
    * @return {Promise}
    * @example
    * //Signup a new user
    * var signupData = {username: 'testuser1', email:'test@email.com', password: 'testpassword'};
    * matter.signup(signupData).then(function(signupRes){
    *  console.log('New user signed up successfully. New account: ', signupRes.account);
    * }, function(err){
    *  console.error('Error signing up:', err);
    * });
    */
			value: function signup(signupData) {
				logger.log({ description: 'Signup called.', signupData: signupData, func: 'signup', obj: 'Matter' });
				if (!signupData || !___default.isObject(signupData) && !___default.isString(signupData)) {
					logger.error({ description: 'Signup information is required to signup.', func: 'signup', obj: 'Matter' });
					return Promise.reject({ message: 'Login data is required to login.' });
				}
				if (___default.isObject(signupData)) {
					return request.post(this.endpoint + '/signup', signupData).then(function (response) {
						logger.log({ description: 'Account request successful.', signupData: signupData, response: response, func: 'signup', obj: 'Matter' });
						if (___default.has(response, 'account')) {
							return response.account;
						} else {
							logger.warn({ description: 'Account was not contained in signup response.', signupData: signupData, response: response, func: 'signup', obj: 'Matter' });
							return response;
						}
					})['catch'](function (errRes) {
						logger.error({ description: 'Error requesting signup.', signupData: signupData, error: errRes, func: 'signup', obj: 'Matter' });
						return Promise.reject(errRes);
					});
				} else {
					//Handle 3rd Party signups
					var auth = new ProviderAuth({ provider: signupData, app: this });
					return auth.signup(signupData).then(function (res) {
						logger.info({ description: 'Provider signup successful.', provider: signupData, res: res, func: 'signup', obj: 'Matter' });
						return Promise.resolve(res);
					});
				}
			}

			/** Login by username/email or external provider
    * @param {Object} loginData - Object containing data to use while logging in to application.
    * @param {String} loginData.username - Username of user to login as
    * @param {String} loginData.email - Email of new user (Optional instead of username)
    * @param {String} loginData.password - Password to be used with account (will be encrypted).
    * @return {Promise}
    * @example
    * //Login as 'testuser1'
    * var loginData = {username: 'testuser1', password: 'testpassword'};
    * matter.login(loginData).then(function(loginRes){
    *  console.log('New user logged in succesfully. Account: ', loginRes.account);
    * }, function(err){
    *  console.error('Error logging in:', err);
    * });
    */
		}, {
			key: 'login',
			value: function login(loginData) {
				var _this3 = this;

				if (!loginData || !___default.isObject(loginData) && !___default.isString(loginData)) {
					logger.error({ description: 'Username/Email and Password are required to login', func: 'login', obj: 'Matter' });
					return Promise.reject({ message: 'Login data is required to login.' });
				}
				if (___default.isObject(loginData)) {
					if (!loginData.password || !loginData.username) {
						return Promise.reject({ message: 'Username/Email and Password are required to login' });
					}
					//Username/Email Login
					return request.put(this.endpoint + '/login', loginData).then(function (response) {
						if (___default.has(response, 'data') && ___default.has(response.data, 'status') && response.data.status == 409) {
							logger.warn({ description: 'Account not found.', response: response, func: 'login', obj: 'Matter' });
							return Promise.reject(response.data);
						} else {
							logger.log({ description: 'Successful login.', response: response, func: 'login', obj: 'Matter' });
							if (___default.has(response, 'token')) {
								_this3.token.string = response.token;
							}
							var userAccount = {};
							//Get user data either directly from response or from token
							if (___default.has(response, 'account')) {
								userAccount = response.account;
							} else if (_this3.token.data) {
								//TODO: Handle more Auth Provider tokens
								//Check for AuthRocket style token
								logger.log({
									description: 'User data available from token.',
									tokenData: _this3.token.data, type: typeof _this3.token.data,
									func: 'login', obj: 'Matter'
								});
								if (_this3.token.data.un) {
									logger.log({
										description: 'Token is AuthRocket format.',
										func: 'login', obj: 'Matter'
									});
									userAccount = {
										username: _this3.token.data.un,
										name: _this3.token.data.n || null,
										authrocketId: _this3.token.data.uid || null
									};
								} else {
									logger.log({
										description: 'Token is default format.',
										func: 'login', obj: 'Matter'
									});
									//Default token style
									userAccount = _this3.token.data;
								}
							} else {
								logger.error({
									description: 'User data not available from response or token.',
									func: 'login', obj: 'Matter'
								});
								userAccount = { token: _this3.token.string };
							}
							//Set userdata to local storage
							_this3.storage.setItem(config.tokenUserDataName, userAccount);
							return userAccount;
						}
					})['catch'](function (errRes) {
						logger.error({ description: 'Error requesting login.', error: errRes, status: errRes.status, func: 'login', obj: 'Matter' });
						if (errRes.status == 409 || errRes.status == 400) {
							errRes = errRes.response.text;
						}
						return Promise.reject(errRes);
					});
				} else {
					//Provider login
					var auth = new ProviderAuth({ provider: loginData, app: this });
					return auth.login().then(function (res) {
						logger.info({ description: 'Provider login successful.', provider: loginData, res: res, func: 'login', obj: 'Matter' });
						return Promise.resolve(res);
					});
				}
			}

			/** Logout
    * @return {Promise}
    * @example
    * //Logout of currently logged in account
    * matter.logout().then(function(loginRes){
    *  console.log('Logged out successfully');
    * }, function(err){
    *  console.error('Error logging out:', err);
    * });
    */
		}, {
			key: 'logout',
			value: function logout() {
				var _this4 = this;

				//TODO: Handle logging out of providers
				if (!this.isLoggedIn) {
					logger.warn({ description: 'No logged in account to log out.', func: 'logout', obj: 'Matter' });
					return Promise.reject({ message: 'No logged in account to log out.' });
				}
				return request.put(this.endpoint + '/logout').then(function (response) {
					logger.log({ description: 'Logout successful.', response: response, func: 'logout', obj: 'Matter' });
					_this4.currentUser = null;
					_this4.token['delete']();
					return response;
				})['catch'](function (errRes) {
					logger.error({ description: 'Error requesting log out: ', error: errRes, func: 'logout', obj: 'Matter' });
					_this4.storage.removeItem(config.tokenUserDataName);
					_this4.token['delete']();
					return Promise.reject(errRes);
				});
			}

			/** getCurrentUser
    * @return {Promise}
    * @example
    * //Logout of currently logged in account
    * matter.getCurrentUser().then(function(currentAccount){
    *  console.log('Currently logged in account:', currentAccount);
    * }, function(err){
    *  console.error('Error logging out:', err);
    * });
    */
		}, {
			key: 'getCurrentUser',
			value: function getCurrentUser() {
				var _this5 = this;

				if (this.currentUser) {
					return Promise.resolve(this.currentUser);
				} else {
					if (this.isLoggedIn) {
						return request.get(this.endpoint + '/user').then(function (response) {
							//TODO: Save user information locally
							logger.log({ description: 'Current User Request responded.', responseData: response, func: 'currentUser', obj: 'Matter' });
							_this5.currentUser = response;
							return response;
						})['catch'](function (errRes) {
							if (errRes.status == 401) {
								logger.warn({ description: 'Called for current user without token.', error: errRes, func: 'currentUser', obj: 'Matter' });
								token['delete']();
								return Promise.resolve(null);
							} else {
								logger.error({ description: 'Error requesting current user.', error: errRes, func: 'currentUser', obj: 'Matter' });
								return Promise.reject(errRes);
							}
						});
					} else {
						return Promise.resolve(null);
					}
				}
			}

			/** updateProfile
    * @param {Object} updateData - Data to update within profile (only provided data will be modified).
    * @return {Promise}
    * @example
    * //Update current account's profile
    * matter.updateProfile().then(function(updatedAccount){
    *  console.log('Currently logged in account:', updatedAccount);
    * }, function(err){
    *  console.error('Error updating profile:', err);
    * });
    */
		}, {
			key: 'updateProfile',
			value: function updateProfile(updateData) {
				var _this6 = this;

				if (!this.isLoggedIn) {
					logger.error({ description: 'No current user profile to update.', func: 'updateProfile', obj: 'Matter' });
					return Promise.reject({ message: 'Must be logged in to update profile.' });
				}
				//Send update request
				return request.put(this.endpoint + '/user/' + this.token.data.username, updateData).then(function (response) {
					logger.log({ description: 'Update profile request responded.', responseData: response, func: 'updateProfile', obj: 'Matter' });
					_this6.currentUser = response;
					return response;
				})['catch'](function (errRes) {
					logger.error({ description: 'Error requesting current user.', error: errRes, func: 'updateProfile', obj: 'Matter' });
					return Promise.reject(errRes);
				});
			}

			/** changePassword
    * @param {Object} updateData - Data to update within profile (only provided data will be modified).
    * @return {Promise}
    * @example
    * //Update current account's profile
    * matter.changePassword().then(function(updatedAccount){
    *  console.log('Currently logged in account:', updatedAccount);
    * }, function(err){
    *  console.error('Error updating profile:', err);
    * });
    */
		}, {
			key: 'changePassword',
			value: function changePassword(updateData) {
				if (!this.isLoggedIn) {
					logger.error({ description: 'No current user profile for which to change password.', func: 'changePassword', obj: 'Matter' });
					return Promise.reject({ message: 'Must be logged in to change password.' });
				}
				//Send update request
				return request.put(this.endpoint + '/user/' + this.token.data.username, updateData).then(function (response) {
					logger.log({ description: 'Update password request responded.', responseData: response, func: 'changePassword', obj: 'Matter' });
					return response;
				})['catch'](function (errRes) {
					logger.error({ description: 'Error requesting password change.', error: errRes, func: 'changePassword', obj: 'Matter' });
					return Promise.reject(errRes);
				});
			}
		}, {
			key: 'recoverPassword',
			value: function recoverPassword() {
				if (!this.isLoggedIn) {
					logger.error({ description: 'No current user for which to recover password.', func: 'recoverPassword', obj: 'Matter' });
					return Promise.reject({ message: 'Must be logged in to recover password.' });
				}
				//Send update request
				return request.post(this.endpoint + '/accounts/' + this.token.data.username + '/recover').then(function (response) {
					logger.log({ description: 'Recover password request responded.', responseData: response, func: 'recoverPassword', obj: 'Matter' });
					return response;
				})['catch'](function (errRes) {
					logger.error({ description: 'Error requesting password recovery.', error: errRes, func: 'recoverPassword', obj: 'Matter' });
					return Promise.reject(errRes);
				});
			}

			/** Get current logged in status
    * @return {Boolean}
    * @example
    * //Check if there is an account currently logged in
    * if(matter.isLoggedIn){
    * console.log('There is currently an account logged in.');
    * } else {
    * console.warn('There is no account currently logged in.');
    * }
    */
		}, {
			key: 'isInGroup',

			/** Check that user is in a single group or in all of a list of groups
    * @param {Array} checkGroups - List of groups to check for account membership
    * @return {Boolean}
    * @example
    * //Check for group membership
    * var isBoth = ;
    * if(matter.isInGroup('admins')){
    * console.log('Current account is an admin!');
    * } else {
    * console.warn('Current account is not an admin.');
    * }
    *
    */
			value: function isInGroup(checkGroups) {
				var _this7 = this;

				if (!this.isLoggedIn) {
					logger.log({ description: 'No logged in user to check.', func: 'isInGroup', obj: 'Matter' });
					return false;
				}
				//Check if user is
				if (checkGroups && ___default.isString(checkGroups)) {
					var _ret = (function () {
						var groupName = checkGroups;
						//Single role or string list of roles
						var groupsArray = groupName.split(',');
						if (groupsArray.length > 1) {
							//String list of groupts
							logger.info({ description: 'String list of groups.', list: groupsArray, func: 'isInGroup', obj: 'Matter' });
							return {
								v: _this7.isInGroups(groupsArray)
							};
						} else {
							//Single group
							var groups = _this7.token.data.groups || [];
							logger.log({ description: 'Checking if user is in group.', group: groupName, userGroups: _this7.token.data.groups || [], func: 'isInGroup', obj: 'Matter' });
							return {
								v: ___default.any(groups, function (group) {
									return groupName == group.name;
								})
							};
						}
					})();

					if (typeof _ret === 'object') return _ret.v;
				} else if (checkGroups && ___default.isArray(checkGroups)) {
					//Array of roles
					//Check that user is in every group
					logger.info({ description: 'Array of groups.', list: checkGroups, func: 'isInGroup', obj: 'Matter' });
					return this.isInGroups(checkGroups);
				} else {
					return false;
				}
				//TODO: Handle string and array inputs
			}

			/** Check that user is in all of a list of groups
    * @param {Array|String} checkGroups - List of groups to check for account membership
    * @return {Boolean}
    * @example
    * //Check for group membership
    * var isBoth = matter.isInGroups(['admins', 'users']);
    * if(isBoth){
    * console.log('Current account is both an admin and a user');
    * } else {
    * console.warn('Current account is not both an admin and a user')
    * }
    *
    */
		}, {
			key: 'isInGroups',
			value: function isInGroups(checkGroups) {
				var _this8 = this;

				if (!this.isLoggedIn) {
					logger.log({ description: 'No logged in user to check.', func: 'isInGroups', obj: 'Matter' });
					return false;
				}
				//Check if user is in any of the provided groups
				if (checkGroups && ___default.isArray(checkGroups)) {
					return ___default.every(___default.map(checkGroups, function (group) {
						if (___default.isString(group)) {
							//Group is string
							return _this8.isInGroup(group);
						} else {
							//Group is object
							if (___default.has(group, 'name')) {
								return _this8.isInGroup(group.name);
							} else {
								logger.error({ description: 'Invalid group object.', group: group, func: 'isInGroups', obj: 'Matter' });
								return false;
							}
						}
					}), true);
				} else if (checkGroups && ___default.isString(checkGroups)) {
					//TODO: Handle spaces within string list
					var groupsArray = checkGroups.split(',');
					if (groupsArray.length > 1) {
						return this.isInGroups(groupsArray);
					}
					return this.isInGroup(groupsArray[0]);
				} else {
					logger.error({ description: 'Invalid groups list.', func: 'isInGroups', obj: 'Matter' });
					return false;
				}
			}
		}, {
			key: 'endpoint',
			get: function get() {
				//Handle options
				if (___default.has(this, 'options')) {
					if (this.options.localServer) {
						config.envName = 'local';
						logger.info({
							description: 'LocalServer option was set to true. Now server url is local server.',
							url: config.serverUrl, func: 'endpoint', obj: 'Matter'
						});
					}
					if (this.options.env) {
						config.envName = this.options.env;
						logger.info({
							description: 'Environment set based on provided environment.',
							config: config, func: 'endpoint', obj: 'Matter'
						});
					}
				}
				var appEndpoint = config.serverUrl + '/apps/' + this.name;
				//Handle tessellate as name
				if (this.name == 'tessellate') {
					//Remove url if host is a tessellate server
					if (typeof window !== 'undefined' && ___default.has(window, 'location') && (window.location.host.indexOf('tessellate') !== -1 || window.location.host.indexOf('localhost') !== -1)) {
						appEndpoint = config.serverUrl;
						logger.info({
							description: 'Host is Tessellate Server, serverUrl simplified!',
							url: config.serverUrl, func: 'endpoint', obj: 'Matter'
						});
					}
				}
				logger.log({ description: 'Endpoint created.', url: appEndpoint, func: 'endpoint', obj: 'Matter' });
				return appEndpoint;
			}
		}, {
			key: 'isLoggedIn',
			get: function get() {
				return this.token.string ? true : false;
			}

			/** Save current user (handled automatically by default)
    * @param {Object} userData - Account data to set for current user
    * @example
    * //Save account response to current user
    * matter.currentUser = {username: 'testuser1', email: 'test@email.com'};
    * console.log('New current user set:', matter.currentUser);
    */
		}, {
			key: 'currentUser',
			set: function set(userData) {
				logger.log({ description: 'Current User set.', user: userData, func: 'currentUser', obj: 'Matter' });
				this.storage.setItem(config.tokenUserDataName, userData);
			},

			/** Get currently logged in user or returns null
    * @return {Object|null}
    * @example
    * //Return account if logged in
    * if(matter.isLoggedIn){
    * console.log('Current user account: ', matter.currentUser);
    * } else {
    * console.log('No current user. Current user: ', matter.currentUser)
    * }
    * matter.currentUser
    * console.log('New current user set:', matter.currentUser);
    */
			get: function get() {
				if (this.storage.getItem(config.tokenUserDataName)) {
					return this.storage.getItem(config.tokenUserDataName);
				} else {
					return null;
				}
			}

			/* Storage Utility
    *
    */
		}, {
			key: 'storage',
			get: function get() {
				return storage;
			}

			/** Token Utility
    */
		}, {
			key: 'token',
			get: function get() {
				return token;
			}

			/** Utils placed in base library
    */
		}, {
			key: 'utils',
			get: function get() {
				return { logger: logger, request: request, storage: storage, dom: domUtil };
			}
		}]);

		return Matter;
	})();

	return Matter;
});
//# sourceMappingURL=matter.js.map
