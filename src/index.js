import config from './config';
import logger from './utils/logger';
import * as dom from './utils/dom';
import * as request from './utils/request';
import * as ProviderAuth from './utils/providerAuth';
import token from './utils/token';
import * as envStorage from './utils/envStorage';

import {
	isString, isArray,
	isObject, has,
	some, every
} from 'lodash';

export default class Matter {
	/** Constructor
	 * @param {String} project Name of application
	 */
	constructor(project, opts) {
		if (!project) {
			logger.error({
				description: 'Application name required to use Matter.',
				func: 'constructor', obj: 'Matter'
			});
			throw new Error('Application name is required to use Matter');
		}
		if(isObject(project)){
			this.name = project.name;
			this.owner = project.owner || null;
		} else {
			this.name = project;
		}
		if (opts) {
			this.options = opts;
			// config.applySettings(opts);
			if(opts.env) config.envName = opts.env;
			if(opts.envName) config.envName = opts.envName;
			if(opts.logLevel) config.logLevel = opts.logLevel;
		}
		logger.debug({
			description: 'Matter object built.', matter: this,
			func: 'constructor', obj: 'Matter'
		});
	}

	/** Get current logged in status
	 * @return {Boolean}
	 * @example
	 * //Check if there is an account currently logged in
	 * if(matter.isLoggedIn){
	 *   console.log('There is currently an account logged in.');
	 * } else {
	 *   console.warn('There is no account currently logged in.');
	 * }
	 */
	get isLoggedIn() {
		return this.token.string ? true : false;
	}

	/** Endpoint generation that handles default/provided settings and environment
	 * @return {String} endpoint - endpoint for tessellate application
	 */
	get endpoint() {
		//Handle options
		if (has(this, 'options')) {
			if (this.options.localServer) {
				config.envName = 'local';
				logger.log({
					description: 'LocalServer option was set to true. Now server url is local server.',
					url: config.serverUrl, func: 'endpoint', obj: 'Matter'
				});
			}
			if (this.options.env) {
				config.envName = this.options.env;
				logger.log({
					description: 'Environment set based on provided environment.',
					config, func: 'endpoint', obj: 'Matter'
				});
			}
		}
		//Create an endpoint that is namespaced to the specific project
		let namespacedEndpoint = this.owner ? `${config.serverUrl}/users/${this.owner}/projects/${this.name}` : `${config.serverUrl}/projects/${this.name}`;
		//Handle tessellate as name
		if (this.name == 'tessellate') {
			//Remove url if host is a tessellate server
			if (typeof window !== 'undefined' && has(window, 'location') && window.location.host.indexOf('tessellate') !== -1) {
				return '';
				logger.info({
					description: 'App is Tessellate and Host is Tessellate Server, serverUrl simplified!',
					func: 'endpoint', obj: 'Matter'
				});
			}
			logger.info({
				description: 'App is tessellate, serverUrl set as main tessellate server.',
				url: config.serverUrl, func: 'endpoint', obj: 'Matter'
			});
			namespacedEndpoint = config.serverUrl;
		}
		logger.debug({
			description: 'Endpoint created.', url: namespacedEndpoint,
			func: 'endpoint', obj: 'Matter'
		});
		return namespacedEndpoint;
	}

	/** Save current user (handled automatically by default)
	 * @param {Object} userData - Account data to set for current user
	 * @example
	 * //Save account response to current user
	 * matter.currentUser = {username: 'testuser1', email: 'test@email.com'};
	 * console.log('New current user set:', matter.currentUser);
	 */
	set currentUser(userData) {
		logger.debug({
			description: 'Current User set.', user: userData,
			func: 'currentUser', obj: 'Matter'
		});
		envStorage.setItem(config.tokenUserDataName, userData);
	}

  /** Get currently logged in user or returns null
   * @return {Object|null}
   * @example
   * //Return account if logged in
   * if(matter.isLoggedIn){
   * console.log('Current user account: ', matter.currentUser);
   * } else {
   * console.log('No current user. Current user: ', matter.currentUser)
   * }
   * matter.currentUser
   * console.log('New current user set:', matter.currentUser);
   */
	get currentUser() {
		if (this.storage.getItem(config.tokenUserDataName)) {
			return this.storage.getItem(config.tokenUserDataName);
		} else {
			return null;
		}
	}

