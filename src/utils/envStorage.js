import config from '../config';
import logger from './logger';
import _ from 'lodash';

let data = {};

let storage = {
	/**
	 * @description
	 * Gets whether or not local storage exists.
	 *
	 * @param {String} itemName The items name
	 * @param {String} itemValue The items value
	 *
	 */
	get localExists() {
		const testKey = 'test';
		if (typeof window != 'undefined' && typeof window.sessionStorage != 'undefined') {
			try {
				window.sessionStorage.setItem(testKey, '1');
				window.sessionStorage.removeItem(testKey);
				return true;
			} catch (err) {
				logger.error({description: 'Error saving to session storage', error: err,  obj: 'storage', func: 'localExists'});
				return false;
			}
		} else {
			return false;
		}
	},
	/**
	 * @description
	 * Safley sets item to session storage.
	 *
	 * @param {String} itemName The items name
	 * @param {String} itemValue The items value
	 *
	 */
	item(itemName, itemValue) {
		return this.setItem(itemName, itemValue);
	},
	/**
	 * @description
	 * Safley sets item to session storage. Alias: item()
	 *
	 * @param {String} itemName The items name
	 * @param {String} itemValue The items value
	 *
	 */
	setItem(itemName, itemValue) {
		data[itemName] = itemValue;
		if (this.localExists) {
			//Convert object to string
			if (_.isObject(itemValue)) {
				itemValue = JSON.stringify(itemValue);
			}
			window.sessionStorage.setItem(itemName, itemValue);
		}
	},
	/**
	 * @description
	 * Safley gets an item from session storage. Alias: item()
	 *
	 * @param {String} itemName The items name
	 * @return {String}
	 *
	 */
	getItem(itemName) {
		if (data[itemName]) {
			return data[itemName];
		} else if (this.localExists) {
			let itemStr = window.sessionStorage.getItem(itemName);
			//Check that str is not null before parsing
			if (itemStr) {
				let isObj = false;
				let itemObj = null;
				//Try parsing to object
				try {
					itemObj = JSON.parse(itemStr);
					isObj = true;
				} catch (err) {
					// logger.log({message: 'String could not be parsed.', error: err, func: 'getItem', obj: 'storage'});
					//Parsing failed, this must just be a string
					isObj = false;
				}
				if (isObj) {
					return itemObj;
				}
			}
			return itemStr;
		} else {
			return null;
		}
	},
	/**
	 * @description
	 * Safley removes item from session storage.
	 *
	 * @param {String} itemName - The items name
	 *
	 */
	removeItem(itemName) {
		//TODO: Only remove used items
		if (data[itemName]) {
			data[itemName] = null;
		}
		if (this.localExists) {
			try {
				//Clear session storage
				window.sessionStorage.removeItem(itemName);
			} catch (err) {
				logger.error({description: 'Error removing item from session storage', error: err,  obj: 'storage', func: 'removeItem'});
			}
		}
	},
	/**
	 * @description
	 * Safley removes item from session storage.
	 *
	 * @param {String} itemName the items name
	 * @param {String} itemValue the items value
	 *
	 */
	clear() {
		//TODO: Only remove used items
		data = {};
		if (this.localExists) {
			try {
					//Clear session storage
				window.sessionStorage.clear();
			} catch (err) {
				logger.warn({description: 'Session storage could not be cleared.', error: err});
			}
		}
	},
	/**
	 * @description
	 * Safley sets cookie.
	 *
	 * @param {String} cookieName the items name
	 * @param {String} cookieValue the items value
	 *
	 */
	setCookie(cookieName, cookieValue) {
		let d = new Date();
		d.setTime(d.getTime() + (expDays*24*60*60*1000));
		let expires = 'expires=' + d.toUTCString();
		try {
			document.cookie = cookieName + '=' + cookieValue + '; Path=/; ' + expires;
		} catch (e) {
			logger.warn({description: 'Cookie cannot be set because browser is not capable.', cookieName: cookieName, func: ''});
		}
	},
	/**
	 * @description
	 * Safley gets cookie.
	 *
	 * @param {String} cookieName the items name
	 *
	 */
	getCookie(cookieName) {
		var value = '';
		if (cookieName.indexOf('*') >= 0) { //cookieName is a pattern
			value = {}; //patterns can have multiple matches
			for (var key in this.cookies) {
				var escapedName = cookieName.replace(/[-[\]{}()+?.\\^$|#\s]/g, '\\$&'); //escape special regex chars that may be in cookie name EXCEPT for '*'
				var patternedName = escapedName.replace('*','[^\\s]*'); //evaluate '*' wildcards in name as one or more non-space characters
				var re = new RegExp(patternedName);
				if (re.test(key)) {
					logger.debug({description:'Match found.', key:key, cookieName:cookieName, escapedName:escapedName, patternedName:patternedName, func:'getCookie', obj: 'envStorage'});
					value[key] = this.cookies[key];
				} else {
					logger.debug({description:'Match not found.', key:key, cookieName:cookieName, escapedName:escapedName, patternedName:patternedName, func:'getCookie', obj: 'envStorage'});
				}
			 }
		 } else {
			if (_.has(this.cookies, cookieName)) { //check for cookieName in cookies list
				value =  this.cookies[cookieName]; //maintain String return value for backward compatibility
			}
		}
		if (value) {
			log.debug({description:'Cookie(s) found.', cookieName: cookieName, cookieValue: value, func:'getCookie', obj: 'envStorage'});
		} else {
			log.warn({description:'Cookie(s) cannot be found.', cookieName: cookieName, func:'getCookie', obj: 'envStorage'});
		}
		return value;
	},
	/**
   * @description
   * Parses document.cookie into object with name-value pairs.
   *
   */
  get cookies() {
    let cookieParts = document.cookie.split(";");
    let cookies = {};
    for (var i = 0; i< cookieParts.length; i++) {
      let cookie = cookieParts[i];
      let equalsPos = cookie.indexOf("=");
    	let name = _.trim(decodeURIComponent(cookie.slice(0, equalsPos)));
      let value = decodeURIComponent(cookie.slice(equalsPos + 1));
      let cookies[name] = value;
    }
    return cookies;
  },

};

export default storage;
