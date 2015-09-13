import config from '../config';
import request from './request';
import logger from './logger';
import dom from './dom';
import _ from 'lodash';
// import google from 'googleapis';
// import hello from 'hellojs';

let clientId = '582741153619-9b3vifnmv2a32v49l63got889tgmnrhs.apps.googleusercontent.com';
let apiKey = 'AIzaSyADsjtMTCk0qroTi8LTKxhcd8qacBtAGr0';
	// To enter one or more authentication scopes, refer to the documentation for the API.
let scopes = 'https://www.googleapis.com/auth/plus.me';

      // Use a button to handle authentication the first time.
function handleClientLoad() {
	gapi.client.setApiKey(apiKey);
	// window.setTimeout(checkAuth,1);
}
class Google {
	constructor(app) {
		this.app = app ? app : null;
		dom.asyncLoadJs('https://s3.amazonaws.com/kyper-cdn/js/hello.js');
	}
	get loadHello() {
		return dom.asyncLoadJs('https://s3.amazonaws.com/kyper-cdn/js/hello.js');
	}
	get initHello() {
		return this.loadHello.then(() => {
			//TODO: Load client id from tessellate
			window.hello.init({
				google: '582741153619-9b3vifnmv2a32v49l63got889tgmnrhs.apps.googleusercontent.com'
			}, {redirect_uri: 'redirect.html'});
			//Login Listener
			window.hello.on('auth.login', (auth) => {
				logger.info({description: 'User logged in to google.', func: 'loadHello', obj: 'Google'});
					// Call user information, for the given network
					window.hello(auth.network).api('/me').then(function(r) {
						// Inject it into the container
						//TODO:Send account informaiton to server
						var userData = r;
						userData.provider = auth.network;
						//Login or Signup endpoint
						return request.post(this.endpoint + '/provider', userData)
							.then((response) => {
								logger.log({description: 'Provider request successful.',  response: response, func: 'signup', obj: 'GoogleUtil'});
								return response;
							})
							['catch']((errRes) => {
								logger.error({description: 'Error requesting login.', error: errRes, func: 'signup', obj: 'Matter'});
								return Promise.reject(errRes);
							});
					});
				});
			return Promise.resolve();
		});
	}
	signup() {
		//Initalize Hello
		this.initHello.then(() => {
			if (window) {
				window.hello.login('google');
			}
		});
	}

}
export default Google;
// Use a button to handle authentication the first time.