	/* Utility to handle safley writing to localStorage, sessionStorage, and cookies
	 * @return {Object}
	 */
	get storage() {
		return envStorage;
	}

	/** Utility to handle token writing/deleting/decoding
	 * @return {Object}
	 */
	get token() {
		return token;
	}

	/** Utils placed in base library
	 * @return {Object}
	 */
	get utils() {
		return {logger, request, storage: envStorage, dom};
	}

	/** Signup a new user
	 * @param {Object} signupData - Object containing data to use while signing up to application.
	 * @param {String} signupData.username - Username of new user (error will be returned if username is taken)
	 * @param {String} signupData.email - Email of new user (error will be returned if email is already used)
	 * @param {String} signupData.password - Password to be used with account (will be encrypted).
	 * @return {Promise}
	 * @example
	 * //Signup a new user
	 * var signupData = {username: 'testuser1', email:'test@email.com', password: 'testpassword'};
	 * matter.signup(signupData).then(function(signupRes){
	 *  console.log('New user signed up successfully. New account: ', signupRes.account);
	 * }, function(err){
	 *  console.error('Error signing up:', err);
	 * });
	 */
	signup(signupData) {
		logger.debug({
			description: 'Signup called.', signupData,
			func: 'signup', obj: 'Matter'
		});
		if (!signupData || (!isObject(signupData) && !isString(signupData))) {
			logger.error({
				description: 'Signup information is required to signup.',
				func: 'signup', obj: 'Matter'
			});
			return Promise.reject({
				message: 'Signup data is required to signup.',
				status: 'NULL_DATA'
			});
		}
		if(isString(signupData)){
			return this.authUsingProvider(signupData);
		}
		//Handle no username or email
		if (!signupData.username || !signupData.email) {
			logger.error({
				description: 'Email and Username required to signup.',
				func: 'signup', obj: 'Matter'
			});
			return Promise.reject({
				message: 'Email and Username required to signup.',
				status: 'EMPTY_DATA'
			});
		}
		if (!signupData.password) {
			logger.error({
				description: 'Password is required to signup.',
				func: 'signup', obj: 'Matter'
			});
			return Promise.reject({
				message: 'Password is required to signup.',
				status: 'PASS_REQUIRED'
			});
		}
		return request.post(`${this.endpoint}/signup`, signupData).then(response => {
			if (response.token) {
				this.token.string = response.token;
			}
			if (response.user) {
				this.currentUser = response.user;
			}
			logger.info({
				description: 'Signup successful.', user: this.currentUser,
				func: 'signup', obj: 'Matter'
			});
			return this.currentUser;
		})['catch'](error => {
			logger.error({
				description: 'Error requesting signup.', error,
				signupData, func: 'signup', obj: 'Matter'
			});
			return Promise.reject(error);
		});
	}

	/** Login by username/email
	 * @param {Object} loginData - Object containing data to use while logging in to application.
	 * @param {String} loginData.username - Username of user to login as
	 * @param {String} loginData.email - Email of new user (Optional instead of username)
	 * @param {String} loginData.password - Password to be used with account (will be encrypted).
	 * @return {Promise}
	 * @example
	 * //Login as 'testuser1'
	 * var loginData = {username: 'testuser1', password: 'testpassword'};
	 * matter.login(loginData).then(function(loginRes){
	 *  console.log('New user logged in succesfully. Account: ', loginRes.user);
	 * }, function(err){
	 *  console.error('Error logging in:', err);
	 * });
	 */
	login(loginData) {
		if (!loginData || (!isObject(loginData) && !isString(loginData))) {
			logger.error({
				description: 'Username/Email and Password are required to login',
				func: 'login', obj: 'Matter'
			});
			return Promise.reject({
				message: 'Login data is required to login.',
				status: 'DATA_REQUIRED'
			});
		}
		//Handle provider logins
		if(isString(loginData)){
			return this.authUsingProvider(loginData);
		}
		//Handle no username or email
		if (!loginData.username && !loginData.email) {
			logger.error({
				description: 'Email or Username required to login.',
				func: 'login', obj: 'Matter'
			});
			return Promise.reject({
				message: 'Email or Username required to login.',
				status: 'ID_REQUIRED'
			});
		}
		//Handle null or invalid password
		if (!loginData.password || loginData.password === '') {
			return Promise.reject({
				message: 'Password is required to login.',
				status: 'PASS_REQUIRED'
			});
		}
		//Username/Email Login
		return request.put(`${this.endpoint}/login`, loginData)
		.then(response => {
			if (response.data && response.data.status && response.data.status == 409) {
				logger.error({
					description: 'User not found.', response,
					func: 'login', obj: 'Matter'
				});
				return Promise.reject(response.data);
			}
			if (response.token) {
				this.token.string = response.token;
			}
			if (response.user) {
				this.currentUser = response.user;
			}
			logger.info({
				description: 'Successful login.', user: this.currentUser,
				func: 'login', obj: 'Matter'
			});
			return this.currentUser;
		})['catch'](error => {
			logger.error({
				description: 'Error requesting login.',
				error, func: 'login', obj: 'Matter'
			});
			if (error.status == 409 || error.status == 400) {
				error = error.response.text;
			}
			return Promise.reject(error);
		});
	}

