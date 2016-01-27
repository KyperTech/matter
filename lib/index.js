'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _logger = require('./utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _dom = require('./utils/dom');

var dom = _interopRequireWildcard(_dom);

var _request = require('./utils/request');

var _request2 = _interopRequireDefault(_request);

var _token = require('./utils/token');

var _token2 = _interopRequireDefault(_token);

var _envStorage = require('./utils/envStorage');

var _envStorage2 = _interopRequireDefault(_envStorage);

var _providerAuth = require('./utils/providerAuth');

var _providerAuth2 = _interopRequireDefault(_providerAuth);

var _lodash = require('lodash');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Matter = function () {
	/** Constructor
  * @param {String} project Name of application
  */

	function Matter(project, opts) {
		_classCallCheck(this, Matter);

		if (!project) {
			_logger2.default.error({
				description: 'Application name required to use Matter.',
				func: 'constructor', obj: 'Matter'
			});
			throw new Error('Application name is required to use Matter');
		}
		if ((0, _lodash.isObject)(project)) {
			this.name = project.name;
			this.owner = project.owner || null;
		} else {
			this.name = project;
		}
		if (opts) {
			this.options = opts;
			if (this.options.logLevel) {
				_config2.default.logLevel = this.options.logLevel;
			}
		}
		this.config = _config2.default;
		_logger2.default.debug({
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

	_createClass(Matter, [{
		key: 'signup',

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
		value: function signup(signupData) {
			var _this = this;

			_logger2.default.debug({
				description: 'Signup called.', signupData: signupData,
				func: 'signup', obj: 'Matter'
			});
			if (!signupData || !(0, _lodash.isObject)(signupData) && !(0, _lodash.isString)(signupData)) {
				_logger2.default.error({
					description: 'Signup information is required to signup.',
					func: 'signup', obj: 'Matter'
				});
				return Promise.reject({
					message: 'Signup data is required to signup.',
					status: 'NULL_DATA'
				});
			}
			//Handle no username or email
			if (!signupData.username || !signupData.email) {
				_logger2.default.error({
					description: 'Email and Username required to signup.',
					func: 'signup', obj: 'Matter'
				});
				return Promise.reject({
					message: 'Email and Username required to signup.',
					status: 'EMPTY_DATA'
				});
			}
			if (!signupData.password) {
				_logger2.default.error({
					description: 'Password is required to signup.',
					func: 'signup', obj: 'Matter'
				});
				return Promise.reject({
					message: 'Password is required to signup.',
					status: 'PASS_REQUIRED'
				});
			}
			return _request2.default.post(this.endpoint + '/signup', signupData).then(function (response) {
				if (response.token) {
					_this.token.string = response.token;
				}
				if (response.user) {
					_this.currentUser = response.user;
				}
				_logger2.default.info({
					description: 'Signup successful.', user: _this.currentUser,
					func: 'signup', obj: 'Matter'
				});
				return _this.currentUser;
			})['catch'](function (error) {
				_logger2.default.error({
					description: 'Error requesting signup.', error: error,
					signupData: signupData, func: 'signup', obj: 'Matter'
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

	}, {
		key: 'login',
		value: function login(loginData) {
			var _this2 = this;

			if (!loginData || !(0, _lodash.isObject)(loginData) && !(0, _lodash.isString)(loginData)) {
				_logger2.default.error({
					description: 'Username/Email and Password are required to login',
					func: 'login', obj: 'Matter'
				});
				return Promise.reject({
					message: 'Login data is required to login.',
					status: 'DATA_REQUIRED'
				});
			}
			//Handle no username or email
			if (!loginData.username && !loginData.email) {
				_logger2.default.error({
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
			return _request2.default.put(this.endpoint + '/login', loginData).then(function (response) {
				if (response.data && response.data.status && response.data.status == 409) {
					_logger2.default.error({
						description: 'User not found.', response: response,
						func: 'login', obj: 'Matter'
					});
					return Promise.reject(response.data);
				}
				if (response.token) {
					_this2.token.string = response.token;
				}
				if (response.user) {
					_this2.currentUser = response.user;
				}
				_logger2.default.info({
					description: 'Successful login.', user: _this2.currentUser,
					func: 'login', obj: 'Matter'
				});
				return _this2.currentUser;
			})['catch'](function (error) {
				_logger2.default.error({
					description: 'Error requesting login.',
					error: error, func: 'login', obj: 'Matter'
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

	}, {
		key: 'logout',
		value: function logout() {
			var _this3 = this;

			//TODO: Handle logging out of providers
			if (!this.isLoggedIn) {
				_logger2.default.warn({
					description: 'No logged in account to log out.',
					func: 'logout', obj: 'Matter'
				});
				return Promise.reject({
					message: 'No logged in account to log out.',
					status: 'NULL_ACCOUNT'
				});
			}
			return _request2.default.put(this.endpoint + '/logout').then(function (response) {
				_logger2.default.info({
					description: 'Logout successful.',
					response: response, func: 'logout', obj: 'Matter'
				});
				_this3.currentUser = null;
				_this3.token.delete();
				return response;
			})['catch'](function (error) {
				_logger2.default.error({
					description: 'Error requesting log out: ',
					error: error, func: 'logout', obj: 'Matter'
				});
				_this3.storage.removeItem(_config2.default.tokenUserDataName);
				_this3.token.delete();
				return Promise.reject(error);
			});
		}

		/** Login using external provider
   * @param {String} provider - Provider name
   * @return {Promise}
   * @example
   * matter.loginWithProvider('google').then(function(loginRes){
   *  console.log('New user logged in succesfully. Account: ', loginRes.user);
   * }, function(err){
   *  console.error('Error logging in:', err);
   * });
   */

	}, {
		key: 'loginUsingProvider',
		value: function loginUsingProvider(provider) {
			//Handle 3rd Party signups
			_logger2.default.debug({
				description: 'Third party signup called.',
				provider: provider, func: 'signup', obj: 'Matter'
			});
			var auth = new _providerAuth2.default({ provider: provider, app: this });
			return auth.signup(provider).then(function (res) {
				_logger2.default.info({
					description: 'Provider signup successful.', provider: provider,
					res: res, func: 'signup', obj: 'Matter'
				});
				return res;
			}, function (error) {
				_logger2.default.error({
					description: 'Error with provider authentication.',
					provider: provider, error: error, func: 'signup', obj: 'Matter'
				});
				return Promise.reject(error);
			});
		}

		/** Signup using external provider
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

	}, {
		key: 'signupUsingProvider',
		value: function signupUsingProvider(provider) {
			if (!provider) {
				return Promise.reject('Provider data is required to signup.');
			}
			var auth = new _providerAuth2.default({ provider: provider, app: this });
			return auth.signup(provider).then(function (response) {
				_logger2.default.info({
					description: 'Provider login successful.',
					response: response, func: 'providerSignup', obj: 'Matter'
				});
				return response;
			}, function (error) {
				_logger2.default.error({
					description: 'Provider signup error.', error: error,
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

	}, {
		key: 'getCurrentUser',
		value: function getCurrentUser() {
			var _this4 = this;

			if (this.currentUser) {
				_logger2.default.debug({
					description: 'Current is already available. Returning user.',
					func: 'currentUser', obj: 'Matter'
				});
				return Promise.resolve(this.currentUser);
			}
			if (!this.isLoggedIn) {
				_logger2.default.debug({
					description: 'Current user is null.',
					func: 'currentUser', obj: 'Matter'
				});
				return Promise.resolve(null);
			}
			return _request2.default.get(this.endpoint + '/user').then(function (response) {
				//TODO: Save user information locally
				_logger2.default.log({
					description: 'Current User Request responded.',
					responseData: response, func: 'currentUser', obj: 'Matter'
				});
				_this4.currentUser = response;
				return response;
			})['catch'](function (errRes) {
				if (errRes.status == 401) {
					_logger2.default.warn({
						description: 'Called for current user without token.',
						error: errRes, func: 'currentUser', obj: 'Matter'
					});
					_token2.default.delete();
					return Promise.resolve(null);
				}
				_logger2.default.error({
					description: 'Error requesting current user.',
					error: errRes, func: 'currentUser', obj: 'Matter'
				});
				return Promise.reject(errRes);
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

	}, {
		key: 'updateAccount',
		value: function updateAccount(updateData) {
			var _this5 = this;

			if (!this.isLoggedIn) {
				_logger2.default.error({
					description: 'No current user profile to update.',
					func: 'updateAccount', obj: 'Matter'
				});
				return Promise.reject({
					message: 'Must be logged in to update account.'
				});
			}
			if (!updateData) {
				_logger2.default.error({
					description: 'Data is required to update profile.',
					func: 'updateAccount', obj: 'Matter'
				});
				return Promise.reject({
					message: 'Data required to update account.',
					status: 'NULL_DATA'
				});
			}
			//Send update request
			return _request2.default.put(this.urls.update, updateData).then(function (response) {
				_logger2.default.info({
					description: 'Update profile request responded.',
					responseData: response, func: 'updateAccount', obj: 'Matter'
				});
				_this5.currentUser = response;
				return response;
			})['catch'](function (errRes) {
				_logger2.default.error({
					description: 'Error requesting current user.',
					error: errRes, func: 'updateAccount', obj: 'Matter'
				});
				return Promise.reject(errRes);
			});
		}

		/** uploadImage
   * @description Upload image to Tessellate
   * @param {Object} file - File object to upload
   * @return {Promise}
   * @example
   * //Upload image to tessellate
   * matter.uploadImage(file).then(function(imgUrl){
   *  console.log('Currently logged in account:', imgUrl);
   * }, function(err){
   *  console.error('Error uploading image:', err);
   * });
   */

	}, {
		key: 'uploadImage',
		value: function uploadImage(fileData) {
			var _this6 = this;

			if (!this.isLoggedIn) {
				_logger2.default.error({
					description: 'Must be logged in to upload an image.',
					func: 'uploadImage', obj: 'Matter'
				});
				return Promise.reject({
					message: 'Must be logged in to upload image.'
				});
			}
			if (!fileData) {
				_logger2.default.error({
					description: 'Data is required to update profile.',
					func: 'uploadImage', obj: 'Matter'
				});
				return Promise.reject({
					message: 'Data required to update profile.',
					status: 'NULL_DATA'
				});
			}
			//Send update request
			return _request2.default.put(this.urls.upload, fileData).then(function (response) {
				_logger2.default.info({
					description: 'Upload image request responded.',
					response: response, func: 'uploadImage', obj: 'Matter'
				});
				_this6.currentUser = response;
				return response;
			})['catch'](function (errRes) {
				_logger2.default.error({
					description: 'Error requesting current user.',
					error: errRes, func: 'uploadImage', obj: 'Matter'
				});
				return Promise.reject(errRes);
			});
		}

		/** uploadAccountImage
   * @description Upload image and add url to currently logged in account
   * @param {Object} file - File object to upload
   * @return {Promise}
   * @example
   * //Upload image and set it to account
   * matter.uploadAccountImage(file).then(function(updatedAccount){
   *  console.log('Account with image:', updatedAccount);
   * }, function(err){
   *  console.error('Error uploading account image:', err);
   * });
   */

	}, {
		key: 'uploadAccountImage',
		value: function uploadAccountImage(fileData) {
			var _this7 = this;

			return this.uploadImage(fileData).then(function (imgUrl) {
				return _this7.updateAccount({ image: { url: imgUrl } });
			});
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

	}, {
		key: 'changePassword',
		value: function changePassword(newPassword) {
			if (!this.isLoggedIn) {
				_logger2.default.error({
					description: 'No current user profile for which to change password.',
					func: 'changePassword', obj: 'Matter'
				});
				return Promise.reject({
					message: 'Must be logged in to change password.'
				});
			}
			//Send update request
			return _request2.default.put(this.urls.changePassword, newPassword).then(function (updatedAccount) {
				_logger2.default.log({
					description: 'Update password request responded.',
					updatedAccount: updatedAccount, func: 'changePassword', obj: 'Matter'
				});
				return updatedAccount;
			})['catch'](function (error) {
				_logger2.default.error({
					description: 'Error requesting password change.',
					error: error, func: 'changePassword', obj: 'Matter'
				});
				return Promise.reject(error);
			});
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

	}, {
		key: 'recoverAccount',
		value: function recoverAccount(accountData) {
			if (!accountData || !(0, _lodash.isString)(accountData) && !(0, _lodash.isObject)(accountData)) {
				_logger2.default.error({
					description: 'Account data is required to recover an account.',
					func: 'recoverAccount', obj: 'Matter'
				});
				return Promise.reject({ message: 'Account data is required to recover an account.' });
			}
			var account = {};
			if ((0, _lodash.isString)(accountData)) {
				account = accountData.indexOf('@') !== -1 ? { email: accountData } : { username: accountData };
			} else {
				account = accountData;
			}
			_logger2.default.debug({
				description: 'Requesting recovery of account.', account: account,
				func: 'recoverAccount', obj: 'Matter'
			});
			//Send update request
			return _request2.default.post(this.urls.recover, account).then(function (res) {
				_logger2.default.info({
					description: 'Recover account request responded.',
					res: res, func: 'recoverAccount', obj: 'Matter'
				});
				return res;
			})['catch'](function (errRes) {
				_logger2.default.error({
					description: 'Error requesting password recovery.',
					error: errRes, func: 'recoverAccount', obj: 'Matter'
				});
				return Promise.reject(errRes);
			});
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

	}, {
		key: 'isInGroup',
		value: function isInGroup(checkGroups) {
			var _this8 = this;

			if (!this.isLoggedIn) {
				_logger2.default.error({
					description: 'No logged in user to check for groups.',
					func: 'isInGroup', obj: 'Matter'
				});
				return false;
			}
			if (!checkGroups) {
				_logger2.default.log({
					description: 'Invalid group(s).',
					func: 'isInGroup', obj: 'Matter'
				});
				return false;
			}
			//Check if user is within groups
			if ((0, _lodash.isString)(checkGroups)) {
				var _ret = function () {
					var groupName = checkGroups;
					//Single role or string list of roles
					var groupsArray = groupName.split(',');
					if (groupsArray.length > 1) {
						//String list of groupts
						_logger2.default.info({
							description: 'String list of groups.', list: groupsArray,
							func: 'isInGroup', obj: 'Matter'
						});
						return {
							v: _this8.isInGroups(groupsArray)
						};
					}
					//Single group
					var groups = _this8.token.data.groups || [];
					_logger2.default.log({
						description: 'Checking if user is in group.',
						group: groupName, userGroups: _this8.token.data.groups,
						func: 'isInGroup', obj: 'Matter'
					});
					return {
						v: (0, _lodash.some)(groups, function (group) {
							return groupName == group.name;
						})
					};
				}();

				if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
			}
			if ((0, _lodash.isArray)(checkGroups)) {
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

	}, {
		key: 'isInGroups',
		value: function isInGroups(checkGroups) {
			var _this9 = this;

			if (!this.isLoggedIn) {
				_logger2.default.log({
					description: 'No logged in user to check.',
					func: 'isInGroups', obj: 'Matter'
				});
				return false;
			}
			if (!checkGroups) {
				_logger2.default.log({
					description: 'Invalid group(s).',
					func: 'isInGroup', obj: 'Matter'
				});
				return false;
			}
			//Check if user is in some of the provided groups
			if ((0, _lodash.isArray)(checkGroups)) {
				return (0, _lodash.every)(checkGroups.map(function (group) {
					if ((0, _lodash.isString)(group)) {
						//Group is string
						return _this9.isInGroup(group);
					}
					//Group is object
					if ((0, _lodash.has)(group, 'name')) {
						return _this9.isInGroup(group.name);
					}
					_logger2.default.error({
						description: 'Invalid group object.',
						group: group, func: 'isInGroups', obj: 'Matter'
					});
					return false;
				}), true);
			}
			if ((0, _lodash.isString)(checkGroups)) {
				//TODO: Handle spaces within string list
				var groupsArray = checkGroups.split(',');
				if (groupsArray.length > 1) {
					return this.isInGroups(groupsArray);
				}
				return this.isInGroup(groupsArray[0]);
			}
			_logger2.default.error({
				description: 'Invalid groups list.',
				func: 'isInGroups', obj: 'Matter'
			});
			return false;
		}
	}, {
		key: 'isLoggedIn',
		get: function get() {
			return this.token.string ? true : false;
		}

		/** Endpoint generation that handles default/provided settings and environment
   * @return {String} endpoint - endpoint for tessellate application
   */

	}, {
		key: 'endpoint',
		get: function get() {
			//Handle options
			if ((0, _lodash.has)(this, 'options')) {
				if (this.options.localServer) {
					_config2.default.envName = 'local';
					_logger2.default.log({
						description: 'LocalServer option was set to true. Now server url is local server.',
						url: _config2.default.serverUrl, func: 'endpoint', obj: 'Matter'
					});
				}
				if (this.options.env) {
					_config2.default.envName = this.options.env;
					_logger2.default.log({
						description: 'Environment set based on provided environment.',
						config: _config2.default, func: 'endpoint', obj: 'Matter'
					});
				}
			}
			var appEndpoint = this.owner ? _config2.default.serverUrl + '/users/' + this.owner + '/projects/' + this.name : _config2.default.serverUrl + '/projects/' + this.name;
			//Handle tessellate as name
			if (this.name == 'tessellate') {
				//Remove url if host is a tessellate server
				if (typeof window !== 'undefined' && (0, _lodash.has)(window, 'location') && window.location.host.indexOf('tessellate') !== -1) {
					appEndpoint = '';
					_logger2.default.info({
						description: 'Host is Tessellate Server, serverUrl simplified!',
						url: appEndpoint, func: 'endpoint', obj: 'Matter'
					});
				} else {
					appEndpoint = _config2.default.serverUrl;
					_logger2.default.info({
						description: 'App is tessellate, serverUrl set as main tessellate server.',
						url: appEndpoint, func: 'endpoint', obj: 'Matter'
					});
				}
			}
			_logger2.default.log({
				description: 'Endpoint created.', url: appEndpoint,
				func: 'endpoint', obj: 'Matter'
			});
			return appEndpoint;
		}
	}, {
		key: 'urls',
		get: function get() {
			if (this.token && this.token.data && this.token.data.username) {
				return {
					update: this.endpoint + '/account/' + this.token.data.username,
					upload: this.endpoint + '/account/' + this.token.data.username + '/upload',
					recover: this.endpoint + '/recover'
				};
			}
			return {
				recover: this.endpoint + '/recover'
			};
		}

		/** Save current user (handled automatically by default)
   * @param {Object} userData - Account data to set for current user
   * @example
   * //Save account response to current user
   * matter.currentUser = {username: 'testuser1', email: 'test@email.com'};
   * console.log('New current user set:', matter.currentUser);
   */

	}, {
		key: 'currentUser',
		set: function set(userData) {
			_logger2.default.debug({
				description: 'Current User set.', user: userData,
				func: 'currentUser', obj: 'Matter'
			});
			this.storage.setItem(_config2.default.tokenUserDataName, userData);
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
		,
		get: function get() {
			if (this.storage.getItem(_config2.default.tokenUserDataName)) {
				return this.storage.getItem(_config2.default.tokenUserDataName);
			} else {
				return null;
			}
		}

		/* Utility to handle safley writing to localStorage, sessionStorage, and cookies
   * @return {Object}
   */

	}, {
		key: 'storage',
		get: function get() {
			return _envStorage2.default;
		}

		/** Utility to handle token writing/deleting/decoding
   * @return {Object}
   */

	}, {
		key: 'token',
		get: function get() {
			return _token2.default;
		}

		/** Utils placed in base library
   * @return {Object}
   */

	}, {
		key: 'utils',
		get: function get() {
			return { logger: _logger2.default, request: _request2.default, storage: _envStorage2.default, dom: dom };
		}
	}]);

	return Matter;
}();

exports.default = Matter;
module.exports = exports['default'];