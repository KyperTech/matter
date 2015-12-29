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
		req.end(function (err, res) {
			if (!err) {
				// logger.log({description: 'Response:', response:res, func:'handleResponse', file: 'request'});
				return resolve(res.body);
			} else {
				if (err.status == 401) {
					_logger2.default.warn({ description: 'Unauthorized. You must be signed into make this request.', func: 'handleResponse' });
				}
				if (err && err.response) {
					return reject(err.response.text);
				}
				_logger2.default.warn({ description: 'Unauthorized. You must be signed into make this request.', error: err, func: 'handleResponse' });
				return reject(err);
			}
		});
	});
}
function addAuthHeader(req) {
	if (_token2.default.string) {
		req = req.set('Authorization', 'Bearer ' + _token2.default.string);
		// console.info({message: 'Set auth header', func: 'addAuthHeader', file: 'request'});
	}
	return req;
}
module.exports = exports['default'];