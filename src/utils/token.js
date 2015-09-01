import config from '../config';
import logger from './logger';
import storage from './envStorage';

class token {
	get string() {
		return storage.getItem(config.tokenName);
	}
	get data() {
		//TODO: Decode token
	}
	string(tokenStr) {
		console.log('Token was set', tokenStr);
		return storage.setItem(config.tokenName, tokenStr);
	}
	save(tokenStr) {
		this.string = tokenStr;
		storage.setItem(config.tokenName, tokenStr);
	}
	delete() {
		storage.removeItem(config.tokenName);
		console.log('Token was removed');
	}
}

export default token;
