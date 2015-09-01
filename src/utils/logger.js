import config from '../config';
import _ from 'underscore';

let logger = {
	log() {
		let msgStr = buildMessageStr(logData);
		if (config.envName == 'local') {
			console.log(logData);
		} else {
			console.log(msgStr);
		}
	},
	info() {
		let msgStr = buildMessageStr(logData);
		if (config.envName == 'local') {
			console.info(logData);
		} else {
			console.info(msgStr);
		}
	},
	warn() {
		let msgStr = buildMessageStr(logData);
		if (config.envName == 'local') {
			console.warn(logData);
		} else {
			console.warn(msgStr);
		}
	},
	debug() {
		let msgStr = buildMessageStr(logData);
		if (config.envName == 'local') {
			console.log(logData);
		} else {
			console.log(msgStr);
		}
	},
	error() {
		let msgStr = buildMessageStr(logData);
		if (config.envName == 'local') {
			console.error(logData);
		} else {
			// console.error(msgStr);
			//TODO: Log to external logger
		}
	}
};

export default logger;

function buildMessageStr(logData) {
	var msg = '';
	//TODO: Attach time stamp
	if (_.isObject(logData)) {
		if (_.has(logData, 'func')) {
			if (_.has(logData, 'obj')) {
				msg += '[' + logData.obj + '.' + logData.func + '()] ';
			} else if (_.has(logData, 'file')) {
				msg += '[' + logData.file + ' > ' + logData.func + '()] ';
			} else {
				msg += '[' + logData.func + '()] ';
			}
		}
		//Print each key and its value other than obj and func
		_.each(_.omit(_.keys(logData), 'obj', 'func'), function(key, ind, list) {
			if (_.isString(logData[key])) {
				msg += key + ': ' + logData[key] + ', ';
			} else {
				//Print objects differently
				msg += key + ': ' + logData[key] + ', ';
			}
			if (ind != list.length - 1) {
				msg += '\n';
			}
		});
	} else if (_.isString(logData)) {
		msg = logData;
	}
	return msg;
}
