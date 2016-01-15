'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _request = require('./request');

var _request2 = _interopRequireDefault(_request);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _dom = require('./dom');

var dom = _interopRequireWildcard(_dom);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import hello from 'hellojs'; //Modifies objects to have id parameter?

var ProviderAuth = function () {
	function ProviderAuth(actionData) {
		_classCallCheck(this, ProviderAuth);

		var app = actionData.app;
		var redirectUrl = actionData.redirectUrl;
		var provider = actionData.provider;

		this.app = app;
		this.provider = provider;
		var externalAuth = _config2.default.externalAuth[this.app.name] ? _config2.default.externalAuth[this.app.name] : null;
		this.redirectUrl = externalAuth ? externalAuth.redirectUrl : '/oauthcallback';
		if (redirectUrl) {
			this.redirectUrl = redirectUrl;
		}
	}

	_createClass(ProviderAuth, [{
		key: 'getAuthUrl',
		value: function getAuthUrl() {
			var endpointUrl = this.app.endpoint + '/authUrl?provider=' + this.provider + '&redirectUrl=' + this.redirectUrl;
			_logger2.default.log({
				description: 'Requesting Auth url.', endpointUrl: endpointUrl,
				func: 'getAuthUrl', obj: 'providerAuth'
			});
			return _request2.default.get(endpointUrl).then(function (authUrl) {
				_logger2.default.log({
					description: 'Get auth url request successful.', authUrl: authUrl,
					func: 'getAuthUrl', obj: 'providerAuth'
				});
				return authUrl;
			})['catch'](function (error) {
				_logger2.default.error({
					description: 'Error requesting auth url.', error: error,
					func: 'getAuthUrl', obj: 'providerAuth'
				});
				return Promise.reject('External authentication not available.');
			});
		}
	}, {
		key: 'accountFromCode',
		value: function accountFromCode(code) {
			_logger2.default.log({
				description: 'Requesting Auth url.', code: code,
				func: 'accountFromCode', obj: 'providerAuth'
			});
			return _request2.default.post(this.app.endpoint + '/oauth2', { code: code }).then(function (account) {
				_logger2.default.log({
					description: 'Get auth url request successful.', account: account,
					func: 'accountFromCode', obj: 'providerAuth'
				});
				return account;
			})['catch'](function (error) {
				_logger2.default.error({
					description: 'Error requesting auth url.', error: error,
					func: 'accountFromCode', obj: 'providerAuth'
				});
				return Promise.reject('External authentication not available.');
			});
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
			return this.getAuthUrl().then(function (url) {
				_logger2.default.info({
					description: 'Login response.', url: url,
					func: 'login', obj: 'providerAuth'
				});
				return url;
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
			if (this.provider === 'google') {
				return this.googleAuth();
			} else {
				return Promise.reject('Invalid provider');
			}
		}
	}, {
		key: 'googleAuth',
		value: function googleAuth() {
			var clientId = _config2.default.externalAuth[this.app.name].google;
			if (typeof window !== 'undefined') {
				window.OnLoadCallback = function (data) {
					_logger2.default.log({
						description: 'Google load callback:', data: data,
						func: 'googleSignup', obj: 'providerAuth'
					});
				};
			}
			var scriptSrc = 'https://apis.google.com/js/client.js?onload=OnLoadCallback';
			return new Promise(function (resolve, reject) {
				dom.asyncLoadJs(scriptSrc).then(function () {
					window.gapi.auth.authorize({ client_id: clientId, scope: 'https://www.googleapis.com/auth/plus.me' }, function (auth) {
						if (!auth || auth.error || auth.message) {
							_logger2.default.error({
								description: 'Error authorizing with google',
								func: 'googleSignup', obj: 'providerAuth'
							});
							return reject(auth.error || auth.message);
						}
						_logger2.default.log({
							description: 'Auth with google successful.', auth: auth,
							func: 'googleSignup', obj: 'providerAuth'
						});
						window.gapi.client.load('plus', 'v1', function () {
							var request = gapi.client.plus.people.get({
								'userId': 'me'
							});
							request.execute(function (account) {
								_logger2.default.log({
									description: 'Account loaded from google.', account: account,
									func: 'googleSignup', obj: 'providerAuth'
								});
								//TODO: Signup/Login to Tessellate server with this information
								resolve(account);
							});
						});
					});
				});
			});
		}
	}]);

	return ProviderAuth;
}();

exports.default = ProviderAuth;
module.exports = exports['default'];