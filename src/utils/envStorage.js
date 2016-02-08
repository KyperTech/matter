import logger from './logger';
import { isObject } from 'lodash';
let data = {};
/** Gets whether or not local storage exists.
 * @param {String} itemName The items name
 * @param {String} itemValue The items value
 * @return {Boolean}
 *
 */
export function localExists() {
	const testKey = 'test';
	if (typeof window != 'undefined' && typeof window.sessionStorage != 'undefined') {
		try {
			window.sessionStorage.setItem(testKey, '1');
			window.sessionStorage.removeItem(testKey);
			return true;
		} catch (error) {
			logger.error({
				description: 'Error saving to session storage', error,
				obj: 'storage', func: 'localExists'
			});
			return false;
		}
	}
	return false;
}

/**
 * @description
 * Safley sets item to session storage. Alias: item()
 *
 * @param {String} itemName The items name
 * @param {String} itemValue The items value
 *
 */
export function setItem(itemName, itemValue) {
	data[itemName] = itemValue;
	if (localExists()) {
		//Convert object to string
		if (isObject(itemValue)) {
			itemValue = JSON.stringify(itemValue);
		}
		window.sessionStorage.setItem(itemName, itemValue);
	}
}

/**
 * @description
 * Safley gets an item from session storage. Alias: item()
 *
 * @param {String} itemName The items name
 * @return {String}
 *
 */
export function getItem(itemName) {
	if (data[itemName]) {
		return data[itemName];
	} else if (localExists()) {
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
}

/**
 * @description Safley removes item from session storage.
 *
 * @param {String} itemName - The items name
 *
 */
export function removeItem(itemName) {
	//TODO: Only remove used items
	if (data[itemName]) {
		data[itemName] = null;
	}
	if (localExists() && getItem(itemName)) {
		try {
			//Clear session storage
			window.sessionStorage.removeItem(itemName);
		} catch (error) {
			logger.warn({
				description: 'Error removing item from session storage', error,
				obj: 'storage', func: 'removeItem'
			});
		}
	}
}

/**
 * @description
 * Safley removes item from session storage.
 *
 * @param {String} itemName the items name
 * @param {String} itemValue the items value
 *
 */
export function clear() {
	//TODO: Only remove used items
	data = {};
	if (localExists()) {
		try {
				//Clear session storage
			window.sessionStorage.clear();
		} catch (err) {
			logger.warn({
				description: 'Session storage could not be cleared.', error: err
			});
		}
	}
}
