Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _utilsLogger = require('./utils/logger');

var _utilsLogger2 = _interopRequireDefault(_utilsLogger);

var _utilsDom = require('./utils/dom');

var _utilsDom2 = _interopRequireDefault(_utilsDom);

var _utilsRequest = require('./utils/request');

var _utilsRequest2 = _interopRequireDefault(_utilsRequest);

var _utilsToken = require('./utils/token');

var _utilsToken2 = _interopRequireDefault(_utilsToken);

var _utilsEnvStorage = require('./utils/envStorage');

var _utilsEnvStorage2 = _interopRequireDefault(_utilsEnvStorage);

var _utilsProviderAuth = require('./utils/providerAuth');

var _utilsProviderAuth2 = _interopRequireDefault(_utilsProviderAuth);

var _lodash = require('lodash');

var Matter = (function () {
	/** Constructor
  * @param {String} appName Name of application
  */

	function Matter(appName, opts) {
		_classCallCheck(this, Matter);

		if (!appName) {
			_utilsLogger2['default'].error({
				description: 'Application name required to use Matter.',
				func: 'constructor', obj: 'Matter'
			});
			throw new Error('Application name is required to use Matter');
		} else {
			this.name = appName;
		}
		if (opts) {
			this.options = opts;
			if (this.options.logLevel) {
				_config2['default'].logLevel = this.options.logLevel;
			}
		}
		this.config = _config2['default'];
		_utilsLogger2['default'].debug({
			description: 'Matter object built.', matter: this,
			func: 'constructor', obj: 'Matter'
		});
	}

	/** Endpoint generation that handles default/provided settings and environment
  * @return {String} endpoint - endpoint for tessellate application
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
			_utilsLogger2['default'].debug({
				description: 'Signup called.', signupData: signupData,
				func: 'signup', obj: 'Matter'
			});
			if (!signupData || !(0, _lodash.isObject)(signupData) && !(0, _lodash.isString)(signupData)) {
				_utilsLogger2['default'].error({
					description: 'Signup information is required to signup.',
					func: 'signup', obj: 'Matter'
				});
				return Promise.reject({
					message: 'Login data is required to login.',
					status: 'NULL_DATA'
				});
			}
			if ((0, _lodash.isObject)(signupData)) {
				//Handle no username or email
				if (!signupData.username && !signupData.email) {
					_utilsLogger2['default'].error({
						description: 'Email or Username required to signup.',
						func: 'signup', obj: 'Matter'
					});
					return Promise.reject({
						message: 'Email or Username required to signup.',
						status: 'ID_REQUIRED'
					});
				}
				if (!signupData.password) {
					_utilsLogger2['default'].error({
						description: 'Password is required to signup.',
						func: 'signup', obj: 'Matter'
					});
					return Promise.reject({
						message: 'Password is required to signup.',
						status: 'PASS_REQUIRED'
					});
				}
				return _utilsRequest2['default'].post(this.endpoint + '/signup', signupData).then(function (response) {
					_utilsLogger2['default'].info({
						description: 'Signup successful.',
						signupData: signupData, response: response,
						func: 'signup', obj: 'Matter'
					});
					if ((0, _lodash.has)(response, 'account')) {
						return response.account;
					} else {
						_utilsLogger2['default'].warn({
							description: 'Account was not contained in signup response.',
							signupData: signupData, response: response,
							func: 'signup', obj: 'Matter'
						});
						return response;
					}
				})['catch'](function (errRes) {
					_utilsLogger2['default'].error({
						description: 'Error requesting signup.',
						signupData: signupData,
						func: 'signup', obj: 'Matter'
					});
					return Promise.reject(errRes);
				});
			} else {
				//Handle 3rd Party signups
				_utilsLogger2['default'].debug({
					description: 'Third party signup called.',
					provider: signupData, func: 'signup', obj: 'Matter'
				});
				var auth = new _utilsProviderAuth2['default']({ provider: signupData, app: this });
				return auth.signup(signupData).then(function (res) {
					_utilsLogger2['default'].info({
						description: 'Provider signup successful.',
						provider: signupData, res: res,
						func: 'signup', obj: 'Matter'
					});
					return Promise.resolve(res);
				});
			}
		}

		/** Login by username/email or external provider
   * @param {Object} loginData - Object containing data to use while logging in to application.
   * @param {String} loginData.username - Username of user to login as
   * @param {String} loginData.email - Email of new user (Optional instead of username)
   * @param {String} loginData.password - Password to be used with account (will be encrypted).
   * @return {Promise}
   * @example
   * //Login as 'testuser1'
   * var loginData = {username: 'testuser1', password: 'testpassword'};
   * matter.login(loginData).then(function(loginRes){
   *  console.log('New user logged in succesfully. Account: ', loginRes.account);
   * }, function(err){
   *  console.error('Error logging in:', err);
   * });
   */
	}, {
		key: 'login',
		value: function login(loginData) {
			var _this = this;

			if (!loginData || !(0, _lodash.isObject)(loginData) && !(0, _lodash.isString)(loginData)) {
				_utilsLogger2['default'].error({
					description: 'Username/Email and Password are required to login',
					func: 'login', obj: 'Matter'
				});
				return Promise.reject({
					message: 'Login data is required to login.',
					status: 'DATA_REQUIRED'
				});
			}
			if ((0, _lodash.isObject)(loginData)) {
				//Handle no username or email
				if (!loginData.username && !loginData.email) {
					_utilsLogger2['default'].error({
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
				return _utilsRequest2['default'].put(this.endpoint + '/login', loginData).then(function (response) {
					if ((0, _lodash.has)(response, 'data') && (0, _lodash.has)(response.data, 'status') && response.data.status == 409) {
						_utilsLogger2['default'].error({
							description: 'Account not found.', response: response,
							func: 'login', obj: 'Matter'
						});
						return Promise.reject(response.data);
					} else {
						_utilsLogger2['default'].info({
							description: 'Successful login.', response: response,
							func: 'login', obj: 'Matter'
						});
						if ((0, _lodash.has)(response, 'token')) {
							_this.token.string = response.token;
						}
						var userAccount = {};
						//Get user data either directly from response or from token
						if ((0, _lodash.has)(response, 'account')) {
							userAccount = response.account;
						} else if (_this.token.data) {
							//TODO: Handle more Auth Provider tokens
							//Check for AuthRocket style token
							_utilsLogger2['default'].debug({
								description: 'User data available from token.',
								tokenData: _this.token.data, type: typeof _this.token.data,
								func: 'login', obj: 'Matter'
							});
							if (_this.token.data.un) {
								_utilsLogger2['default'].log({
									description: 'Token is AuthRocket format.',
									func: 'login', obj: 'Matter'
								});
								userAccount = {
									username: _this.token.data.un,
									name: _this.token.data.n || null,
									authrocketId: _this.token.data.uid || null
								};
							} else {
								_utilsLogger2['default'].debug({
									description: 'Token is default format.',
									func: 'login', obj: 'Matter'
								});
								//Default token style
								userAccount = _this.token.data;
							}
						} else {
							_utilsLogger2['default'].error({
								description: 'User data not available from response or token.',
								func: 'login', obj: 'Matter'
							});
							userAccount = { token: _this.token.string };
						}
						//Set userdata to local storage
						_this.storage.setItem(_config2['default'].tokenUserDataName, userAccount);
						return userAccount;
					}
				})['catch'](function (errRes) {
					_utilsLogger2['default'].error({
						description: 'Error requesting login.',
						error: errRes, status: errRes.status,
						func: 'login', obj: 'Matter'
					});
					if (errRes.status == 409 || errRes.status == 400) {
						errRes = errRes.response.text;
					}
					return Promise.reject(errRes);
				});
			} else {
				//Provider login
				var auth = new _utilsProviderAuth2['default']({ provider: loginData, app: this });
				return auth.login().then(function (res) {
					_utilsLogger2['default'].info({
						description: 'Provider login successful.',
						provider: loginData, res: res,
						func: 'login', obj: 'Matter'
					});
					return Promise.resolve(res);
				});
			}
		}

		/** Logout
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
			var _this2 = this;

			//TODO: Handle logging out of providers
			if (!this.isLoggedIn) {
				_utilsLogger2['default'].warn({
					description: 'No logged in account to log out.',
					func: 'logout', obj: 'Matter'
				});
				return Promise.reject({
					message: 'No logged in account to log out.',
					status: 'NULL_ACCOUNT'
				});
			}
			return _utilsRequest2['default'].put(this.endpoint + '/logout').then(function (response) {
				_utilsLogger2['default'].info({
					description: 'Logout successful.',
					response: response, func: 'logout', obj: 'Matter'
				});
				_this2.currentUser = null;
				_this2.token['delete']();
				return response;
			})['catch'](function (errRes) {
				_utilsLogger2['default'].error({
					description: 'Error requesting log out: ',
					error: errRes, func: 'logout', obj: 'Matter'
				});
				_this2.storage.removeItem(_config2['default'].tokenUserDataName);
				_this2.token['delete']();
				return Promise.reject(errRes);
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
			var _this3 = this;

			if (this.currentUser) {
				_utilsLogger2['default'].debug({
					description: 'Current is already available. Returning user.',
					func: 'currentUser', obj: 'Matter'
				});
				return Promise.resolve(this.currentUser);
			}
			if (!this.isLoggedIn) {
				_utilsLogger2['default'].debug({
					description: 'Current user is null.',
					func: 'currentUser', obj: 'Matter'
				});
				return Promise.resolve(null);
			}
			return _utilsRequest2['default'].get(this.endpoint + '/user').then(function (response) {
				//TODO: Save user information locally
				_utilsLogger2['default'].log({
					description: 'Current User Request responded.',
					responseData: response, func: 'currentUser', obj: 'Matter'
				});
				_this3.currentUser = response;
				return response;
			})['catch'](function (errRes) {
				if (errRes.status == 401) {
					_utilsLogger2['default'].warn({
						description: 'Called for current user without token.',
						error: errRes, func: 'currentUser', obj: 'Matter'
					});
					_utilsToken2['default']['delete']();
					return Promise.resolve(null);
				}
				_utilsLogger2['default'].error({
					description: 'Error requesting current user.',
					error: errRes, func: 'currentUser', obj: 'Matter'
				});
				return Promise.reject(errRes);
			});
		}

		/** updateProfile
   * @param {Object} updateData - Data to update within profile (only provided data will be modified).
   * @return {Promise}
   * @example
   * //Update current account's profile
   * matter.updateProfile().then(function(updatedAccount){
   *  console.log('Currently logged in account:', updatedAccount);
   * }, function(err){
   *  console.error('Error updating profile:', err);
   * });
   */
	}, {
		key: 'updateProfile',
		value: function updateProfile(updateData) {
			var _this4 = this;

			if (!this.isLoggedIn) {
				_utilsLogger2['default'].error({
					description: 'No current user profile to update.',
					func: 'updateProfile', obj: 'Matter'
				});
				return Promise.reject({ message: 'Must be logged in to update profile.' });
			}
			if (!updateData) {
				_utilsLogger2['default'].error({
					description: 'Data is required to update profile.',
					func: 'updateProfile', obj: 'Matter'
				});
				return Promise.reject({
					message: 'Data required to update profile.',
					status: 'NULL_DATA'
				});
			}
			//Send update request
			return _utilsRequest2['default'].put(this.endpoint + '/user/' + this.token.data.username, updateData).then(function (response) {
				_utilsLogger2['default'].info({
					description: 'Update profile request responded.',
					responseData: response, func: 'updateProfile', obj: 'Matter'
				});
				_this4.currentUser = response;
				return response;
			})['catch'](function (errRes) {
				_utilsLogger2['default'].error({
					description: 'Error requesting current user.',
					error: errRes, func: 'updateProfile', obj: 'Matter'
				});
				return Promise.reject(errRes);
			});
		}

		/** changePassword
   * @param {String} updateData - New password for account.
   * @return {Promise}
   * @example
   * //Update current account's password
   * var newPassword = 'asdfasdfasdf';
   * matter.changePassword(newPassword).then(function(updatedAccount){
   *  console.log('Currently logged in account:', updatedAccount);
   * }, function(err){
   *  console.error('Error updating profile:', err);
   * });
   */
	}, {
		key: 'changePassword',
		value: function changePassword(newPassword) {
			if (!this.isLoggedIn) {
				_utilsLogger2['default'].error({
					description: 'No current user profile for which to change password.',
					func: 'changePassword', obj: 'Matter'
				});
				return Promise.reject({ message: 'Must be logged in to change password.' });
			}
			//Send update request
			return _utilsRequest2['default'].put(this.endpoint + '/user/' + this.token.data.username, newPassword).then(function (response) {
				_utilsLogger2['default'].log({
					description: 'Update password request responded.',
					responseData: response, func: 'changePassword', obj: 'Matter'
				});
				return response;
			})['catch'](function (errRes) {
				_utilsLogger2['default'].error({
					description: 'Error requesting password change.',
					error: errRes, func: 'changePassword', obj: 'Matter'
				});
				return Promise.reject(errRes);
			});
		}
	}, {
		key: 'recoverPassword',
		value: function recoverPassword() {
			if (!this.isLoggedIn) {
				_utilsLogger2['default'].error({
					description: 'No current user for which to recover password.',
					func: 'recoverPassword', obj: 'Matter'
				});
				return Promise.reject({ message: 'Must be logged in to recover password.' });
			}
			//Send update request
			return _utilsRequest2['default'].post(this.endpoint + '/accounts/' + this.token.data.username + '/recover').then(function (response) {
				_utilsLogger2['default'].info({
					description: 'Recover password request responded.',
					responseData: response, func: 'recoverPassword',
					obj: 'Matter'
				});
				return response;
			})['catch'](function (errRes) {
				_utilsLogger2['default'].error({
					description: 'Error requesting password recovery.',
					error: errRes, func: 'recoverPassword', obj: 'Matter'
				});
				return Promise.reject(errRes);
			});
		}

		/** Get current logged in status
   * @return {Boolean}
   * @example
   * //Check if there is an account currently logged in
   * if(matter.isLoggedIn){
   * console.log('There is currently an account logged in.');
   * } else {
   * console.warn('There is no account currently logged in.');
   * }
   */
	}, {
		key: 'isInGroup',

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
   *
   */
		value: function isInGroup(checkGroups) {
			var _this5 = this;

			if (!this.isLoggedIn) {
				_utilsLogger2['default'].error({
					description: 'No logged in user to check for groups.',
					func: 'isInGroup', obj: 'Matter'
				});
				return false;
			}
			if (!checkGroups) {
				_utilsLogger2['default'].log({
					description: 'Invalid group(s).',
					func: 'isInGroup', obj: 'Matter'
				});
				return false;
			}
			//Check if user is
			if ((0, _lodash.isString)(checkGroups)) {
				var _ret = (function () {
					var groupName = checkGroups;
					//Single role or string list of roles
					var groupsArray = groupName.split(',');
					if (groupsArray.length > 1) {
						//String list of groupts
						_utilsLogger2['default'].info({
							description: 'String list of groups.', list: groupsArray,
							func: 'isInGroup', obj: 'Matter'
						});
						return {
							v: _this5.isInGroups(groupsArray)
						};
					} else {
						//Single group
						var groups = _this5.token.data.groups || [];
						_utilsLogger2['default'].log({
							description: 'Checking if user is in group.',
							group: groupName, userGroups: _this5.token.data.groups,
							func: 'isInGroup', obj: 'Matter'
						});
						return {
							v: (0, _lodash.any)(groups, function (group) {
								return groupName == group.name;
							})
						};
					}
				})();

				if (typeof _ret === 'object') return _ret.v;
			} else if ((0, _lodash.isArray)(checkGroups)) {
				//Array of groups/roles
				//Check that user is in every group
				_utilsLogger2['default'].info({
					description: 'Array of groups.', list: checkGroups,
					func: 'isInGroup', obj: 'Matter'
				});
				return this.isInGroups(checkGroups);
			} else {
				return false;
			}
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
   *
   */
	}, {
		key: 'isInGroups',
		value: function isInGroups(checkGroups) {
			var _this6 = this;

			if (!this.isLoggedIn) {
				_utilsLogger2['default'].log({
					description: 'No logged in user to check.',
					func: 'isInGroups', obj: 'Matter'
				});
				return false;
			}
			if (!checkGroups) {
				_utilsLogger2['default'].log({
					description: 'Invalid group(s).',
					func: 'isInGroup', obj: 'Matter'
				});
				return false;
			}
			//Check if user is in any of the provided groups
			if ((0, _lodash.isArray)(checkGroups)) {
				return (0, _lodash.every)(checkGroups.map(function (group) {
					if ((0, _lodash.isString)(group)) {
						//Group is string
						return _this6.isInGroup(group);
					} else {
						//Group is object
						if ((0, _lodash.has)(group, 'name')) {
							return _this6.isInGroup(group.name);
						} else {
							_utilsLogger2['default'].error({
								description: 'Invalid group object.',
								group: group, func: 'isInGroups', obj: 'Matter'
							});
							return false;
						}
					}
				}), true);
			} else if ((0, _lodash.isString)(checkGroups)) {
				//TODO: Handle spaces within string list
				var groupsArray = checkGroups.split(',');
				if (groupsArray.length > 1) {
					return this.isInGroups(groupsArray);
				}
				return this.isInGroup(groupsArray[0]);
			} else {
				_utilsLogger2['default'].error({
					description: 'Invalid groups list.',
					func: 'isInGroups', obj: 'Matter'
				});
				return false;
			}
		}
	}, {
		key: 'endpoint',
		get: function get() {
			//Handle options
			if ((0, _lodash.has)(this, 'options')) {
				if (this.options.localServer) {
					_config2['default'].envName = 'local';
					_utilsLogger2['default'].log({
						description: 'LocalServer option was set to true. Now server url is local server.',
						url: _config2['default'].serverUrl, func: 'endpoint', obj: 'Matter'
					});
				}
				if (this.options.env) {
					_config2['default'].envName = this.options.env;
					_utilsLogger2['default'].log({
						description: 'Environment set based on provided environment.',
						config: _config2['default'], func: 'endpoint', obj: 'Matter'
					});
				}
			}
			var appEndpoint = _config2['default'].serverUrl + '/apps/' + this.name;
			//Handle tessellate as name
			if (this.name == 'tessellate') {
				//Remove url if host is a tessellate server
				if (typeof window !== 'undefined' && (0, _lodash.has)(window, 'location') && window.location.host.indexOf('tessellate') !== -1) {
					appEndpoint = '';
					_utilsLogger2['default'].info({
						description: 'Host is Tessellate Server, serverUrl simplified!',
						url: appEndpoint, func: 'endpoint', obj: 'Matter'
					});
				} else {
					appEndpoint = _config2['default'].serverUrl;
					_utilsLogger2['default'].info({
						description: 'App is tessellate, serverUrl set as main tessellate server.',
						url: appEndpoint, func: 'endpoint', obj: 'Matter'
					});
				}
			}
			_utilsLogger2['default'].log({
				description: 'Endpoint created.', url: appEndpoint,
				func: 'endpoint', obj: 'Matter'
			});
			return appEndpoint;
		}
	}, {
		key: 'isLoggedIn',
		get: function get() {
			return this.token.string ? true : false;
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
			_utilsLogger2['default'].debug({
				description: 'Current User set.', user: userData,
				func: 'currentUser', obj: 'Matter'
			});
			this.storage.setItem(_config2['default'].tokenUserDataName, userData);
		},

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
		get: function get() {
			if (this.storage.getItem(_config2['default'].tokenUserDataName)) {
				return this.storage.getItem(_config2['default'].tokenUserDataName);
			} else {
				return null;
			}
		}

		/* Storage Utility
   *
   */
	}, {
		key: 'storage',
		get: function get() {
			return _utilsEnvStorage2['default'];
		}

		/** Token Utility
   */
	}, {
		key: 'token',
		get: function get() {
			return _utilsToken2['default'];
		}

		/** Utils placed in base library
   */
	}, {
		key: 'utils',
		get: function get() {
			return { logger: _utilsLogger2['default'], request: _utilsRequest2['default'], storage: _utilsEnvStorage2['default'], dom: _utilsDom2['default'] };
		}
	}]);

	return Matter;
})();

exports['default'] = Matter;
module.exports = exports['default'];