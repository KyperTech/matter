'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.loadCss = loadCss;
exports.loadJs = loadJs;
exports.asyncLoadJs = asyncLoadJs;
exports.getQueryParam = getQueryParam;

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description
 * Appends given css source to DOM head.
 *
 * @param {String} src - url src for css to append
 *
 */
function loadCss(src) {
	if (typeof document == 'undefined') {
		_logger2.default.error({ description: 'Document does not exsist to load assets into.', func: 'loadCss', obj: 'dom' });
		throw new Error('Document object is required to load assets.');
	} else {
		var css = document.createElement('link');
		css.rel = 'stylesheet';
		css.type = 'text/css';
		css.href = src;
		document.getElementsByTagName('head')[0].insertBefore(css, document.getElementsByTagName('head')[0].firstChild);
		_logger2.default.log({ description: 'CSS was loaded into document.', element: css, func: 'loadCss', obj: 'dom' });
		return css; //Return link element
	}
}
/**
 * @description
 * Appends given javascript source to DOM head.
 *
 * @param {String} src - url src for javascript to append
 *
 */
function loadJs(src) {
	if (typeof window == 'undefined' || !(0, _lodash.has)(window, 'document')) {
		_logger2.default.error({ description: 'Document does not exsist to load assets into.', func: 'loadCss', obj: 'dom' });
		throw new Error('Document object is required to load assets.');
	} else {
		var js = window.document.createElement('script');
		js.src = src;
		js.type = 'text/javascript';
		window.document.getElementsByTagName('head')[0].appendChild(js);
		_logger2.default.log({ description: 'JS was loaded into document.', element: js, func: 'loadCss', obj: 'dom' });
		return js; //Return script element
	}
}
/**
 * @description
 * Appends given javascript source to DOM head.
 *
 * @param {String} src - url src for javascript to append
 *
 */
function asyncLoadJs(src) {
	if (typeof window == 'undefined' || !(0, _lodash.has)(window, 'document')) {
		_logger2.default.error({ description: 'Document does not exsist to load assets into.', func: 'loadCss', obj: 'dom' });
		throw new Error('Document object is required to load assets.');
	} else {
		var js = window.document.createElement('script');
		js.src = src;
		js.type = 'text/javascript';
		window.document.getElementsByTagName('head')[0].appendChild(js);
		_logger2.default.log({ description: 'JS was loaded into document.', element: js, func: 'loadCss', obj: 'dom' });
		return new Promise(function (resolve) {
			window.setTimeout(resolve, 30);
		});
	}
}
function getQueryParam(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	    results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}