	/** logout
	 * @description Log out of currently logged in user account
	 * @return {Promise}
	 * @example
	 * //Logout of currently logged in account
	 * matter.logout().then(function(loginRes){
	 *  console.log('Logged out successfully');
	 * }, function(err){
	 *  console.error('Error logging out:', err);
	 * });
	 */
	logout() {
		//TODO: Handle logging out of providers
		if (!this.isLoggedIn) {
			logger.warn({
				description: 'No logged in account to log out.',
				func: 'logout', obj: 'Matter'
			});
			return Promise.reject({
				message: 'No logged in account to log out.',
				status: 'NULL_ACCOUNT'
			});
		}
		return request.put(`${this.endpoint}/logout`).then(response => {
			logger.info({
				description: 'Logout successful.',
				response, func: 'logout', obj: 'Matter'
			});
			this.currentUser = null;
			this.token.delete();
			return response;
			// return ProviderAuth.logout().then(() => {
			// 	return response;
			// }, () => {
			// 	return response;
			// });
		})['catch'](error => {
			logger.error({
				description: 'Error requesting log out: ',
				error, func: 'logout', obj: 'Matter'
			});
			this.storage.removeItem(config.tokenUserDataName);
			this.token.delete();
			return Promise.reject(error);
		});
	}

	/** Authenticate using external provider
	 * @param {String} provider - Provider name
	 * @return {Promise}
	 * @example
	 * //Signup using google
	 * matter.signupUsingProvider('google').then(function(signupRes){
	 *  console.log('New user logged in succesfully. Account: ', signupRes.user);
	 * }, function(err){
	 *  console.error('Error logging in:', err);
	 * });
	 */
	authUsingProvider(provider) {
		if (!provider) {
			logger.info({
				description: 'Provider required to sign up.',
				func: 'providerSignup', obj: 'Matter'
			});
			return Promise.reject({message: 'Provider data is required to signup.'});
		}
		return ProviderAuth.authWithServer(provider).then(response => {
			logger.info({
				description: 'Provider login successful.',
				response, func: 'providerSignup', obj: 'Matter'
			});
			if (response.token) {
				this.token.string = response.token;
			}
			if (response.user || response.data) {
				this.currentUser = response.data || response.user;
			}
			return this.currentUser;
		}, error => {
			logger.error({
				description: 'Provider signup error.', error,
				func: 'providerSignup', obj: 'Matter'
			});
			return Promise.reject(error);
		});
	}

