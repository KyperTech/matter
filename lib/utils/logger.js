Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

//Set default log level to debug
var logLevel = 'debug';
//Set log level from config

var logger = {
	log: function log(logData) {
		var msgArgs = buildMessageArgs(logData);
		if (_config2['default'].envName == 'production') {
			runConsoleMethod('log', msgArgs);
		} else {
			runConsoleMethod('log', msgArgs);
		}
	},
	info: function info(logData) {
		var msgArgs = buildMessageArgs(logData);
		if (_config2['default'].envName == 'production') {
			runConsoleMethod('info', msgArgs);
		} else {
			runConsoleMethod('info', msgArgs);
		}
	},
	warn: function warn(logData) {
		var msgArgs = buildMessageArgs(logData);
		if (_config2['default'].envName == 'production') {
			runConsoleMethod('warn', msgArgs);
		} else {
			runConsoleMethod('warn', msgArgs);
		}
	},
	debug: function debug(logData) {
		var msgArgs = buildMessageArgs(logData);
		if (_config2['default'].envName == 'production') {
			// runConsoleMethod('debug', msgArgs);
			//Do not display console debugs in production
		} else {
				runConsoleMethod('debug', msgArgs);
			}
	},
	error: function error(logData) {
		var msgArgs = buildMessageArgs(logData);
		if (_config2['default'].envName == 'production') {
			//TODO: Log to external logger
			runConsoleMethod('error', msgArgs);
		} else {
			runConsoleMethod('error', msgArgs);
		}
	}
};

exports['default'] = logger;

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
	if (_lodash2['default'].isObject(logData)) {
		if (logLevel == 'debug') {
			if (_lodash2['default'].has(logData, 'func')) {
				if (_lodash2['default'].has(logData, 'obj')) {
					//Object and function provided
					msgStr += '[' + logData.obj + '.' + logData.func + '()]\n ';
				} else if (_lodash2['default'].has(logData, 'file')) {
					msgStr += '[' + logData.file + ' > ' + logData.func + '()]\n ';
				} else {
					msgStr += '[' + logData.func + '()]\n ';
				}
			}
		}
		//Print each key and its value other than obj and func
		_lodash2['default'].each(_lodash2['default'].omit(_lodash2['default'].keys(logData)), function (key) {
			if (key != 'func' && key != 'obj') {
				if (key == 'description' || key == 'message') {
					msgStr += logData[key];
				} else if (_lodash2['default'].isString(logData[key])) {
					// msgStr += key + ': ' + logData[key] + ', ';
					msgObj[key] = logData[key];
				} else {
					//Print objects differently
					// msgStr += key + ': ' + logData[key] + ', ';
					msgObj[key] = logData[key];
				}
			}
		});
		msgStr += '\n';
	} else if (_lodash2['default'].isString(logData)) {
		msgStr = logData;
	}
	var msg = [msgStr, msgObj];

	return msg;
}
module.exports = exports['default'];