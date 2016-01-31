'use strict';

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _keys = require('lodash/keys');

var _keys2 = _interopRequireDefault(_keys);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = {
	log: function log(logData) {
		var msgArgs = buildMessageArgs(logData);
		if (_config2.default.logLevel === 'trace') {
			runConsoleMethod('log', msgArgs);
		}
	},
	debug: function debug(logData) {
		var msgArgs = buildMessageArgs(logData);
		if (_config2.default.logLevel === 'trace' || _config2.default.logLevel === 'debug') {
			runConsoleMethod('debug', msgArgs);
		}
	},
	info: function info(logData) {
		if (_config2.default.logLevel === 'trace' || _config2.default.logLevel === 'debug' || _config2.default.logLevel === 'info') {
			var msgArgs = buildMessageArgs(logData);
			runConsoleMethod('info', msgArgs);
		}
	},
	warn: function warn(logData) {
		var msgArgs = buildMessageArgs(logData);
		if (_config2.default.logLevel === 'trace' || _config2.default.logLevel === 'debug' || _config2.default.logLevel === 'info' || _config2.default.logLevel === 'warn') {
			runConsoleMethod('warn', msgArgs);
		}
	},
	error: function error(logData) {
		var msgArgs = buildMessageArgs(logData);
		if (_config2.default.logLevel === 'trace' || _config2.default.logLevel === 'debug' || _config2.default.logLevel === 'info' || _config2.default.logLevel === 'warn' || _config2.default.logLevel === 'error' || _config2.default.logLevel === 'fatal') {
			runConsoleMethod('error', msgArgs);
		}
	}
};

exports.default = logger;

function runConsoleMethod(methodName, methodData) {
	//Safley run console methods or use console log
	if (methodName && console[methodName]) {
		return console[methodName].apply(console, methodData);
	} else {
		return console.log.apply(console, methodData);
	}
}
function buildMessageArgs(logData) {
	var msgStr = '';
	var msgObj = {};
	//TODO: Attach time stamp
	//Attach location information to the beginning of message
	if ((0, _isObject2.default)(logData)) {
		(function () {
			if (logData.func) {
				if (logData.obj) {
					//Object and function provided
					msgStr += '[' + logData.obj + '.' + logData.func + '()]\n ';
				} else if (logData.file) {
					msgStr += '[' + logData.file + ' > ' + logData.func + '()]\n ';
				} else {
					msgStr += '[' + logData.func + '()]\n ';
				}
			}
			var hideList = ['func', 'obj', 'file'];
			//Print each key and its value other than obj and func
			(0, _each2.default)((0, _omit2.default)((0, _keys2.default)(logData), hideList), function (key) {
				if (hideList.indexOf(key) === -1) {
					if (key == 'description' || key == 'message') {
						return msgStr += logData[key];
					}
					msgObj[key] = logData[key];
				}
			});
			msgStr += '\n';
		})();
	} else if ((0, _isString2.default)(logData)) {
		msgStr = logData;
	}
	return [msgStr, msgObj];
}
module.exports = exports['default'];