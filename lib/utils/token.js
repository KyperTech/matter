'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _cookies = require('./cookies');

var cookiesUtil = _interopRequireWildcard(_cookies);

var _envStorage = require('./envStorage');

var envStorage = _interopRequireWildcard(_envStorage);

var _jwtDecode = require('jwt-decode');

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var token = {

	/** Get string value of token
  * @return {String}
  * @example
  * console.log('String value of current token', token.string);
  */
	get string() {
		var cookie = cookiesUtil.getCookie(_config2.default.tokenName);
		if (cookie === '') return null;
		return cookie;
	},

	/**
  * @description Get decoded data within token (unencrypted data only)
  * @return {Object}
  * @example
  * console.log('Data of current token:', token.data);
  */
	get data() {
		if (!this.string) return null;
		if (envStorage.getItem(_config2.default.tokenDataName)) {
			return envStorage.getItem(_config2.default.tokenDataName);
		} else {
			return decodeToken(this.string);
		}
	},

	/**
  * @description Set token data
  */
	set data(tokenData) {
		envStorage.setItem(_config2.default.tokenDataName, tokenData);
		_logger2.default.debug({
			description: 'Token data was set to session storage.', tokenData: tokenData,
			func: 'data', obj: 'token'
		});
	},

	/**
  * @description Set token value as a string
  */
	set string(tokenStr) {
		//Handle object being passed
		if (!(0, _isString2.default)(tokenStr)) {
			//Token is included in object
			_logger2.default.log({
				description: 'Token data is not string.',
				tokenStr: tokenStr, func: 'string', obj: 'token'
			});
			throw new Error('Token data should be a string');
		}
		cookiesUtil.setCookie(_config2.default.tokenName, tokenStr, 7);
		this.data = decodeToken(tokenStr);
		_logger2.default.debug({
			description: 'Token was set to cookies.',
			func: 'string', obj: 'token'
		});
	},

	/** Save token data
  */
	save: function save(tokenStr) {
		this.string = tokenStr;
	},


	/** Delete token data
  */
	delete: function _delete() {
		//Remove string token
		cookiesUtil.deleteCookie(_config2.default.tokenName);
		//Remove user data
		envStorage.removeItem(_config2.default.tokenDataName);
		_logger2.default.log({
			description: 'Token was removed.',
			func: 'delete', obj: 'token'
		});
	}
};

exports.default = token;

/** Safley decode a JWT string
 * @private
 * @return {Object}
 */

function decodeToken(tokenStr) {
	if (!tokenStr || tokenStr === '') return null;
	try {
		return (0, _jwtDecode2.default)(tokenStr);
	} catch (error) {
		_logger2.default.error({
			description: 'Error decoding token.',
			error: error, func: 'decodeToken', file: 'token'
		});
		return null;
	}
}
module.exports = exports['default'];