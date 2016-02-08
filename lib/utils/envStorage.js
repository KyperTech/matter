'use strict';

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.localExists = localExists;
exports.setItem = setItem;
exports.getItem = getItem;
exports.removeItem = removeItem;
exports.clear = clear;

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var data = {};
/** Gets whether or not local storage exists.
 * @param {String} itemName The items name
 * @param {String} itemValue The items value
 * @return {Boolean}
 *
 */
function localExists() {
	var testKey = 'test';
	if (typeof window != 'undefined' && typeof window.sessionStorage != 'undefined') {
		try {
			window.sessionStorage.setItem(testKey, '1');
			window.sessionStorage.removeItem(testKey);
			return true;
		} catch (error) {
			_logger2.default.error({
				description: 'Error saving to session storage', error: error,
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
function setItem(itemName, itemValue) {
	data[itemName] = itemValue;
	if (localExists()) {
		//Convert object to string
		if ((0, _isObject2.default)(itemValue)) {
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
function getItem(itemName) {
	if (data[itemName]) {
		return data[itemName];
	} else if (localExists()) {
		var itemStr = window.sessionStorage.getItem(itemName);
		//Check that str is not null before parsing
		if (itemStr) {
			var isObj = false;
			var itemObj = null;
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
function removeItem(itemName) {
	//TODO: Only remove used items
	if (data[itemName]) {
		data[itemName] = null;
	}
	if (localExists() && getItem(itemName)) {
		try {
			//Clear session storage
			window.sessionStorage.removeItem(itemName);
		} catch (error) {
			_logger2.default.warn({
				description: 'Error removing item from session storage', error: error,
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
function clear() {
	//TODO: Only remove used items
	data = {};
	if (localExists()) {
		try {
			//Clear session storage
			window.sessionStorage.clear();
		} catch (err) {
			_logger2.default.warn({
				description: 'Session storage could not be cleared.', error: err
			});
		}
	}
}