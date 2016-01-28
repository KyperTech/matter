'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _token = require('./token');

var _token2 = _interopRequireDefault(_token);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = {
	get: function get(endpoint, queryData) {
		var req = _superagent2.default.get(endpoint);
		if (queryData) {
			req.query(queryData);
		}
		req = addAuthHeader(req);
		return handleResponse(req);
	},
	post: function post(endpoint, data) {
		var req = _superagent2.default.post(endpoint).send(data);
		req = addAuthHeader(req);
		return handleResponse(req);
	},
	put: function put(endpoint, data) {
		var req = _superagent2.default.put(endpoint, data);
		req = addAuthHeader(req);
		return handleResponse(req);
	},
	del: function del(endpoint, data) {
		var req = _superagent2.default.put(endpoint, data);
		req = addAuthHeader(req);
		return handleResponse(req);
	}
};

exports.default = request;

function handleResponse(req) {
	return new Promise(function (resolve, reject) {
		if (typeof req.end !== 'function') {
			_logger2.default.warn({
				description: 'req.end is not a function', func: 'handleResponse'
			});
			return reject('req.end is not a function');
		}
		req.end(function (errorRes, res) {
			_logger2.default.debug({
				message: 'Response recieved.', response: res, errorResponse: errorRes,
				func: 'addAuthHeader', file: 'request'
			});
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
			try {
				resolve(JSON.parse(res.body));
			} catch (err) {
				resolve(res.body);
			}
		});
	});
}
function addAuthHeader(req) {
	if (_token2.default.string) {
		req = req.set('Authorization', 'Bearer ' + _token2.default.string);
		_logger2.default.debug({
			message: 'Set auth header', token: _token2.default.string,
			func: 'addAuthHeader', file: 'request'
		});
	}
	return req;
}
module.exports = exports['default'];