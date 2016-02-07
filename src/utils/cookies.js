import log from './logger';
import { includes } from 'lodash';

/**
 * @description Gets cookie value by cookie name.
 *
 * @param {String} cookieName - cookie name
 * @returns {String} cookieValue - value for given cookie name
 *
 */
export function getCookie (cookieName){
	let name = cookieName + '=';
	let ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {c = c.substring(1);}
		try {
			if (includes(c, name)) {return c.substring(name.length, c.length);}
		} catch (error) {
			log.warn({
				description: 'Cookie cannot be loaded.', cookieName,
				error, func: 'getCookie', obj: 'cookiesUtil'
			});
			return '';
		}
	}
	return '';
}

/**
 * @description Sets cookie at domain's root path.
 *
 * @param {String} cookieName - cookie name
 * @param {String} cookieValue - cookie value
 * @param {Integer} expDays - expiration day(s)
 *
 */
export function setCookie (cookieName, cookieValue, expDays){
	const d = new Date();
	d.setTime(d.getTime() + (expDays * 24 * 60 * 60 * 1000));
	const expires = 'expires=' + d.toUTCString();
	try {
		document.cookie = cookieName + '=' + cookieValue + '; Path=/; ' + expires;
	} catch (e) {
		log.warn({
			description: 'Cookie cannot be set because browser is not capable.',
			cookieName, func: 'setCookie', obj: 'cookiesUtil'
		});
	}
}

/**
 * @description Deletes cookie at domain's root path.
 * @param {String} cookieName - cookie name
 *
 */
export function deleteCookie (cookieName){
	if (this.getCookie(cookieName)) {
		document.cookie = cookieName + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		log.debug({
			description: 'Cookie deleted.', cookieName, func: 'deleteCookie'
		});
	} else {
		log.warn({
			description: 'Cookie cannot be deleted because it does not exist.',
			cookieName, func: 'deleteCookie', obj: 'cookiesUtil'
		});
	}
}
