'use strict';

var _includes = require('lodash/includes');

var _includes2 = _interopRequireDefault(_includes);

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cookiesUtil = {
	/**
  * @description
  * Gets cookie value by cookie name.
  *
  * @param {String} cookieName - cookie name
  * @returns {String} cookieValue - value for given cookie name
  *
  */
	getCookie: function getCookie(cookieName) {
		var name = cookieName + '=';
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			try {
				if ((0, _includes2.default)(c, name)) {
					return c.substring(name.length, c.length);
				}
			} catch (err) {
				_logger2.default.warn({ description: 'Cookie cannot be loaded', cookieName: cookieName, error: err, func: 'getCookie', obj: 'cookiesUtil' });
				return '';
			}
		}
		return '';
	},
	/**
  * @description
  * Sets cookie at domain's root path.
  *
  * @param {String} cookieName - cookie name
  * @param {String} cookieValue - cookie value
  * @param {Integer} expDays - expiration day(s)
  *
  */
	setCookie: function setCookie(cookieName, cookieValue, expDays) {
		var d = new Date();
		d.setTime(d.getTime() + expDays * 24 * 60 * 60 * 1000);
		var expires = 'expires=' + d.toUTCString();
		try {
			document.cookie = cookieName + '=' + cookieValue + '; Path=/; ' + expires;
		} catch (e) {
			_logger2.default.warn({ description: 'Cookie cannot be set because browser is not capable.', cookieName: cookieName, func: 'setCookie', obj: 'cookiesUtil' });
		}
	},
	/**
  * @description
  * Deletes cookie at domain's root path.
  *
  * @param {String} cookieName - cookie name
  *
  */
	deleteCookie: function deleteCookie(cookieName) {
		if (undefined.getCookie(cookieName)) {
			document.cookie = cookieName + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			_logger2.default.debug({ func: 'deleteCookie', description: 'Cookie deleted.', cookieName: cookieName });
		} else {
			_logger2.default.warn({ description: 'Cookie cannot be deleted because it does not exist.', cookieName: cookieName, func: 'deleteCookie', obj: 'cookiesUtil' });
		}
	}
};
exports.default = cookiesUtil;
module.exports = exports['default'];