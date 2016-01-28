'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _lodash = require('lodash');

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
	if ((0, _lodash.isObject)(logData)) {
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
			(0, _lodash.each)((0, _lodash.omit)((0, _lodash.keys)(logData)), function (key) {
				if (hideList.indexOf(key) === -1) {
					if (key == 'description' || key == 'message') {
						return msgStr += logData[key];
					}
					msgObj[key] = logData[key];
				}
			});
			msgStr += '\n';
		})();
	} else if (_.isString(logData)) {
		msgStr = logData;
	}

	return [msgStr, msgObj];
}
module.exports = exports['default'];