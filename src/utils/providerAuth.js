import request from './request';
import logger from './logger';
import * as dom from './dom';
import config from '../config';
import { OAuth, User } from 'oauthio-web';
import 'babel-polyfill';
export async function signup(provider) {
	initializeOAuth();
	try {
		const res = await OAuth.popup(provider, {cache: true})
		console.log('res', res);
		const newUser = await User.signup(res);
		console.log('user:', newUser);
		return newUser;
	} catch(error) {
		console.error('error in oauth request', error);
		return error;
	}
}

export async function getAccount(provider) {
	initializeOAuth();
	try {
		const result = await OAuth.popup(provider, {cache: true})
		console.log('result', result);
		return await result.me();
	} catch(error) {
		console.error('error in oauth request', error);
	}
}

export async function signupWithServer(provider) {
	initializeOAuth();
	try {
		const params = await request.get(`${config.serverUrl}/stateToken`);
		console.log('stateToken gotten:', params );
		const result = await OAuth.popup(provider, { state: params.token })
		console.log('code from result:', result.code);
		return await request.put(`${config.serverUrl}/auth`, { code: result.code });
	} catch(err) {
		console.error('error with request', err.toString());
	}
}
export function initializeOAuth() {
	OAuth.initialize(config.oauthioKey);
}