	/** getCurrentUser
	 * @return {Promise}
	 * @example
	 * //Logout of currently logged in account
	 * matter.getCurrentUser().then(function(currentAccount){
	 *  console.log('Currently logged in account:', currentAccount);
	 * }, function(err){
	 *  console.error('Error logging out:', err);
	 * });
	 */
	getCurrentUser() {
		if (this.currentUser) {
			logger.debug({
				description: 'Current is already available. Returning user.',
				func: 'currentUser', obj: 'Matter'
			});
			return Promise.resolve(this.currentUser);
		}
		if (!this.isLoggedIn) {
			logger.debug({
				description: 'Current user is null.',
				func: 'currentUser', obj: 'Matter'
			});
			return Promise.resolve(null);
		}
		return request.get(`${this.endpoint}/user`).then(response => {
			//TODO: Save user information locally
			logger.log({
				description: 'Current User Request responded.',
				response, func: 'currentUser', obj: 'Matter'
			});
			this.currentUser = response;
			return response;
		})['catch'](error => {
			if (error.status == 401) {
				logger.warn({
					description: 'Called for current user without token.',
					error, func: 'currentUser', obj: 'Matter'
				});
				token.delete();
				return Promise.resolve(null);
			}
			logger.error({
				description: 'Error requesting current user.',
				error, func: 'currentUser', obj: 'Matter'
			});
			return Promise.reject(error);
		});
	}

	/** updateAccount
	 * @param {Object} updateData - Data to update within profile (only provided data will be modified).
	 * @return {Promise}
	 * @example
	 * //Update current account's profile
	 * matter.updateAccount().then(function(updatedAccount){
	 *  console.log('Currently logged in account:', updatedAccount);
	 * }, function(err){
	 *  console.error('Error updating profile:', err);
	 * });
	 */
	updateAccount(updateData) {
		if (!this.isLoggedIn) {
			logger.error({
				description: 'No current user profile to update.',
				func: 'updateAccount', obj: 'Matter'
			});
			return Promise.reject({
				message: 'Must be logged in to update account.'
			});
		}
		if (!updateData) {
			logger.error({
				description: 'Data is required to update profile.',
				func: 'updateAccount', obj: 'Matter'
			});
			return Promise.reject({
				message: 'Data required to update account.',
				status: 'NULL_DATA'
			});
		}
		//Send update request
		return request.put(`${this.endpoint}/users/${this.currentUser.username}`, updateData)
		.then(response => {
			logger.info({
				description: 'Update profile request responded.',
				response, func: 'updateAccount', obj: 'Matter'
			});
			this.currentUser = response;
			return response;
		})['catch'](error => {
			logger.error({
				description: 'Error requesting current user.',
				error, func: 'updateAccount', obj: 'Matter'
			});
			return Promise.reject(error);
		});
	}

	/** uploadAvatar
	 * @description Upload account avatar to Tessellate
	 * @param {Object} file - File object to upload
	 * @return {Promise}
	 * @example
	 * //Upload image to tessellate
	 * matter.uploadAvatar(file).then(function(imgUrl){
	 *  console.log('Currently logged in account:', imgUrl);
	 * }, function(err){
	 *  console.error('Error uploading image:', err);
	 * });
	 */
	uploadAvatar(file) {
		if (!this.isLoggedIn) {
			logger.error({
				description: 'Must be logged in to upload an image.',
				func: 'uploadAvatar', obj: 'Matter'
			});
			return Promise.reject({
				message: 'Must be logged in to upload image.'
			});
		}
		if (!file) {
			logger.error({
				description: 'File is required to upload Avatar.',
				func: 'uploadAvatar', obj: 'Matter'
			});
			return Promise.reject({
				message: 'Data required to update profile.',
				status: 'NULL_DATA'
			});
		}
		const reqData = {files: [ {key: 'image', file }]};
		//Send update request
		return request.put(`${this.endpoint}/users/${this.currentUser.username}/avatar`, reqData);
	}

	/** changePassword
	 * @param {String} updateData New password for account.
	 * @return {Promise}
	 * @example
	 * //Update current account's password
	 * var newPassword = 'asdfasdfasdf';
	 * matter.changePassword(newPassword).then(function(updatedAccount){
	 *  console.log('Currently logged in account:', updatedAccount);
	 * }, function(err){
	 *  console.error('Error changing password:', err);
	 * });
	 */
	changePassword(newPassword) {
		if (!this.isLoggedIn) {
			logger.error({
				description: 'No current user profile for which to change password.',
				func: 'changePassword', obj: 'Matter'
			});
			return Promise.reject({
				message: 'Must be logged in to change password.'
			});
		}
		//Send update request
		return request.put(`${this.endpoint}/user/password`, newPassword);
	}

