'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authWithServer = undefined;

require('babel-polyfill');

var _request = require('./request');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

// import { OAuth, User } from 'oauthio-web'; // window undefined error
// OAuth.initialize(config.oauthioKey);

var isBrowser = typeof window !== 'undefined';
var OAuthLib = isBrowser ? require('oauthio-web') : undefined;
initializeOAuth();

function initializeOAuth() {
  if (isBrowser) {
    OAuthLib.OAuth.initialize(_config2.default.oauthioKey);
  }
  return undefined;
}
//Run initial setup of OAuth Library

/**
 * @description Signup with external provider
 * @param {String} provider Provider with which to signup through (Google/Github Etc)
 */
// export async function signup(provider) {
// 	try {
// 		const res = await OAuth.popup(provider, {cache: true})
// 		logger.debug({
// 			description: 'Popup response.', res,
// 			func: 'signup', obj: 'providerAuth'
// 		});
// 		const newUser = await User.signup(res);
// 		return newUser;
// 	} catch(error) {
// 		logger.error({
// 			description: 'error in oauth request', error
// 		});
// 		return error;
// 	}
// }

/**
 * @description Login to external provider
 * @param {String} provider Provider with which to log into (Google/Github Etc)
 */
// export async function login(provider) {
// 	try {
// 		const res = await OAuth.popup(provider, {cache: true})
// 		const newUser = await User.signin(res);
// 		console.log('user:', newUser);
// 		return newUser;
// 	} catch(error) {
// 		console.error('error in oauth request', error);
// 		return error;
// 	}
// }

/**
 * @description Logout external provider service (Stormpath/oauthio)
 */
// export async function logout() {
// 	if(!currentlyLoggedIn()) return;
// 	try {
// 		const user = User.getIdentity();
// 		return await user.logout();
// 	} catch(error) {
// 		console.error('error logging out', error);
// 		return error;
// 	}
// }

/**
 * @description Get currently connected user
 */
// export function getCurrentUser() {
// 	return User.getIdentity();
// }

/**
 * @description Local user data from external provider service (Stormpath/oauthio)
 */
// export async function getUserData(provider) {
// 	try {
// 		const result = await OAuth.popup(provider, {cache: true});
// 		return await result.me();
// 	} catch(error) {
// 		console.error('error in oauth request', error);
// 	}
// }

/**
 * @description Update user with external provider service (Stormpath/oauthio)
 */
// export async function updateUserData(newData) {
// 	try {
// 		user = User.getIdentity();
// 		user.data = newData;
// 		return await user.save();
// 	} catch(error) {
// 		console.error('error updating user data', error);
// 	}
// }

/**
 * @description Check to see if a user is currently logged in to external provider service (Stormpath/oauthio)
 */
// export function currentlyLoggedIn() {
// 	return User.isLogged();
// }

/**
 * @description Signup using a token generated from the server (so server and client are both aware of auth state)
 */

var authWithServer = exports.authWithServer = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(provider) {
    var params, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _request.get)(_config2.default.serverUrl + '/stateToken');

          case 3:
            params = _context.sent;
            _context.next = 6;
            return OAuth.popup(provider, { state: params.token });

          case 6:
            result = _context.sent;
            _context.next = 9;
            return (0, _request.put)(_config2.default.serverUrl + '/auth', { provider: provider, code: result.code, stateToken: params.token });

          case 9:
            return _context.abrupt('return', _context.sent);

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](0);

            _logger2.default.error({ description: 'error with request', error: _context.t0 });
            // return err;

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 12]]);
  }));

  return function authWithServer(_x) {
    return ref.apply(this, arguments);
  };
}();