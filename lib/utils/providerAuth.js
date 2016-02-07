'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.authWithServer = exports.updateUserData = exports.getUserData = exports.logout = exports.login = exports.signup = undefined;
exports.getCurrentUser = getCurrentUser;
exports.currentlyLoggedIn = currentlyLoggedIn;

require('babel-polyfill');

var _request = require('./request');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _dom = require('./dom');

var dom = _interopRequireWildcard(_dom);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _oauthioWeb = require('oauthio-web');

var _providerAuth = require('./providerAuth');

var _providerAuth2 = _interopRequireDefault(_providerAuth);

var _cookies = require('./cookies');

var cookieUtil = _interopRequireWildcard(_cookies);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//Run initial setup of OAuth Library
_oauthioWeb.OAuth.initialize(_config2.default.oauthioKey);

/**
 * @description Signup with external provider
 * @param {String} provider Provider with which to signup through (Google/Github Etc)
 */

var signup = exports.signup = function () {
	var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(provider) {
		var res, newUser;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return _oauthioWeb.OAuth.popup(provider, { cache: true });

					case 3:
						res = _context.sent;

						_logger2.default.debug({
							description: 'Popup response.', res: res,
							func: 'signup', obj: 'providerAuth'
						});
						_context.next = 7;
						return _oauthioWeb.User.signup(res);

					case 7:
						newUser = _context.sent;
						return _context.abrupt('return', newUser);

					case 11:
						_context.prev = 11;
						_context.t0 = _context['catch'](0);

						_logger2.default.error({
							description: 'error in oauth request', error: _context.t0
						});
						return _context.abrupt('return', _context.t0);

					case 15:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this, [[0, 11]]);
	}));

	return function signup(_x) {
		return ref.apply(this, arguments);
	};
}();

/**
 * @description Login to external provider
 * @param {String} provider Provider with which to log into (Google/Github Etc)
 */

var login = exports.login = function () {
	var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(provider) {
		var _res, _newUser;

		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.prev = 0;
						_context2.next = 3;
						return _oauthioWeb.OAuth.popup(provider, { cache: true });

					case 3:
						_res = _context2.sent;
						_context2.next = 6;
						return _oauthioWeb.User.signin(_res);

					case 6:
						_newUser = _context2.sent;

						console.log('user:', _newUser);
						return _context2.abrupt('return', _newUser);

					case 11:
						_context2.prev = 11;
						_context2.t0 = _context2['catch'](0);

						console.error('error in oauth request', _context2.t0);
						return _context2.abrupt('return', _context2.t0);

					case 15:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, this, [[0, 11]]);
	}));

	return function login(_x2) {
		return ref.apply(this, arguments);
	};
}();

/**
 * @description Logout external provider service (Stormpath/oauthio)
 */

var logout = exports.logout = function () {
	var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
		var _user;

		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						if (currentlyLoggedIn()) {
							_context3.next = 2;
							break;
						}

						return _context3.abrupt('return');

					case 2:
						_context3.prev = 2;
						_user = _oauthioWeb.User.getIdentity();
						_context3.next = 6;
						return _user.logout();

					case 6:
						return _context3.abrupt('return', _context3.sent);

					case 9:
						_context3.prev = 9;
						_context3.t0 = _context3['catch'](2);

						console.error('error logging out', _context3.t0);
						return _context3.abrupt('return', _context3.t0);

					case 13:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, this, [[2, 9]]);
	}));

	return function logout() {
		return ref.apply(this, arguments);
	};
}();

/**
 * @description Get currently connected user
 */

function getCurrentUser() {
	return _oauthioWeb.User.getIdentity();
}

/**
 * @description Local user data from external provider service (Stormpath/oauthio)
 */

var getUserData = exports.getUserData = function () {
	var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(provider) {
		var result;
		return regeneratorRuntime.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						_context4.prev = 0;
						_context4.next = 3;
						return _oauthioWeb.OAuth.popup(provider, { cache: true });

					case 3:
						result = _context4.sent;
						_context4.next = 6;
						return result.me();

					case 6:
						return _context4.abrupt('return', _context4.sent);

					case 9:
						_context4.prev = 9;
						_context4.t0 = _context4['catch'](0);

						console.error('error in oauth request', _context4.t0);

					case 12:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee4, this, [[0, 9]]);
	}));

	return function getUserData(_x3) {
		return ref.apply(this, arguments);
	};
}();

/**
 * @description Update user with external provider service (Stormpath/oauthio)
 */

var updateUserData = exports.updateUserData = function () {
	var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(newData) {
		return regeneratorRuntime.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						_context5.prev = 0;

						user = _oauthioWeb.User.getIdentity();
						user.data = newData;
						_context5.next = 5;
						return user.save();

					case 5:
						return _context5.abrupt('return', _context5.sent);

					case 8:
						_context5.prev = 8;
						_context5.t0 = _context5['catch'](0);

						console.error('error updating user data', _context5.t0);

					case 11:
					case 'end':
						return _context5.stop();
				}
			}
		}, _callee5, this, [[0, 8]]);
	}));

	return function updateUserData(_x4) {
		return ref.apply(this, arguments);
	};
}();

/**
 * @description Check to see if a user is currently logged in to external provider service (Stormpath/oauthio)
 */

function currentlyLoggedIn() {
	return _oauthioWeb.User.isLogged();
}

/**
 * @description Signup using a token generated from the server (so server and client are both aware of auth state)
 */

var authWithServer = exports.authWithServer = function () {
	var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(provider) {
		var params, _result;

		return regeneratorRuntime.wrap(function _callee6$(_context6) {
			while (1) {
				switch (_context6.prev = _context6.next) {
					case 0:
						_context6.prev = 0;
						_context6.next = 3;
						return (0, _request.get)(_config2.default.serverUrl + '/stateToken');

					case 3:
						params = _context6.sent;
						_context6.next = 6;
						return _oauthioWeb.OAuth.popup(provider, { state: params.token });

					case 6:
						_result = _context6.sent;
						_context6.next = 9;
						return (0, _request.put)(_config2.default.serverUrl + '/auth', { provider: provider, code: _result.code, stateToken: params.token });

					case 9:
						return _context6.abrupt('return', _context6.sent);

					case 12:
						_context6.prev = 12;
						_context6.t0 = _context6['catch'](0);

						console.error('error with request', _context6.t0.toString());
						// return err;

					case 15:
					case 'end':
						return _context6.stop();
				}
			}
		}, _callee6, this, [[0, 12]]);
	}));

	return function authWithServer(_x5) {
		return ref.apply(this, arguments);
	};
}();