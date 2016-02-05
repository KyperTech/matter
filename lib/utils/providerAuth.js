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

var ProviderAuth = function () {
	function ProviderAuth(actionData) {
		_classCallCheck(this, ProviderAuth);

		var app = actionData.app;
		var redirectUrl = actionData.redirectUrl;
		var provider = actionData.provider;

		var externalAuth = _config2.default.externalAuth[app.name] ? _config2.default.externalAuth[app.name] : null;
		this.app = app;
		this.provider = provider;
		this.redirectUrl = externalAuth ? externalAuth.redirectUrl : '/oauthcallback';
		if (redirectUrl) {
			this.redirectUrl = redirectUrl;
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

	_createClass(ProviderAuth, [{
		key: 'login',
		value: function login() {
			var _this = this;

			if (this.provider !== 'google') {
				_logger2.default.error({
					description: 'Invalid provider.',
					func: 'signup', obj: 'providerAuth'
				});
				return Promise.reject({ message: 'Invalid provider' });
			}
			return this.googleAuth().then(function (googleAccount) {
				if (!googleAccount) {
					return Promise.reject({ message: 'Error loading Google account.' });
				}
				var image = googleAccount.image;
				var emails = googleAccount.emails;

				var email = emails && emails[0] && emails[0].value ? emails[0].value : '';
				var account = {
					image: image, email: email,
					username: email.split('@')[0],
					provider: _this.provider,
					google: googleAccount
				};
				_logger2.default.info({
					description: 'Google account loaded, signing up.', account: account,
					googleAccount: googleAccount, func: 'signup', obj: 'providerAuth'
				});
				return _request2.default.post(_this.app.endpoint + '/login', account);
			}, function (error) {
				_logger2.default.error({
					description: 'Error authenticating with Google.', error: error,
					func: 'signup', obj: 'providerAuth'
				});
				return Promise.reject({ message: 'Error getting external account.' });
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
			var _this2 = this;

			if (this.provider !== 'google') {
				_logger2.default.error({
					description: 'Invalid provider.',
					func: 'signup', obj: 'providerAuth'
				});
				return Promise.reject({ message: 'Invalid provider' });
			}
			return this.googleAuth().then(function (googleAccount) {
				if (!googleAccount) {
					return Promise.reject({ message: 'Error loading Google account.' });
				}
				var image = googleAccount.image;
				var emails = googleAccount.emails;

				var email = emails && emails[0] && emails[0].value ? emails[0].value : '';
				var account = {
					image: image, email: email,
					username: email.split('@')[0],
					provider: _this2.provider,
					google: googleAccount
				};
				_logger2.default.info({
					description: 'Google account loaded, signing up.', account: account,
					googleAccount: googleAccount, func: 'signup', obj: 'providerAuth'
				});
				return _request2.default.post(_this2.app.endpoint + '/signup', account);
			}, function (error) {
				_logger2.default.error({
					description: 'Error authenticating with Google.', error: error,
					func: 'signup', obj: 'providerAuth'
				});
				return Promise.reject({ message: 'Error getting external account.' });
			});
		}
	}, {
		key: 'googleAuth',
		value: function googleAuth() {
			var clientId = this.app && this.app.name && _config2.default.externalAuth[this.app.name] ? _config2.default.externalAuth[this.app.name].google : null;
			if (!clientId) {
				_logger2.default.error({
					description: 'ClientId is required to authenticate with Google.',
					func: 'googleSignup', obj: 'providerAuth'
				});
				return Promise.reject('Client id is required to authenticate with Google.');
			}
			// if (typeof window !== 'undefined' && typeof window.gapi === 'undefined') {
			// 	return this.addGoogleLib().then(() => {
			// 		return this.googleAuth();
			// 	});
			// }
			window.open('http://localhost:3000/auth/google', 'Google Auth', 'width=350, height=250');
			var win = window.open(_url, "windowname1", 'width=800, height=600');
			var pollTimer = window.setInterval(function () {
				try {
					console.log(win.document.URL);
					if (win.document.URL.indexOf(REDIRECT) != -1) {
						window.clearInterval(pollTimer);
						var url = win.document.URL;
						acToken = gup(url, 'access_token');
						tokenType = gup(url, 'token_type');
						expiresIn = gup(url, 'expires_in');
						win.close();
						validateToken(acToken);
					}
				} catch (e) {
					console.error('error:', e);
				}
			}, 100);
			function validateToken(token) {
				console.log('token:', token);
			}
			function gup(url, name) {
				name = name.replace(/[[]/, '\[').replace(/[]]/, '\]');
				var regexS = '[\?&]' + name + '=([^&#]*)';
				var regex = new RegExp(regexS);
				var results = regex.exec(url);
				if (results == null) return '';else return results[1];
			}
			// return new Promise((resolve, reject) => {
			// 	window.gapi.auth.authorize({client_id: clientId, scope: 'email profile'}, (auth) => {
			// 		if(!auth || auth.error || auth.message){
			// 			logger.error({
			// 				description: 'Error authorizing with google',
			// 				func: 'googleSignup', obj: 'providerAuth'
			// 			});
			// 			return reject(auth.error || auth.message);
			// 		}
			// 		logger.log({
			// 			description: 'Auth with google successful.', auth,
			// 			func: 'googleSignup', obj: 'providerAuth'
			// 		});
			// 		window.gapi.client.load('plus', 'v1', () => {
			//       let request = gapi.client.plus.people.get({
			//         'userId': 'me'
			//       });
			//       request.execute(account => {
			// 				logger.log({
			// 					description: 'Account loaded from google.', account,
			// 					func: 'googleSignup', obj: 'providerAuth'
			// 				});
			// 				//TODO: Signup/Login to Tessellate server with this information
			// 				resolve(account);
			//       });
			//     });
			// 	});
			// });
		}
	}, {
		key: 'addGoogleLib',
		value: function addGoogleLib() {
			var scriptSrc = 'https://apis.google.com/js/client.js?onload=OnLoadCallback';
			return new Promise(function (resolve) {
				dom.asyncLoadJs(scriptSrc);
				if (typeof window !== 'undefined') {
					window.OnLoadCallback = function () {
						_logger2.default.log({
							description: 'Google library loaded',
							func: 'googleSignup', obj: 'providerAuth'
						});
						resolve();
					};
				}
			});
		}
	}]);

	return ProviderAuth;
}();

exports.default = ProviderAuth;
module.exports = exports['default'];