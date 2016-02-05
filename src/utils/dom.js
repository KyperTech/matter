import logger from './logger';
import { has } from 'lodash';
/**
 * @description
 * Appends given css source to DOM head.
 *
 * @param {String} src - url src for css to append
 *
 */
export function loadCss(src) {
	if (typeof document == 'undefined') {
		logger.error({description: 'Document does not exsist to load assets into.', func: 'loadCss', obj: 'dom'});
		throw new Error('Document object is required to load assets.');
	} else {
		let css = document.createElement('link');
		css.rel = 'stylesheet';
		css.type = 'text/css';
		css.href = src;
		document.getElementsByTagName('head')[0].insertBefore(css, document.getElementsByTagName('head')[0].firstChild);
		logger.log({description: 'CSS was loaded into document.', element: css, func: 'loadCss', obj: 'dom'});
		return css; //Return link element
	}
}
/**
 * @description
 * Appends given javascript source to DOM head.
 *
 * @param {String} src - url src for javascript to append
 *
 */
export function loadJs(src) {
	if (typeof window == 'undefined' || !has(window, 'document')) {
		logger.error({description: 'Document does not exsist to load assets into.', func: 'loadJs', obj: 'dom'});
		throw new Error('Document object is required to load assets.');
	} else {
		let js = window.document.createElement('script');
		js.src = src;
		js.type = 'text/javascript';
		window.document.getElementsByTagName('head')[0].appendChild(js);
		logger.log({
			description: 'JS was loaded into document.', element: js, func: 'loadJs', obj: 'dom'
		});
		return js; //Return script element
	}
}
/**
 * @description
 * Appends given javascript source to DOM head.
 *
 * @param {String} src - url src for javascript to append
 *
 */
export function asyncLoadJs(src) {
	if (typeof window == 'undefined' || !has(window, 'document')) {
		logger.error({
			description: 'Document does not exsist to load assets into.', func: 'asyncLoadJs', obj: 'dom'
		});
		throw new Error('Document object is required to load assets.');
	} else {
		let js = window.document.createElement('script');
		js.src = src;
		js.type = 'text/javascript';
		window.document.getElementsByTagName('head')[0].appendChild(js);
		logger.log({
			description: 'JS was loaded into document.', element: js, func: 'asyncLoadJs', obj: 'dom'
		});
		return new Promise((resolve) => {
			window.setTimeout(resolve, 200);
		});
	}
}
export function getQueryParam(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	let results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/**
 * @description Open popup at provided url
 */
export function openPopup(url, options) {
	const { title, width, height } = options;
	return window.open(url, `${title || 'Auth'}`, `width=${ width || 800 }, height=${ height || 600 }`);
}

export function setCloseTimerCb(win, cb) {
	if(!win){
		throw new Error('Window is required to set close timer');
	}
	return window.setInterval(() => {
		try {
			console.log('Url received in set interval', win.document.URL);
			if (win.document.URL.indexOf(REDIRECT) != -1) {
				window.clearInterval(pollTimer);
				const url = win.document.URL;
				win.close();
				cb(url);
			}
		} catch(e) {
			console.debug('interval e', e);
		}
	}, 100);
}
