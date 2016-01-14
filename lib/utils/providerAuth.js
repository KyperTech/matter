'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _request = require('./request');

var _request2 = _interopRequireDefault(_request);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _dom = require('./dom');

var _dom2 = _interopRequireDefault(_dom);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _hellojs = require('hellojs');

var _hellojs2 = _interopRequireDefault(_hellojs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Modifies objects to have id parameter?
//Private object containing clientIds
var clientIds = {};

var ProviderAuth = (function () {
	function ProviderAuth(actionData) {
		_classCallCheck(this, ProviderAuth);

		this.app = actionData.app ? actionData.app : null;
		this.redirectUri = actionData.redirectUri ? actionData.redirectUri : 'redirect.html';
		this.provider = actionData.provider ? actionData.provider : null;
	}

	_createClass(ProviderAuth, [{
		key: 'helloLoginListener',
		value: function helloLoginListener() {
			var _this = this;

			//Login Listener
			_hellojs2.default.on('auth.login', function (auth) {
				_logger2.default.info({
					description: 'User logged in to google.', auth: auth,
					func: 'loadHello', obj: 'Google'
				});
				// Call user information, for the given network
				(0, _hellojs2.default)(auth.network).api('/me').then(function (userData) {
					// Inject it into the container
					//TODO:Send account informaiton to server
					userData.provider = auth.network;
					_logger2.default.log({
						description: 'Provider request successful.', userData: userData,
						func: 'helloLoginListener', obj: 'providerAuth'
					});
					//Login or Signup endpoint
					return _request2.default.post(_this.endpoint + '/provider', userData).then(function (response) {
						_logger2.default.log({
							description: 'Provider request successful.', response: response,
							func: 'helloLoginListener', obj: 'providerAuth'
						});
						return response;
					})['catch'](function (error) {
						_logger2.default.error({
							description: 'Error requesting login.', error: error,
							func: 'signup', obj: 'Matter'
						});
						return Promise.reject(error);
					});
				});
			});
		}
	}, {
		key: 'requestProviders',
		value: function requestProviders() {
			return _request2.default.get(this.app.endpoint + '/providers').then(function (response) {
				_logger2.default.log({
					description: 'Provider request successful.', response: response,
					func: 'requestProviders', obj: 'ProviderAuth'
				});
				return response;
			}, function (error) {
				_logger2.default.error({
					description: 'Error loading hellojs.', error: error,
					func: 'requestProviders', obj: 'ProviderAuth'
				});
				return Promise.reject({
					message: 'Error requesting application third party providers.'
				});
			});
		}
		/** Initialize hellojs library and request app providers
   */

	}, {
		key: 'initHello',
		value: function initHello() {
			var _this2 = this;

			_logger2.default.debug({
				description: 'Hellojs library loaded.', app: this.app,
				func: 'initHello', obj: 'ProviderAuth'
			});
			if (_config2.default.externalProviders[this.app.name]) {
				var _ret = (function () {
					var providerData = _config2.default.externalProviders[_this2.app.name];
					_logger2.default.debug({
						description: 'Provider config exists in local config.',
						providerData: providerData, func: 'initHello', obj: 'ProviderAuth'
					});
					return {
						v: new Promise(function (resolve) {
							_hellojs2.default.init(providerData, { redirect_uri: 'redirect.html', scope: 'email' });
							resolve();
						})
					};
				})();

				if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
			} else {
				//Get providers data from tessellate
				return this.requestProviders().then(function (providers) {
					_logger2.default.log({
						description: 'Provider request successful.', providers: providers,
						func: 'initHello', obj: 'ProviderAuth'
					});
					var provider = _this2.provider;

					var providerData = providers[_this2.provider];
					if (!provider) {
						_logger2.default.error({
							description: 'Provider is not setup.\n' + 'Visit build.kyper.io to enter your client id for ' + provider,
							provider: provider, providers: providers, func: 'initHello', obj: 'ProviderAuth'
						});
						return Promise.reject({
							message: 'Provider is not setup.'
						});
					}
					_logger2.default.debug({
						description: 'Initializing hellojs.', provider: provider,
						providers: providers, providerData: providerData, func: 'initHello', obj: 'ProviderAuth'
					});
					return _hellojs2.default.init(providerData, { redirect_uri: 'redirect.html' });
				}, function (error) {
					_logger2.default.error({
						description: 'Error getting provider data from Tessellate.', error: error,
						func: 'initHello', obj: 'ProviderAuth'
					});
					return Promise.reject({ message: 'Error requesting application third party providers.' });
				});
			}
		}
		/** External provider login
   * @example
   * //Login to account that was started through external account signup (Google, Facebook, Github)
   * matter.login('google').then(function(loginRes){
   * 		console.log('Successful login:', loginRes)
   * }, function(err){
   * 		console.error('Error with provider login:', err);
   * });
   */

	}, {
		key: 'login',
		value: function login() {
			var _this3 = this;

			return this.initHello().then(function () {
				_logger2.default.debug({
					description: 'Init hello successful.',
					func: 'login', obj: 'providerAuth'
				});
				return _hellojs2.default.login(_this3.provider).then(function (userData) {
					_logger2.default.info({
						description: 'Login response.', userData: userData,
						func: 'login', obj: 'providerAuth'
					});
					return userData;
				}, function (error) {
					_logger2.default.debug({
						description: 'Init hello successful.', error: error,
						func: 'login', obj: 'providerAuth'
					});
					return Promise.reject(error);
				});
			}, function (error) {
				_logger2.default.error({
					description: 'Error initalizing hellojs.', error: error,
					func: 'login', obj: 'providerAuth'
				});
				return Promise.reject('Error with third party login.');
			});
		}
		/** Signup using external provider account (Google, Facebook, Github)
    * @example
    * //Signup using external account (Google, Facebook, Github)
    * matter.signup('google').then(function(signupRes){
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

exports.default = ProviderAuth;
module.exports = exports['default'];