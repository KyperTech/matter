'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.get = get;
exports.post = post;
exports.put = put;
exports.del = del;

require('babel-polyfill');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _token = require('./token');

var _token2 = _interopRequireDefault(_token);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function get(endpoint, queryData) {
	var req = _superagent2.default.get(endpoint);
	if (queryData) {
		req.query(queryData);
	}
	req = addAuthHeader(req);
	return handleResponse(req);
}

function post(endpoint, data) {
	var imageData = data && data.files ? handleFiles(data) : null;
	var req = _superagent2.default.post(endpoint);
	req = addAuthHeader(req);
	req.send(imageData || data);
	return handleResponse(req);
}

function put(endpoint, data) {
	var imageData = data && data.files ? handleFiles(data) : null;
	var req = _superagent2.default.put(endpoint);
	req = addAuthHeader(req);
	req.send(imageData || data);
	return handleResponse(req);
}

function del(endpoint, data) {
	var req = _superagent2.default.del(endpoint, data);
	req = addAuthHeader(req);
	return handleResponse(req);
}

var handleResponse = function () {
	var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req) {
		var res, response, error;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						if (!(typeof req.end !== 'function')) {
							_context.next = 3;
							break;
						}

						_logger2.default.warn({
							description: 'req.end is not a function', func: 'handleResponse'
						});
						throw new Error('req.end is not a function');

					case 3:
						_context.prev = 3;
						_context.next = 6;
						return req.end();

					case 6:
						res = _context.sent;

						if (!res.error) {
							_context.next = 10;
							break;
						}

						_logger2.default.error({
							description: 'Error in request.', error: res.error,
							file: 'request', func: 'handleResponse'
						});
						throw new Error(res.error.toString() || res.error);

					case 10:
						return _context.abrupt('return', res.body);

					case 13:
						_context.prev = 13;
						_context.t0 = _context['catch'](3);

						if (_context.t0.status == 401) {
							_logger2.default.warn({
								description: 'Unauthorized. You must be signed into make this request.',
								func: 'handleResponse'
							});
						}
						response = _context.t0.response;
						error = response && response.body ? response.body : _context.t0;

						_logger2.default.error({
							description: 'Error in request.', error: error,
							file: 'request', func: 'handleResponse'
						});
						throw error || _context.t0;

					case 20:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this, [[3, 13]]);
	}));

	return function handleResponse(_x) {
		return ref.apply(this, arguments);
	};
}();
/**
 * @description Add auth header to request
 * @param {Object} request - Request object on which to add auth header
 */

function addAuthHeader(req) {
	if (_token2.default.string) {
		req = req.set('Authorization', 'Bearer ' + _token2.default.string);
		// logger.debug({
		// 	message: 'Set auth header', token: token.string,
		// 	func: 'addAuthHeader', file: 'request'
		// });
	}
	return req;
}
/**
 * @description Turn array of files into FormData for a server request
 * @param {Array} files Array of file objects
 */
function handleFiles(files) {
	var filesData = new FormData();
	files.forEach(function (fileObj, i) {
		if (fileObj.key && fileObj.file) {
			filesData.append(fileObj.key || 'image', fileObj.file);
		}
	});
	return filesData;
}