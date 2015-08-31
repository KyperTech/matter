import config from '../config';
import browserStorage from './browserStorage';
import superagent from 'superagent';

let request = {
	get(endpoint, queryData) {
		var req = superagent.get(endpoint);
		if (queryData) {
			req.query(queryData);
		}
		req = addAuthHeader(req);
		return handleResponse(req);
	},
	post(endpoint, data) {
		var req = superagent.post(endpoint).send(data);
		req = addAuthHeader(req);
		return handleResponse(req);
	},
	put(endpoint, data) {
		var req = superagent.put(endpoint).send(data);
		req = addAuthHeader(req);
		return handleResponse(req);
	},
	del(endpoint, data) {
		var req = superagent.put(endpoint).send(data);
		req = addAuthHeader(req);
		return handleResponse(req);
	}

};

export default request;

function handleResponse(req) {
	return new Promise((resolve, reject) => {
		req.end((err, res) => {
			if (!err) {
				// console.log('Response:', res);
				return resolve(res.body);
			} else {
				if (err.status == 401) {
					console.warn('Unauthorized. You must be signed into make this request.');
				}
				return reject(err);
			}
		});
	});
}
function addAuthHeader(req) {
	if (browserStorage.getItem(config.tokenName)) {
		req = req.set('Authorization', 'Bearer ' + browserStorage.getItem(config.tokenName));
		console.log('Set auth header');
	}
	return req;
}
