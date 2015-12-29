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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
				return _dom2.default.asyncLoadJs('https://s3.amazonaws.com/kyper-cdn/js/hello.js');
			} else {
				return Promise.reject();
			}
		}
	}, {
		key: 'helloLoginListener',
		value: function helloLoginListener() {
			//Login Listener
			window.hello.on('auth.login', function (auth) {
				_logger2.default.info({ description: 'User logged in to google.', func: 'loadHello', obj: 'Google' });
				// Call user information, for the given network
				window.hello(auth.network).api('/me').then(function (r) {
					// Inject it into the container
					//TODO:Send account informaiton to server
					var userData = r;
					userData.provider = auth.network;
					//Login or Signup endpoint
					return _request2.default.post(this.endpoint + '/provider', userData).then(function (response) {
						_logger2.default.log({ description: 'Provider request successful.', response: response, func: 'signup', obj: 'GoogleUtil' });
						return response;
					})['catch'](function (errRes) {
						_logger2.default.error({ description: 'Error requesting login.', error: errRes, func: 'signup', obj: 'Matter' });
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
				return _request2.default.get(_this.app.endpoint + '/providers').then(function (response) {
					_logger2.default.log({
						description: 'Provider request successful.', response: response,
						func: 'initHello', obj: 'ProviderAuth'
					});
					var provider = response[_this.provider];
					if (!provider) {
						_logger2.default.error({
							description: 'Provider is not setup.\n' + 'Visit build.kyper.io to enter your client id for ' + _this.provider,
							provider: _this.provider, clientIds: clientIds,
							func: 'login', obj: 'ProviderAuth'
						});
						return Promise.reject({ message: 'Provider is not setup.' });
					}
					_logger2.default.log({
						description: 'Providers config built', providersConfig: response,
						func: 'initHello', obj: 'ProviderAuth'
					});
					return window.hello.init(response, { redirect_uri: 'redirect.html' });
				}, function (errRes) {
					_logger2.default.error({
						description: 'Error loading hellojs.', error: errRes,
						func: 'initHello', obj: 'ProviderAuth'
					});
					return Promise.reject({ message: 'Error requesting application third party providers.' });
				})['catch'](function (errRes) {
					_logger2.default.error({
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
				_logger2.default.error({ description: 'Error initalizing hellojs.', error: err, func: 'login', obj: 'Matter' });
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

exports.default = ProviderAuth;
module.exports = exports['default'];