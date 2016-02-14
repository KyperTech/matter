import logger from './logger';
import token from './token';
import superagent from 'superagent';

export function get(endpoint, queryData) {
	let req = superagent.get(endpoint);
	if (queryData) {
		req.query(queryData);
	}
	req = addAuthHeader(req);
	return handleResponse(req);
}

export function post(endpoint, data) {
	const imageData = (data && data.files) ? handleFiles(data) : null;
	let req = superagent.post(endpoint);
	req = addAuthHeader(req);
	req.send(imageData || data);
	return handleResponse(req);
}

export function put(endpoint, data) {
	const imageData = (data && data.files) ? handleFiles(data) : null;
	let req = superagent.put(endpoint);
	req = addAuthHeader(req);
	req.send(imageData || data);
	return handleResponse(req);
}

export function del(endpoint, data) {
	let req = superagent.del(endpoint, data);
	req = addAuthHeader(req);
	return handleResponse(req);
}

function handleResponse(req) {
	return new Promise((resolve, reject) => {
		if (typeof req.end !== 'function') {
			logger.warn({
				description: 'req.end is not a function', func: 'handleResponse'
			});
			return reject({message: 'req.end is not a function'});
		}
		req.end((errorRes, res) => {
			if (errorRes) {
				if (errorRes.status == 401) {
					logger.warn({
						description: 'Unauthorized. You must be signed into make this request.',
						func: 'handleResponse'
					});
				}
				const { response } = errorRes;
				const error = (response && response.body) ? response.body : errorRes;
				logger.error({
					description: 'Error in request.', error,
					file: 'request', func: 'handleResponse'
				});
				return reject(error || errorRes);
			}
			if(res.error){
				logger.error({
					description: 'Error in request.', error: res.error,
					file: 'request', func: 'handleResponse'
				});
				return reject(res.error);
			}
			// logger.debug({
			// 	message: 'Successful response recieved.', response: res.body,
			// 	func: 'handleResponse', file: 'request'
			// });
			resolve(res.body);
		});
	});
}
/**
 * @description Add auth header to request
 * @param {Object} request - Request object on which to add auth header
 */
function addAuthHeader(req) {
	if (token.string) {
		req = req.set('Authorization', 'Bearer ' + token.string);
		// logger.debug({
		// 	message: 'Set auth header', token: token.string,
		// 	func: 'addAuthHeader', file: 'request'
		// });
	}
	return req;
}

/**
 * @description Turn array of files into FormData for a server request
 * @param {Array} files Array of file objects
 */
function handleFiles(files) {
	let filesData = new FormData();
	files.forEach(fileObj => {
		if(fileObj.key && fileObj.file){
			filesData.append(fileObj.key || 'image', fileObj.file);
		}
	});
	return filesData;
}
