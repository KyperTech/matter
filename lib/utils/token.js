Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _envStorage = require('./envStorage');

var _envStorage2 = _interopRequireDefault(_envStorage);

var _jwtDecode = require('jwt-decode');

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

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
		_envStorage2['default'].removeItem(_config2['default'].tokenName);
		//Remove user data
		_envStorage2['default'].removeItem(_config2['default'].tokenDataName);
		_logger2['default'].log({
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
			return _envStorage2['default'].getItem(_config2['default'].tokenName);
		},

		/** Set token value as a string
   */
		set: function set(tokenData) {
			var tokenStr = undefined;
			//Handle object being passed
			if (!_lodash2['default'].isString(tokenData)) {
				//Token is included in object
				_logger2['default'].log({
					description: 'Token data is not string.',
					token: tokenData, func: 'string', obj: 'token'
				});
				if (_lodash2['default'].isObject(tokenData) && _lodash2['default'].has(tokenData, 'token')) {
					tokenStr = tokenData.token;
				} else {
					//Input is either not an string or object that contains nessesary info
					_logger2['default'].error({
						description: 'Invalid value set to token.',
						token: tokenData, func: 'string', obj: 'token'
					});
					return;
				}
			} else {
				tokenStr = tokenData;
			}
			_logger2['default'].log({
				description: 'Token was set.', token: tokenData,
				tokenStr: tokenStr, func: 'string', obj: 'token'
			});
			_envStorage2['default'].setItem(_config2['default'].tokenName, tokenStr);
			this.data = (0, _jwtDecode2['default'])(tokenStr);
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
			if (_envStorage2['default'].getItem(_config2['default'].tokenDataName)) {
				return _envStorage2['default'].getItem(_config2['default'].tokenDataName);
			} else {
				return decodeToken(this.string);
			}
		},

		/** Set token data
   */
		set: function set(tokenData) {
			if (_lodash2['default'].isString(tokenData)) {
				var tokenStr = tokenData;
				tokenData = decodeToken(tokenStr);
				_logger2['default'].info({
					description: 'Token data was set as string. Decoding token.',
					token: tokenStr, tokenData: tokenData, func: 'data', obj: 'token'
				});
			} else {
				_logger2['default'].log({
					description: 'Token data was set.', data: tokenData,
					func: 'data', obj: 'token'
				});
				_envStorage2['default'].setItem(_config2['default'].tokenDataName, tokenData);
			}
		},
		configurable: true,
		enumerable: true
	}
});

exports['default'] = token;

/** Safley decode a JWT string
 * @private
 * @return {Object}
 */
function decodeToken(tokenStr) {
	var tokenData = undefined;
	if (tokenStr && tokenStr != '') {
		try {
			tokenData = (0, _jwtDecode2['default'])(tokenStr);
		} catch (err) {
			_logger2['default'].error({
				description: 'Error decoding token.', data: tokenData,
				error: err, func: 'decodeToken', file: 'token'
			});
			throw new Error('Invalid token string.');
		}
	}
	return tokenData;
}
module.exports = exports['default'];