import config from '../config';
import {
	each,
	omit,
	keys,
	isObject,
	isString
} from 'lodash';

let logger = {
	log(logData) {
		let msgArgs = buildMessageArgs(logData);
		if (config.logLevel === 'trace') {
			runConsoleMethod('log', msgArgs);
		}
	},
	debug(logData) {
		let msgArgs = buildMessageArgs(logData);
		if (config.logLevel === 'trace' || config.logLevel === 'debug') {
			runConsoleMethod('debug', msgArgs);
		}
	},
	info(logData) {
		if (config.logLevel === 'trace'  || config.logLevel === 'debug' || config.logLevel === 'info') {
			let msgArgs = buildMessageArgs(logData);
			runConsoleMethod('info', msgArgs);
		}
	},
	warn(logData) {
		let msgArgs = buildMessageArgs(logData);
		if (config.logLevel === 'trace' || config.logLevel === 'debug' || config.logLevel === 'info' || config.logLevel === 'warn') {
			runConsoleMethod('warn', msgArgs);
		}
	},
	error(logData) {
		let msgArgs = buildMessageArgs(logData);
		if (config.logLevel === 'trace' || config.logLevel === 'debug' || config.logLevel === 'info' || config.logLevel === 'warn' || config.logLevel === 'error' || config.logLevel === 'fatal') {
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
	let msgStr = '';
	let msgObj = {};
	//TODO: Attach time stamp
	//Attach location information to the beginning of message
	if (isObject(logData)) {
		if (logData.func) {
			if (logData.obj) {
				//Object and function provided
				msgStr += `[${logData.obj}.${logData.func}()]\n `;
			} else if (logData.file) {
				msgStr += `[${logData.file} > ${logData.func}()]\n `;
			} else {
				msgStr += `[${logData.func}()]\n `;
			}
		}
		const hideList = ['func', 'obj', 'file'];
		//Print each key and its value other than obj and func
		each(omit(keys(logData), hideList), key => {
			if (hideList.indexOf(key) === -1) {
				if (key == 'description' || key == 'message') {
					return msgStr += logData[key];
				}
				msgObj[key] = logData[key];
			}
		});
		msgStr += '\n';
	} else if (isString(logData)) {
		msgStr = logData;
	}
	return [msgStr, msgObj];
}
