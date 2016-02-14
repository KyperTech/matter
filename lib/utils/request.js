'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.get = get;
exports.post = post;
exports.put = put;
exports.del = del;

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _token = require('./token');

var _token2 = _interopRequireDefault(_token);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function handleResponse(req) {
	return new Promise(function (resolve, reject) {
		if (typeof req.end !== 'function') {
			_logger2.default.warn({
				description: 'req.end is not a function', func: 'handleResponse'
			});
			return reject({ message: 'req.end is not a function' });
		}
		req.end(function (errorRes, res) {
			if (errorRes) {
				if (errorRes.status == 401) {
					_logger2.default.warn({
						description: 'Unauthorized. You must be signed into make this request.',
						func: 'handleResponse'
					});
				}
				var response = errorRes.response;

				var error = response && response.body ? response.body : errorRes;
				_logger2.default.error({
					description: 'Error in request.', error: error,
					file: 'request', func: 'handleResponse'
				});
				return reject(error || errorRes);
			}
			if (res.error) {
				_logger2.default.error({
					description: 'Error in request.', error: res.error,
					file: 'request', func: 'handleResponse'
				});
				return reject(res.error);
			}
			// logger.debug({
			// 	message: 'Successful response recieved.', response: res.body,
			// 	func: 'handleResponse', file: 'request'
			// });
			resolve(res.body);
		});
	});
}
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
	files.forEach(function (fileObj) {
		if (fileObj.key && fileObj.file) {
			filesData.append(fileObj.key || 'image', fileObj.file);
		}
	});
	return filesData;
}