'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isBrowser = isBrowser;
exports.loadCss = loadCss;
exports.loadJs = loadJs;
exports.asyncLoadJs = asyncLoadJs;
exports.getQueryParam = getQueryParam;

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Checks to see if current context is a browser
 * @return {Boolean}
 */
function isBrowser() {
	return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * @description Appends given css source to DOM head.
 * @param {String} src - url src for css to append
 */
function loadCss(src) {
	if (!isBrowser()) {
		_logger2.default.error({
			description: 'Load CSS only works within browsers.',
			func: 'loadCss', obj: 'dom'
		});
		throw new Error('Document object is required to load assets.');
	}
	var css = document.createElement('link');
	css.rel = 'stylesheet';
	css.type = 'text/css';
	css.href = src;
	document.getElementsByTagName('head')[0].insertBefore(css, document.getElementsByTagName('head')[0].firstChild);
	_logger2.default.debug({
		description: 'CSS was loaded into document.', element: css,
		func: 'loadCss', obj: 'dom'
	});
	return css; //Return link element
}

/**
 * @description Appends given javascript source to DOM head.
 * @param {String} src - url src for javascript to append
 */
function loadJs(src) {
	if (!isBrowser()) {
		_logger2.default.error({
			description: 'Document does not exsist to load assets into.',
			func: 'loadJs', obj: 'dom'
		});
		throw new Error('Document object is required to load assets.');
	}
	var js = window.document.createElement('script');
	js.src = src;
	js.type = 'text/javascript';
	window.document.getElementsByTagName('head')[0].appendChild(js);
	_logger2.default.debug({
		description: 'JS was loaded into document.', element: js,
		func: 'loadJs', obj: 'dom'
	});
	return js; //Return script element
}

/**
 * @description Appends given javascript source to DOM head.
 * @param {String} src - url src for javascript to append
 *
 */
function asyncLoadJs(src) {
	if (!isBrowser()) {
		_logger2.default.error({
			description: 'Document does not exsist to load assets into.',
			func: 'asyncLoadJs', obj: 'dom'
		});
		throw new Error('Document object is required to load assets.');
	}
	var js = window.document.createElement('script');
	js.src = src;
	js.type = 'text/javascript';
	window.document.getElementsByTagName('head')[0].appendChild(js);
	_logger2.default.log({
		description: 'JS was loaded into document.', element: js,
		func: 'asyncLoadJs', obj: 'dom'
	});
	return new Promise(function (resolve) {
		window.setTimeout(resolve, 200);
	});
}

/**
 * @description Get query param from current location/url
 * @param {String} name - Name of query parameter to get
 *
 */
function getQueryParam(name) {
	if (!isBrowser()) {
		_logger2.default.error({
			description: 'Browser is required to get query params.',
			func: 'asyncLoadJs', obj: 'dom'
		});
		throw new Error('Query parameters are only available within browsers.');
	}
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	var results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}