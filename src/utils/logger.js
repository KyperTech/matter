import config from '../config';
import _ from 'lodash';

let logger = {
	log(logData) {
		let msgArgs = buildMessageArgs(logData);
		if (config.envName == 'production') {
			runConsoleMethod('log', msgArgs);
		} else {
			runConsoleMethod('log', msgArgs);
		}
	},
	info(logData) {
		let msgArgs = buildMessageArgs(logData);
		if (config.envName == 'production') {
			runConsoleMethod('info', msgArgs);
		} else {
			runConsoleMethod('info', msgArgs);
		}
	},
	warn(logData) {
		let msgArgs = buildMessageArgs(logData);
		if (config.envName == 'production') {
			runConsoleMethod('warn', msgArgs);
		} else {
			runConsoleMethod('warn', msgArgs);
		}
	},
	debug(logData) {
		let msgArgs = buildMessageArgs(logData);
		if (config.envName == 'production') {
			// runConsoleMethod('debug', msgArgs);
			//Do not display console debugs in production
		} else {
			runConsoleMethod('debug', msgArgs);
		}
	},
	error(logData) {
		let msgArgs = buildMessageArgs(logData);
		if (config.envName == 'production') {
			//TODO: Log to external logger
			runConsoleMethod('error', msgArgs);
		} else {
			runConsoleMethod('error', msgArgs);
		}
	}
};

export default logger;
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
	if (_.isObject(logData)) {
		if (_.has(logData, 'func')) {
			if (_.has(logData, 'obj')) {
				msgStr += '[' + logData.obj + '.' + logData.func + '()] ';
			} else if (_.has(logData, 'file')) {
				msgStr += '[' + logData.file + ' > ' + logData.func + '()] ';
			} else {
				msgStr += '[' + logData.func + '()] ';
			}
		}
		//Print each key and its value other than obj and func
		_.each(_.omit(_.keys(logData)), function(key, ind, list) {
			if (key != 'func' && key != 'obj') {
				if (key == 'description' || key == 'message') {
					msgStr += logData[key];
				} else if (_.isString(logData[key])) {
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
	} else if (_.isString(logData)) {
		msgStr = logData;
	}
	var msg = [msgStr, msgObj];

	return msg;
}
