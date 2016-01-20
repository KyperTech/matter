'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _has = require('lodash/object/has');

var _has2 = _interopRequireDefault(_has);

var _isObject = require('lodash/lang/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _isString = require('lodash/lang/isString');

var _isString2 = _interopRequireDefault(_isString);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _envStorage = require('./envStorage');

var _envStorage2 = _interopRequireDefault(_envStorage);

var _jwtDecode = require('jwt-decode');

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var token = {
	/** Get string value of token
  * @return {String}
  * @example
  * console.log('String value of current token', token.string);
  */
	get string() {
		return _envStorage2.default.getItem(_config2.default.tokenName);
	},
	/** Get decoded data within token (unencrypted data only)
  * @return {Object}
  * @example
  * console.log('Data of current token:', token.data);
  */
	get data() {
		if (_envStorage2.default.getItem(_config2.default.tokenDataName)) {
			return _envStorage2.default.getItem(_config2.default.tokenDataName);
		} else {
			return decodeToken(this.string);
		}
	},
	/** Set token data
  */
	set data(tokenData) {
		if ((0, _isString2.default)(tokenData)) {
			var tokenStr = tokenData;
			tokenData = decodeToken(tokenStr);
			_logger2.default.info({
				description: 'Token data was set as string. Decoding token.',
				token: tokenStr, tokenData: tokenData, func: 'data', obj: 'token'
			});
		} else {
			_logger2.default.log({
				description: 'Token data was set.', data: tokenData,
				func: 'data', obj: 'token'
			});
			_envStorage2.default.setItem(_config2.default.tokenDataName, tokenData);
		}
	},
	/** Set token value as a string
  */
	set string(tokenData) {
		var tokenStr = undefined;
		//Handle object being passed
		if (!(0, _isString2.default)(tokenData)) {
			//Token is included in object
			_logger2.default.log({
				description: 'Token data is not string.',
				token: tokenData, func: 'string', obj: 'token'
			});
			if ((0, _isObject2.default)(tokenData) && (0, _has2.default)(tokenData, 'token')) {
				tokenStr = tokenData.token;
			} else {
				//Input is either not an string or object that contains nessesary info
				_logger2.default.error({
					description: 'Invalid value set to token.',
					token: tokenData, func: 'string', obj: 'token'
				});
				return;
			}
		} else {
			tokenStr = tokenData;
		}
		_logger2.default.log({
			description: 'Token was set.', token: tokenData,
			tokenStr: tokenStr, func: 'string', obj: 'token'
		});
		_envStorage2.default.setItem(_config2.default.tokenName, tokenStr);
		this.data = (0, _jwtDecode2.default)(tokenStr);
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
		_envStorage2.default.removeItem(_config2.default.tokenName);
		//Remove user data
		_envStorage2.default.removeItem(_config2.default.tokenDataName);
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
	var tokenData = undefined;
	if (tokenStr && tokenStr != '') {
		try {
			tokenData = (0, _jwtDecode2.default)(tokenStr);
		} catch (err) {
			_logger2.default.error({
				description: 'Error decoding token.', data: tokenData,
				error: err, func: 'decodeToken', file: 'token'
			});
			throw new Error('Invalid token string.');
		}
	}
	return tokenData;
}
module.exports = exports['default'];