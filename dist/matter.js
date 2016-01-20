(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Matter"] = factory();
	else
		root["Matter"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _every = __webpack_require__(47);

	var _every2 = _interopRequireDefault(_every);

	var _isArray = __webpack_require__(1);

	var _isArray2 = _interopRequireDefault(_isArray);

	var _some = __webpack_require__(50);

	var _some2 = _interopRequireDefault(_some);

	var _has = __webpack_require__(9);

	var _has2 = _interopRequireDefault(_has);

	var _isString = __webpack_require__(22);

	var _isString2 = _interopRequireDefault(_isString);

	var _isObject = __webpack_require__(2);

	var _isObject2 = _interopRequireDefault(_isObject);

	var _config = __webpack_require__(11);

	var _config2 = _interopRequireDefault(_config);

	var _logger = __webpack_require__(5);

	var _logger2 = _interopRequireDefault(_logger);

	var _dom = __webpack_require__(24);

	var dom = _interopRequireWildcard(_dom);

	var _request = __webpack_require__(26);

	var _request2 = _interopRequireDefault(_request);

	var _token = __webpack_require__(27);

	var _token2 = _interopRequireDefault(_token);

	var _envStorage = __webpack_require__(25);

	var _envStorage2 = _interopRequireDefault(_envStorage);

	var _providerAuth = __webpack_require__(41);

	var _providerAuth2 = _interopRequireDefault(_providerAuth);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Matter = (function () {
		/** Constructor
	  * @param {String} appName Name of application
	  */

		function Matter(appName, opts) {
			_classCallCheck(this, Matter);

			if (!appName) {
				_logger2.default.error({
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
				_logger2.default.debug({
					description: 'Signup called.', signupData: signupData,
					func: 'signup', obj: 'Matter'
				});
				if (!signupData || !(0, _isObject2.default)(signupData) && !(0, _isString2.default)(signupData)) {
					_logger2.default.error({
						description: 'Signup information is required to signup.',
						func: 'signup', obj: 'Matter'
					});
					return Promise.reject({
						message: 'Signup data is required to signup.',
						status: 'NULL_DATA'
					});
				}
				if ((0, _isObject2.default)(signupData)) {
					//Handle no username or email
					if (!signupData.username && !signupData.email) {
						_logger2.default.error({
							description: 'Email or Username required to signup.',
							func: 'signup', obj: 'Matter'
						});
						return Promise.reject({
							message: 'Email or Username required to signup.',
							status: 'ID_REQUIRED'
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
					return _request2.default.post(this.endpoint + '/signup', signupData).then(function (res) {
						_logger2.default.info({
							description: 'Signup successful.',
							signupData: signupData, res: res, func: 'signup', obj: 'Matter'
						});
						if ((0, _has2.default)(res, 'account')) {
							return res.account;
						} else {
							_logger2.default.warn({
								description: 'Account was not contained in signup res.',
								signupData: signupData, res: res, func: 'signup', obj: 'Matter'
							});
							return res;
						}
					})['catch'](function (error) {
						_logger2.default.error({
							description: 'Error requesting signup.', error: error,
							signupData: signupData, func: 'signup', obj: 'Matter'
						});
						return Promise.reject(error);
					});
				} else {
					//Handle 3rd Party signups
					_logger2.default.debug({
						description: 'Third party signup called.',
						provider: signupData, func: 'signup', obj: 'Matter'
					});
					var auth = new _providerAuth2.default({ provider: signupData, app: this });
					return auth.signup(signupData).then(function (res) {
						_logger2.default.info({
							description: 'Provider signup successful.', provider: signupData,
							res: res, func: 'signup', obj: 'Matter'
						});
						return res;
					}, function (error) {
						_logger2.default.error({
							description: 'Error with provider authentication.',
							provider: signupData, error: error, func: 'signup', obj: 'Matter'
						});
						return Promise.reject(error);
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

				if (!loginData || !(0, _isObject2.default)(loginData) && !(0, _isString2.default)(loginData)) {
					_logger2.default.error({
						description: 'Username/Email and Password are required to login',
						func: 'login', obj: 'Matter'
					});
					return Promise.reject({
						message: 'Login data is required to login.',
						status: 'DATA_REQUIRED'
					});
				}
				if ((0, _isObject2.default)(loginData)) {
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
						if ((0, _has2.default)(response, 'data') && (0, _has2.default)(response.data, 'status') && response.data.status == 409) {
							_logger2.default.error({
								description: 'Account not found.', response: response,
								func: 'login', obj: 'Matter'
							});
							return Promise.reject(response.data);
						} else {
							_logger2.default.info({
								description: 'Successful login.', response: response,
								func: 'login', obj: 'Matter'
							});
							if ((0, _has2.default)(response, 'token')) {
								_this.token.string = response.token;
							}
							var userAccount = {};
							//Get user data either directly from response or from token
							if ((0, _has2.default)(response, 'account')) {
								userAccount = response.account;
							} else if (_this.token.data) {
								//TODO: Handle more Auth Provider tokens
								//Check for AuthRocket style token
								_logger2.default.debug({
									description: 'User data available from token.',
									tokenData: _this.token.data, type: _typeof(_this.token.data),
									func: 'login', obj: 'Matter'
								});
								if (_this.token.data.un) {
									_logger2.default.log({
										description: 'Token is AuthRocket format.',
										func: 'login', obj: 'Matter'
									});
									userAccount = {
										username: _this.token.data.un,
										name: _this.token.data.n || null,
										authrocketId: _this.token.data.uid || null
									};
								} else {
									_logger2.default.debug({
										description: 'Token is default format.',
										func: 'login', obj: 'Matter'
									});
									//Default token style
									userAccount = _this.token.data;
								}
							} else {
								_logger2.default.error({
									description: 'User data not available from response or token.',
									func: 'login', obj: 'Matter'
								});
								userAccount = { token: _this.token.string };
							}
							//Set userdata to local storage
							_this.storage.setItem(_config2.default.tokenUserDataName, userAccount);
							return userAccount;
						}
					})['catch'](function (errRes) {
						_logger2.default.error({
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
					var auth = new _providerAuth2.default({ provider: loginData, app: this });
					return auth.login().then(function (res) {
						_logger2.default.info({
							description: 'Provider login successful.',
							provider: loginData, res: res,
							func: 'login', obj: 'Matter'
						});
						return res;
					});
				}
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
				var _this2 = this;

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
					_this2.currentUser = null;
					_this2.token.delete();
					return response;
				})['catch'](function (errRes) {
					_logger2.default.error({
						description: 'Error requesting log out: ',
						error: errRes, func: 'logout', obj: 'Matter'
					});
					_this2.storage.removeItem(_config2.default.tokenUserDataName);
					_this2.token.delete();
					return Promise.reject(errRes);
				});
			}
		}, {
			key: 'providerSignup',
			value: function providerSignup(providerData) {
				if (!providerData) {
					return Promise.reject('Provider data is required to signup.');
				}
				var provider = providerData.provider;
				var code = providerData.code;

				if (!provider) {
					return Promise.reject('Provider name is required to signup.');
				}
				if (!code) {
					return Promise.reject('Provider code is required to signup.');
				}
				var auth = new _providerAuth2.default({ provider: provider, app: this });
				return auth.accountFromCode(code).then(function (res) {
					_logger2.default.info({
						description: 'Provider login successful.',
						providerData: providerData, res: res,
						func: 'providerSignup', obj: 'Matter'
					});
					return res;
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
				var _this3 = this;

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
					_this3.currentUser = response;
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
				var _this4 = this;

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
					_this4.currentUser = response;
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
				var _this5 = this;

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
				var uploadUrl = this.endpoint + '/user/' + this.token.data.username;
				return _request2.default.put(this.urls.upload, fileData).then(function (response) {
					_logger2.default.info({
						description: 'Upload image request responded.',
						responseData: response, func: 'uploadImage', obj: 'Matter'
					});
					_this5.currentUser = response;
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
				var _this6 = this;

				return this.uploadImage(fileData).then(function (imgUrl) {
					return _this6.updateAccount({ image: { url: imgUrl } });
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
				if (!accountData || !(0, _isString2.default)(accountData) && !(0, _isObject2.default)(accountData)) {
					_logger2.default.error({
						description: 'Account data is required to recover an account.',
						func: 'recoverAccount', obj: 'Matter'
					});
					return Promise.reject({ message: 'Account data is required to recover an account.' });
				}
				var account = {};
				if ((0, _isString2.default)(accountData)) {
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

			/** Save current user (handled automatically by default)
	   * @param {Object} userData - Account data to set for current user
	   * @example
	   * //Save account response to current user
	   * matter.currentUser = {username: 'testuser1', email: 'test@email.com'};
	   * console.log('New current user set:', matter.currentUser);
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
	   */
			value: function isInGroup(checkGroups) {
				var _this7 = this;

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
				//Check if user is
				if ((0, _isString2.default)(checkGroups)) {
					var _ret = (function () {
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
								v: _this7.isInGroups(groupsArray)
							};
						} else {
							//Single group
							var groups = _this7.token.data.groups || [];
							_logger2.default.log({
								description: 'Checking if user is in group.',
								group: groupName, userGroups: _this7.token.data.groups,
								func: 'isInGroup', obj: 'Matter'
							});
							return {
								v: (0, _some2.default)(groups, function (group) {
									return groupName == group.name;
								})
							};
						}
					})();

					if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
				} else if ((0, _isArray2.default)(checkGroups)) {
					//Array of groups/roles
					//Check that user is in every group
					_logger2.default.info({
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
				var _this8 = this;

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
				if ((0, _isArray2.default)(checkGroups)) {
					return (0, _every2.default)(checkGroups.map(function (group) {
						if ((0, _isString2.default)(group)) {
							//Group is string
							return _this8.isInGroup(group);
						} else {
							//Group is object
							if ((0, _has2.default)(group, 'name')) {
								return _this8.isInGroup(group.name);
							} else {
								_logger2.default.error({
									description: 'Invalid group object.',
									group: group, func: 'isInGroups', obj: 'Matter'
								});
								return false;
							}
						}
					}), true);
				} else if ((0, _isString2.default)(checkGroups)) {
					//TODO: Handle spaces within string list
					var groupsArray = checkGroups.split(',');
					if (groupsArray.length > 1) {
						return this.isInGroups(groupsArray);
					}
					return this.isInGroup(groupsArray[0]);
				} else {
					_logger2.default.error({
						description: 'Invalid groups list.',
						func: 'isInGroups', obj: 'Matter'
					});
					return false;
				}
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
				if ((0, _has2.default)(this, 'options')) {
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
				var appEndpoint = _config2.default.serverUrl + '/apps/' + this.name;
				//Handle tessellate as name
				if (this.name == 'tessellate') {
					//Remove url if host is a tessellate server
					if (typeof window !== 'undefined' && (0, _has2.default)(window, 'location') && window.location.host.indexOf('tessellate') !== -1) {
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
	})();

	exports.default = Matter;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(14),
	    isLength = __webpack_require__(6),
	    isObjectLike = __webpack_require__(3);

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

	module.exports = isArray;


/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(2);

	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}

	module.exports = toObject;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _isString = __webpack_require__(22);

	var _isString2 = _interopRequireDefault(_isString);

	var _keys = __webpack_require__(10);

	var _keys2 = _interopRequireDefault(_keys);

	var _omit = __webpack_require__(94);

	var _omit2 = _interopRequireDefault(_omit);

	var _each = __webpack_require__(46);

	var _each2 = _interopRequireDefault(_each);

	var _has = __webpack_require__(9);

	var _has2 = _interopRequireDefault(_has);

	var _isObject = __webpack_require__(2);

	var _isObject2 = _interopRequireDefault(_isObject);

	var _config = __webpack_require__(11);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var logger = {
		log: function log(logData) {
			var msgArgs = buildMessageArgs(logData);
			if (_config2.default.logLevel === 'trace') {
				runConsoleMethod('log', msgArgs);
			}
		},
		debug: function debug(logData) {
			var msgArgs = buildMessageArgs(logData);
			if (_config2.default.logLevel === 'trace' || _config2.default.logLevel === 'debug') {
				runConsoleMethod('debug', msgArgs);
			}
		},
		info: function info(logData) {
			if (_config2.default.logLevel === 'trace' || _config2.default.logLevel === 'debug' || _config2.default.logLevel === 'info') {
				var msgArgs = buildMessageArgs(logData);
				runConsoleMethod('info', msgArgs);
			}
		},
		warn: function warn(logData) {
			var msgArgs = buildMessageArgs(logData);
			if (_config2.default.logLevel === 'trace' || _config2.default.logLevel === 'debug' || _config2.default.logLevel === 'info' || _config2.default.logLevel === 'warn') {
				runConsoleMethod('warn', msgArgs);
			}
		},
		error: function error(logData) {
			var msgArgs = buildMessageArgs(logData);
			if (_config2.default.logLevel === 'trace' || _config2.default.logLevel === 'debug' || _config2.default.logLevel === 'info' || _config2.default.logLevel === 'warn' || _config2.default.logLevel === 'error' || _config2.default.logLevel === 'fatal') {
				runConsoleMethod('error', msgArgs);
			}
		}
	};

	exports.default = logger;

	function runConsoleMethod(methodName, methodData) {
		//Safley run console methods or use console log
		if (methodName && console[methodName]) {
			return console[methodName].apply(console, methodData);
		} else {
			return console.log.apply(console, methodData);
		}
	}
	function buildMessageArgs(logData) {
		var msgStr = '';
		var msgObj = {};
		//TODO: Attach time stamp
		//Attach location information to the beginning of message
		if ((0, _isObject2.default)(logData)) {
			if (_config2.default.logLevel !== 'error') {
				if ((0, _has2.default)(logData, 'func')) {
					if ((0, _has2.default)(logData, 'obj')) {
						//Object and function provided
						msgStr += '[' + logData.obj + '.' + logData.func + '()]\n ';
					} else if ((0, _has2.default)(logData, 'file')) {
						msgStr += '[' + logData.file + ' > ' + logData.func + '()]\n ';
					} else {
						msgStr += '[' + logData.func + '()]\n ';
					}
				}
			}
			//Print each key and its value other than obj and func
			(0, _each2.default)((0, _omit2.default)((0, _keys2.default)(logData)), function (key) {
				if (key != 'func' && key != 'obj') {
					if (key == 'description' || key == 'message') {
						msgStr += logData[key];
					} else if ((0, _isString2.default)(logData[key])) {
						// msgStr += key + ': ' + logData[key] + ', ';
						msgObj[key] = logData[key];
					} else {
						//Print objects differently
						// msgStr += key + ': ' + logData[key] + ', ';
						msgObj[key] = logData[key];
					}
				}
			});
			msgStr += '\n';
		} else if ((0, _isString2.default)(logData)) {
			msgStr = logData;
		}
		var msg = [msgStr, msgObj];

		return msg;
	}
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(37),
	    isLength = __webpack_require__(6);

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	module.exports = isArrayLike;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(7),
	    isObjectLike = __webpack_require__(3);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  return isObjectLike(value) && isArrayLike(value) &&
	    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}

	module.exports = isArguments;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(18),
	    baseSlice = __webpack_require__(36),
	    isArguments = __webpack_require__(8),
	    isArray = __webpack_require__(1),
	    isIndex = __webpack_require__(15),
	    isKey = __webpack_require__(20),
	    isLength = __webpack_require__(6),
	    last = __webpack_require__(28),
	    toPath = __webpack_require__(21);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if `path` is a direct property.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` is a direct property, else `false`.
	 * @example
	 *
	 * var object = { 'a': { 'b': { 'c': 3 } } };
	 *
	 * _.has(object, 'a');
	 * // => true
	 *
	 * _.has(object, 'a.b.c');
	 * // => true
	 *
	 * _.has(object, ['a', 'b', 'c']);
	 * // => true
	 */
	function has(object, path) {
	  if (object == null) {
	    return false;
	  }
	  var result = hasOwnProperty.call(object, path);
	  if (!result && !isKey(path)) {
	    path = toPath(path);
	    object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
	    if (object == null) {
	      return false;
	    }
	    path = last(path);
	    result = hasOwnProperty.call(object, path);
	  }
	  return result || (isLength(object.length) && isIndex(path, object.length) &&
	    (isArray(object) || isArguments(object)));
	}

	module.exports = has;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(14),
	    isArrayLike = __webpack_require__(7),
	    isObject = __webpack_require__(2),
	    shimKeys = __webpack_require__(88);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	module.exports = keys;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _find = __webpack_require__(48);

	var _find2 = _interopRequireDefault(_find);

	var _has = __webpack_require__(9);

	var _has2 = _interopRequireDefault(_has);

	var _merge = __webpack_require__(93);

	var _merge2 = _interopRequireDefault(_merge);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var defaultConfig = {
		envs: {
			local: {
				serverUrl: 'http://localhost:4000',
				logLevel: 'trace'
			},
			dev: {
				serverUrl: 'http://tessellate-stage.elasticbeanstalk.com',
				logLevel: 'debug'
			},
			stage: {
				serverUrl: 'http://tessellate-stage.elasticbeanstalk.com',
				logLevel: 'info'
			},
			prod: {
				serverUrl: 'http://tessellate.elasticbeanstalk.com',
				logLevel: 'error'
			}
		},
		tokenName: 'tessellate',
		tokenDataName: 'tessellate-tokenData',
		tokenUserDataName: 'tessellate-currentUser',
		externalAuth: {
			tessellate: {
				google: '582741153619-9b3vifnmv2a32v49l63got889tgmnrhs.apps.googleusercontent.com',
				// redirectUrl: 'http://tessellate.kyper.io/#/oauth'
				redirectUrl: 'http://localhost:3000/oauth'
			},
			devshare: {
				google: '54741256621-d511263ke51ni32g1jalb9or85ckf5gr.apps.googleusercontent.com',
				redirectUrl: 'http://devshare.io/oauth'
			}
		}
	};
	var instance = null;
	var envName = 'prod';
	var level = null;

	var Config = (function () {
		function Config() {
			_classCallCheck(this, Config);

			if (!instance) {
				instance = this;
			}
			// console.log({description: 'Config object created.', config: merge(this, defaultConfig), func: 'constructor', obj: 'Config'});
			return (0, _merge2.default)(instance, defaultConfig);
		}

		_createClass(Config, [{
			key: 'applySettings',
			value: function applySettings(settings) {
				(0, _merge2.default)(instance, settings);
			}
		}, {
			key: 'serverUrl',
			get: function get() {
				var url = defaultConfig.envs[envName].serverUrl;
				if (typeof window !== 'undefined' && (0, _has2.default)(window, 'location') && (0, _has2.default)(window.location, 'host') && window.location.host !== '') {
					var matchingEnv = (0, _find2.default)(defaultConfig.envs, function (e) {
						return e.serverUrl === window.location.host;
					});
					if (matchingEnv) {
						url = '';
					}
				}
				return url;
			}
		}, {
			key: 'logLevel',
			set: function set(setLevel) {
				level = setLevel;
			},
			get: function get() {
				if (level) {
					return level;
				}
				return defaultConfig.envs[envName].logLevel;
			}
		}, {
			key: 'envName',
			set: function set(newEnv) {
				envName = newEnv;
				// this.envName = newEnv;
				// console.log('Environment name set:', envName);
			},
			get: function get() {
				return envName;
			}
		}, {
			key: 'env',
			get: function get() {
				if (defaultConfig.envs[envName]) {
					return defaultConfig.envs[envName];
				}
			}
		}]);

		return Config;
	})();

	var config = new Config();

	exports.default = config;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(62),
	    createBaseEach = __webpack_require__(76);

	/**
	 * The base implementation of `_.forEach` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object|string} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	module.exports = baseEach;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(39);

	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1: return function(value) {
	      return func.call(thisArg, value);
	    };
	    case 3: return function(value, index, collection) {
	      return func.call(thisArg, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(thisArg, accumulator, value, index, collection);
	    };
	    case 5: return function(value, other, key, object, source) {
	      return func.call(thisArg, value, other, key, object, source);
	    };
	  }
	  return function() {
	    return func.apply(thisArg, arguments);
	  };
	}

	module.exports = bindCallback;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(90);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 15 */
/***/ function(module, exports) {

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	module.exports = isIndex;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(8),
	    isArray = __webpack_require__(1),
	    isIndex = __webpack_require__(15),
	    isLength = __webpack_require__(6),
	    isObject = __webpack_require__(2);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object)) && length) || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keysIn;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(66),
	    baseMatchesProperty = __webpack_require__(67),
	    bindCallback = __webpack_require__(13),
	    identity = __webpack_require__(39),
	    property = __webpack_require__(96);

	/**
	 * The base implementation of `_.callback` which supports specifying the
	 * number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {*} [func=_.identity] The value to convert to a callback.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function baseCallback(func, thisArg, argCount) {
	  var type = typeof func;
	  if (type == 'function') {
	    return thisArg === undefined
	      ? func
	      : bindCallback(func, thisArg, argCount);
	  }
	  if (func == null) {
	    return identity;
	  }
	  if (type == 'object') {
	    return baseMatches(func);
	  }
	  return thisArg === undefined
	    ? property(func)
	    : baseMatchesProperty(func, thisArg);
	}

	module.exports = baseCallback;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(4);

	/**
	 * The base implementation of `get` without support for string paths
	 * and default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path of the property to get.
	 * @param {string} [pathKey] The key representation of path.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path, pathKey) {
	  if (object == null) {
	    return;
	  }
	  if (pathKey !== undefined && pathKey in toObject(object)) {
	    path = [pathKey];
	  }
	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[path[index++]];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(7),
	    isIndex = __webpack_require__(15),
	    isObject = __webpack_require__(2);

	/**
	 * Checks if the provided arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	      ? (isArrayLike(object) && isIndex(index, object.length))
	      : (type == 'string' && index in object)) {
	    var other = object[index];
	    return value === value ? (value === other) : (other !== other);
	  }
	  return false;
	}

	module.exports = isIterateeCall;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(1),
	    toObject = __webpack_require__(4);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  var type = typeof value;
	  if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
	    return true;
	  }
	  if (isArray(value)) {
	    return false;
	  }
	  var result = !reIsDeepProp.test(value);
	  return result || (object != null && value in toObject(object));
	}

	module.exports = isKey;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(72),
	    isArray = __webpack_require__(1);

	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `value` to property path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Array} Returns the property path array.
	 */
	function toPath(value) {
	  if (isArray(value)) {
	    return value;
	  }
	  var result = [];
	  baseToString(value).replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	}

	module.exports = toPath;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(3);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
	}

	module.exports = isString;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(6),
	    isObjectLike = __webpack_require__(3);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dateTag] = typedArrayTags[errorTag] =
	typedArrayTags[funcTag] = typedArrayTags[mapTag] =
	typedArrayTags[numberTag] = typedArrayTags[objectTag] =
	typedArrayTags[regexpTag] = typedArrayTags[setTag] =
	typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
	}

	module.exports = isTypedArray;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.loadCss = loadCss;
	exports.loadJs = loadJs;
	exports.asyncLoadJs = asyncLoadJs;
	exports.getQueryParam = getQueryParam;

	var _has = __webpack_require__(9);

	var _has2 = _interopRequireDefault(_has);

	var _logger = __webpack_require__(5);

	var _logger2 = _interopRequireDefault(_logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @description
	 * Appends given css source to DOM head.
	 *
	 * @param {String} src - url src for css to append
	 *
	 */
	function loadCss(src) {
		if (typeof document == 'undefined') {
			_logger2.default.error({ description: 'Document does not exsist to load assets into.', func: 'loadCss', obj: 'dom' });
			throw new Error('Document object is required to load assets.');
		} else {
			var css = document.createElement('link');
			css.rel = 'stylesheet';
			css.type = 'text/css';
			css.href = src;
			document.getElementsByTagName('head')[0].insertBefore(css, document.getElementsByTagName('head')[0].firstChild);
			_logger2.default.log({ description: 'CSS was loaded into document.', element: css, func: 'loadCss', obj: 'dom' });
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
	function loadJs(src) {
		if (typeof window == 'undefined' || !(0, _has2.default)(window, 'document')) {
			_logger2.default.error({ description: 'Document does not exsist to load assets into.', func: 'loadJs', obj: 'dom' });
			throw new Error('Document object is required to load assets.');
		} else {
			var js = window.document.createElement('script');
			js.src = src;
			js.type = 'text/javascript';
			window.document.getElementsByTagName('head')[0].appendChild(js);
			_logger2.default.log({
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
	function asyncLoadJs(src) {
		if (typeof window == 'undefined' || !(0, _has2.default)(window, 'document')) {
			_logger2.default.error({
				description: 'Document does not exsist to load assets into.', func: 'asyncLoadJs', obj: 'dom'
			});
			throw new Error('Document object is required to load assets.');
		} else {
			var js = window.document.createElement('script');
			js.src = src;
			js.type = 'text/javascript';
			window.document.getElementsByTagName('head')[0].appendChild(js);
			_logger2.default.log({
				description: 'JS was loaded into document.', element: js, func: 'asyncLoadJs', obj: 'dom'
			});
			return new Promise(function (resolve) {
				window.setTimeout(resolve, 200);
			});
		}
	}
	function getQueryParam(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		    results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _isObject = __webpack_require__(2);

	var _isObject2 = _interopRequireDefault(_isObject);

	var _logger = __webpack_require__(5);

	var _logger2 = _interopRequireDefault(_logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var data = {};

	var storage = {
		/** Gets whether or not local storage exists.
	  * @param {String} itemName The items name
	  * @param {String} itemValue The items value
	  * @return {Boolean}
	  *
	  */
		get localExists() {
			var testKey = 'test';
			if (typeof window != 'undefined' && typeof window.sessionStorage != 'undefined') {
				try {
					window.sessionStorage.setItem(testKey, '1');
					window.sessionStorage.removeItem(testKey);
					return true;
				} catch (err) {
					_logger2.default.error({ description: 'Error saving to session storage', error: err, obj: 'storage', func: 'localExists' });
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
		item: function item(itemName, itemValue) {
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
		setItem: function setItem(itemName, itemValue) {
			data[itemName] = itemValue;
			if (this.localExists) {
				//Convert object to string
				if ((0, _isObject2.default)(itemValue)) {
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
		getItem: function getItem(itemName) {
			if (data[itemName]) {
				return data[itemName];
			} else if (this.localExists) {
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
		},

		/**
	  * @description Safley removes item from session storage.
	  *
	  * @param {String} itemName - The items name
	  *
	  */
		removeItem: function removeItem(itemName) {
			//TODO: Only remove used items
			if (data[itemName]) {
				data[itemName] = null;
			}
			if (this.localExists) {
				try {
					//Clear session storage
					window.sessionStorage.removeItem(itemName);
				} catch (err) {
					_logger2.default.error({ description: 'Error removing item from session storage', error: err, obj: 'storage', func: 'removeItem' });
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
		clear: function clear() {
			//TODO: Only remove used items
			data = {};
			if (this.localExists) {
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
	};

	exports.default = storage;
	module.exports = exports['default'];

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _logger = __webpack_require__(5);

	var _logger2 = _interopRequireDefault(_logger);

	var _token = __webpack_require__(27);

	var _token2 = _interopRequireDefault(_token);

	var _superagent = __webpack_require__(97);

	var _superagent2 = _interopRequireDefault(_superagent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var request = {
		get: function get(endpoint, queryData) {
			var req = _superagent2.default.get(endpoint);
			if (queryData) {
				req.query(queryData);
			}
			req = addAuthHeader(req);
			return handleResponse(req);
		},
		post: function post(endpoint, data) {
			var req = _superagent2.default.post(endpoint).send(data);
			req = addAuthHeader(req);
			return handleResponse(req);
		},
		put: function put(endpoint, data) {
			var req = _superagent2.default.put(endpoint, data);
			req = addAuthHeader(req);
			return handleResponse(req);
		},
		del: function del(endpoint, data) {
			var req = _superagent2.default.put(endpoint, data);
			req = addAuthHeader(req);
			return handleResponse(req);
		}
	};

	exports.default = request;

	function handleResponse(req) {
		return new Promise(function (resolve, reject) {
			if (typeof req.end !== 'function') {
				_logger2.default.warn({
					description: 'req.end is not a function', func: 'handleResponse'
				});
				return reject('req.end is not a function');
			}
			req.end(function (errorRes, res) {
				if (errorRes) {
					var error = errorRes.response.body.error ? errorRes.response.body.error : errorRes.response.body;
					_logger2.default.warn({
						description: 'Error in request.', error: error,
						errorRes: errorRes, func: 'handleResponse'
					});
					if (errorRes.status == 401) {
						_logger2.default.warn({
							description: 'Unauthorized. You must be signed into make this request.',
							func: 'handleResponse'
						});
					}
					return reject(error.message || error);
				}
				try {
					var response = JSON.parse(res.body);
					resolve(response);
				} catch (err) {
					resolve(res.body);
				}
			});
		});
	}
	function addAuthHeader(req) {
		if (_token2.default.string) {
			req = req.set('Authorization', 'Bearer ' + _token2.default.string);
			// logger.info({message: 'Set auth header', func: 'addAuthHeader', file: 'request'});
		}
		return req;
	}
	module.exports = exports['default'];

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _has = __webpack_require__(9);

	var _has2 = _interopRequireDefault(_has);

	var _isObject = __webpack_require__(2);

	var _isObject2 = _interopRequireDefault(_isObject);

	var _isString = __webpack_require__(22);

	var _isString2 = _interopRequireDefault(_isString);

	var _config = __webpack_require__(11);

	var _config2 = _interopRequireDefault(_config);

	var _logger = __webpack_require__(5);

	var _logger2 = _interopRequireDefault(_logger);

	var _envStorage = __webpack_require__(25);

	var _envStorage2 = _interopRequireDefault(_envStorage);

	var _jwtDecode = __webpack_require__(43);

	var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var token = {
		/** Get string value of token
	  * @return {String}
	  * @example
	  * console.log('String value of current token', token.string);
	  */
		get string() {
			return _envStorage2.default.getItem(_config2.default.tokenName);
		},
		/** Get decoded data within token (unencrypted data only)
	  * @return {Object}
	  * @example
	  * console.log('Data of current token:', token.data);
	  */
		get data() {
			if (_envStorage2.default.getItem(_config2.default.tokenDataName)) {
				return _envStorage2.default.getItem(_config2.default.tokenDataName);
			} else {
				return decodeToken(this.string);
			}
		},
		/** Set token data
	  */
		set data(tokenData) {
			if ((0, _isString2.default)(tokenData)) {
				var tokenStr = tokenData;
				tokenData = decodeToken(tokenStr);
				_logger2.default.info({
					description: 'Token data was set as string. Decoding token.',
					token: tokenStr, tokenData: tokenData, func: 'data', obj: 'token'
				});
			} else {
				_logger2.default.log({
					description: 'Token data was set.', data: tokenData,
					func: 'data', obj: 'token'
				});
				_envStorage2.default.setItem(_config2.default.tokenDataName, tokenData);
			}
		},
		/** Set token value as a string
	  */
		set string(tokenData) {
			var tokenStr = undefined;
			//Handle object being passed
			if (!(0, _isString2.default)(tokenData)) {
				//Token is included in object
				_logger2.default.log({
					description: 'Token data is not string.',
					token: tokenData, func: 'string', obj: 'token'
				});
				if ((0, _isObject2.default)(tokenData) && (0, _has2.default)(tokenData, 'token')) {
					tokenStr = tokenData.token;
				} else {
					//Input is either not an string or object that contains nessesary info
					_logger2.default.error({
						description: 'Invalid value set to token.',
						token: tokenData, func: 'string', obj: 'token'
					});
					return;
				}
			} else {
				tokenStr = tokenData;
			}
			_logger2.default.log({
				description: 'Token was set.', token: tokenData,
				tokenStr: tokenStr, func: 'string', obj: 'token'
			});
			_envStorage2.default.setItem(_config2.default.tokenName, tokenStr);
			this.data = (0, _jwtDecode2.default)(tokenStr);
		},
		/** Save token data
	  */
		save: function save(tokenStr) {
			this.string = tokenStr;
		},

		/** Delete token data
	  */
		delete: function _delete() {
			//Remove string token
			_envStorage2.default.removeItem(_config2.default.tokenName);
			//Remove user data
			_envStorage2.default.removeItem(_config2.default.tokenDataName);
			_logger2.default.log({
				description: 'Token was removed.',
				func: 'delete', obj: 'token'
			});
		}
	};

	exports.default = token;
	/** Safley decode a JWT string
	 * @private
	 * @return {Object}
	 */

	function decodeToken(tokenStr) {
		var tokenData = undefined;
		if (tokenStr && tokenStr != '') {
			try {
				tokenData = (0, _jwtDecode2.default)(tokenStr);
			} catch (err) {
				_logger2.default.error({
					description: 'Error decoding token.', data: tokenData,
					error: err, func: 'decodeToken', file: 'token'
				});
				throw new Error('Invalid token string.');
			}
		}
		return tokenData;
	}
	module.exports = exports['default'];

/***/ },
/* 28 */
/***/ function(module, exports) {

	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the last element of `array`.
	 * @example
	 *
	 * _.last([1, 2, 3]);
	 * // => 3
	 */
	function last(array) {
	  var length = array ? array.length : 0;
	  return length ? array[length - 1] : undefined;
	}

	module.exports = last;


/***/ },
/* 29 */
/***/ function(module, exports) {

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/Web/JavaScript/Reference/Functions/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.restParam(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function restParam(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        rest = Array(length);

	    while (++index < length) {
	      rest[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, rest);
	      case 1: return func.call(this, args[0], rest);
	      case 2: return func.call(this, args[0], args[1], rest);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = rest;
	    return func.apply(this, otherArgs);
	  };
	}

	module.exports = restParam;


/***/ },
/* 30 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;


/***/ },
/* 31 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(77);

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(32),
	    keysIn = __webpack_require__(16);

	/**
	 * The base implementation of `_.forIn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForIn(object, iteratee) {
	  return baseFor(object, iteratee, keysIn);
	}

	module.exports = baseForIn;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(64),
	    isObject = __webpack_require__(2),
	    isObjectLike = __webpack_require__(3);

	/**
	 * The base implementation of `_.isEqual` without support for `this` binding
	 * `customizer` functions.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
	}

	module.exports = baseIsEqual;


/***/ },
/* 35 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 36 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;

	  start = start == null ? 0 : (+start || 0);
	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = (end === undefined || end > length) ? length : (+end || 0);
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : ((end - start) >>> 0);
	  start >>>= 0;

	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}

	module.exports = baseSlice;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(35);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(2);

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}

	module.exports = isStrictComparable;


/***/ },
/* 39 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.logger = undefined;

	var _logger2 = __webpack_require__(5);

	var _logger3 = _interopRequireDefault(_logger2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.logger = _logger3.default;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _request = __webpack_require__(26);

	var _request2 = _interopRequireDefault(_request);

	var _logger = __webpack_require__(5);

	var _logger2 = _interopRequireDefault(_logger);

	var _dom = __webpack_require__(24);

	var dom = _interopRequireWildcard(_dom);

	var _index = __webpack_require__(40);

	var _config = __webpack_require__(11);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// import hello from 'hellojs'; //Modifies objects to have id parameter?

	var ProviderAuth = (function () {
		function ProviderAuth(actionData) {
			_classCallCheck(this, ProviderAuth);

			var app = actionData.app;
			var redirectUrl = actionData.redirectUrl;
			var provider = actionData.provider;

			var externalAuth = _config2.default.externalAuth[app.name] ? _config2.default.externalAuth[app.name] : null;
			this.app = app;
			this.provider = provider;
			this.redirectUrl = externalAuth ? externalAuth.redirectUrl : '/oauthcallback';
			if (redirectUrl) {
				this.redirectUrl = redirectUrl;
			}
		}
		/** External provider login
	  * @example
	  * //Login to account that was started through external account signup (Google, Facebook, Github)
	  * matter.login('google').then(function(loginRes){
	  * 		console.log('Successful login:', loginRes)
	  * }, function(err){
	  * 		console.error('Error with provider login:', err);
	  * });
	  */

		_createClass(ProviderAuth, [{
			key: 'login',
			value: function login() {
				var _this = this;

				if (this.provider === 'google') {
					return this.googleAuth().then(function (googleAccount) {
						if (!googleAccount) {
							return Promise.reject('Error loading Google account.');
						}
						var image = googleAccount.image;
						var emails = googleAccount.emails;

						var email = emails && emails[0] && emails[0].value ? emails[0].value : '';
						var account = {
							image: image, email: email,
							username: email.split('@')[0],
							provider: _this.provider,
							providerAccount: googleAccount
						};
						_logger2.default.info({
							description: 'Google account loaded, signing up.', account: account,
							googleAccount: googleAccount, func: 'signup', obj: 'providerAuth'
						});
						return new _request2.default.post(_this.app.endpoint + '/signup', account).then(function (newAccount) {
							_logger2.default.info({
								description: 'Signup with external account successful.',
								newAccount: newAccount, func: 'signup', obj: 'providerAuth'
							});
							return newAccount;
						}, function (error) {
							_logger2.default.error({
								description: 'Error loading google account.', account: account,
								googleAccount: googleAccount, error: error, func: 'signup', obj: 'providerAuth'
							});
							return Promise.reject(error);
						});
					}, function (error) {
						_logger2.default.error({
							description: 'Error authenticating with Google.', error: error,
							func: 'signup', obj: 'providerAuth'
						});
						return Promise.reject('Error getting external account.');
					});
				} else {
					_logger2.default.error({
						description: 'Invalid provider.',
						func: 'signup', obj: 'providerAuth'
					});
					return Promise.reject('Invalid provider');
				}
			}
			/** Signup using external provider account (Google, Facebook, Github)
	   * @example
	   * //Signup using external account (Google, Facebook, Github)
	   * matter.signup('google').then(function(signupRes){
	   * 		console.log('Successful signup:', signupRes)
	   * }, function(err){
	   * 		console.error('Error with provider signup:', err);
	   * });
	   */

		}, {
			key: 'signup',
			value: function signup() {
				var _this2 = this;

				if (this.provider === 'google') {
					return this.googleAuth().then(function (googleAccount) {
						if (!googleAccount) {
							return Promise.reject('Error loading Google account.');
						}
						var image = googleAccount.image;
						var emails = googleAccount.emails;

						var email = emails && emails[0] && emails[0].value ? emails[0].value : '';
						var account = {
							image: image, email: email,
							username: email.split('@')[0],
							provider: _this2.provider,
							providerAccount: googleAccount
						};
						_logger2.default.info({
							description: 'Google account loaded, signing up.', account: account,
							googleAccount: googleAccount, func: 'signup', obj: 'providerAuth'
						});
						return new _request2.default.post(_this2.app.endpoint + '/signup', account).then(function (newAccount) {
							_logger2.default.info({
								description: 'Signup with external account successful.',
								newAccount: newAccount, func: 'signup', obj: 'providerAuth'
							});
							return newAccount;
						}, function (error) {
							_logger2.default.error({
								description: 'Error loading google account.', account: account,
								googleAccount: googleAccount, error: error, func: 'signup', obj: 'providerAuth'
							});
							return Promise.reject(error);
						});
					}, function (error) {
						_logger2.default.error({
							description: 'Error authenticating with Google.', error: error,
							func: 'signup', obj: 'providerAuth'
						});
						return Promise.reject('Error getting external account.');
					});
				} else {
					_logger2.default.error({
						description: 'Invalid provider.',
						func: 'signup', obj: 'providerAuth'
					});
					return Promise.reject('Invalid provider');
				}
			}
		}, {
			key: 'googleAuth',
			value: function googleAuth() {
				var _this3 = this;

				var clientId = this.app && this.app.name && _config2.default.externalAuth[this.app.name] ? _config2.default.externalAuth[this.app.name].google : null;
				if (!clientId) {
					_logger2.default.error({
						description: 'ClientId is required to authenticate with Google.',
						func: 'googleSignup', obj: 'providerAuth'
					});
					return Promise.reject('Client id is required to authenticate with Google.');
				}
				if (typeof window !== 'undefined' && typeof window.gapi === 'undefined') {
					return this.addGoogleLib().then(function () {
						return _this3.googleAuth();
					});
				}
				return new Promise(function (resolve, reject) {
					window.gapi.auth.authorize({ client_id: clientId, scope: 'email profile' }, function (auth) {
						if (!auth || auth.error || auth.message) {
							_logger2.default.error({
								description: 'Error authorizing with google',
								func: 'googleSignup', obj: 'providerAuth'
							});
							return reject(auth.error || auth.message);
						}
						_logger2.default.log({
							description: 'Auth with google successful.', auth: auth,
							func: 'googleSignup', obj: 'providerAuth'
						});
						window.gapi.client.load('plus', 'v1', function () {
							var request = gapi.client.plus.people.get({
								'userId': 'me'
							});
							request.execute(function (account) {
								_logger2.default.log({
									description: 'Account loaded from google.', account: account,
									func: 'googleSignup', obj: 'providerAuth'
								});
								//TODO: Signup/Login to Tessellate server with this information
								resolve(account);
							});
						});
					});
				});
			}
		}, {
			key: 'addGoogleLib',
			value: function addGoogleLib() {
				var scriptSrc = 'https://apis.google.com/js/client.js?onload=OnLoadCallback';
				return new Promise(function (resolve) {
					dom.asyncLoadJs(scriptSrc);
					if (typeof window !== 'undefined') {
						window.OnLoadCallback = function () {
							_logger2.default.log({
								description: 'Google library loaded',
								func: 'googleSignup', obj: 'providerAuth'
							});
							resolve();
						};
					}
				});
			}
		}]);

		return ProviderAuth;
	})();

	exports.default = ProviderAuth;
	module.exports = exports['default'];

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var Base64 = __webpack_require__(45);

	module.exports = function(str) {
	  var output = str.replace(/-/g, "+").replace(/_/g, "/");
	  switch (output.length % 4) {
	    case 0:
	      break;
	    case 2:
	      output += "==";
	      break;
	    case 3:
	      output += "=";
	      break;
	    default:
	      throw "Illegal base64url string!";
	  }

	  var result = Base64.atob(output);

	  try{
	    return decodeURIComponent(escape(result));
	  } catch (err) {
	    return result;
	  }
	};


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var base64_url_decode = __webpack_require__(42);
	var json_parse = __webpack_require__(44);

	module.exports = function (token) {
	  if (!token) {
	    throw new Error('Invalid token specified');
	  }
	  
	  return json_parse(base64_url_decode(token.split('.')[1]));
	};


/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = function (str) {
	  var parsed;
	  if (typeof JSON === 'object') {
	    parsed = JSON.parse(str);
	  } else {
	    parsed = eval('(' + str + ')');
	  }
	  return parsed;
	};


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	;(function () {

	  var
	    object =  true ? exports : this, // #8: web workers
	    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
	    INVALID_CHARACTER_ERR = (function () {
	      // fabricate a suitable error object
	      try { document.createElement('$'); }
	      catch (error) { return error; }}());

	  // encoder
	  // [https://gist.github.com/999166] by [https://github.com/nignag]
	  object.btoa || (
	  object.btoa = function (input) {
	    for (
	      // initialize result and counter
	      var block, charCode, idx = 0, map = chars, output = '';
	      // if the next input index does not exist:
	      //   change the mapping table to "="
	      //   check if d has no fractional digits
	      input.charAt(idx | 0) || (map = '=', idx % 1);
	      // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	      output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	    ) {
	      charCode = input.charCodeAt(idx += 3/4);
	      if (charCode > 0xFF) throw INVALID_CHARACTER_ERR;
	      block = block << 8 | charCode;
	    }
	    return output;
	  });

	  // decoder
	  // [https://gist.github.com/1020396] by [https://github.com/atk]
	  object.atob || (
	  object.atob = function (input) {
	    input = input.replace(/=+$/, '')
	    if (input.length % 4 == 1) throw INVALID_CHARACTER_ERR;
	    for (
	      // initialize result and counters
	      var bc = 0, bs, buffer, idx = 0, output = '';
	      // get next character
	      buffer = input.charAt(idx++);
	      // character found in table? initialize bit storage and add its ascii value;
	      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
	        // and if not first of each 4 characters,
	        // convert the first 8 bits to one ascii character
	        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
	    ) {
	      // try to find character in table (0-63, not found => -1)
	      buffer = chars.indexOf(buffer);
	    }
	    return output;
	  });

	}());


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(49);


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEvery = __webpack_require__(53),
	    baseCallback = __webpack_require__(17),
	    baseEvery = __webpack_require__(58),
	    isArray = __webpack_require__(1),
	    isIterateeCall = __webpack_require__(19);

	/**
	 * Checks if `predicate` returns truthy for **all** elements of `collection`.
	 * The predicate is bound to `thisArg` and invoked with three arguments:
	 * (value, index|key, collection).
	 *
	 * If a property name is provided for `predicate` the created `_.property`
	 * style callback returns the property value of the given element.
	 *
	 * If a value is also provided for `thisArg` the created `_.matchesProperty`
	 * style callback returns `true` for elements that have a matching property
	 * value, else `false`.
	 *
	 * If an object is provided for `predicate` the created `_.matches` style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * @static
	 * @memberOf _
	 * @alias all
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked
	 *  per iteration.
	 * @param {*} [thisArg] The `this` binding of `predicate`.
	 * @returns {boolean} Returns `true` if all elements pass the predicate check,
	 *  else `false`.
	 * @example
	 *
	 * _.every([true, 1, null, 'yes'], Boolean);
	 * // => false
	 *
	 * var users = [
	 *   { 'user': 'barney', 'active': false },
	 *   { 'user': 'fred',   'active': false }
	 * ];
	 *
	 * // using the `_.matches` callback shorthand
	 * _.every(users, { 'user': 'barney', 'active': false });
	 * // => false
	 *
	 * // using the `_.matchesProperty` callback shorthand
	 * _.every(users, 'active', false);
	 * // => true
	 *
	 * // using the `_.property` callback shorthand
	 * _.every(users, 'active');
	 * // => false
	 */
	function every(collection, predicate, thisArg) {
	  var func = isArray(collection) ? arrayEvery : baseEvery;
	  if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
	    predicate = undefined;
	  }
	  if (typeof predicate != 'function' || thisArg !== undefined) {
	    predicate = baseCallback(predicate, thisArg, 3);
	  }
	  return func(collection, predicate);
	}

	module.exports = every;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(12),
	    createFind = __webpack_require__(79);

	/**
	 * Iterates over elements of `collection`, returning the first element
	 * `predicate` returns truthy for. The predicate is bound to `thisArg` and
	 * invoked with three arguments: (value, index|key, collection).
	 *
	 * If a property name is provided for `predicate` the created `_.property`
	 * style callback returns the property value of the given element.
	 *
	 * If a value is also provided for `thisArg` the created `_.matchesProperty`
	 * style callback returns `true` for elements that have a matching property
	 * value, else `false`.
	 *
	 * If an object is provided for `predicate` the created `_.matches` style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * @static
	 * @memberOf _
	 * @alias detect
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to search.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked
	 *  per iteration.
	 * @param {*} [thisArg] The `this` binding of `predicate`.
	 * @returns {*} Returns the matched element, else `undefined`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'age': 36, 'active': true },
	 *   { 'user': 'fred',    'age': 40, 'active': false },
	 *   { 'user': 'pebbles', 'age': 1,  'active': true }
	 * ];
	 *
	 * _.result(_.find(users, function(chr) {
	 *   return chr.age < 40;
	 * }), 'user');
	 * // => 'barney'
	 *
	 * // using the `_.matches` callback shorthand
	 * _.result(_.find(users, { 'age': 1, 'active': true }), 'user');
	 * // => 'pebbles'
	 *
	 * // using the `_.matchesProperty` callback shorthand
	 * _.result(_.find(users, 'active', false), 'user');
	 * // => 'fred'
	 *
	 * // using the `_.property` callback shorthand
	 * _.result(_.find(users, 'active'), 'user');
	 * // => 'barney'
	 */
	var find = createFind(baseEach);

	module.exports = find;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(30),
	    baseEach = __webpack_require__(12),
	    createForEach = __webpack_require__(80);

	/**
	 * Iterates over elements of `collection` invoking `iteratee` for each element.
	 * The `iteratee` is bound to `thisArg` and invoked with three arguments:
	 * (value, index|key, collection). Iteratee functions may exit iteration early
	 * by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length" property
	 * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
	 * may be used for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @alias each
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Array|Object|string} Returns `collection`.
	 * @example
	 *
	 * _([1, 2]).forEach(function(n) {
	 *   console.log(n);
	 * }).value();
	 * // => logs each value from left to right and returns the array
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
	 *   console.log(n, key);
	 * });
	 * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
	 */
	var forEach = createForEach(arrayEach, baseEach);

	module.exports = forEach;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var arraySome = __webpack_require__(31),
	    baseCallback = __webpack_require__(17),
	    baseSome = __webpack_require__(71),
	    isArray = __webpack_require__(1),
	    isIterateeCall = __webpack_require__(19);

	/**
	 * Checks if `predicate` returns truthy for **any** element of `collection`.
	 * The function returns as soon as it finds a passing value and does not iterate
	 * over the entire collection. The predicate is bound to `thisArg` and invoked
	 * with three arguments: (value, index|key, collection).
	 *
	 * If a property name is provided for `predicate` the created `_.property`
	 * style callback returns the property value of the given element.
	 *
	 * If a value is also provided for `thisArg` the created `_.matchesProperty`
	 * style callback returns `true` for elements that have a matching property
	 * value, else `false`.
	 *
	 * If an object is provided for `predicate` the created `_.matches` style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * @static
	 * @memberOf _
	 * @alias any
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked
	 *  per iteration.
	 * @param {*} [thisArg] The `this` binding of `predicate`.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 * @example
	 *
	 * _.some([null, 0, 'yes', false], Boolean);
	 * // => true
	 *
	 * var users = [
	 *   { 'user': 'barney', 'active': true },
	 *   { 'user': 'fred',   'active': false }
	 * ];
	 *
	 * // using the `_.matches` callback shorthand
	 * _.some(users, { 'user': 'barney', 'active': false });
	 * // => false
	 *
	 * // using the `_.matchesProperty` callback shorthand
	 * _.some(users, 'active', false);
	 * // => true
	 *
	 * // using the `_.property` callback shorthand
	 * _.some(users, 'active');
	 * // => true
	 */
	function some(collection, predicate, thisArg) {
	  var func = isArray(collection) ? arraySome : baseSome;
	  if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
	    predicate = undefined;
	  }
	  if (typeof predicate != 'function' || thisArg !== undefined) {
	    predicate = baseCallback(predicate, thisArg, 3);
	  }
	  return func(collection, predicate);
	}

	module.exports = some;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var cachePush = __webpack_require__(74),
	    getNative = __webpack_require__(14);

	/** Native method references. */
	var Set = getNative(global, 'Set');

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeCreate = getNative(Object, 'create');

	/**
	 *
	 * Creates a cache object to store unique values.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var length = values ? values.length : 0;

	  this.data = { 'hash': nativeCreate(null), 'set': new Set };
	  while (length--) {
	    this.push(values[length]);
	  }
	}

	// Add functions to the `Set` cache.
	SetCache.prototype.push = cachePush;

	module.exports = SetCache;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 52 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function arrayCopy(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = arrayCopy;


/***/ },
/* 53 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.every` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if all elements pass the predicate check,
	 *  else `false`.
	 */
	function arrayEvery(array, predicate) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (!predicate(array[index], index, array)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = arrayEvery;


/***/ },
/* 54 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 55 */
/***/ function(module, exports) {

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	module.exports = arrayPush;


/***/ },
/* 56 */
/***/ function(module, exports) {

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function baseCopy(source, props, object) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];
	    object[key] = source[key];
	  }
	  return object;
	}

	module.exports = baseCopy;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(63),
	    cacheIndexOf = __webpack_require__(73),
	    createCache = __webpack_require__(78);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * The base implementation of `_.difference` which accepts a single array
	 * of values to exclude.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Array} values The values to exclude.
	 * @returns {Array} Returns the new array of filtered values.
	 */
	function baseDifference(array, values) {
	  var length = array ? array.length : 0,
	      result = [];

	  if (!length) {
	    return result;
	  }
	  var index = -1,
	      indexOf = baseIndexOf,
	      isCommon = true,
	      cache = (isCommon && values.length >= LARGE_ARRAY_SIZE) ? createCache(values) : null,
	      valuesLength = values.length;

	  if (cache) {
	    indexOf = cacheIndexOf;
	    isCommon = false;
	    values = cache;
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index];

	    if (isCommon && value === value) {
	      var valuesIndex = valuesLength;
	      while (valuesIndex--) {
	        if (values[valuesIndex] === value) {
	          continue outer;
	        }
	      }
	      result.push(value);
	    }
	    else if (indexOf(values, value, 0) < 0) {
	      result.push(value);
	    }
	  }
	  return result;
	}

	module.exports = baseDifference;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(12);

	/**
	 * The base implementation of `_.every` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if all elements pass the predicate check,
	 *  else `false`
	 */
	function baseEvery(collection, predicate) {
	  var result = true;
	  baseEach(collection, function(value, index, collection) {
	    result = !!predicate(value, index, collection);
	    return result;
	  });
	  return result;
	}

	module.exports = baseEvery;


/***/ },
/* 59 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
	 * without support for callback shorthands and `this` binding, which iterates
	 * over `collection` using the provided `eachFunc`.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to search.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {Function} eachFunc The function to iterate over `collection`.
	 * @param {boolean} [retKey] Specify returning the key of the found element
	 *  instead of the element itself.
	 * @returns {*} Returns the found element or its key, else `undefined`.
	 */
	function baseFind(collection, predicate, eachFunc, retKey) {
	  var result;
	  eachFunc(collection, function(value, key, collection) {
	    if (predicate(value, key, collection)) {
	      result = retKey ? key : value;
	      return false;
	    }
	  });
	  return result;
	}

	module.exports = baseFind;


/***/ },
/* 60 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for callback shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromRight) {
	  var length = array.length,
	      index = fromRight ? length : -1;

	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseFindIndex;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(55),
	    isArguments = __webpack_require__(8),
	    isArray = __webpack_require__(1),
	    isArrayLike = __webpack_require__(7),
	    isObjectLike = __webpack_require__(3);

	/**
	 * The base implementation of `_.flatten` with added support for restricting
	 * flattening and specifying the start index.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {boolean} [isDeep] Specify a deep flatten.
	 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, isDeep, isStrict, result) {
	  result || (result = []);

	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    var value = array[index];
	    if (isObjectLike(value) && isArrayLike(value) &&
	        (isStrict || isArray(value) || isArguments(value))) {
	      if (isDeep) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, isDeep, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}

	module.exports = baseFlatten;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(32),
	    keys = __webpack_require__(10);

	/**
	 * The base implementation of `_.forOwn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var indexOfNaN = __webpack_require__(85);

	/**
	 * The base implementation of `_.indexOf` without support for binary searches.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  if (value !== value) {
	    return indexOfNaN(array, fromIndex);
	  }
	  var index = fromIndex - 1,
	      length = array.length;

	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseIndexOf;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var equalArrays = __webpack_require__(81),
	    equalByTag = __webpack_require__(82),
	    equalObjects = __webpack_require__(83),
	    isArray = __webpack_require__(1),
	    isTypedArray = __webpack_require__(23);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
	 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = objToString.call(object);
	    if (objTag == argsTag) {
	      objTag = objectTag;
	    } else if (objTag != objectTag) {
	      objIsArr = isTypedArray(object);
	    }
	  }
	  if (!othIsArr) {
	    othTag = objToString.call(other);
	    if (othTag == argsTag) {
	      othTag = objectTag;
	    } else if (othTag != objectTag) {
	      othIsArr = isTypedArray(other);
	    }
	  }
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;

	  if (isSameTag && !(objIsArr || objIsObj)) {
	    return equalByTag(object, other, objTag);
	  }
	  if (!isLoose) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  // For more information on detecting circular references see https://es5.github.io/#JO.
	  stackA || (stackA = []);
	  stackB || (stackB = []);

	  var length = stackA.length;
	  while (length--) {
	    if (stackA[length] == object) {
	      return stackB[length] == other;
	    }
	  }
	  // Add `object` and `other` to the stack of traversed objects.
	  stackA.push(object);
	  stackB.push(other);

	  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

	  stackA.pop();
	  stackB.pop();

	  return result;
	}

	module.exports = baseIsEqualDeep;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(34),
	    toObject = __webpack_require__(4);

	/**
	 * The base implementation of `_.isMatch` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Array} matchData The propery names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = toObject(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var result = customizer ? customizer(objValue, srcValue, key) : undefined;
	      if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(65),
	    getMatchData = __webpack_require__(84),
	    toObject = __webpack_require__(4);

	/**
	 * The base implementation of `_.matches` which does not clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    var key = matchData[0][0],
	        value = matchData[0][1];

	    return function(object) {
	      if (object == null) {
	        return false;
	      }
	      return object[key] === value && (value !== undefined || (key in toObject(object)));
	    };
	  }
	  return function(object) {
	    return baseIsMatch(object, matchData);
	  };
	}

	module.exports = baseMatches;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(18),
	    baseIsEqual = __webpack_require__(34),
	    baseSlice = __webpack_require__(36),
	    isArray = __webpack_require__(1),
	    isKey = __webpack_require__(20),
	    isStrictComparable = __webpack_require__(38),
	    last = __webpack_require__(28),
	    toObject = __webpack_require__(4),
	    toPath = __webpack_require__(21);

	/**
	 * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to compare.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  var isArr = isArray(path),
	      isCommon = isKey(path) && isStrictComparable(srcValue),
	      pathKey = (path + '');

	  path = toPath(path);
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    var key = pathKey;
	    object = toObject(object);
	    if ((isArr || !isCommon) && !(key in object)) {
	      object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
	      if (object == null) {
	        return false;
	      }
	      key = last(path);
	      object = toObject(object);
	    }
	    return object[key] === srcValue
	      ? (srcValue !== undefined || (key in object))
	      : baseIsEqual(srcValue, object[key], undefined, true);
	  };
	}

	module.exports = baseMatchesProperty;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(30),
	    baseMergeDeep = __webpack_require__(69),
	    isArray = __webpack_require__(1),
	    isArrayLike = __webpack_require__(7),
	    isObject = __webpack_require__(2),
	    isObjectLike = __webpack_require__(3),
	    isTypedArray = __webpack_require__(23),
	    keys = __webpack_require__(10);

	/**
	 * The base implementation of `_.merge` without support for argument juggling,
	 * multiple sources, and `this` binding `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates values with source counterparts.
	 * @returns {Object} Returns `object`.
	 */
	function baseMerge(object, source, customizer, stackA, stackB) {
	  if (!isObject(object)) {
	    return object;
	  }
	  var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
	      props = isSrcArr ? undefined : keys(source);

	  arrayEach(props || source, function(srcValue, key) {
	    if (props) {
	      key = srcValue;
	      srcValue = source[key];
	    }
	    if (isObjectLike(srcValue)) {
	      stackA || (stackA = []);
	      stackB || (stackB = []);
	      baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
	    }
	    else {
	      var value = object[key],
	          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	          isCommon = result === undefined;

	      if (isCommon) {
	        result = srcValue;
	      }
	      if ((result !== undefined || (isSrcArr && !(key in object))) &&
	          (isCommon || (result === result ? (result !== value) : (value === value)))) {
	        object[key] = result;
	      }
	    }
	  });
	  return object;
	}

	module.exports = baseMerge;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var arrayCopy = __webpack_require__(52),
	    isArguments = __webpack_require__(8),
	    isArray = __webpack_require__(1),
	    isArrayLike = __webpack_require__(7),
	    isPlainObject = __webpack_require__(91),
	    isTypedArray = __webpack_require__(23),
	    toPlainObject = __webpack_require__(92);

	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates values with source counterparts.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
	  var length = stackA.length,
	      srcValue = source[key];

	  while (length--) {
	    if (stackA[length] == srcValue) {
	      object[key] = stackB[length];
	      return;
	    }
	  }
	  var value = object[key],
	      result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	      isCommon = result === undefined;

	  if (isCommon) {
	    result = srcValue;
	    if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
	      result = isArray(value)
	        ? value
	        : (isArrayLike(value) ? arrayCopy(value) : []);
	    }
	    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      result = isArguments(value)
	        ? toPlainObject(value)
	        : (isPlainObject(value) ? value : {});
	    }
	    else {
	      isCommon = false;
	    }
	  }
	  // Add the source value to the stack of traversed objects and associate
	  // it with its merged value.
	  stackA.push(srcValue);
	  stackB.push(result);

	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
	  } else if (result === result ? (result !== value) : (value === value)) {
	    object[key] = result;
	  }
	}

	module.exports = baseMergeDeep;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(18),
	    toPath = __webpack_require__(21);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function basePropertyDeep(path) {
	  var pathKey = (path + '');
	  path = toPath(path);
	  return function(object) {
	    return baseGet(object, path, pathKey);
	  };
	}

	module.exports = basePropertyDeep;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(12);

	/**
	 * The base implementation of `_.some` without support for callback shorthands
	 * and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function baseSome(collection, predicate) {
	  var result;

	  baseEach(collection, function(value, index, collection) {
	    result = predicate(value, index, collection);
	    return !result;
	  });
	  return !!result;
	}

	module.exports = baseSome;


/***/ },
/* 72 */
/***/ function(module, exports) {

	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` or `undefined` values.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  return value == null ? '' : (value + '');
	}

	module.exports = baseToString;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(2);

	/**
	 * Checks if `value` is in `cache` mimicking the return signature of
	 * `_.indexOf` by returning `0` if the value is found, else `-1`.
	 *
	 * @private
	 * @param {Object} cache The cache to search.
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `0` if `value` is found, else `-1`.
	 */
	function cacheIndexOf(cache, value) {
	  var data = cache.data,
	      result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];

	  return result ? 0 : -1;
	}

	module.exports = cacheIndexOf;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(2);

	/**
	 * Adds `value` to the cache.
	 *
	 * @private
	 * @name push
	 * @memberOf SetCache
	 * @param {*} value The value to cache.
	 */
	function cachePush(value) {
	  var data = this.data;
	  if (typeof value == 'string' || isObject(value)) {
	    data.set.add(value);
	  } else {
	    data.hash[value] = true;
	  }
	}

	module.exports = cachePush;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(13),
	    isIterateeCall = __webpack_require__(19),
	    restParam = __webpack_require__(29);

	/**
	 * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return restParam(function(object, sources) {
	    var index = -1,
	        length = object == null ? 0 : sources.length,
	        customizer = length > 2 ? sources[length - 2] : undefined,
	        guard = length > 2 ? sources[2] : undefined,
	        thisArg = length > 1 ? sources[length - 1] : undefined;

	    if (typeof customizer == 'function') {
	      customizer = bindCallback(customizer, thisArg, 5);
	      length -= 2;
	    } else {
	      customizer = typeof thisArg == 'function' ? thisArg : undefined;
	      length -= (customizer ? 1 : 0);
	    }
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(37),
	    isLength = __webpack_require__(6),
	    toObject = __webpack_require__(4);

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    var length = collection ? getLength(collection) : 0;
	    if (!isLength(length)) {
	      return eachFunc(collection, iteratee);
	    }
	    var index = fromRight ? length : -1,
	        iterable = toObject(collection);

	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	module.exports = createBaseEach;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(4);

	/**
	 * Creates a base function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var iterable = toObject(object),
	        props = keysFunc(object),
	        length = props.length,
	        index = fromRight ? length : -1;

	    while ((fromRight ? index-- : ++index < length)) {
	      var key = props[index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var SetCache = __webpack_require__(51),
	    getNative = __webpack_require__(14);

	/** Native method references. */
	var Set = getNative(global, 'Set');

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeCreate = getNative(Object, 'create');

	/**
	 * Creates a `Set` cache object to optimize linear searches of large arrays.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
	 */
	function createCache(values) {
	  return (nativeCreate && Set) ? new SetCache(values) : null;
	}

	module.exports = createCache;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var baseCallback = __webpack_require__(17),
	    baseFind = __webpack_require__(59),
	    baseFindIndex = __webpack_require__(60),
	    isArray = __webpack_require__(1);

	/**
	 * Creates a `_.find` or `_.findLast` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new find function.
	 */
	function createFind(eachFunc, fromRight) {
	  return function(collection, predicate, thisArg) {
	    predicate = baseCallback(predicate, thisArg, 3);
	    if (isArray(collection)) {
	      var index = baseFindIndex(collection, predicate, fromRight);
	      return index > -1 ? collection[index] : undefined;
	    }
	    return baseFind(collection, predicate, eachFunc);
	  };
	}

	module.exports = createFind;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(13),
	    isArray = __webpack_require__(1);

	/**
	 * Creates a function for `_.forEach` or `_.forEachRight`.
	 *
	 * @private
	 * @param {Function} arrayFunc The function to iterate over an array.
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @returns {Function} Returns the new each function.
	 */
	function createForEach(arrayFunc, eachFunc) {
	  return function(collection, iteratee, thisArg) {
	    return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
	      ? arrayFunc(collection, iteratee)
	      : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
	  };
	}

	module.exports = createForEach;


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var arraySome = __webpack_require__(31);

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing arrays.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var index = -1,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
	    return false;
	  }
	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index],
	        result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;

	    if (result !== undefined) {
	      if (result) {
	        continue;
	      }
	      return false;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (isLoose) {
	      if (!arraySome(other, function(othValue) {
	            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
	          })) {
	        return false;
	      }
	    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = equalArrays;


/***/ },
/* 82 */
/***/ function(module, exports) {

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    stringTag = '[object String]';

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag) {
	  switch (tag) {
	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
	      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
	      return +object == +other;

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return (object != +object)
	        ? other != +other
	        : object == +other;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings primitives and string
	      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	      return object == (other + '');
	  }
	  return false;
	}

	module.exports = equalByTag;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(10);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isLoose) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  var skipCtor = isLoose;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key],
	        result = customizer ? customizer(isLoose ? othValue : objValue, isLoose? objValue : othValue, key) : undefined;

	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
	      return false;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (!skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = equalObjects;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(38),
	    pairs = __webpack_require__(95);

	/**
	 * Gets the propery names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = pairs(object),
	      length = result.length;

	  while (length--) {
	    result[length][2] = isStrictComparable(result[length][1]);
	  }
	  return result;
	}

	module.exports = getMatchData;


/***/ },
/* 85 */
/***/ function(module, exports) {

	/**
	 * Gets the index at which the first occurrence of `NaN` is found in `array`.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
	 */
	function indexOfNaN(array, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 0 : -1);

	  while ((fromRight ? index-- : ++index < length)) {
	    var other = array[index];
	    if (other !== other) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = indexOfNaN;


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(4);

	/**
	 * A specialized version of `_.pick` which picks `object` properties specified
	 * by `props`.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} props The property names to pick.
	 * @returns {Object} Returns the new object.
	 */
	function pickByArray(object, props) {
	  object = toObject(object);

	  var index = -1,
	      length = props.length,
	      result = {};

	  while (++index < length) {
	    var key = props[index];
	    if (key in object) {
	      result[key] = object[key];
	    }
	  }
	  return result;
	}

	module.exports = pickByArray;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var baseForIn = __webpack_require__(33);

	/**
	 * A specialized version of `_.pick` which picks `object` properties `predicate`
	 * returns truthy for.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Object} Returns the new object.
	 */
	function pickByCallback(object, predicate) {
	  var result = {};
	  baseForIn(object, function(value, key, object) {
	    if (predicate(value, key, object)) {
	      result[key] = value;
	    }
	  });
	  return result;
	}

	module.exports = pickByCallback;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(8),
	    isArray = __webpack_require__(1),
	    isIndex = __webpack_require__(15),
	    isLength = __webpack_require__(6),
	    keysIn = __webpack_require__(16);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) &&
	    (isArray(object) || isArguments(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = shimKeys;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(2);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 which returns 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	module.exports = isFunction;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(89),
	    isObjectLike = __webpack_require__(3);

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = isNative;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var baseForIn = __webpack_require__(33),
	    isArguments = __webpack_require__(8),
	    isObjectLike = __webpack_require__(3);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * **Note:** This method assumes objects created by the `Object` constructor
	 * have no inherited enumerable properties.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  var Ctor;

	  // Exit early for non `Object` objects.
	  if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) ||
	      (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
	    return false;
	  }
	  // IE < 9 iterates inherited properties before own properties. If the first
	  // iterated property is an object's own property then there are no inherited
	  // enumerable properties.
	  var result;
	  // In most environments an object's own properties are iterated before
	  // its inherited properties. If the last iterated property is an object's
	  // own property then there are no inherited enumerable properties.
	  baseForIn(value, function(subValue, key) {
	    result = key;
	  });
	  return result === undefined || hasOwnProperty.call(value, result);
	}

	module.exports = isPlainObject;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var baseCopy = __webpack_require__(56),
	    keysIn = __webpack_require__(16);

	/**
	 * Converts `value` to a plain object flattening inherited enumerable
	 * properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {Object} Returns the converted plain object.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.assign({ 'a': 1 }, new Foo);
	 * // => { 'a': 1, 'b': 2 }
	 *
	 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	 * // => { 'a': 1, 'b': 2, 'c': 3 }
	 */
	function toPlainObject(value) {
	  return baseCopy(value, keysIn(value));
	}

	module.exports = toPlainObject;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var baseMerge = __webpack_require__(68),
	    createAssigner = __webpack_require__(75);

	/**
	 * Recursively merges own enumerable properties of the source object(s), that
	 * don't resolve to `undefined` into the destination object. Subsequent sources
	 * overwrite property assignments of previous sources. If `customizer` is
	 * provided it's invoked to produce the merged values of the destination and
	 * source properties. If `customizer` returns `undefined` merging is handled
	 * by the method instead. The `customizer` is bound to `thisArg` and invoked
	 * with five arguments: (objectValue, sourceValue, key, object, source).
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var users = {
	 *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
	 * };
	 *
	 * var ages = {
	 *   'data': [{ 'age': 36 }, { 'age': 40 }]
	 * };
	 *
	 * _.merge(users, ages);
	 * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
	 *
	 * // using a customizer callback
	 * var object = {
	 *   'fruits': ['apple'],
	 *   'vegetables': ['beet']
	 * };
	 *
	 * var other = {
	 *   'fruits': ['banana'],
	 *   'vegetables': ['carrot']
	 * };
	 *
	 * _.merge(object, other, function(a, b) {
	 *   if (_.isArray(a)) {
	 *     return a.concat(b);
	 *   }
	 * });
	 * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
	 */
	var merge = createAssigner(baseMerge);

	module.exports = merge;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(54),
	    baseDifference = __webpack_require__(57),
	    baseFlatten = __webpack_require__(61),
	    bindCallback = __webpack_require__(13),
	    keysIn = __webpack_require__(16),
	    pickByArray = __webpack_require__(86),
	    pickByCallback = __webpack_require__(87),
	    restParam = __webpack_require__(29);

	/**
	 * The opposite of `_.pick`; this method creates an object composed of the
	 * own and inherited enumerable properties of `object` that are not omitted.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {Function|...(string|string[])} [predicate] The function invoked per
	 *  iteration or property names to omit, specified as individual property
	 *  names or arrays of property names.
	 * @param {*} [thisArg] The `this` binding of `predicate`.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'user': 'fred', 'age': 40 };
	 *
	 * _.omit(object, 'age');
	 * // => { 'user': 'fred' }
	 *
	 * _.omit(object, _.isNumber);
	 * // => { 'user': 'fred' }
	 */
	var omit = restParam(function(object, props) {
	  if (object == null) {
	    return {};
	  }
	  if (typeof props[0] != 'function') {
	    var props = arrayMap(baseFlatten(props), String);
	    return pickByArray(object, baseDifference(keysIn(object), props));
	  }
	  var predicate = bindCallback(props[0], props[1], 3);
	  return pickByCallback(object, function(value, key, object) {
	    return !predicate(value, key, object);
	  });
	});

	module.exports = omit;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(10),
	    toObject = __webpack_require__(4);

	/**
	 * Creates a two dimensional array of the key-value pairs for `object`,
	 * e.g. `[[key1, value1], [key2, value2]]`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the new array of key-value pairs.
	 * @example
	 *
	 * _.pairs({ 'barney': 36, 'fred': 40 });
	 * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
	 */
	function pairs(object) {
	  object = toObject(object);

	  var index = -1,
	      props = keys(object),
	      length = props.length,
	      result = Array(length);

	  while (++index < length) {
	    var key = props[index];
	    result[index] = [key, object[key]];
	  }
	  return result;
	}

	module.exports = pairs;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(35),
	    basePropertyDeep = __webpack_require__(70),
	    isKey = __webpack_require__(20);

	/**
	 * Creates a function that returns the property value at `path` on a
	 * given object.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': { 'c': 2 } } },
	 *   { 'a': { 'b': { 'c': 1 } } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b.c'));
	 * // => [2, 1]
	 *
	 * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
	}

	module.exports = property;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Emitter = __webpack_require__(98);
	var reduce = __webpack_require__(99);

	/**
	 * Root reference for iframes.
	 */

	var root;
	if (typeof window !== 'undefined') { // Browser window
	  root = window;
	} else if (typeof self !== 'undefined') { // Web Worker
	  root = self;
	} else { // Other environments
	  root = this;
	}

	/**
	 * Noop.
	 */

	function noop(){};

	/**
	 * Check if `obj` is a host object,
	 * we don't want to serialize these :)
	 *
	 * TODO: future proof, move to compoent land
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */

	function isHost(obj) {
	  var str = {}.toString.call(obj);

	  switch (str) {
	    case '[object File]':
	    case '[object Blob]':
	    case '[object FormData]':
	      return true;
	    default:
	      return false;
	  }
	}

	/**
	 * Determine XHR.
	 */

	request.getXHR = function () {
	  if (root.XMLHttpRequest
	      && (!root.location || 'file:' != root.location.protocol
	          || !root.ActiveXObject)) {
	    return new XMLHttpRequest;
	  } else {
	    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
	  }
	  return false;
	};

	/**
	 * Removes leading and trailing whitespace, added to support IE.
	 *
	 * @param {String} s
	 * @return {String}
	 * @api private
	 */

	var trim = ''.trim
	  ? function(s) { return s.trim(); }
	  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

	/**
	 * Check if `obj` is an object.
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */

	function isObject(obj) {
	  return obj === Object(obj);
	}

	/**
	 * Serialize the given `obj`.
	 *
	 * @param {Object} obj
	 * @return {String}
	 * @api private
	 */

	function serialize(obj) {
	  if (!isObject(obj)) return obj;
	  var pairs = [];
	  for (var key in obj) {
	    if (null != obj[key]) {
	      pushEncodedKeyValuePair(pairs, key, obj[key]);
	        }
	      }
	  return pairs.join('&');
	}

	/**
	 * Helps 'serialize' with serializing arrays.
	 * Mutates the pairs array.
	 *
	 * @param {Array} pairs
	 * @param {String} key
	 * @param {Mixed} val
	 */

	function pushEncodedKeyValuePair(pairs, key, val) {
	  if (Array.isArray(val)) {
	    return val.forEach(function(v) {
	      pushEncodedKeyValuePair(pairs, key, v);
	    });
	  }
	  pairs.push(encodeURIComponent(key)
	    + '=' + encodeURIComponent(val));
	}

	/**
	 * Expose serialization method.
	 */

	 request.serializeObject = serialize;

	 /**
	  * Parse the given x-www-form-urlencoded `str`.
	  *
	  * @param {String} str
	  * @return {Object}
	  * @api private
	  */

	function parseString(str) {
	  var obj = {};
	  var pairs = str.split('&');
	  var parts;
	  var pair;

	  for (var i = 0, len = pairs.length; i < len; ++i) {
	    pair = pairs[i];
	    parts = pair.split('=');
	    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
	  }

	  return obj;
	}

	/**
	 * Expose parser.
	 */

	request.parseString = parseString;

	/**
	 * Default MIME type map.
	 *
	 *     superagent.types.xml = 'application/xml';
	 *
	 */

	request.types = {
	  html: 'text/html',
	  json: 'application/json',
	  xml: 'application/xml',
	  urlencoded: 'application/x-www-form-urlencoded',
	  'form': 'application/x-www-form-urlencoded',
	  'form-data': 'application/x-www-form-urlencoded'
	};

	/**
	 * Default serialization map.
	 *
	 *     superagent.serialize['application/xml'] = function(obj){
	 *       return 'generated xml here';
	 *     };
	 *
	 */

	 request.serialize = {
	   'application/x-www-form-urlencoded': serialize,
	   'application/json': JSON.stringify
	 };

	 /**
	  * Default parsers.
	  *
	  *     superagent.parse['application/xml'] = function(str){
	  *       return { object parsed from str };
	  *     };
	  *
	  */

	request.parse = {
	  'application/x-www-form-urlencoded': parseString,
	  'application/json': JSON.parse
	};

	/**
	 * Parse the given header `str` into
	 * an object containing the mapped fields.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	function parseHeader(str) {
	  var lines = str.split(/\r?\n/);
	  var fields = {};
	  var index;
	  var line;
	  var field;
	  var val;

	  lines.pop(); // trailing CRLF

	  for (var i = 0, len = lines.length; i < len; ++i) {
	    line = lines[i];
	    index = line.indexOf(':');
	    field = line.slice(0, index).toLowerCase();
	    val = trim(line.slice(index + 1));
	    fields[field] = val;
	  }

	  return fields;
	}

	/**
	 * Check if `mime` is json or has +json structured syntax suffix.
	 *
	 * @param {String} mime
	 * @return {Boolean}
	 * @api private
	 */

	function isJSON(mime) {
	  return /[\/+]json\b/.test(mime);
	}

	/**
	 * Return the mime type for the given `str`.
	 *
	 * @param {String} str
	 * @return {String}
	 * @api private
	 */

	function type(str){
	  return str.split(/ *; */).shift();
	};

	/**
	 * Return header field parameters.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	function params(str){
	  return reduce(str.split(/ *; */), function(obj, str){
	    var parts = str.split(/ *= */)
	      , key = parts.shift()
	      , val = parts.shift();

	    if (key && val) obj[key] = val;
	    return obj;
	  }, {});
	};

	/**
	 * Initialize a new `Response` with the given `xhr`.
	 *
	 *  - set flags (.ok, .error, etc)
	 *  - parse header
	 *
	 * Examples:
	 *
	 *  Aliasing `superagent` as `request` is nice:
	 *
	 *      request = superagent;
	 *
	 *  We can use the promise-like API, or pass callbacks:
	 *
	 *      request.get('/').end(function(res){});
	 *      request.get('/', function(res){});
	 *
	 *  Sending data can be chained:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' })
	 *        .end(function(res){});
	 *
	 *  Or passed to `.send()`:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' }, function(res){});
	 *
	 *  Or passed to `.post()`:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' })
	 *        .end(function(res){});
	 *
	 * Or further reduced to a single call for simple cases:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' }, function(res){});
	 *
	 * @param {XMLHTTPRequest} xhr
	 * @param {Object} options
	 * @api private
	 */

	function Response(req, options) {
	  options = options || {};
	  this.req = req;
	  this.xhr = this.req.xhr;
	  // responseText is accessible only if responseType is '' or 'text' and on older browsers
	  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
	     ? this.xhr.responseText
	     : null;
	  this.statusText = this.req.xhr.statusText;
	  this.setStatusProperties(this.xhr.status);
	  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
	  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
	  // getResponseHeader still works. so we get content-type even if getting
	  // other headers fails.
	  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
	  this.setHeaderProperties(this.header);
	  this.body = this.req.method != 'HEAD'
	    ? this.parseBody(this.text ? this.text : this.xhr.response)
	    : null;
	}

	/**
	 * Get case-insensitive `field` value.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */

	Response.prototype.get = function(field){
	  return this.header[field.toLowerCase()];
	};

	/**
	 * Set header related properties:
	 *
	 *   - `.type` the content type without params
	 *
	 * A response of "Content-Type: text/plain; charset=utf-8"
	 * will provide you with a `.type` of "text/plain".
	 *
	 * @param {Object} header
	 * @api private
	 */

	Response.prototype.setHeaderProperties = function(header){
	  // content-type
	  var ct = this.header['content-type'] || '';
	  this.type = type(ct);

	  // params
	  var obj = params(ct);
	  for (var key in obj) this[key] = obj[key];
	};

	/**
	 * Parse the given body `str`.
	 *
	 * Used for auto-parsing of bodies. Parsers
	 * are defined on the `superagent.parse` object.
	 *
	 * @param {String} str
	 * @return {Mixed}
	 * @api private
	 */

	Response.prototype.parseBody = function(str){
	  var parse = request.parse[this.type];
	  return parse && str && (str.length || str instanceof Object)
	    ? parse(str)
	    : null;
	};

	/**
	 * Set flags such as `.ok` based on `status`.
	 *
	 * For example a 2xx response will give you a `.ok` of __true__
	 * whereas 5xx will be __false__ and `.error` will be __true__. The
	 * `.clientError` and `.serverError` are also available to be more
	 * specific, and `.statusType` is the class of error ranging from 1..5
	 * sometimes useful for mapping respond colors etc.
	 *
	 * "sugar" properties are also defined for common cases. Currently providing:
	 *
	 *   - .noContent
	 *   - .badRequest
	 *   - .unauthorized
	 *   - .notAcceptable
	 *   - .notFound
	 *
	 * @param {Number} status
	 * @api private
	 */

	Response.prototype.setStatusProperties = function(status){
	  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
	  if (status === 1223) {
	    status = 204;
	  }

	  var type = status / 100 | 0;

	  // status / class
	  this.status = this.statusCode = status;
	  this.statusType = type;

	  // basics
	  this.info = 1 == type;
	  this.ok = 2 == type;
	  this.clientError = 4 == type;
	  this.serverError = 5 == type;
	  this.error = (4 == type || 5 == type)
	    ? this.toError()
	    : false;

	  // sugar
	  this.accepted = 202 == status;
	  this.noContent = 204 == status;
	  this.badRequest = 400 == status;
	  this.unauthorized = 401 == status;
	  this.notAcceptable = 406 == status;
	  this.notFound = 404 == status;
	  this.forbidden = 403 == status;
	};

	/**
	 * Return an `Error` representative of this response.
	 *
	 * @return {Error}
	 * @api public
	 */

	Response.prototype.toError = function(){
	  var req = this.req;
	  var method = req.method;
	  var url = req.url;

	  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
	  var err = new Error(msg);
	  err.status = this.status;
	  err.method = method;
	  err.url = url;

	  return err;
	};

	/**
	 * Expose `Response`.
	 */

	request.Response = Response;

	/**
	 * Initialize a new `Request` with the given `method` and `url`.
	 *
	 * @param {String} method
	 * @param {String} url
	 * @api public
	 */

	function Request(method, url) {
	  var self = this;
	  Emitter.call(this);
	  this._query = this._query || [];
	  this.method = method;
	  this.url = url;
	  this.header = {};
	  this._header = {};
	  this.on('end', function(){
	    var err = null;
	    var res = null;

	    try {
	      res = new Response(self);
	    } catch(e) {
	      err = new Error('Parser is unable to parse the response');
	      err.parse = true;
	      err.original = e;
	      // issue #675: return the raw response if the response parsing fails
	      err.rawResponse = self.xhr && self.xhr.responseText ? self.xhr.responseText : null;
	      return self.callback(err);
	    }

	    self.emit('response', res);

	    if (err) {
	      return self.callback(err, res);
	    }

	    if (res.status >= 200 && res.status < 300) {
	      return self.callback(err, res);
	    }

	    var new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
	    new_err.original = err;
	    new_err.response = res;
	    new_err.status = res.status;

	    self.callback(new_err, res);
	  });
	}

	/**
	 * Mixin `Emitter`.
	 */

	Emitter(Request.prototype);

	/**
	 * Allow for extension
	 */

	Request.prototype.use = function(fn) {
	  fn(this);
	  return this;
	}

	/**
	 * Set timeout to `ms`.
	 *
	 * @param {Number} ms
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.timeout = function(ms){
	  this._timeout = ms;
	  return this;
	};

	/**
	 * Clear previous timeout.
	 *
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.clearTimeout = function(){
	  this._timeout = 0;
	  clearTimeout(this._timer);
	  return this;
	};

	/**
	 * Abort the request, and clear potential timeout.
	 *
	 * @return {Request}
	 * @api public
	 */

	Request.prototype.abort = function(){
	  if (this.aborted) return;
	  this.aborted = true;
	  this.xhr.abort();
	  this.clearTimeout();
	  this.emit('abort');
	  return this;
	};

	/**
	 * Set header `field` to `val`, or multiple fields with one object.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .set('Accept', 'application/json')
	 *        .set('X-API-Key', 'foobar')
	 *        .end(callback);
	 *
	 *      req.get('/')
	 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
	 *        .end(callback);
	 *
	 * @param {String|Object} field
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.set = function(field, val){
	  if (isObject(field)) {
	    for (var key in field) {
	      this.set(key, field[key]);
	    }
	    return this;
	  }
	  this._header[field.toLowerCase()] = val;
	  this.header[field] = val;
	  return this;
	};

	/**
	 * Remove header `field`.
	 *
	 * Example:
	 *
	 *      req.get('/')
	 *        .unset('User-Agent')
	 *        .end(callback);
	 *
	 * @param {String} field
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.unset = function(field){
	  delete this._header[field.toLowerCase()];
	  delete this.header[field];
	  return this;
	};

	/**
	 * Get case-insensitive header `field` value.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api private
	 */

	Request.prototype.getHeader = function(field){
	  return this._header[field.toLowerCase()];
	};

	/**
	 * Set Content-Type to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.xml = 'application/xml';
	 *
	 *      request.post('/')
	 *        .type('xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 *      request.post('/')
	 *        .type('application/xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 * @param {String} type
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.type = function(type){
	  this.set('Content-Type', request.types[type] || type);
	  return this;
	};

	/**
	 * Force given parser
	 *
	 * Sets the body parser no matter type.
	 *
	 * @param {Function}
	 * @api public
	 */

	Request.prototype.parse = function(fn){
	  this._parser = fn;
	  return this;
	};

	/**
	 * Set Accept to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.json = 'application/json';
	 *
	 *      request.get('/agent')
	 *        .accept('json')
	 *        .end(callback);
	 *
	 *      request.get('/agent')
	 *        .accept('application/json')
	 *        .end(callback);
	 *
	 * @param {String} accept
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.accept = function(type){
	  this.set('Accept', request.types[type] || type);
	  return this;
	};

	/**
	 * Set Authorization field value with `user` and `pass`.
	 *
	 * @param {String} user
	 * @param {String} pass
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.auth = function(user, pass){
	  var str = btoa(user + ':' + pass);
	  this.set('Authorization', 'Basic ' + str);
	  return this;
	};

	/**
	* Add query-string `val`.
	*
	* Examples:
	*
	*   request.get('/shoes')
	*     .query('size=10')
	*     .query({ color: 'blue' })
	*
	* @param {Object|String} val
	* @return {Request} for chaining
	* @api public
	*/

	Request.prototype.query = function(val){
	  if ('string' != typeof val) val = serialize(val);
	  if (val) this._query.push(val);
	  return this;
	};

	/**
	 * Write the field `name` and `val` for "multipart/form-data"
	 * request bodies.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .field('foo', 'bar')
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} name
	 * @param {String|Blob|File} val
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.field = function(name, val){
	  if (!this._formData) this._formData = new root.FormData();
	  this._formData.append(name, val);
	  return this;
	};

	/**
	 * Queue the given `file` as an attachment to the specified `field`,
	 * with optional `filename`.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .attach(new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} field
	 * @param {Blob|File} file
	 * @param {String} filename
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.attach = function(field, file, filename){
	  if (!this._formData) this._formData = new root.FormData();
	  this._formData.append(field, file, filename);
	  return this;
	};

	/**
	 * Send `data`, defaulting the `.type()` to "json" when
	 * an object is given.
	 *
	 * Examples:
	 *
	 *       // querystring
	 *       request.get('/search')
	 *         .end(callback)
	 *
	 *       // multiple data "writes"
	 *       request.get('/search')
	 *         .send({ search: 'query' })
	 *         .send({ range: '1..5' })
	 *         .send({ order: 'desc' })
	 *         .end(callback)
	 *
	 *       // manual json
	 *       request.post('/user')
	 *         .type('json')
	 *         .send('{"name":"tj"}')
	 *         .end(callback)
	 *
	 *       // auto json
	 *       request.post('/user')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // manual x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send('name=tj')
	 *         .end(callback)
	 *
	 *       // auto x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // defaults to x-www-form-urlencoded
	  *      request.post('/user')
	  *        .send('name=tobi')
	  *        .send('species=ferret')
	  *        .end(callback)
	 *
	 * @param {String|Object} data
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.send = function(data){
	  var obj = isObject(data);
	  var type = this.getHeader('Content-Type');

	  // merge
	  if (obj && isObject(this._data)) {
	    for (var key in data) {
	      this._data[key] = data[key];
	    }
	  } else if ('string' == typeof data) {
	    if (!type) this.type('form');
	    type = this.getHeader('Content-Type');
	    if ('application/x-www-form-urlencoded' == type) {
	      this._data = this._data
	        ? this._data + '&' + data
	        : data;
	    } else {
	      this._data = (this._data || '') + data;
	    }
	  } else {
	    this._data = data;
	  }

	  if (!obj || isHost(data)) return this;
	  if (!type) this.type('json');
	  return this;
	};

	/**
	 * Invoke the callback with `err` and `res`
	 * and handle arity check.
	 *
	 * @param {Error} err
	 * @param {Response} res
	 * @api private
	 */

	Request.prototype.callback = function(err, res){
	  var fn = this._callback;
	  this.clearTimeout();
	  fn(err, res);
	};

	/**
	 * Invoke callback with x-domain error.
	 *
	 * @api private
	 */

	Request.prototype.crossDomainError = function(){
	  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
	  err.crossDomain = true;

	  err.status = this.status;
	  err.method = this.method;
	  err.url = this.url;

	  this.callback(err);
	};

	/**
	 * Invoke callback with timeout error.
	 *
	 * @api private
	 */

	Request.prototype.timeoutError = function(){
	  var timeout = this._timeout;
	  var err = new Error('timeout of ' + timeout + 'ms exceeded');
	  err.timeout = timeout;
	  this.callback(err);
	};

	/**
	 * Enable transmission of cookies with x-domain requests.
	 *
	 * Note that for this to work the origin must not be
	 * using "Access-Control-Allow-Origin" with a wildcard,
	 * and also must set "Access-Control-Allow-Credentials"
	 * to "true".
	 *
	 * @api public
	 */

	Request.prototype.withCredentials = function(){
	  this._withCredentials = true;
	  return this;
	};

	/**
	 * Initiate request, invoking callback `fn(res)`
	 * with an instanceof `Response`.
	 *
	 * @param {Function} fn
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.end = function(fn){
	  var self = this;
	  var xhr = this.xhr = request.getXHR();
	  var query = this._query.join('&');
	  var timeout = this._timeout;
	  var data = this._formData || this._data;

	  // store callback
	  this._callback = fn || noop;

	  // state change
	  xhr.onreadystatechange = function(){
	    if (4 != xhr.readyState) return;

	    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
	    // result in the error "Could not complete the operation due to error c00c023f"
	    var status;
	    try { status = xhr.status } catch(e) { status = 0; }

	    if (0 == status) {
	      if (self.timedout) return self.timeoutError();
	      if (self.aborted) return;
	      return self.crossDomainError();
	    }
	    self.emit('end');
	  };

	  // progress
	  var handleProgress = function(e){
	    if (e.total > 0) {
	      e.percent = e.loaded / e.total * 100;
	    }
	    self.emit('progress', e);
	  };
	  if (this.hasListeners('progress')) {
	    xhr.onprogress = handleProgress;
	  }
	  try {
	    if (xhr.upload && this.hasListeners('progress')) {
	      xhr.upload.onprogress = handleProgress;
	    }
	  } catch(e) {
	    // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
	    // Reported here:
	    // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
	  }

	  // timeout
	  if (timeout && !this._timer) {
	    this._timer = setTimeout(function(){
	      self.timedout = true;
	      self.abort();
	    }, timeout);
	  }

	  // querystring
	  if (query) {
	    query = request.serializeObject(query);
	    this.url += ~this.url.indexOf('?')
	      ? '&' + query
	      : '?' + query;
	  }

	  // initiate request
	  xhr.open(this.method, this.url, true);

	  // CORS
	  if (this._withCredentials) xhr.withCredentials = true;

	  // body
	  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
	    // serialize stuff
	    var contentType = this.getHeader('Content-Type');
	    var serialize = this._parser || request.serialize[contentType ? contentType.split(';')[0] : ''];
	    if (!serialize && isJSON(contentType)) serialize = request.serialize['application/json'];
	    if (serialize) data = serialize(data);
	  }

	  // set header fields
	  for (var field in this.header) {
	    if (null == this.header[field]) continue;
	    xhr.setRequestHeader(field, this.header[field]);
	  }

	  // send stuff
	  this.emit('request', this);

	  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
	  // We need null here if data is undefined
	  xhr.send(typeof data !== 'undefined' ? data : null);
	  return this;
	};

	/**
	 * Faux promise support
	 *
	 * @param {Function} fulfill
	 * @param {Function} reject
	 * @return {Request}
	 */

	Request.prototype.then = function (fulfill, reject) {
	  return this.end(function(err, res) {
	    err ? reject(err) : fulfill(res);
	  });
	}

	/**
	 * Expose `Request`.
	 */

	request.Request = Request;

	/**
	 * Issue a request:
	 *
	 * Examples:
	 *
	 *    request('GET', '/users').end(callback)
	 *    request('/users').end(callback)
	 *    request('/users', callback)
	 *
	 * @param {String} method
	 * @param {String|Function} url or callback
	 * @return {Request}
	 * @api public
	 */

	function request(method, url) {
	  // callback
	  if ('function' == typeof url) {
	    return new Request('GET', method).end(url);
	  }

	  // url first
	  if (1 == arguments.length) {
	    return new Request('GET', method);
	  }

	  return new Request(method, url);
	}

	/**
	 * GET `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.get = function(url, data, fn){
	  var req = request('GET', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.query(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * HEAD `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.head = function(url, data, fn){
	  var req = request('HEAD', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * DELETE `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	function del(url, fn){
	  var req = request('DELETE', url);
	  if (fn) req.end(fn);
	  return req;
	};

	request.del = del;
	request.delete = del;

	/**
	 * PATCH `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} data
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.patch = function(url, data, fn){
	  var req = request('PATCH', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * POST `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} data
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.post = function(url, data, fn){
	  var req = request('POST', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * PUT `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.put = function(url, data, fn){
	  var req = request('PUT', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * Expose `request`.
	 */

	module.exports = request;


/***/ },
/* 98 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */

	module.exports = Emitter;

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks[event] = this._callbacks[event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  var self = this;
	  this._callbacks = this._callbacks || {};

	  function on() {
	    self.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks[event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks[event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks[event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks[event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 99 */
/***/ function(module, exports) {

	
	/**
	 * Reduce `arr` with `fn`.
	 *
	 * @param {Array} arr
	 * @param {Function} fn
	 * @param {Mixed} initial
	 *
	 * TODO: combatible error handling?
	 */

	module.exports = function(arr, fn, initial){  
	  var idx = 0;
	  var len = arr.length;
	  var curr = arguments.length == 3
	    ? initial
	    : arr[idx++];

	  while (idx < len) {
	    curr = fn.call(null, curr, arr[idx], ++idx, arr);
	  }
	  
	  return curr;
	};

/***/ }
/******/ ])
});
;