	/** recoverAccount
	 * @param {String} updateData New password for account.
	 * @return {Promise}
	 * @example
	 * //Recover current users password
	 * matter.recoverAccount().then(function(updatedAccount){
	 *  console.log('Currently logged in account:', updatedAccount);
	 * }, function(err){
	 *  console.error('Error updating profile:', err);
	 * });
	 */
	recoverAccount(accountData) {
		if (!accountData || (!isString(accountData) && !isObject(accountData))) {
			logger.error({
				description: 'Account data is required to recover an account.',
				func: 'recoverAccount', obj: 'Matter'
			});
			return Promise.reject({message: 'Account data is required to recover an account.'});
		}
		let account = {};
		if (isString(accountData)) {
			account = accountData.indexOf('@') !== -1 ? {email: accountData} : {username: accountData};
		} else {
			account = accountData;
		}
		logger.debug({
			description: 'Requesting recovery of account.', account,
			func: 'recoverAccount', obj: 'Matter'
		});
		//Send update request
		return request.put(`${this.endpoint}/user/recover`);
	}


	/** Check that user is in a single group or in all of a list of groups
	 * @param {Array} checkGroups - List of groups to check for account membership
	 * @return {Boolean}
	 * @example
	 * //Check for group membership
	 * var isBoth = ;
	 * if(matter.isInGroup('admins')){
	 * console.log('Current account is an admin!');
	 * } else {
	 * console.warn('Current account is not an admin.');
	 * }
	 */
	isInGroup(checkGroups) {
		if (!this.isLoggedIn) {
			logger.error({
				description: 'No logged in user to check for groups.',
				func: 'isInGroup', obj: 'Matter'
			});
			return false;
		}
		if (!checkGroups) {
			logger.log({
				description: 'Invalid group(s).',
				func: 'isInGroup', obj: 'Matter'
			});
			return false;
		}
		//Check if user is within groups
		if (isString(checkGroups)) {
			const groupName = checkGroups;
			//Single role or string list of roles
			const groupsArray = groupName.split(',');
			if (groupsArray.length > 1) {
				//String list of groupts
				logger.info({
					description: 'String list of groups.', list: groupsArray,
					func: 'isInGroup', obj: 'Matter'
				});
				return this.isInGroups(groupsArray);
			}
			//Single group
			let groups = this.token.data.groups || [];
			logger.log({
				description: 'Checking if user is in group.',
				group: groupName, userGroups: this.token.data.groups,
				func: 'isInGroup', obj: 'Matter'
			});
			return some(groups, (group) =>  {
				return groupName == group.name;
			});
		}
		if (isArray(checkGroups)) {
			return this.isInGroups(checkGroups);
		}
		return false;
	}

	/** Check that user is in all of a list of groups
	 * @param {Array|String} checkGroups - List of groups to check for account membership
	 * @return {Boolean}
	 * @example
	 * //Check for group membership
	 * var isBoth = matter.isInGroups(['admins', 'users']);
	 * if(isBoth){
	 * console.log('Current account is both an admin and a user');
	 * } else {
	 * console.warn('Current account is not both an admin and a user')
	 * }
	 */
	isInGroups(checkGroups) {
		if (!this.isLoggedIn) {
			logger.log({
				description: 'No logged in user to check.',
				func: 'isInGroups', obj: 'Matter'
			});
			return false;
		}
		if (!checkGroups) {
			logger.log({
				description: 'Invalid group(s).',
				func: 'isInGroup', obj: 'Matter'
			});
			return false;
		}
		//Check if user is in some of the provided groups
		if (isArray(checkGroups)) {
			return every(checkGroups.map(group => {
				if (isString(group)) {
					//Group is string
					return this.isInGroup(group);
				}
				//Group is object
				if (has(group, 'name')) {
					return this.isInGroup(group.name);
				}
				logger.error({
					description: 'Invalid group object.',
					group: group, func: 'isInGroups', obj: 'Matter'
				});
				return false;
			}), true);
		}
		if (isString(checkGroups)) {
			//TODO: Handle spaces within string list
			const groupsArray = checkGroups.split(',');
			if (groupsArray.length > 1) {
				return this.isInGroups(groupsArray);
			}
			return this.isInGroup(groupsArray[0]);
		}
		logger.error({
			description: 'Invalid groups list.',
			func: 'isInGroups', obj: 'Matter'
		});
		return false;
	}

}
