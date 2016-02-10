import 'babel-polyfill';
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

async function handleResponse(req) {
	if (typeof req.end !== 'function') {
		logger.warn({
			description: 'req.end is not a function', func: 'handleResponse'
		});
		throw new Error('req.end is not a function');
	}
	try {
		const res = await req.end();
		if(res.error){
			logger.error({
				description: 'Error in request.', error: res.error,
				file: 'request', func: 'handleResponse'
			});
			throw new Error(res.error.toString() || res.error);
		}
		return res.body;
	} catch(errorRes) {
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
		throw error || errorRes;
	}
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
	files.forEach((fileObj, i) => {
		if(fileObj.key && fileObj.file){
			filesData.append(fileObj.key || 'image', fileObj.file);
		}
	});
	return filesData;
}
