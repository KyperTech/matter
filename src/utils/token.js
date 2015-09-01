import config from '../config';
import logger from './logger';
import storage from './envStorage';

let token = {
	get string() {
		return storage.getItem(config.tokenName);
	},
	get data() {
		//TODO: Decode token
	},
	set string(tokenStr) {
		logger.log({description: 'Token was set.', token: tokenStr, func: 'string', obj: 'token'});
		return storage.setItem(config.tokenName, tokenStr);
	},
	save(tokenStr) {
		this.string = tokenStr;
		storage.setItem(config.tokenName, tokenStr);
	},
	delete() {
		storage.removeItem(config.tokenName);
		logger.log({description: 'Token was removed.', func: 'delete', obj: 'token'});
	}
};

export default token;
