import logger from './logger';
import token from './token';
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
		var req = superagent.put(endpoint, data);
		req = addAuthHeader(req);
		return handleResponse(req);
	},
	del(endpoint, data) {
		var req = superagent.put(endpoint, data);
		req = addAuthHeader(req);
		return handleResponse(req);
	}
};

export default request;

function handleResponse(req) {
	return new Promise((resolve, reject) => {
		if (typeof req.end !== 'function') {
			logger.warn({
				description: 'req.end is not a function', func: 'handleResponse'
			});
			return reject('req.end is not a function');
		}
		req.end((errorRes, res) => {
			if (errorRes) {
				let error = errorRes.response.body.error ? errorRes.response.body.error : errorRes.response.body;
				logger.warn({
					description: 'Error in request.', error,
					errorRes, func: 'handleResponse'
				});
				if (errorRes.status == 401) {
					logger.warn({
						description: 'Unauthorized. You must be signed into make this request.',
						func: 'handleResponse'
					});
				}
				return reject(error.message || error);
			}
			try {
				let response = JSON.parse(res.body);
				resolve(response);
			} catch(err) {
				resolve(res.body);
			}
		});
	});
}
function addAuthHeader(req) {
	if (token.string) {
		req = req.set('Authorization', 'Bearer ' + token.string);
		// logger.info({message: 'Set auth header', func: 'addAuthHeader', file: 'request'});
	}
	return req;
}
