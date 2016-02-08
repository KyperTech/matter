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

	var _has = __webpack_require__(80);

	var _has2 = _interopRequireDefault(_has);

	var _every = __webpack_require__(340);

	var _every2 = _interopRequireDefault(_every);

	var _isArray = __webpack_require__(7);

	var _isArray2 = _interopRequireDefault(_isArray);

	var _some = __webpack_require__(352);

	var _some2 = _interopRequireDefault(_some);

	var _isString = __webpack_require__(30);

	var _isString2 = _interopRequireDefault(_isString);

	var _isObject = __webpack_require__(9);

	var _isObject2 = _interopRequireDefault(_isObject);

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _config = __webpack_require__(39);

	var _config2 = _interopRequireDefault(_config);

	var _logger = __webpack_require__(22);

	var _logger2 = _interopRequireDefault(_logger);

	var _dom = __webpack_require__(139);

	var dom = _interopRequireWildcard(_dom);

	var _request = __webpack_require__(85);

	var request = _interopRequireWildcard(_request);

	var _providerAuth = __webpack_require__(140);

	var ProviderAuth = _interopRequireWildcard(_providerAuth);

	var _token = __webpack_require__(86);

	var _token2 = _interopRequireDefault(_token);

	var _envStorage = __webpack_require__(84);

	var envStorage = _interopRequireWildcard(_envStorage);

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
			if ((0, _isObject2.default)(project)) {
				this.name = project.name;
				this.owner = project.owner || null;
			} else {
				this.name = project;
			}
			if (opts) {
				this.options = opts;
				_config2.default.applySettings(opts);
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
				if ((0, _isString2.default)(signupData)) {
					return this.authUsingProvider(signupData);
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
				return request.post(this.endpoint + '/signup', signupData).then(function (response) {
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
				//Handle provider logins
				if ((0, _isString2.default)(loginData)) {
					return this.authUsingProvider(loginData);
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
				return request.put(this.endpoint + '/login', loginData).then(function (response) {
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
				return request.put(this.endpoint + '/logout').then(function (response) {
					_logger2.default.info({
						description: 'Logout successful.',
						response: response, func: 'logout', obj: 'Matter'
					});
					_this3.currentUser = null;
					_this3.token.delete();
					return response;
					// return ProviderAuth.logout().then(() => {
					// 	return response;
					// }, () => {
					// 	return response;
					// });
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

		}, {
			key: 'authUsingProvider',
			value: function authUsingProvider(provider) {
				var _this4 = this;

				if (!provider) {
					_logger2.default.info({
						description: 'Provider required to sign up.',
						func: 'providerSignup', obj: 'Matter'
					});
					return Promise.reject({ message: 'Provider data is required to signup.' });
				}
				return ProviderAuth.authWithServer(provider).then(function (response) {
					_logger2.default.info({
						description: 'Provider login successful.',
						response: response, func: 'providerSignup', obj: 'Matter'
					});
					if (response.token) {
						_this4.token.string = response.token;
					}
					if (response.user || response.data) {
						_this4.currentUser = response.data || response.user;
					}
					return _this4.currentUser;
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
				var _this5 = this;

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
				return request.get(this.endpoint + '/user').then(function (response) {
					//TODO: Save user information locally
					_logger2.default.log({
						description: 'Current User Request responded.',
						responseData: response, func: 'currentUser', obj: 'Matter'
					});
					_this5.currentUser = response;
					return response;
				})['catch'](function (error) {
					if (error.status == 401) {
						_logger2.default.warn({
							description: 'Called for current user without token.',
							error: error, func: 'currentUser', obj: 'Matter'
						});
						_token2.default.delete();
						return Promise.resolve(null);
					}
					_logger2.default.error({
						description: 'Error requesting current user.',
						error: error, func: 'currentUser', obj: 'Matter'
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

		}, {
			key: 'updateAccount',
			value: function updateAccount(updateData) {
				var _this6 = this;

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
				return request.put(this.endpoint + '/users/' + this.currentUser.username, updateData).then(function (response) {
					_logger2.default.info({
						description: 'Update profile request responded.',
						responseData: response, func: 'updateAccount', obj: 'Matter'
					});
					_this6.currentUser = response;
					return response;
				})['catch'](function (error) {
					_logger2.default.error({
						description: 'Error requesting current user.',
						error: error, func: 'updateAccount', obj: 'Matter'
					});
					return Promise.reject(error);
				});
			}

			/** uploadImage
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

		}, {
			key: 'uploadAvatar',
			value: function uploadAvatar(fileData) {
				var _this7 = this;

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
				return request.put(this.endpoint + '/users/' + this.currentUser.username + '/avatar', fileData).then(function (response) {
					_logger2.default.info({
						description: 'Upload image request responded.',
						response: response, func: 'uploadImage', obj: 'Matter'
					});
					_this7.currentUser = response;
					return response;
				})['catch'](function (error) {
					_logger2.default.error({
						description: 'Error requesting current user.',
						error: error, func: 'uploadImage', obj: 'Matter'
					});
					return Promise.reject(error);
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
				var _this8 = this;

				return this.uploadImage(fileData).then(function (imgUrl) {
					return _this8.updateAccount({ image: { url: imgUrl } });
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
				return request.put(this.endpoint + '/user/password', newPassword);
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
				return request.put(this.endpoint + '/user/recover');
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
				var _this9 = this;

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
				if ((0, _isString2.default)(checkGroups)) {
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
								v: _this9.isInGroups(groupsArray)
							};
						}
						//Single group
						var groups = _this9.token.data.groups || [];
						_logger2.default.log({
							description: 'Checking if user is in group.',
							group: groupName, userGroups: _this9.token.data.groups,
							func: 'isInGroup', obj: 'Matter'
						});
						return {
							v: (0, _some2.default)(groups, function (group) {
								return groupName == group.name;
							})
						};
					}();

					if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
				}
				if ((0, _isArray2.default)(checkGroups)) {
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
				var _this10 = this;

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
							return _this10.isInGroup(group);
						}
						//Group is object
						if ((0, _has2.default)(group, 'name')) {
							return _this10.isInGroup(group.name);
						}
						_logger2.default.error({
							description: 'Invalid group object.',
							group: group, func: 'isInGroups', obj: 'Matter'
						});
						return false;
					}), true);
				}
				if ((0, _isString2.default)(checkGroups)) {
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
				//Handle tessellate as name
				if (this.name == 'tessellate') {
					//Remove url if host is a tessellate server
					if (typeof window !== 'undefined' && (0, _has2.default)(window, 'location') && window.location.host.indexOf('tessellate') !== -1) {
						return '';
						_logger2.default.info({
							description: 'App is Tessellate and Host is Tessellate Server, serverUrl simplified!',
							func: 'endpoint', obj: 'Matter'
						});
					}
					_logger2.default.info({
						description: 'App is tessellate, serverUrl set as main tessellate server.',
						url: _config2.default.serverUrl, func: 'endpoint', obj: 'Matter'
					});
					return _config2.default.serverUrl;
				}
				var appEndpoint = this.owner ? _config2.default.serverUrl + '/users/' + this.owner + '/projects/' + this.name : _config2.default.serverUrl + '/projects/' + this.name;
				_logger2.default.log({
					description: 'Endpoint created.', url: appEndpoint,
					func: 'endpoint', obj: 'Matter'
				});
				return appEndpoint;
			}
		}, {
			key: 'urls',
			get: function get() {
				if (this.isLoggedIn) {
					return {
						update: this.endpoint + '/account/' + this.currentUser.username
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
				envStorage.setItem(_config2.default.tokenUserDataName, userData);
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
				return envStorage;
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
				return { logger: _logger2.default, request: request, storage: envStorage, dom: dom };
			}
		}]);

		return Matter;
	}();

	exports.default = Matter;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(6)
	  , core      = __webpack_require__(20)
	  , hide      = __webpack_require__(18)
	  , redefine  = __webpack_require__(14)
	  , ctx       = __webpack_require__(16)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
	    , key, own, out, exp;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if(target && !own)redefine(target, key, out);
	    // export
	    if(exports[key] != out)hide(exports, key, exp);
	    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 2 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(3);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(105)('wks')
	  , uid    = __webpack_require__(27)
	  , Symbol = __webpack_require__(6).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 9 */
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
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 10 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(36)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(8)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(1)
	  , core    = __webpack_require__(20)
	  , fails   = __webpack_require__(8);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// add fake Function#toString
	// for correct work wrapped methods / constructors with methods like LoDash isNative
	var global    = __webpack_require__(6)
	  , hide      = __webpack_require__(18)
	  , SRC       = __webpack_require__(27)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);

	__webpack_require__(20).inspectSource = function(it){
	  return $toString.call(it);
	};

	(module.exports = function(O, key, val, safe){
	  if(typeof val == 'function'){
	    val.hasOwnProperty(SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	    val.hasOwnProperty('name') || hide(val, 'name', key);
	  }
	  if(O === global){
	    O[key] = val;
	  } else {
	    if(!safe)delete O[key];
	    hide(O, key, val);
	  }
	})(Function.prototype, TO_STRING, function toString(){
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(45)
	  , defined = __webpack_require__(17);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(25);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(2)
	  , createDesc = __webpack_require__(23);
	module.exports = __webpack_require__(12) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(17);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _isString = __webpack_require__(30);

	var _isString2 = _interopRequireDefault(_isString);

	var _keys = __webpack_require__(31);

	var _keys2 = _interopRequireDefault(_keys);

	var _omit = __webpack_require__(350);

	var _omit2 = _interopRequireDefault(_omit);

	var _each = __webpack_require__(339);

	var _each2 = _interopRequireDefault(_each);

	var _isObject = __webpack_require__(9);

	var _isObject2 = _interopRequireDefault(_isObject);

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _config = __webpack_require__(39);

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
			(function () {
				if (logData.func) {
					if (logData.obj) {
						//Object and function provided
						msgStr += '[' + logData.obj + '.' + logData.func + '()]\n ';
					} else if (logData.file) {
						msgStr += '[' + logData.file + ' > ' + logData.func + '()]\n ';
					} else {
						msgStr += '[' + logData.func + '()]\n ';
					}
				}
				var hideList = ['func', 'obj', 'file'];
				//Print each key and its value other than obj and func
				(0, _each2.default)((0, _omit2.default)((0, _keys2.default)(logData), hideList), function (key) {
					if (hideList.indexOf(key) === -1) {
						if (key == 'description' || key == 'message') {
							return msgStr += logData[key];
						}
						msgObj[key] = logData[key];
					}
				});
				msgStr += '\n';
			})();
		} else if ((0, _isString2.default)(logData)) {
			msgStr = logData;
		}
		return [msgStr, msgObj];
	}
	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = __webpack_require__(5)('unscopables')
	  , ArrayProto  = Array.prototype;
	if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(18)(ArrayProto, UNSCOPABLES, {});
	module.exports = function(key){
	  ArrayProto[UNSCOPABLES][key] = true;
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var getNative = __webpack_require__(76);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(global, 'Map');

	module.exports = Map;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 29 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return type == 'number' || type == 'boolean' ||
	    (type == 'string' && value !== '__proto__') || value == null;
	}

	module.exports = isKeyable;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var isArray = __webpack_require__(7),
	    isObjectLike = __webpack_require__(24);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

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
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	}

	module.exports = isString;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(73),
	    baseKeys = __webpack_require__(285),
	    indexKeys = __webpack_require__(131),
	    isArrayLike = __webpack_require__(37),
	    isIndex = __webpack_require__(55),
	    isPrototype = __webpack_require__(79);

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
	function keys(object) {
	  var isProto = isPrototype(object);
	  if (!(isProto || isArrayLike(object))) {
	    return baseKeys(object);
	  }
	  var indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;

	  for (var key in object) {
	    if (baseHas(object, key) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(isProto && key == 'constructor')) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keys;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(16)
	  , call        = __webpack_require__(98)
	  , isArrayIter = __webpack_require__(95)
	  , anObject    = __webpack_require__(4)
	  , toLength    = __webpack_require__(11)
	  , getIterFn   = __webpack_require__(109);
	module.exports = function(iterable, entries, fn, that){
	  var iterFn = getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(2).setDesc
	  , has = __webpack_require__(10)
	  , TAG = __webpack_require__(5)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(36)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(314),
	    isFunction = __webpack_require__(38),
	    isLength = __webpack_require__(59);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null &&
	    !(typeof value == 'function' && isFunction(value)) && isLength(getLength(value));
	}

	module.exports = isArrayLike;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var isObject = __webpack_require__(9);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

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
	  // in Safari 8 which returns 'object' for typed array constructors, and
	  // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	module.exports = isFunction;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _find = __webpack_require__(341);

	var _find2 = _interopRequireDefault(_find);

	var _has = __webpack_require__(80);

	var _has2 = _interopRequireDefault(_has);

	var _merge = __webpack_require__(349);

	var _merge2 = _interopRequireDefault(_merge);

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

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
		oauthioKey: 'sxwuB9Gci8-4pBH7xjD0V_jooNU'
	};
	var instance = null;
	var envName = 'prod';
	var level = null;

	var Config = function () {
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
				if (settings) {
					(0, _merge2.default)(instance, settings);
				}
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
	}();

	var config = new Config();

	exports.default = config;
	module.exports = exports['default'];

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(16)
	  , IObject  = __webpack_require__(45)
	  , toObject = __webpack_require__(21)
	  , toLength = __webpack_require__(11)
	  , asc      = __webpack_require__(145);
	module.exports = function(TYPE){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? asc($this, length) : IS_FILTER ? asc($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(19)
	  , TAG = __webpack_require__(5)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global         = __webpack_require__(6)
	  , $export        = __webpack_require__(1)
	  , redefine       = __webpack_require__(14)
	  , redefineAll    = __webpack_require__(46)
	  , forOf          = __webpack_require__(32)
	  , strictNew      = __webpack_require__(48)
	  , isObject       = __webpack_require__(3)
	  , fails          = __webpack_require__(8)
	  , $iterDetect    = __webpack_require__(63)
	  , setToStringTag = __webpack_require__(34);

	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  var fixMethod = function(KEY){
	    var fn = proto[KEY];
	    redefine(proto, KEY,
	      KEY == 'delete' ? function(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a){
	        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
	        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	  } else {
	    var instance             = new C
	      // early implementations not supports chaining
	      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
	      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
	      // most early implementations doesn't supports iterables, most modern - not close it correctly
	      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
	      // for early implementations -0 and +0 not the same
	      , BUGGY_ZERO;
	    if(!ACCEPT_ITERABLES){ 
	      C = wrapper(function(target, iterable){
	        strictNew(target, C, NAME);
	        var that = new Base;
	        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    IS_WEAK || instance.forEach(function(val, key){
	      BUGGY_ZERO = 1 / key === -Infinity;
	    });
	    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if(IS_WEAK && proto.clear)delete proto.clear;
	  }

	  setToStringTag(C, NAME);

	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F * (C != Base), O);

	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var hide     = __webpack_require__(18)
	  , redefine = __webpack_require__(14)
	  , fails    = __webpack_require__(8)
	  , defined  = __webpack_require__(17)
	  , wks      = __webpack_require__(5);

	module.exports = function(KEY, length, exec){
	  var SYMBOL   = wks(KEY)
	    , original = ''[KEY];
	  if(fails(function(){
	    var O = {};
	    O[SYMBOL] = function(){ return 7; };
	    return ''[KEY](O) != 7;
	  })){
	    redefine(String.prototype, KEY, exec(defined, SYMBOL, original));
	    hide(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function(string, arg){ return original.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function(string){ return original.call(string, this); }
	    );
	  }
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(19);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(14);
	module.exports = function(target, src){
	  for(var key in src)redefine(target, key, src[key]);
	  return target;
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(6)
	  , $           = __webpack_require__(2)
	  , DESCRIPTORS = __webpack_require__(12)
	  , SPECIES     = __webpack_require__(5)('species');

	module.exports = function(KEY){
	  var C = global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(1)
	  , defined = __webpack_require__(17)
	  , fails   = __webpack_require__(8)
	  , spaces  = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	      '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF'
	  , space   = '[' + spaces + ']'
	  , non     = '\u200b\u0085'
	  , ltrim   = RegExp('^' + space + space + '*')
	  , rtrim   = RegExp(space + space + '*$');

	var exporter = function(KEY, exec){
	  var exp  = {};
	  exp[KEY] = exec(trim);
	  $export($export.P + $export.F * fails(function(){
	    return !!spaces[KEY]() || non[KEY]() != non;
	  }), 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function(string, TYPE){
	  string = String(defined(string));
	  if(TYPE & 1)string = string.replace(ltrim, '');
	  if(TYPE & 2)string = string.replace(rtrim, '');
	  return string;
	};

	module.exports = exporter;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var stackClear = __webpack_require__(332),
	    stackDelete = __webpack_require__(333),
	    stackGet = __webpack_require__(334),
	    stackHas = __webpack_require__(335),
	    stackSet = __webpack_require__(336);

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 */
	function Stack(values) {
	  var index = -1,
	      length = values ? values.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = values[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add functions to the `Stack` cache.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	module.exports = Stack;


/***/ },
/* 51 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(57);

	/**
	 * Gets the index at which the first occurrence of `key` is found in `array`
	 * of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(120),
	    createBaseEach = __webpack_require__(309);

	/**
	 * The base implementation of `_.forEach` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	module.exports = baseEach;


/***/ },
/* 54 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	module.exports = isHostObject;


/***/ },
/* 55 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(76);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;


/***/ },
/* 57 */
/***/ function(module, exports) {

	/**
	 * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var isArrayLikeObject = __webpack_require__(81);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
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
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	module.exports = isArguments;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 59 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var MATCH = __webpack_require__(5)('match');
	module.exports = function(KEY){
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch(e){
	    try {
	      re[MATCH] = false;
	      return !'/./'[KEY](re);
	    } catch(f){ /* empty */ }
	  } return true;
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(19);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(64)
	  , $export        = __webpack_require__(1)
	  , redefine       = __webpack_require__(14)
	  , hide           = __webpack_require__(18)
	  , has            = __webpack_require__(10)
	  , Iterators      = __webpack_require__(33)
	  , $iterCreate    = __webpack_require__(99)
	  , setToStringTag = __webpack_require__(34)
	  , getProto       = __webpack_require__(2).getProto
	  , ITERATOR       = __webpack_require__(5)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if($native){
	    var IteratorPrototype = getProto($default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if(DEF_VALUES && $native.name !== VALUES){
	      VALUES_BUG = true;
	      $default = function values(){ return $native.call(this); };
	    }
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES  ? $default : getMethod(VALUES),
	      keys:    IS_SET      ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(5)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = false;

/***/ },
/* 65 */
/***/ function(module, exports) {

	// 20.2.2.14 Math.expm1(x)
	module.exports = Math.expm1 || function expm1(x){
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	};

/***/ },
/* 66 */
/***/ function(module, exports) {

	// 20.2.2.28 Math.sign(x)
	module.exports = Math.sign || function sign(x){
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(2).getDesc
	  , isObject = __webpack_require__(3)
	  , anObject = __webpack_require__(4);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(16)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(36)
	  , defined   = __webpack_require__(17);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// helper for String#{startsWith, endsWith, includes}
	var isRegExp = __webpack_require__(97)
	  , defined  = __webpack_require__(17);

	module.exports = function(that, searchString, NAME){
	  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(defined(that));
	};

/***/ },
/* 70 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Built-in value references. */
	var Symbol = global.Symbol;

	module.exports = Symbol;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 71 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
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
/* 72 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array.length;

	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}

	module.exports = arrayReduce;


/***/ },
/* 73 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Used for built-in method references. */
	var objectProto = global.Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var getPrototypeOf = Object.getPrototypeOf;

	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return hasOwnProperty.call(object, key) ||
	    (typeof object == 'object' && key in object && getPrototypeOf(object) === null);
	}

	module.exports = baseHas;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(287),
	    baseMatchesProperty = __webpack_require__(288),
	    identity = __webpack_require__(135),
	    isArray = __webpack_require__(7),
	    property = __webpack_require__(351);

	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  var type = typeof value;
	  if (type == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (type == 'object') {
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
	  }
	  return property(value);
	}

	module.exports = baseIteratee;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var copyObjectWith = __webpack_require__(306);

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object) {
	  return copyObjectWith(source, props, object);
	}

	module.exports = copyObject;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(345);

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
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(57),
	    isArrayLike = __webpack_require__(37),
	    isIndex = __webpack_require__(55),
	    isObject = __webpack_require__(9);

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
	    return eq(object[index], value);
	  }
	  return false;
	}

	module.exports = isIterateeCall;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(7);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
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
	  if (typeof value == 'number') {
	    return true;
	  }
	  return !isArray(value) &&
	    (reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	      (object != null && value in Object(object)));
	}

	module.exports = isKey;


/***/ },
/* 79 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Used for built-in method references. */
	var objectProto = global.Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(73),
	    hasPath = __webpack_require__(129);

	/**
	 * Checks if `path` is a direct property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = { 'a': { 'b': { 'c': 3 } } };
	 * var other = _.create({ 'a': _.create({ 'b': _.create({ 'c': 3 }) }) });
	 *
	 * _.has(object, 'a');
	 * // => true
	 *
	 * _.has(object, 'a.b.c');
	 * // => true
	 *
	 * _.has(object, ['a', 'b', 'c']);
	 * // => true
	 *
	 * _.has(other, 'a');
	 * // => false
	 */
	function has(object, path) {
	  return hasPath(object, path, baseHas);
	}

	module.exports = has;


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(37),
	    isObjectLike = __webpack_require__(24);

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	module.exports = isArrayLikeObject;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var isLength = __webpack_require__(59),
	    isObjectLike = __webpack_require__(24);

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

	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

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
	  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}

	module.exports = isTypedArray;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var baseKeysIn = __webpack_require__(286),
	    indexKeys = __webpack_require__(131),
	    isIndex = __webpack_require__(55),
	    isPrototype = __webpack_require__(79);

	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;

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
	  var index = -1,
	      isProto = isPrototype(object),
	      props = baseKeysIn(object),
	      propsLength = props.length,
	      indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;

	  while (++index < propsLength) {
	    var key = props[index];
	    if (!(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keysIn;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _isObject = __webpack_require__(9);

	var _isObject2 = _interopRequireDefault(_isObject);

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.localExists = localExists;
	exports.setItem = setItem;
	exports.getItem = getItem;
	exports.removeItem = removeItem;
	exports.clear = clear;

	var _logger = __webpack_require__(22);

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

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.get = get;
	exports.post = post;
	exports.put = put;
	exports.del = del;

	var _logger = __webpack_require__(22);

	var _logger2 = _interopRequireDefault(_logger);

	var _token = __webpack_require__(86);

	var _token2 = _interopRequireDefault(_token);

	var _superagent = __webpack_require__(359);

	var _superagent2 = _interopRequireDefault(_superagent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function get(endpoint, queryData) {
		var req = _superagent2.default.get(endpoint);
		if (queryData) {
			req.query(queryData);
		}
		req = addAuthHeader(req);
		return handleResponse(req);
	}

	function post(endpoint, data) {
		var req = _superagent2.default.post(endpoint).send(data);
		req = addAuthHeader(req);
		return handleResponse(req);
	}

	function put(endpoint, data) {
		var req = _superagent2.default.put(endpoint, data);
		req = addAuthHeader(req);
		return handleResponse(req);
	}

	function del(endpoint, data) {
		var req = _superagent2.default.del(endpoint, data);
		req = addAuthHeader(req);
		return handleResponse(req);
	}

	function handleResponse(req) {
		return new Promise(function (resolve, reject) {
			if (typeof req.end !== 'function') {
				_logger2.default.warn({
					description: 'req.end is not a function', func: 'handleResponse'
				});
				return reject({ message: 'req.end is not a function' });
			}
			req.end(function (errorRes, res) {
				if (errorRes) {
					if (errorRes.status == 401) {
						_logger2.default.warn({
							description: 'Unauthorized. You must be signed into make this request.',
							func: 'handleResponse'
						});
					}
					var response = errorRes.response;

					var _error = response && response.body ? response.body : errorRes;
					_logger2.default.error({
						description: 'Error in request.', error: _error,
						file: 'request', func: 'handleResponse'
					});
					return reject(_error || errorRes);
				}
				if (res.error) {
					_logger2.default.error({
						description: 'Error in request.', error: error,
						file: 'request', func: 'handleResponse'
					});
					return reject(res.error);
				}
				// logger.debug({
				// 	message: 'Successful response recieved.', response: res.body,
				// 	func: 'handleResponse', file: 'request'
				// });
				resolve(res.body);
			});
		});
	}
	function addAuthHeader(req) {
		if (_token2.default.string) {
			req = req.set('Authorization', 'Bearer ' + _token2.default.string);
			// logger.debug({
			// 	message: 'Set auth header', token: token.string,
			// 	func: 'addAuthHeader', file: 'request'
			// });
		}
		return req;
	}

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _isString = __webpack_require__(30);

	var _isString2 = _interopRequireDefault(_isString);

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _config = __webpack_require__(39);

	var _config2 = _interopRequireDefault(_config);

	var _logger = __webpack_require__(22);

	var _logger2 = _interopRequireDefault(_logger);

	var _cookies = __webpack_require__(138);

	var cookiesUtil = _interopRequireWildcard(_cookies);

	var _envStorage = __webpack_require__(84);

	var envStorage = _interopRequireWildcard(_envStorage);

	var _jwtDecode = __webpack_require__(259);

	var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var token = {

		/** Get string value of token
	  * @return {String}
	  * @example
	  * console.log('String value of current token', token.string);
	  */
		get string() {
			var cookie = cookiesUtil.getCookie(_config2.default.tokenName);
			if (cookie === '') return null;
			return cookie;
		},

		/**
	  * @description Get decoded data within token (unencrypted data only)
	  * @return {Object}
	  * @example
	  * console.log('Data of current token:', token.data);
	  */
		get data() {
			if (!this.string) return null;
			if (envStorage.getItem(_config2.default.tokenDataName)) {
				return envStorage.getItem(_config2.default.tokenDataName);
			} else {
				return decodeToken(this.string);
			}
		},

		/**
	  * @description Set token data
	  */
		set data(tokenData) {
			envStorage.setItem(_config2.default.tokenDataName, tokenData);
			_logger2.default.debug({
				description: 'Token data was set to session storage.', tokenData: tokenData,
				func: 'data', obj: 'token'
			});
		},

		/**
	  * @description Set token value as a string
	  */
		set string(tokenStr) {
			//Handle object being passed
			if (!(0, _isString2.default)(tokenStr)) {
				//Token is included in object
				_logger2.default.log({
					description: 'Token data is not string.',
					tokenStr: tokenStr, func: 'string', obj: 'token'
				});
				throw new Error('Token data should be a string');
			}
			cookiesUtil.setCookie(_config2.default.tokenName, tokenStr, 7);
			this.data = decodeToken(tokenStr);
			_logger2.default.debug({
				description: 'Token was set to cookies.',
				func: 'string', obj: 'token'
			});
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
			cookiesUtil.deleteCookie(_config2.default.tokenName);
			//Remove user data
			envStorage.removeItem(_config2.default.tokenDataName);
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
		if (!tokenStr || tokenStr === '') return null;
		try {
			return (0, _jwtDecode2.default)(tokenStr);
		} catch (error) {
			_logger2.default.error({
				description: 'Error decoding token.',
				error: error, func: 'decodeToken', file: 'token'
			});
			return null;
		}
	}
	module.exports = exports['default'];

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(15)
	  , toLength  = __webpack_require__(11)
	  , toIndex   = __webpack_require__(35);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $            = __webpack_require__(2)
	  , hide         = __webpack_require__(18)
	  , redefineAll  = __webpack_require__(46)
	  , ctx          = __webpack_require__(16)
	  , strictNew    = __webpack_require__(48)
	  , defined      = __webpack_require__(17)
	  , forOf        = __webpack_require__(32)
	  , $iterDefine  = __webpack_require__(62)
	  , step         = __webpack_require__(100)
	  , ID           = __webpack_require__(27)('id')
	  , $has         = __webpack_require__(10)
	  , isObject     = __webpack_require__(3)
	  , setSpecies   = __webpack_require__(47)
	  , DESCRIPTORS  = __webpack_require__(12)
	  , isExtensible = Object.isExtensible || isObject
	  , SIZE         = DESCRIPTORS ? '_s' : 'size'
	  , id           = 0;

	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!$has(it, ID)){
	    // can't set id to frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add id
	    if(!create)return 'E';
	    // add missing object id
	    hide(it, ID, ++id);
	  // return object id with prefix
	  } return 'O' + it[ID];
	};

	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};

	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      strictNew(that, C, NAME);
	      that._i = $.create(null); // index
	      that._f = undefined;      // first entry
	      that._l = undefined;      // last entry
	      that[SIZE] = 0;           // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)$.setDesc(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var forOf   = __webpack_require__(32)
	  , classof = __webpack_require__(41);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    var arr = [];
	    forOf(this, false, arr.push, arr);
	    return arr;
	  };
	};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var hide              = __webpack_require__(18)
	  , redefineAll       = __webpack_require__(46)
	  , anObject          = __webpack_require__(4)
	  , isObject          = __webpack_require__(3)
	  , strictNew         = __webpack_require__(48)
	  , forOf             = __webpack_require__(32)
	  , createArrayMethod = __webpack_require__(40)
	  , $has              = __webpack_require__(10)
	  , WEAK              = __webpack_require__(27)('weak')
	  , isExtensible      = Object.isExtensible || isObject
	  , arrayFind         = createArrayMethod(5)
	  , arrayFindIndex    = createArrayMethod(6)
	  , id                = 0;

	// fallback for frozen keys
	var frozenStore = function(that){
	  return that._l || (that._l = new FrozenStore);
	};
	var FrozenStore = function(){
	  this.a = [];
	};
	var findFrozen = function(store, key){
	  return arrayFind(store.a, function(it){
	    return it[0] === key;
	  });
	};
	FrozenStore.prototype = {
	  get: function(key){
	    var entry = findFrozen(this, key);
	    if(entry)return entry[1];
	  },
	  has: function(key){
	    return !!findFrozen(this, key);
	  },
	  set: function(key, value){
	    var entry = findFrozen(this, key);
	    if(entry)entry[1] = value;
	    else this.a.push([key, value]);
	  },
	  'delete': function(key){
	    var index = arrayFindIndex(this.a, function(it){
	      return it[0] === key;
	    });
	    if(~index)this.a.splice(index, 1);
	    return !!~index;
	  }
	};

	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      strictNew(that, C, NAME);
	      that._i = id++;      // collection id
	      that._l = undefined; // leak store for frozen objects
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function(key){
	        if(!isObject(key))return false;
	        if(!isExtensible(key))return frozenStore(this)['delete'](key);
	        return $has(key, WEAK) && $has(key[WEAK], this._i) && delete key[WEAK][this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key){
	        if(!isObject(key))return false;
	        if(!isExtensible(key))return frozenStore(this).has(key);
	        return $has(key, WEAK) && $has(key[WEAK], this._i);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    if(!isExtensible(anObject(key))){
	      frozenStore(that).set(key, value);
	    } else {
	      $has(key, WEAK) || hide(key, WEAK, {});
	      key[WEAK][that._i] = value;
	    } return that;
	  },
	  frozenStore: frozenStore,
	  WEAK: WEAK
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(3)
	  , document = __webpack_require__(6).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.2.5.3 get RegExp.prototype.flags
	var anObject = __webpack_require__(4);
	module.exports = function(){
	  var that   = anObject(this)
	    , result = '';
	  if(that.global)     result += 'g';
	  if(that.ignoreCase) result += 'i';
	  if(that.multiline)  result += 'm';
	  if(that.unicode)    result += 'u';
	  if(that.sticky)     result += 'y';
	  return result;
	};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(15)
	  , getNames  = __webpack_require__(2).getNames
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6).document && document.documentElement;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(33)
	  , ITERATOR   = __webpack_require__(5)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var isObject = __webpack_require__(3)
	  , floor    = Math.floor;
	module.exports = function isInteger(it){
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.8 IsRegExp(argument)
	var isObject = __webpack_require__(3)
	  , cof      = __webpack_require__(19)
	  , MATCH    = __webpack_require__(5)('match');
	module.exports = function(it){
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(4);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(2)
	  , descriptor     = __webpack_require__(23)
	  , setToStringTag = __webpack_require__(34)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(18)(IteratorPrototype, __webpack_require__(5)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 100 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 101 */
/***/ function(module, exports) {

	// 20.2.2.20 Math.log1p(x)
	module.exports = Math.log1p || function log1p(x){
	  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(2)
	  , toIObject = __webpack_require__(15)
	  , isEnum    = $.isEnum;
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = $.getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)if(isEnum.call(O, key = keys[i++])){
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	// all object keys, includes non-enumerable and symbols
	var $        = __webpack_require__(2)
	  , anObject = __webpack_require__(4)
	  , Reflect  = __webpack_require__(6).Reflect;
	module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
	  var keys       = $.getNames(anObject(it))
	    , getSymbols = $.getSymbols;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

/***/ },
/* 104 */
/***/ function(module, exports) {

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(6)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/ljharb/proposal-string-pad-left-right
	var toLength = __webpack_require__(11)
	  , repeat   = __webpack_require__(107)
	  , defined  = __webpack_require__(17);

	module.exports = function(that, maxLength, fillString, left){
	  var S            = String(defined(that))
	    , stringLength = S.length
	    , fillStr      = fillString === undefined ? ' ' : String(fillString)
	    , intMaxLength = toLength(maxLength);
	  if(intMaxLength <= stringLength)return S;
	  if(fillStr == '')fillStr = ' ';
	  var fillLen = intMaxLength - stringLength
	    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
	  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
	  return left ? stringFiller + S : S + stringFiller;
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var toInteger = __webpack_require__(36)
	  , defined   = __webpack_require__(17);

	module.exports = function repeat(count){
	  var str = String(defined(this))
	    , res = ''
	    , n   = toInteger(count);
	  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
	  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
	  return res;
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(16)
	  , invoke             = __webpack_require__(44)
	  , html               = __webpack_require__(94)
	  , cel                = __webpack_require__(91)
	  , global             = __webpack_require__(6)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listner = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(19)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listner, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(41)
	  , ITERATOR  = __webpack_require__(5)('iterator')
	  , Iterators = __webpack_require__(33);
	module.exports = __webpack_require__(20).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(26)
	  , step             = __webpack_require__(100)
	  , Iterators        = __webpack_require__(33)
	  , toIObject        = __webpack_require__(15);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(62)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var mapClear = __webpack_require__(326),
	    mapDelete = __webpack_require__(327),
	    mapGet = __webpack_require__(328),
	    mapHas = __webpack_require__(329),
	    mapSet = __webpack_require__(330);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 */
	function MapCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = values[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add functions to the `MapCache`.
	MapCache.prototype.clear = mapClear;
	MapCache.prototype['delete'] = mapDelete;
	MapCache.prototype.get = mapGet;
	MapCache.prototype.has = mapHas;
	MapCache.prototype.set = mapSet;

	module.exports = MapCache;


/***/ },
/* 112 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Built-in value references. */
	var Uint8Array = global.Uint8Array;

	module.exports = Uint8Array;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 113 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
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
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(57);

	/**
	 * This function is like `assignValue` except that it doesn't assign `undefined` values.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignMergeValue(object, key, value) {
	  if ((value !== undefined && !eq(object[key], value)) ||
	      (typeof key == 'number' && value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}

	module.exports = assignMergeValue;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var eq = __webpack_require__(57);

	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if ((!eq(objValue, value) ||
	        (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) ||
	      (value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}

	module.exports = assignValue;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var assocIndexOf = __webpack_require__(52);

	/** Used for built-in method references. */
	var arrayProto = global.Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the associative array.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function assocDelete(array, key) {
	  var index = assocIndexOf(array, key);
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = array.length - 1;
	  if (index == lastIndex) {
	    array.pop();
	  } else {
	    splice.call(array, index, 1);
	  }
	  return true;
	}

	module.exports = assocDelete;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(52);

	/**
	 * Gets the associative array value for `key`.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function assocGet(array, key) {
	  var index = assocIndexOf(array, key);
	  return index < 0 ? undefined : array[index][1];
	}

	module.exports = assocGet;


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(52);

	/**
	 * Checks if an associative array value for `key` exists.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function assocHas(array, key) {
	  return assocIndexOf(array, key) > -1;
	}

	module.exports = assocHas;


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(52);

	/**
	 * Sets the associative array `key` to `value`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function assocSet(array, key, value) {
	  var index = assocIndexOf(array, key);
	  if (index < 0) {
	    array.push([key, value]);
	  } else {
	    array[index][1] = value;
	  }
	}

	module.exports = assocSet;


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(281),
	    keys = __webpack_require__(31);

	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var baseToPath = __webpack_require__(125),
	    isKey = __webpack_require__(78);

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path + ''] : baseToPath(path);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[path[index++]];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var indexOfNaN = __webpack_require__(320);

	/**
	 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
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
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(283),
	    isObject = __webpack_require__(9),
	    isObjectLike = __webpack_require__(24);

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {boolean} [bitmask] The bitmask of comparison flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - Unordered comparison
	 *     2 - Partial comparison
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, bitmask, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}

	module.exports = baseIsEqual;


/***/ },
/* 124 */
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
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(7),
	    stringToPath = __webpack_require__(337);

	/**
	 * The base implementation of `_.toPath` which only converts `value` to a
	 * path if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Array} Returns the property path array.
	 */
	function baseToPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}

	module.exports = baseToPath;


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var Uint8Array = __webpack_require__(112);

	/**
	 * Creates a clone of `buffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} buffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneBuffer(buffer) {
	  var Ctor = buffer.constructor,
	      result = new Ctor(buffer.byteLength),
	      view = new Uint8Array(result);

	  view.set(new Uint8Array(buffer));
	  return result;
	}

	module.exports = cloneBuffer;


/***/ },
/* 127 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = copyArray;


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var Map = __webpack_require__(28),
	    Set = __webpack_require__(264);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    setTag = '[object Set]';

	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = global.Function.prototype.toString;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect maps and sets. */
	var mapCtorString = Map ? funcToString.call(Map) : '',
	    setCtorString = Set ? funcToString.call(Set) : '';

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function getTag(value) {
	  return objectToString.call(value);
	}

	// Fallback for IE 11 providing `toStringTag` values for maps and sets.
	if ((Map && getTag(new Map) != mapTag) || (Set && getTag(new Set) != setTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : null,
	        ctorString = typeof Ctor == 'function' ? funcToString.call(Ctor) : '';

	    if (ctorString) {
	      if (ctorString == mapCtorString) {
	        return mapTag;
	      }
	      if (ctorString == setCtorString) {
	        return setTag;
	      }
	    }
	    return result;
	  };
	}

	module.exports = getTag;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var baseToPath = __webpack_require__(125),
	    isArguments = __webpack_require__(58),
	    isArray = __webpack_require__(7),
	    isIndex = __webpack_require__(55),
	    isKey = __webpack_require__(78),
	    isLength = __webpack_require__(59),
	    isString = __webpack_require__(30),
	    last = __webpack_require__(348),
	    parent = __webpack_require__(331);

	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  if (object == null) {
	    return false;
	  }
	  var result = hasFunc(object, path);
	  if (!result && !isKey(path)) {
	    path = baseToPath(path);
	    object = parent(object, path);
	    if (object != null) {
	      path = last(path);
	      result = hasFunc(object, path);
	    }
	  }
	  var length = object ? object.length : undefined;
	  return result || (
	    !!length && isLength(length) && isIndex(path, length) &&
	    (isArray(object) || isString(object) || isArguments(object))
	  );
	}

	module.exports = hasPath;


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var nativeCreate = __webpack_require__(56);

	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(hash, key) {
	  return nativeCreate ? hash[key] !== undefined : hasOwnProperty.call(hash, key);
	}

	module.exports = hashHas;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(295),
	    isArguments = __webpack_require__(58),
	    isArray = __webpack_require__(7),
	    isLength = __webpack_require__(59),
	    isString = __webpack_require__(30);

	/**
	 * Creates an array of index keys for `object` values of arrays,
	 * `arguments` objects, and strings, otherwise `null` is returned.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array|null} Returns index keys, else `null`.
	 */
	function indexKeys(object) {
	  var length = object ? object.length : undefined;
	  if (isLength(length) &&
	      (isArray(object) || isString(object) || isArguments(object))) {
	    return baseTimes(length, String);
	  }
	  return null;
	}

	module.exports = indexKeys;


/***/ },
/* 132 */
/***/ function(module, exports) {

	/**
	 * Converts `map` to an array.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	module.exports = mapToArray;


/***/ },
/* 133 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to an array.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	module.exports = setToArray;


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(121);

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined` the `defaultValue` is used in its place.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	module.exports = get;


/***/ },
/* 135 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
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
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(268),
	    toInteger = __webpack_require__(137);

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://mdn.io/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.rest(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function rest(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, array);
	      case 1: return func.call(this, args[0], array);
	      case 2: return func.call(this, args[0], args[1], array);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = rest;


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var toNumber = __webpack_require__(353);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;

	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This function is loosely based on [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3');
	 * // => 3
	 */
	function toInteger(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  var remainder = value % 1;
	  return value === value ? (remainder ? value - remainder : value) : 0;
	}

	module.exports = toInteger;


/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _includes = __webpack_require__(344);

	var _includes2 = _interopRequireDefault(_includes);

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.getCookie = getCookie;
	exports.setCookie = setCookie;
	exports.deleteCookie = deleteCookie;

	var _logger = __webpack_require__(22);

	var _logger2 = _interopRequireDefault(_logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @description Gets cookie value by cookie name.
	 *
	 * @param {String} cookieName - cookie name
	 * @returns {String} cookieValue - value for given cookie name
	 *
	 */
	function getCookie(cookieName) {
		var name = cookieName + '=';
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			try {
				if ((0, _includes2.default)(c, name)) {
					return c.substring(name.length, c.length);
				}
			} catch (error) {
				_logger2.default.warn({
					description: 'Cookie cannot be loaded.', cookieName: cookieName,
					error: error, func: 'getCookie', obj: 'cookiesUtil'
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
	function setCookie(cookieName, cookieValue, expDays) {
		var d = new Date();
		d.setTime(d.getTime() + expDays * 24 * 60 * 60 * 1000);
		var expires = 'expires=' + d.toUTCString();
		try {
			document.cookie = cookieName + '=' + cookieValue + '; Path=/; ' + expires;
		} catch (e) {
			_logger2.default.warn({
				description: 'Cookie cannot be set because browser is not capable.',
				cookieName: cookieName, func: 'setCookie', obj: 'cookiesUtil'
			});
		}
	}

	/**
	 * @description Deletes cookie at domain's root path.
	 * @param {String} cookieName - cookie name
	 *
	 */
	function deleteCookie(cookieName) {
		if (getCookie(cookieName)) {
			document.cookie = cookieName + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			_logger2.default.debug({
				description: 'Cookie deleted.', cookieName: cookieName, func: 'deleteCookie'
			});
		} else {
			_logger2.default.warn({
				description: 'Cookie cannot be deleted because it does not exist.',
				cookieName: cookieName, func: 'deleteCookie', obj: 'cookiesUtil'
			});
		}
	}

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _has = __webpack_require__(80);

	var _has2 = _interopRequireDefault(_has);

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.loadCss = loadCss;
	exports.loadJs = loadJs;
	exports.asyncLoadJs = asyncLoadJs;
	exports.getQueryParam = getQueryParam;

	var _logger = __webpack_require__(22);

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
		name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
		    results = regex.exec(location.search);
		return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	}

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.authWithServer = undefined;

	__webpack_require__(141);

	var _request = __webpack_require__(85);

	var _logger = __webpack_require__(22);

	var _logger2 = _interopRequireDefault(_logger);

	var _config = __webpack_require__(39);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

	// import { OAuth, User } from 'oauthio-web'; // window undefined error
	// OAuth.initialize(config.oauthioKey);

	var isBrowser = typeof window !== 'undefined';
	var OAuthLib = isBrowser ? __webpack_require__(358) : undefined;
	initializeOAuth();

	function initializeOAuth() {
	  if (isBrowser) {
	    OAuthLib.OAuth.initialize(_config2.default.oauthioKey);
	  }
	  return undefined;
	}
	//Run initial setup of OAuth Library

	/**
	 * @description Signup with external provider
	 * @param {String} provider Provider with which to signup through (Google/Github Etc)
	 */
	// export async function signup(provider) {
	// 	try {
	// 		const res = await OAuth.popup(provider, {cache: true})
	// 		logger.debug({
	// 			description: 'Popup response.', res,
	// 			func: 'signup', obj: 'providerAuth'
	// 		});
	// 		const newUser = await User.signup(res);
	// 		return newUser;
	// 	} catch(error) {
	// 		logger.error({
	// 			description: 'error in oauth request', error
	// 		});
	// 		return error;
	// 	}
	// }

	/**
	 * @description Login to external provider
	 * @param {String} provider Provider with which to log into (Google/Github Etc)
	 */
	// export async function login(provider) {
	// 	try {
	// 		const res = await OAuth.popup(provider, {cache: true})
	// 		const newUser = await User.signin(res);
	// 		console.log('user:', newUser);
	// 		return newUser;
	// 	} catch(error) {
	// 		console.error('error in oauth request', error);
	// 		return error;
	// 	}
	// }

	/**
	 * @description Logout external provider service (Stormpath/oauthio)
	 */
	// export async function logout() {
	// 	if(!currentlyLoggedIn()) return;
	// 	try {
	// 		const user = User.getIdentity();
	// 		return await user.logout();
	// 	} catch(error) {
	// 		console.error('error logging out', error);
	// 		return error;
	// 	}
	// }

	/**
	 * @description Get currently connected user
	 */
	// export function getCurrentUser() {
	// 	return User.getIdentity();
	// }

	/**
	 * @description Local user data from external provider service (Stormpath/oauthio)
	 */
	// export async function getUserData(provider) {
	// 	try {
	// 		const result = await OAuth.popup(provider, {cache: true});
	// 		return await result.me();
	// 	} catch(error) {
	// 		console.error('error in oauth request', error);
	// 	}
	// }

	/**
	 * @description Update user with external provider service (Stormpath/oauthio)
	 */
	// export async function updateUserData(newData) {
	// 	try {
	// 		user = User.getIdentity();
	// 		user.data = newData;
	// 		return await user.save();
	// 	} catch(error) {
	// 		console.error('error updating user data', error);
	// 	}
	// }

	/**
	 * @description Check to see if a user is currently logged in to external provider service (Stormpath/oauthio)
	 */
	// export function currentlyLoggedIn() {
	// 	return User.isLogged();
	// }

	/**
	 * @description Signup using a token generated from the server (so server and client are both aware of auth state)
	 */

	var authWithServer = exports.authWithServer = function () {
	  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(provider) {
	    var params, result;
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            _context.prev = 0;
	            _context.next = 3;
	            return (0, _request.get)(_config2.default.serverUrl + '/stateToken');

	          case 3:
	            params = _context.sent;
	            _context.next = 6;
	            return OAuth.popup(provider, { state: params.token });

	          case 6:
	            result = _context.sent;
	            _context.next = 9;
	            return (0, _request.put)(_config2.default.serverUrl + '/auth', { provider: provider, code: result.code, stateToken: params.token });

	          case 9:
	            return _context.abrupt('return', _context.sent);

	          case 12:
	            _context.prev = 12;
	            _context.t0 = _context['catch'](0);

	            _logger2.default.error({ description: 'error with request', error: _context.t0 });
	            // return err;

	          case 15:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this, [[0, 12]]);
	  }));

	  return function authWithServer(_x) {
	    return ref.apply(this, arguments);
	  };
	}();

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	__webpack_require__(257);

	__webpack_require__(142);

	if (global._babelPolyfill) {
	  throw new Error("only one instance of babel-polyfill is allowed");
	}
	global._babelPolyfill = true;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */

	!(function(global) {
	  "use strict";

	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var iteratorSymbol =
	    typeof Symbol === "function" && Symbol.iterator || "@@iterator";

	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }

	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = Object.create((outerFn || Generator).prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  runtime.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function(arg) {
	    return new AwaitArgument(arg);
	  };

	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }

	  function AsyncIterator(generator) {
	    // This invoke function is written in a style that assumes some
	    // calling function (or Promise) will handle exceptions.
	    function invoke(method, arg) {
	      var result = generator[method](arg);
	      var value = result.value;
	      return value instanceof AwaitArgument
	        ? Promise.resolve(value.arg).then(invokeNext, invokeThrow)
	        : Promise.resolve(value).then(function(unwrapped) {
	            // When a yielded Promise is resolved, its final value becomes
	            // the .value of the Promise<{value,done}> result for the
	            // current iteration. If the Promise is rejected, however, the
	            // result for this iteration will be rejected with the same
	            // reason. Note that rejections of yielded Promises are not
	            // thrown back into the generator function, as is the case
	            // when an awaited Promise is rejected. This difference in
	            // behavior between yield and await is important, because it
	            // allows the consumer to decide what to do with the yielded
	            // rejection (swallow it and continue, manually .throw it back
	            // into the generator, abandon iteration, whatever). With
	            // await, by contrast, there is no opportunity to examine the
	            // rejection reason outside the generator function, so the
	            // only option is to throw it from the await expression, and
	            // let the generator function handle the exception.
	            result.value = unwrapped;
	            return result;
	          });
	    }

	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }

	    var invokeNext = invoke.bind(generator, "next");
	    var invokeThrow = invoke.bind(generator, "throw");
	    var invokeReturn = invoke.bind(generator, "return");
	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return invoke(method, arg);
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : new Promise(function (resolve) {
	          resolve(callInvokeWithMethodAndArg());
	        });
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;

	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }

	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }

	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );

	          if (record.type === "throw") {
	            context.delegate = null;

	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }

	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;

	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }

	          context.delegate = null;
	        }

	        if (method === "next") {
	          context._sent = arg;

	          if (state === GenStateSuspendedYield) {
	            context.sent = arg;
	          } else {
	            context.sent = undefined;
	          }
	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }

	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }

	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          var info = {
	            value: record.arg,
	            done: context.done
	          };

	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;

	  function doneResult() {
	    return { value: undefined, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      this.sent = undefined;
	      this.done = false;
	      this.delegate = null;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }

	      return ContinueSentinel;
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(362)))

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	'use strict';
	var toObject = __webpack_require__(21)
	  , toIndex  = __webpack_require__(35)
	  , toLength = __webpack_require__(11);

	module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
	  var O     = toObject(this)
	    , len   = toLength(O.length)
	    , to    = toIndex(target, len)
	    , from  = toIndex(start, len)
	    , $$    = arguments
	    , end   = $$.length > 2 ? $$[2] : undefined
	    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
	    , inc   = 1;
	  if(from < to && to < from + count){
	    inc  = -1;
	    from += count - 1;
	    to   += count - 1;
	  }
	  while(count-- > 0){
	    if(from in O)O[to] = O[from];
	    else delete O[to];
	    to   += inc;
	    from += inc;
	  } return O;
	};

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	'use strict';
	var toObject = __webpack_require__(21)
	  , toIndex  = __webpack_require__(35)
	  , toLength = __webpack_require__(11);
	module.exports = [].fill || function fill(value /*, start = 0, end = @length */){
	  var O      = toObject(this)
	    , length = toLength(O.length)
	    , $$     = arguments
	    , $$len  = $$.length
	    , index  = toIndex($$len > 1 ? $$[1] : undefined, length)
	    , end    = $$len > 2 ? $$[2] : undefined
	    , endPos = end === undefined ? length : toIndex(end, length);
	  while(endPos > index)O[index++] = value;
	  return O;
	};

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var isObject = __webpack_require__(3)
	  , isArray  = __webpack_require__(61)
	  , SPECIES  = __webpack_require__(5)('species');
	module.exports = function(original, length){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length);
	};

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(2);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(2)
	  , toIObject = __webpack_require__(15);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(6)
	  , macrotask = __webpack_require__(108).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(19)(process) == 'process'
	  , head, last, notify;

	var flush = function(){
	  var parent, domain, fn;
	  if(isNode && (parent = process.domain)){
	    process.domain = null;
	    parent.exit();
	  }
	  while(head){
	    domain = head.domain;
	    fn     = head.fn;
	    if(domain)domain.enter();
	    fn(); // <- currently we use it only for Promise - try / catch not required
	    if(domain)domain.exit();
	    head = head.next;
	  } last = undefined;
	  if(parent)parent.enter();
	};

	// Node.js
	if(isNode){
	  notify = function(){
	    process.nextTick(flush);
	  };
	// browsers with MutationObserver
	} else if(Observer){
	  var toggle = 1
	    , node   = document.createTextNode('');
	  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	  notify = function(){
	    node.data = toggle = -toggle;
	  };
	// environments with maybe non-completely correct, but existent Promise
	} else if(Promise && Promise.resolve){
	  notify = function(){
	    Promise.resolve().then(flush);
	  };
	// for other environments - macrotask based on:
	// - setImmediate
	// - MessageChannel
	// - window.postMessag
	// - onreadystatechange
	// - setTimeout
	} else {
	  notify = function(){
	    // strange IE + webpack dev server bug - use .call(global)
	    macrotask.call(global, flush);
	  };
	}

	module.exports = function asap(fn){
	  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
	  if(last)last.next = task;
	  if(!head){
	    head = task;
	    notify();
	  } last = task;
	};

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__(2)
	  , toObject = __webpack_require__(21)
	  , IObject  = __webpack_require__(45);

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(8)(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , $$    = arguments
	    , $$len = $$.length
	    , index = 1
	    , getKeys    = $.getKeys
	    , getSymbols = $.getSymbols
	    , isEnum     = $.isEnum;
	  while($$len > index){
	    var S      = IObject($$[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var path      = __webpack_require__(151)
	  , invoke    = __webpack_require__(44)
	  , aFunction = __webpack_require__(25);
	module.exports = function(/* ...pargs */){
	  var fn     = aFunction(this)
	    , length = arguments.length
	    , pargs  = Array(length)
	    , i      = 0
	    , _      = path._
	    , holder = false;
	  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
	  return function(/* ...args */){
	    var that  = this
	      , $$    = arguments
	      , $$len = $$.length
	      , j = 0, k = 0, args;
	    if(!holder && !$$len)return invoke(fn, pargs, that);
	    args = pargs.slice();
	    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = $$[k++];
	    while($$len > k)args.push($$[k++]);
	    return invoke(fn, args, that);
	  };
	};

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6);

/***/ },
/* 152 */
/***/ function(module, exports) {

	module.exports = function(regExp, replace){
	  var replacer = replace === Object(replace) ? function(part){
	    return replace[part];
	  } : replace;
	  return function(it){
	    return String(it).replace(regExp, replacer);
	  };
	};

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(4)
	  , aFunction = __webpack_require__(25)
	  , SPECIES   = __webpack_require__(5)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(3);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $                 = __webpack_require__(2)
	  , $export           = __webpack_require__(1)
	  , DESCRIPTORS       = __webpack_require__(12)
	  , createDesc        = __webpack_require__(23)
	  , html              = __webpack_require__(94)
	  , cel               = __webpack_require__(91)
	  , has               = __webpack_require__(10)
	  , cof               = __webpack_require__(19)
	  , invoke            = __webpack_require__(44)
	  , fails             = __webpack_require__(8)
	  , anObject          = __webpack_require__(4)
	  , aFunction         = __webpack_require__(25)
	  , isObject          = __webpack_require__(3)
	  , toObject          = __webpack_require__(21)
	  , toIObject         = __webpack_require__(15)
	  , toInteger         = __webpack_require__(36)
	  , toIndex           = __webpack_require__(35)
	  , toLength          = __webpack_require__(11)
	  , IObject           = __webpack_require__(45)
	  , IE_PROTO          = __webpack_require__(27)('__proto__')
	  , createArrayMethod = __webpack_require__(40)
	  , arrayIndexOf      = __webpack_require__(87)(false)
	  , ObjectProto       = Object.prototype
	  , ArrayProto        = Array.prototype
	  , arraySlice        = ArrayProto.slice
	  , arrayJoin         = ArrayProto.join
	  , defineProperty    = $.setDesc
	  , getOwnDescriptor  = $.getDesc
	  , defineProperties  = $.setDescs
	  , factories         = {}
	  , IE8_DOM_DEFINE;

	if(!DESCRIPTORS){
	  IE8_DOM_DEFINE = !fails(function(){
	    return defineProperty(cel('div'), 'a', {get: function(){ return 7; }}).a != 7;
	  });
	  $.setDesc = function(O, P, Attributes){
	    if(IE8_DOM_DEFINE)try {
	      return defineProperty(O, P, Attributes);
	    } catch(e){ /* empty */ }
	    if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	    if('value' in Attributes)anObject(O)[P] = Attributes.value;
	    return O;
	  };
	  $.getDesc = function(O, P){
	    if(IE8_DOM_DEFINE)try {
	      return getOwnDescriptor(O, P);
	    } catch(e){ /* empty */ }
	    if(has(O, P))return createDesc(!ObjectProto.propertyIsEnumerable.call(O, P), O[P]);
	  };
	  $.setDescs = defineProperties = function(O, Properties){
	    anObject(O);
	    var keys   = $.getKeys(Properties)
	      , length = keys.length
	      , i = 0
	      , P;
	    while(length > i)$.setDesc(O, P = keys[i++], Properties[P]);
	    return O;
	  };
	}
	$export($export.S + $export.F * !DESCRIPTORS, 'Object', {
	  // 19.1.2.6 / 15.2.3.3 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $.getDesc,
	  // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	  defineProperty: $.setDesc,
	  // 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	  defineProperties: defineProperties
	});

	  // IE 8- don't enum bug keys
	var keys1 = ('constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,' +
	            'toLocaleString,toString,valueOf').split(',')
	  // Additional keys for getOwnPropertyNames
	  , keys2 = keys1.concat('length', 'prototype')
	  , keysLen1 = keys1.length;

	// Create object with `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = cel('iframe')
	    , i      = keysLen1
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict.prototype[keys1[i]];
	  return createDict();
	};
	var createGetKeys = function(names, length){
	  return function(object){
	    var O      = toIObject(object)
	      , i      = 0
	      , result = []
	      , key;
	    for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	    // Don't enum bug & hidden keys
	    while(length > i)if(has(O, key = names[i++])){
	      ~arrayIndexOf(result, key) || result.push(key);
	    }
	    return result;
	  };
	};
	var Empty = function(){};
	$export($export.S, 'Object', {
	  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	  getPrototypeOf: $.getProto = $.getProto || function(O){
	    O = toObject(O);
	    if(has(O, IE_PROTO))return O[IE_PROTO];
	    if(typeof O.constructor == 'function' && O instanceof O.constructor){
	      return O.constructor.prototype;
	    } return O instanceof Object ? ObjectProto : null;
	  },
	  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $.getNames = $.getNames || createGetKeys(keys2, keys2.length, true),
	  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	  create: $.create = $.create || function(O, /*?*/Properties){
	    var result;
	    if(O !== null){
	      Empty.prototype = anObject(O);
	      result = new Empty();
	      Empty.prototype = null;
	      // add "__proto__" for Object.getPrototypeOf shim
	      result[IE_PROTO] = O;
	    } else result = createDict();
	    return Properties === undefined ? result : defineProperties(result, Properties);
	  },
	  // 19.1.2.14 / 15.2.3.14 Object.keys(O)
	  keys: $.getKeys = $.getKeys || createGetKeys(keys1, keysLen1, false)
	});

	var construct = function(F, len, args){
	  if(!(len in factories)){
	    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
	    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  }
	  return factories[len](F, args);
	};

	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
	$export($export.P, 'Function', {
	  bind: function bind(that /*, args... */){
	    var fn       = aFunction(this)
	      , partArgs = arraySlice.call(arguments, 1);
	    var bound = function(/* args... */){
	      var args = partArgs.concat(arraySlice.call(arguments));
	      return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
	    };
	    if(isObject(fn.prototype))bound.prototype = fn.prototype;
	    return bound;
	  }
	});

	// fallback for not array-like ES3 strings and DOM objects
	$export($export.P + $export.F * fails(function(){
	  if(html)arraySlice.call(html);
	}), 'Array', {
	  slice: function(begin, end){
	    var len   = toLength(this.length)
	      , klass = cof(this);
	    end = end === undefined ? len : end;
	    if(klass == 'Array')return arraySlice.call(this, begin, end);
	    var start  = toIndex(begin, len)
	      , upTo   = toIndex(end, len)
	      , size   = toLength(upTo - start)
	      , cloned = Array(size)
	      , i      = 0;
	    for(; i < size; i++)cloned[i] = klass == 'String'
	      ? this.charAt(start + i)
	      : this[start + i];
	    return cloned;
	  }
	});
	$export($export.P + $export.F * (IObject != Object), 'Array', {
	  join: function join(separator){
	    return arrayJoin.call(IObject(this), separator === undefined ? ',' : separator);
	  }
	});

	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
	$export($export.S, 'Array', {isArray: __webpack_require__(61)});

	var createArrayReduce = function(isRight){
	  return function(callbackfn, memo){
	    aFunction(callbackfn);
	    var O      = IObject(this)
	      , length = toLength(O.length)
	      , index  = isRight ? length - 1 : 0
	      , i      = isRight ? -1 : 1;
	    if(arguments.length < 2)for(;;){
	      if(index in O){
	        memo = O[index];
	        index += i;
	        break;
	      }
	      index += i;
	      if(isRight ? index < 0 : length <= index){
	        throw TypeError('Reduce of empty array with no initial value');
	      }
	    }
	    for(;isRight ? index >= 0 : length > index; index += i)if(index in O){
	      memo = callbackfn(memo, O[index], index, this);
	    }
	    return memo;
	  };
	};

	var methodize = function($fn){
	  return function(arg1/*, arg2 = undefined */){
	    return $fn(this, arg1, arguments[1]);
	  };
	};

	$export($export.P, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: $.each = $.each || methodize(createArrayMethod(0)),
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: methodize(createArrayMethod(1)),
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: methodize(createArrayMethod(2)),
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: methodize(createArrayMethod(3)),
	  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	  every: methodize(createArrayMethod(4)),
	  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
	  reduce: createArrayReduce(false),
	  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
	  reduceRight: createArrayReduce(true),
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: methodize(arrayIndexOf),
	  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
	  lastIndexOf: function(el, fromIndex /* = @[*-1] */){
	    var O      = toIObject(this)
	      , length = toLength(O.length)
	      , index  = length - 1;
	    if(arguments.length > 1)index = Math.min(index, toInteger(fromIndex));
	    if(index < 0)index = toLength(length + index);
	    for(;index >= 0; index--)if(index in O)if(O[index] === el)return index;
	    return -1;
	  }
	});

	// 20.3.3.1 / 15.9.4.4 Date.now()
	$export($export.S, 'Date', {now: function(){ return +new Date; }});

	var lz = function(num){
	  return num > 9 ? num : '0' + num;
	};

	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
	// PhantomJS / old WebKit has a broken implementations
	$export($export.P + $export.F * (fails(function(){
	  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
	}) || !fails(function(){
	  new Date(NaN).toISOString();
	})), 'Date', {
	  toISOString: function toISOString(){
	    if(!isFinite(this))throw RangeError('Invalid time value');
	    var d = this
	      , y = d.getUTCFullYear()
	      , m = d.getUTCMilliseconds()
	      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
	    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
	      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
	      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
	      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	  }
	});

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	var $export = __webpack_require__(1);

	$export($export.P, 'Array', {copyWithin: __webpack_require__(143)});

	__webpack_require__(26)('copyWithin');

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	var $export = __webpack_require__(1);

	$export($export.P, 'Array', {fill: __webpack_require__(144)});

	__webpack_require__(26)('fill');

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	var $export = __webpack_require__(1)
	  , $find   = __webpack_require__(40)(6)
	  , KEY     = 'findIndex'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(26)(KEY);

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	var $export = __webpack_require__(1)
	  , $find   = __webpack_require__(40)(5)
	  , KEY     = 'find'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  find: function find(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(26)(KEY);

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx         = __webpack_require__(16)
	  , $export     = __webpack_require__(1)
	  , toObject    = __webpack_require__(21)
	  , call        = __webpack_require__(98)
	  , isArrayIter = __webpack_require__(95)
	  , toLength    = __webpack_require__(11)
	  , getIterFn   = __webpack_require__(109);
	$export($export.S + $export.F * !__webpack_require__(63)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , $$      = arguments
	      , $$len   = $$.length
	      , mapfn   = $$len > 1 ? $$[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        result[index] = mapping ? mapfn(O[index], index) : O[index];
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(1);

	// WebKit Array.of isn't generic
	$export($export.S + $export.F * __webpack_require__(8)(function(){
	  function F(){}
	  return !(Array.of.call(F) instanceof F);
	}), 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of(/* ...args */){
	    var index  = 0
	      , $$     = arguments
	      , $$len  = $$.length
	      , result = new (typeof this == 'function' ? this : Array)($$len);
	    while($$len > index)result[index] = $$[index++];
	    result.length = $$len;
	    return result;
	  }
	});

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(47)('Array');

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $             = __webpack_require__(2)
	  , isObject      = __webpack_require__(3)
	  , HAS_INSTANCE  = __webpack_require__(5)('hasInstance')
	  , FunctionProto = Function.prototype;
	// 19.2.3.6 Function.prototype[@@hasInstance](V)
	if(!(HAS_INSTANCE in FunctionProto))$.setDesc(FunctionProto, HAS_INSTANCE, {value: function(O){
	  if(typeof this != 'function' || !isObject(O))return false;
	  if(!isObject(this.prototype))return O instanceof this;
	  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
	  while(O = $.getProto(O))if(this.prototype === O)return true;
	  return false;
	}});

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var setDesc    = __webpack_require__(2).setDesc
	  , createDesc = __webpack_require__(23)
	  , has        = __webpack_require__(10)
	  , FProto     = Function.prototype
	  , nameRE     = /^\s*function ([^ (]*)/
	  , NAME       = 'name';
	// 19.2.4.2 name
	NAME in FProto || __webpack_require__(12) && setDesc(FProto, NAME, {
	  configurable: true,
	  get: function(){
	    var match = ('' + this).match(nameRE)
	      , name  = match ? match[1] : '';
	    has(this, NAME) || setDesc(this, NAME, createDesc(5, name));
	    return name;
	  }
	});

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(88);

	// 23.1 Map Objects
	__webpack_require__(42)('Map', function(get){
	  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.3 Math.acosh(x)
	var $export = __webpack_require__(1)
	  , log1p   = __webpack_require__(101)
	  , sqrt    = Math.sqrt
	  , $acosh  = Math.acosh;

	// V8 bug https://code.google.com/p/v8/issues/detail?id=3509
	$export($export.S + $export.F * !($acosh && Math.floor($acosh(Number.MAX_VALUE)) == 710), 'Math', {
	  acosh: function acosh(x){
	    return (x = +x) < 1 ? NaN : x > 94906265.62425156
	      ? Math.log(x) + Math.LN2
	      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	  }
	});

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.5 Math.asinh(x)
	var $export = __webpack_require__(1);

	function asinh(x){
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	}

	$export($export.S, 'Math', {asinh: asinh});

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.7 Math.atanh(x)
	var $export = __webpack_require__(1);

	$export($export.S, 'Math', {
	  atanh: function atanh(x){
	    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	  }
	});

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.9 Math.cbrt(x)
	var $export = __webpack_require__(1)
	  , sign    = __webpack_require__(66);

	$export($export.S, 'Math', {
	  cbrt: function cbrt(x){
	    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	  }
	});

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.11 Math.clz32(x)
	var $export = __webpack_require__(1);

	$export($export.S, 'Math', {
	  clz32: function clz32(x){
	    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	  }
	});

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.12 Math.cosh(x)
	var $export = __webpack_require__(1)
	  , exp     = Math.exp;

	$export($export.S, 'Math', {
	  cosh: function cosh(x){
	    return (exp(x = +x) + exp(-x)) / 2;
	  }
	});

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.14 Math.expm1(x)
	var $export = __webpack_require__(1);

	$export($export.S, 'Math', {expm1: __webpack_require__(65)});

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.16 Math.fround(x)
	var $export   = __webpack_require__(1)
	  , sign      = __webpack_require__(66)
	  , pow       = Math.pow
	  , EPSILON   = pow(2, -52)
	  , EPSILON32 = pow(2, -23)
	  , MAX32     = pow(2, 127) * (2 - EPSILON32)
	  , MIN32     = pow(2, -126);

	var roundTiesToEven = function(n){
	  return n + 1 / EPSILON - 1 / EPSILON;
	};


	$export($export.S, 'Math', {
	  fround: function fround(x){
	    var $abs  = Math.abs(x)
	      , $sign = sign(x)
	      , a, result;
	    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	    a = (1 + EPSILON32 / EPSILON) * $abs;
	    result = a - (a - $abs);
	    if(result > MAX32 || result != result)return $sign * Infinity;
	    return $sign * result;
	  }
	});

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	var $export = __webpack_require__(1)
	  , abs     = Math.abs;

	$export($export.S, 'Math', {
	  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
	    var sum   = 0
	      , i     = 0
	      , $$    = arguments
	      , $$len = $$.length
	      , larg  = 0
	      , arg, div;
	    while(i < $$len){
	      arg = abs($$[i++]);
	      if(larg < arg){
	        div  = larg / arg;
	        sum  = sum * div * div + 1;
	        larg = arg;
	      } else if(arg > 0){
	        div  = arg / larg;
	        sum += div * div;
	      } else sum += arg;
	    }
	    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	  }
	});

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.18 Math.imul(x, y)
	var $export = __webpack_require__(1)
	  , $imul   = Math.imul;

	// some WebKit versions fails with big numbers, some has wrong arity
	$export($export.S + $export.F * __webpack_require__(8)(function(){
	  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	}), 'Math', {
	  imul: function imul(x, y){
	    var UINT16 = 0xffff
	      , xn = +x
	      , yn = +y
	      , xl = UINT16 & xn
	      , yl = UINT16 & yn;
	    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	  }
	});

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.21 Math.log10(x)
	var $export = __webpack_require__(1);

	$export($export.S, 'Math', {
	  log10: function log10(x){
	    return Math.log(x) / Math.LN10;
	  }
	});

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.20 Math.log1p(x)
	var $export = __webpack_require__(1);

	$export($export.S, 'Math', {log1p: __webpack_require__(101)});

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.22 Math.log2(x)
	var $export = __webpack_require__(1);

	$export($export.S, 'Math', {
	  log2: function log2(x){
	    return Math.log(x) / Math.LN2;
	  }
	});

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.28 Math.sign(x)
	var $export = __webpack_require__(1);

	$export($export.S, 'Math', {sign: __webpack_require__(66)});

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.30 Math.sinh(x)
	var $export = __webpack_require__(1)
	  , expm1   = __webpack_require__(65)
	  , exp     = Math.exp;

	// V8 near Chromium 38 has a problem with very small numbers
	$export($export.S + $export.F * __webpack_require__(8)(function(){
	  return !Math.sinh(-2e-17) != -2e-17;
	}), 'Math', {
	  sinh: function sinh(x){
	    return Math.abs(x = +x) < 1
	      ? (expm1(x) - expm1(-x)) / 2
	      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
	  }
	});

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.33 Math.tanh(x)
	var $export = __webpack_require__(1)
	  , expm1   = __webpack_require__(65)
	  , exp     = Math.exp;

	$export($export.S, 'Math', {
	  tanh: function tanh(x){
	    var a = expm1(x = +x)
	      , b = expm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	  }
	});

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.34 Math.trunc(x)
	var $export = __webpack_require__(1);

	$export($export.S, 'Math', {
	  trunc: function trunc(it){
	    return (it > 0 ? Math.floor : Math.ceil)(it);
	  }
	});

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $           = __webpack_require__(2)
	  , global      = __webpack_require__(6)
	  , has         = __webpack_require__(10)
	  , cof         = __webpack_require__(19)
	  , toPrimitive = __webpack_require__(154)
	  , fails       = __webpack_require__(8)
	  , $trim       = __webpack_require__(49).trim
	  , NUMBER      = 'Number'
	  , $Number     = global[NUMBER]
	  , Base        = $Number
	  , proto       = $Number.prototype
	  // Opera ~12 has broken Object#toString
	  , BROKEN_COF  = cof($.create(proto)) == NUMBER
	  , TRIM        = 'trim' in String.prototype;

	// 7.1.3 ToNumber(argument)
	var toNumber = function(argument){
	  var it = toPrimitive(argument, false);
	  if(typeof it == 'string' && it.length > 2){
	    it = TRIM ? it.trim() : $trim(it, 3);
	    var first = it.charCodeAt(0)
	      , third, radix, maxCode;
	    if(first === 43 || first === 45){
	      third = it.charCodeAt(2);
	      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if(first === 48){
	      switch(it.charCodeAt(1)){
	        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
	        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
	        default : return +it;
	      }
	      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
	        code = digits.charCodeAt(i);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if(code < 48 || code > maxCode)return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
	  $Number = function Number(value){
	    var it = arguments.length < 1 ? 0 : value
	      , that = this;
	    return that instanceof $Number
	      // check on 1..constructor(foo) case
	      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
	        ? new Base(toNumber(it)) : toNumber(it);
	  };
	  $.each.call(__webpack_require__(12) ? $.getNames(Base) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), function(key){
	    if(has(Base, key) && !has($Number, key)){
	      $.setDesc($Number, key, $.getDesc(Base, key));
	    }
	  });
	  $Number.prototype = proto;
	  proto.constructor = $Number;
	  __webpack_require__(14)(global, NUMBER, $Number);
	}

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.1 Number.EPSILON
	var $export = __webpack_require__(1);

	$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.2 Number.isFinite(number)
	var $export   = __webpack_require__(1)
	  , _isFinite = __webpack_require__(6).isFinite;

	$export($export.S, 'Number', {
	  isFinite: function isFinite(it){
	    return typeof it == 'number' && _isFinite(it);
	  }
	});

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var $export = __webpack_require__(1);

	$export($export.S, 'Number', {isInteger: __webpack_require__(96)});

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.4 Number.isNaN(number)
	var $export = __webpack_require__(1);

	$export($export.S, 'Number', {
	  isNaN: function isNaN(number){
	    return number != number;
	  }
	});

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.5 Number.isSafeInteger(number)
	var $export   = __webpack_require__(1)
	  , isInteger = __webpack_require__(96)
	  , abs       = Math.abs;

	$export($export.S, 'Number', {
	  isSafeInteger: function isSafeInteger(number){
	    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
	  }
	});

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.6 Number.MAX_SAFE_INTEGER
	var $export = __webpack_require__(1);

	$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.10 Number.MIN_SAFE_INTEGER
	var $export = __webpack_require__(1);

	$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.12 Number.parseFloat(string)
	var $export = __webpack_require__(1);

	$export($export.S, 'Number', {parseFloat: parseFloat});

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.13 Number.parseInt(string, radix)
	var $export = __webpack_require__(1);

	$export($export.S, 'Number', {parseInt: parseInt});

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(1);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(149)});

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.5 Object.freeze(O)
	var isObject = __webpack_require__(3);

	__webpack_require__(13)('freeze', function($freeze){
	  return function freeze(it){
	    return $freeze && isObject(it) ? $freeze(it) : it;
	  };
	});

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject = __webpack_require__(15);

	__webpack_require__(13)('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	__webpack_require__(13)('getOwnPropertyNames', function(){
	  return __webpack_require__(93).get;
	});

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(21);

	__webpack_require__(13)('getPrototypeOf', function($getPrototypeOf){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.11 Object.isExtensible(O)
	var isObject = __webpack_require__(3);

	__webpack_require__(13)('isExtensible', function($isExtensible){
	  return function isExtensible(it){
	    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.12 Object.isFrozen(O)
	var isObject = __webpack_require__(3);

	__webpack_require__(13)('isFrozen', function($isFrozen){
	  return function isFrozen(it){
	    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
	  };
	});

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.13 Object.isSealed(O)
	var isObject = __webpack_require__(3);

	__webpack_require__(13)('isSealed', function($isSealed){
	  return function isSealed(it){
	    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
	  };
	});

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.10 Object.is(value1, value2)
	var $export = __webpack_require__(1);
	$export($export.S, 'Object', {is: __webpack_require__(104)});

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(21);

	__webpack_require__(13)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.15 Object.preventExtensions(O)
	var isObject = __webpack_require__(3);

	__webpack_require__(13)('preventExtensions', function($preventExtensions){
	  return function preventExtensions(it){
	    return $preventExtensions && isObject(it) ? $preventExtensions(it) : it;
	  };
	});

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.17 Object.seal(O)
	var isObject = __webpack_require__(3);

	__webpack_require__(13)('seal', function($seal){
	  return function seal(it){
	    return $seal && isObject(it) ? $seal(it) : it;
	  };
	});

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(1);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(67).set});

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var classof = __webpack_require__(41)
	  , test    = {};
	test[__webpack_require__(5)('toStringTag')] = 'z';
	if(test + '' != '[object z]'){
	  __webpack_require__(14)(Object.prototype, 'toString', function toString(){
	    return '[object ' + classof(this) + ']';
	  }, true);
	}

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $          = __webpack_require__(2)
	  , LIBRARY    = __webpack_require__(64)
	  , global     = __webpack_require__(6)
	  , ctx        = __webpack_require__(16)
	  , classof    = __webpack_require__(41)
	  , $export    = __webpack_require__(1)
	  , isObject   = __webpack_require__(3)
	  , anObject   = __webpack_require__(4)
	  , aFunction  = __webpack_require__(25)
	  , strictNew  = __webpack_require__(48)
	  , forOf      = __webpack_require__(32)
	  , setProto   = __webpack_require__(67).set
	  , same       = __webpack_require__(104)
	  , SPECIES    = __webpack_require__(5)('species')
	  , speciesConstructor = __webpack_require__(153)
	  , asap       = __webpack_require__(148)
	  , PROMISE    = 'Promise'
	  , process    = global.process
	  , isNode     = classof(process) == 'process'
	  , P          = global[PROMISE]
	  , Wrapper;

	var testResolve = function(sub){
	  var test = new P(function(){});
	  if(sub)test.constructor = Object;
	  return P.resolve(test) === test;
	};

	var USE_NATIVE = function(){
	  var works = false;
	  function P2(x){
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
	  try {
	    works = P && P.resolve && testResolve();
	    setProto(P2, P);
	    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
	    // actual Firefox has broken subclass support, test that
	    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
	      works = false;
	    }
	    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
	    if(works && __webpack_require__(12)){
	      var thenableThenGotten = false;
	      P.resolve($.setDesc({}, 'then', {
	        get: function(){ thenableThenGotten = true; }
	      }));
	      works = thenableThenGotten;
	    }
	  } catch(e){ works = false; }
	  return works;
	}();

	// helpers
	var sameConstructor = function(a, b){
	  // library wrapper special case
	  if(LIBRARY && a === P && b === Wrapper)return true;
	  return same(a, b);
	};
	var getConstructor = function(C){
	  var S = anObject(C)[SPECIES];
	  return S != undefined ? S : C;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var PromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve),
	  this.reject  = aFunction(reject)
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(record, isReject){
	  if(record.n)return;
	  record.n = true;
	  var chain = record.c;
	  asap(function(){
	    var value = record.v
	      , ok    = record.s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , result, then;
	      try {
	        if(handler){
	          if(!ok)record.h = true;
	          result = handler === true ? value : handler(value);
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    chain.length = 0;
	    record.n = false;
	    if(isReject)setTimeout(function(){
	      var promise = record.p
	        , handler, console;
	      if(isUnhandled(promise)){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      } record.a = undefined;
	    }, 1);
	  });
	};
	var isUnhandled = function(promise){
	  var record = promise._d
	    , chain  = record.a || record.c
	    , i      = 0
	    , reaction;
	  if(record.h)return false;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var $reject = function(value){
	  var record = this;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  record.v = value;
	  record.s = 2;
	  record.a = record.c.slice();
	  notify(record, true);
	};
	var $resolve = function(value){
	  var record = this
	    , then;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  try {
	    if(record.p === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      asap(function(){
	        var wrapper = {r: record, d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      record.v = value;
	      record.s = 1;
	      notify(record, false);
	    }
	  } catch(e){
	    $reject.call({r: record, d: false}, e); // wrap
	  }
	};

	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  P = function Promise(executor){
	    aFunction(executor);
	    var record = this._d = {
	      p: strictNew(this, P, PROMISE),         // <- promise
	      c: [],                                  // <- awaiting reactions
	      a: undefined,                           // <- checked in isUnhandled reactions
	      s: 0,                                   // <- state
	      d: false,                               // <- done
	      v: undefined,                           // <- value
	      h: false,                               // <- handled rejection
	      n: false                                // <- notify
	    };
	    try {
	      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
	    } catch(err){
	      $reject.call(record, err);
	    }
	  };
	  __webpack_require__(46)(P.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction = new PromiseCapability(speciesConstructor(this, P))
	        , promise  = reaction.promise
	        , record   = this._d;
	      reaction.ok   = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      record.c.push(reaction);
	      if(record.a)record.a.push(reaction);
	      if(record.s)notify(record, false);
	      return promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: P});
	__webpack_require__(34)(P, PROMISE);
	__webpack_require__(47)(PROMISE);
	Wrapper = __webpack_require__(20)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = new PromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof P && sameConstructor(x.constructor, this))return x;
	    var capability = new PromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(63)(function(iter){
	  P.all(iter)['catch'](function(){});
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = getConstructor(this)
	      , capability = new PromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject
	      , values     = [];
	    var abrupt = perform(function(){
	      forOf(iterable, false, values.push, values);
	      var remaining = values.length
	        , results   = Array(remaining);
	      if(remaining)$.each.call(values, function(promise, index){
	        var alreadyCalled = false;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled = true;
	          results[index] = value;
	          --remaining || resolve(results);
	        }, reject);
	      });
	      else resolve(results);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = getConstructor(this)
	      , capability = new PromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	var $export = __webpack_require__(1)
	  , _apply  = Function.apply;

	$export($export.S, 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList){
	    return _apply.call(target, thisArgument, argumentsList);
	  }
	});

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	var $         = __webpack_require__(2)
	  , $export   = __webpack_require__(1)
	  , aFunction = __webpack_require__(25)
	  , anObject  = __webpack_require__(4)
	  , isObject  = __webpack_require__(3)
	  , bind      = Function.bind || __webpack_require__(20).Function.prototype.bind;

	// MS Edge supports only 2 arguments
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	$export($export.S + $export.F * __webpack_require__(8)(function(){
	  function F(){}
	  return !(Reflect.construct(function(){}, [], F) instanceof F);
	}), 'Reflect', {
	  construct: function construct(Target, args /*, newTarget*/){
	    aFunction(Target);
	    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
	    if(Target == newTarget){
	      // w/o altered newTarget, optimization for 0-4 arguments
	      if(args != undefined)switch(anObject(args).length){
	        case 0: return new Target;
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (bind.apply(Target, $args));
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto    = newTarget.prototype
	      , instance = $.create(isObject(proto) ? proto : Object.prototype)
	      , result   = Function.apply.call(Target, instance, args);
	    return isObject(result) ? result : instance;
	  }
	});

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	var $        = __webpack_require__(2)
	  , $export  = __webpack_require__(1)
	  , anObject = __webpack_require__(4);

	// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	$export($export.S + $export.F * __webpack_require__(8)(function(){
	  Reflect.defineProperty($.setDesc({}, 1, {value: 1}), 1, {value: 2});
	}), 'Reflect', {
	  defineProperty: function defineProperty(target, propertyKey, attributes){
	    anObject(target);
	    try {
	      $.setDesc(target, propertyKey, attributes);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.4 Reflect.deleteProperty(target, propertyKey)
	var $export  = __webpack_require__(1)
	  , getDesc  = __webpack_require__(2).getDesc
	  , anObject = __webpack_require__(4);

	$export($export.S, 'Reflect', {
	  deleteProperty: function deleteProperty(target, propertyKey){
	    var desc = getDesc(anObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  }
	});

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 26.1.5 Reflect.enumerate(target)
	var $export  = __webpack_require__(1)
	  , anObject = __webpack_require__(4);
	var Enumerate = function(iterated){
	  this._t = anObject(iterated); // target
	  this._i = 0;                  // next index
	  var keys = this._k = []       // keys
	    , key;
	  for(key in iterated)keys.push(key);
	};
	__webpack_require__(99)(Enumerate, 'Object', function(){
	  var that = this
	    , keys = that._k
	    , key;
	  do {
	    if(that._i >= keys.length)return {value: undefined, done: true};
	  } while(!((key = keys[that._i++]) in that._t));
	  return {value: key, done: false};
	});

	$export($export.S, 'Reflect', {
	  enumerate: function enumerate(target){
	    return new Enumerate(target);
	  }
	});

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	var $        = __webpack_require__(2)
	  , $export  = __webpack_require__(1)
	  , anObject = __webpack_require__(4);

	$export($export.S, 'Reflect', {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
	    return $.getDesc(anObject(target), propertyKey);
	  }
	});

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.8 Reflect.getPrototypeOf(target)
	var $export  = __webpack_require__(1)
	  , getProto = __webpack_require__(2).getProto
	  , anObject = __webpack_require__(4);

	$export($export.S, 'Reflect', {
	  getPrototypeOf: function getPrototypeOf(target){
	    return getProto(anObject(target));
	  }
	});

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.6 Reflect.get(target, propertyKey [, receiver])
	var $        = __webpack_require__(2)
	  , has      = __webpack_require__(10)
	  , $export  = __webpack_require__(1)
	  , isObject = __webpack_require__(3)
	  , anObject = __webpack_require__(4);

	function get(target, propertyKey/*, receiver*/){
	  var receiver = arguments.length < 3 ? target : arguments[2]
	    , desc, proto;
	  if(anObject(target) === receiver)return target[propertyKey];
	  if(desc = $.getDesc(target, propertyKey))return has(desc, 'value')
	    ? desc.value
	    : desc.get !== undefined
	      ? desc.get.call(receiver)
	      : undefined;
	  if(isObject(proto = $.getProto(target)))return get(proto, propertyKey, receiver);
	}

	$export($export.S, 'Reflect', {get: get});

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.9 Reflect.has(target, propertyKey)
	var $export = __webpack_require__(1);

	$export($export.S, 'Reflect', {
	  has: function has(target, propertyKey){
	    return propertyKey in target;
	  }
	});

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.10 Reflect.isExtensible(target)
	var $export       = __webpack_require__(1)
	  , anObject      = __webpack_require__(4)
	  , $isExtensible = Object.isExtensible;

	$export($export.S, 'Reflect', {
	  isExtensible: function isExtensible(target){
	    anObject(target);
	    return $isExtensible ? $isExtensible(target) : true;
	  }
	});

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.11 Reflect.ownKeys(target)
	var $export = __webpack_require__(1);

	$export($export.S, 'Reflect', {ownKeys: __webpack_require__(103)});

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.12 Reflect.preventExtensions(target)
	var $export            = __webpack_require__(1)
	  , anObject           = __webpack_require__(4)
	  , $preventExtensions = Object.preventExtensions;

	$export($export.S, 'Reflect', {
	  preventExtensions: function preventExtensions(target){
	    anObject(target);
	    try {
	      if($preventExtensions)$preventExtensions(target);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.14 Reflect.setPrototypeOf(target, proto)
	var $export  = __webpack_require__(1)
	  , setProto = __webpack_require__(67);

	if(setProto)$export($export.S, 'Reflect', {
	  setPrototypeOf: function setPrototypeOf(target, proto){
	    setProto.check(target, proto);
	    try {
	      setProto.set(target, proto);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	var $          = __webpack_require__(2)
	  , has        = __webpack_require__(10)
	  , $export    = __webpack_require__(1)
	  , createDesc = __webpack_require__(23)
	  , anObject   = __webpack_require__(4)
	  , isObject   = __webpack_require__(3);

	function set(target, propertyKey, V/*, receiver*/){
	  var receiver = arguments.length < 4 ? target : arguments[3]
	    , ownDesc  = $.getDesc(anObject(target), propertyKey)
	    , existingDescriptor, proto;
	  if(!ownDesc){
	    if(isObject(proto = $.getProto(target))){
	      return set(proto, propertyKey, V, receiver);
	    }
	    ownDesc = createDesc(0);
	  }
	  if(has(ownDesc, 'value')){
	    if(ownDesc.writable === false || !isObject(receiver))return false;
	    existingDescriptor = $.getDesc(receiver, propertyKey) || createDesc(0);
	    existingDescriptor.value = V;
	    $.setDesc(receiver, propertyKey, existingDescriptor);
	    return true;
	  }
	  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}

	$export($export.S, 'Reflect', {set: set});

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(2)
	  , global   = __webpack_require__(6)
	  , isRegExp = __webpack_require__(97)
	  , $flags   = __webpack_require__(92)
	  , $RegExp  = global.RegExp
	  , Base     = $RegExp
	  , proto    = $RegExp.prototype
	  , re1      = /a/g
	  , re2      = /a/g
	  // "new" creates a new object, old webkit buggy here
	  , CORRECT_NEW = new $RegExp(re1) !== re1;

	if(__webpack_require__(12) && (!CORRECT_NEW || __webpack_require__(8)(function(){
	  re2[__webpack_require__(5)('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))){
	  $RegExp = function RegExp(p, f){
	    var piRE = isRegExp(p)
	      , fiU  = f === undefined;
	    return !(this instanceof $RegExp) && piRE && p.constructor === $RegExp && fiU ? p
	      : CORRECT_NEW
	        ? new Base(piRE && !fiU ? p.source : p, f)
	        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f);
	  };
	  $.each.call($.getNames(Base), function(key){
	    key in $RegExp || $.setDesc($RegExp, key, {
	      configurable: true,
	      get: function(){ return Base[key]; },
	      set: function(it){ Base[key] = it; }
	    });
	  });
	  proto.constructor = $RegExp;
	  $RegExp.prototype = proto;
	  __webpack_require__(14)(global, 'RegExp', $RegExp);
	}

	__webpack_require__(47)('RegExp');

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	// 21.2.5.3 get RegExp.prototype.flags()
	var $ = __webpack_require__(2);
	if(__webpack_require__(12) && /./g.flags != 'g')$.setDesc(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: __webpack_require__(92)
	});

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	// @@match logic
	__webpack_require__(43)('match', 1, function(defined, MATCH){
	  // 21.1.3.11 String.prototype.match(regexp)
	  return function match(regexp){
	    'use strict';
	    var O  = defined(this)
	      , fn = regexp == undefined ? undefined : regexp[MATCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	  };
	});

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	// @@replace logic
	__webpack_require__(43)('replace', 2, function(defined, REPLACE, $replace){
	  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
	  return function replace(searchValue, replaceValue){
	    'use strict';
	    var O  = defined(this)
	      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	    return fn !== undefined
	      ? fn.call(searchValue, O, replaceValue)
	      : $replace.call(String(O), searchValue, replaceValue);
	  };
	});

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	// @@search logic
	__webpack_require__(43)('search', 1, function(defined, SEARCH){
	  // 21.1.3.15 String.prototype.search(regexp)
	  return function search(regexp){
	    'use strict';
	    var O  = defined(this)
	      , fn = regexp == undefined ? undefined : regexp[SEARCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	  };
	});

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	// @@split logic
	__webpack_require__(43)('split', 2, function(defined, SPLIT, $split){
	  // 21.1.3.17 String.prototype.split(separator, limit)
	  return function split(separator, limit){
	    'use strict';
	    var O  = defined(this)
	      , fn = separator == undefined ? undefined : separator[SPLIT];
	    return fn !== undefined
	      ? fn.call(separator, O, limit)
	      : $split.call(String(O), separator, limit);
	  };
	});

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(88);

	// 23.2 Set Objects
	__webpack_require__(42)('Set', function(get){
	  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(1)
	  , $at     = __webpack_require__(68)(false);
	$export($export.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
	'use strict';
	var $export   = __webpack_require__(1)
	  , toLength  = __webpack_require__(11)
	  , context   = __webpack_require__(69)
	  , ENDS_WITH = 'endsWith'
	  , $endsWith = ''[ENDS_WITH];

	$export($export.P + $export.F * __webpack_require__(60)(ENDS_WITH), 'String', {
	  endsWith: function endsWith(searchString /*, endPosition = @length */){
	    var that = context(this, searchString, ENDS_WITH)
	      , $$   = arguments
	      , endPosition = $$.length > 1 ? $$[1] : undefined
	      , len    = toLength(that.length)
	      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
	      , search = String(searchString);
	    return $endsWith
	      ? $endsWith.call(that, search, end)
	      : that.slice(end - search.length, end) === search;
	  }
	});

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	var $export        = __webpack_require__(1)
	  , toIndex        = __webpack_require__(35)
	  , fromCharCode   = String.fromCharCode
	  , $fromCodePoint = String.fromCodePoint;

	// length should be 1, old FF problem
	$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
	    var res   = []
	      , $$    = arguments
	      , $$len = $$.length
	      , i     = 0
	      , code;
	    while($$len > i){
	      code = +$$[i++];
	      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000
	        ? fromCharCode(code)
	        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	      );
	    } return res.join('');
	  }
	});

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.7 String.prototype.includes(searchString, position = 0)
	'use strict';
	var $export  = __webpack_require__(1)
	  , context  = __webpack_require__(69)
	  , INCLUDES = 'includes';

	$export($export.P + $export.F * __webpack_require__(60)(INCLUDES), 'String', {
	  includes: function includes(searchString /*, position = 0 */){
	    return !!~context(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(68)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(62)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	var $export   = __webpack_require__(1)
	  , toIObject = __webpack_require__(15)
	  , toLength  = __webpack_require__(11);

	$export($export.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite){
	    var tpl   = toIObject(callSite.raw)
	      , len   = toLength(tpl.length)
	      , $$    = arguments
	      , $$len = $$.length
	      , res   = []
	      , i     = 0;
	    while(len > i){
	      res.push(String(tpl[i++]));
	      if(i < $$len)res.push(String($$[i]));
	    } return res.join('');
	  }
	});

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(1);

	$export($export.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: __webpack_require__(107)
	});

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
	'use strict';
	var $export     = __webpack_require__(1)
	  , toLength    = __webpack_require__(11)
	  , context     = __webpack_require__(69)
	  , STARTS_WITH = 'startsWith'
	  , $startsWith = ''[STARTS_WITH];

	$export($export.P + $export.F * __webpack_require__(60)(STARTS_WITH), 'String', {
	  startsWith: function startsWith(searchString /*, position = 0 */){
	    var that   = context(this, searchString, STARTS_WITH)
	      , $$     = arguments
	      , index  = toLength(Math.min($$.length > 1 ? $$[1] : undefined, that.length))
	      , search = String(searchString);
	    return $startsWith
	      ? $startsWith.call(that, search, index)
	      : that.slice(index, index + search.length) === search;
	  }
	});

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.1.3.25 String.prototype.trim()
	__webpack_require__(49)('trim', function($trim){
	  return function trim(){
	    return $trim(this, 3);
	  };
	});

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(2)
	  , global         = __webpack_require__(6)
	  , has            = __webpack_require__(10)
	  , DESCRIPTORS    = __webpack_require__(12)
	  , $export        = __webpack_require__(1)
	  , redefine       = __webpack_require__(14)
	  , $fails         = __webpack_require__(8)
	  , shared         = __webpack_require__(105)
	  , setToStringTag = __webpack_require__(34)
	  , uid            = __webpack_require__(27)
	  , wks            = __webpack_require__(5)
	  , keyOf          = __webpack_require__(147)
	  , $names         = __webpack_require__(93)
	  , enumKeys       = __webpack_require__(146)
	  , isArray        = __webpack_require__(61)
	  , anObject       = __webpack_require__(4)
	  , toIObject      = __webpack_require__(15)
	  , createDesc     = __webpack_require__(23)
	  , getDesc        = $.getDesc
	  , setDesc        = $.setDesc
	  , _create        = $.create
	  , getNames       = $names.get
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , HIDDEN         = wks('_hidden')
	  , isEnum         = $.isEnum
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , useNative      = typeof $Symbol == 'function'
	  , ObjectProto    = Object.prototype;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(setDesc({}, 'a', {
	    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = getDesc(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  setDesc(it, key, D);
	  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	} : setDesc;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};

	var isSymbol = function(it){
	  return typeof it == 'symbol';
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toIObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	  var args = [it]
	    , i    = 1
	    , $$   = arguments
	    , replacer, $replacer;
	  while($$.length > i)args.push($$[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var buggyJSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});

	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  redefine($Symbol.prototype, 'toString', function toString(){
	    return this._k;
	  });

	  isSymbol = function(it){
	    return it instanceof $Symbol;
	  };

	  $.create     = $create;
	  $.isEnum     = $propertyIsEnumerable;
	  $.getDesc    = $getOwnPropertyDescriptor;
	  $.setDesc    = $defineProperty;
	  $.setDescs   = $defineProperties;
	  $.getNames   = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(64)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}

	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	  'species,split,toPrimitive,toStringTag,unscopables'
	).split(','), function(it){
	  var sym = wks(it);
	  symbolStatics[it] = useNative ? sym : wrap(sym);
	});

	setter = true;

	$export($export.G + $export.W, {Symbol: $Symbol});

	$export($export.S, 'Symbol', symbolStatics);

	$export($export.S + $export.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});

	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $            = __webpack_require__(2)
	  , redefine     = __webpack_require__(14)
	  , weak         = __webpack_require__(90)
	  , isObject     = __webpack_require__(3)
	  , has          = __webpack_require__(10)
	  , frozenStore  = weak.frozenStore
	  , WEAK         = weak.WEAK
	  , isExtensible = Object.isExtensible || isObject
	  , tmp          = {};

	// 23.3 WeakMap Objects
	var $WeakMap = __webpack_require__(42)('WeakMap', function(get){
	  return function WeakMap(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key){
	    if(isObject(key)){
	      if(!isExtensible(key))return frozenStore(this).get(key);
	      if(has(key, WEAK))return key[WEAK][this._i];
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value){
	    return weak.def(this, key, value);
	  }
	}, weak, true, true);

	// IE11 WeakMap frozen keys fix
	if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
	  $.each.call(['delete', 'has', 'get', 'set'], function(key){
	    var proto  = $WeakMap.prototype
	      , method = proto[key];
	    redefine(proto, key, function(a, b){
	      // store frozen objects on leaky map
	      if(isObject(a) && !isExtensible(a)){
	        var result = frozenStore(this)[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var weak = __webpack_require__(90);

	// 23.4 WeakSet Objects
	__webpack_require__(42)('WeakSet', function(get){
	  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value){
	    return weak.def(this, value, true);
	  }
	}, weak, false, true);

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export   = __webpack_require__(1)
	  , $includes = __webpack_require__(87)(true);

	$export($export.P, 'Array', {
	  // https://github.com/domenic/Array.prototype.includes
	  includes: function includes(el /*, fromIndex = 0 */){
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	__webpack_require__(26)('includes');

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(1);

	$export($export.P, 'Map', {toJSON: __webpack_require__(89)('Map')});

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	// http://goo.gl/XkBrjD
	var $export  = __webpack_require__(1)
	  , $entries = __webpack_require__(102)(true);

	$export($export.S, 'Object', {
	  entries: function entries(it){
	    return $entries(it);
	  }
	});

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/WebReflection/9353781
	var $          = __webpack_require__(2)
	  , $export    = __webpack_require__(1)
	  , ownKeys    = __webpack_require__(103)
	  , toIObject  = __webpack_require__(15)
	  , createDesc = __webpack_require__(23);

	$export($export.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
	    var O       = toIObject(object)
	      , setDesc = $.setDesc
	      , getDesc = $.getDesc
	      , keys    = ownKeys(O)
	      , result  = {}
	      , i       = 0
	      , key, D;
	    while(keys.length > i){
	      D = getDesc(O, key = keys[i++]);
	      if(key in result)setDesc(result, key, createDesc(0, D));
	      else result[key] = D;
	    } return result;
	  }
	});

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	// http://goo.gl/XkBrjD
	var $export = __webpack_require__(1)
	  , $values = __webpack_require__(102)(false);

	$export($export.S, 'Object', {
	  values: function values(it){
	    return $values(it);
	  }
	});

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/benjamingr/RexExp.escape
	var $export = __webpack_require__(1)
	  , $re     = __webpack_require__(152)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

	$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});


/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(1);

	$export($export.P, 'Set', {toJSON: __webpack_require__(89)('Set')});

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/mathiasbynens/String.prototype.at
	var $export = __webpack_require__(1)
	  , $at     = __webpack_require__(68)(true);

	$export($export.P, 'String', {
	  at: function at(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(1)
	  , $pad    = __webpack_require__(106);

	$export($export.P, 'String', {
	  padLeft: function padLeft(maxLength /*, fillString = ' ' */){
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
	  }
	});

/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(1)
	  , $pad    = __webpack_require__(106);

	$export($export.P, 'String', {
	  padRight: function padRight(maxLength /*, fillString = ' ' */){
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
	  }
	});

/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	__webpack_require__(49)('trimLeft', function($trim){
	  return function trimLeft(){
	    return $trim(this, 1);
	  };
	});

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	__webpack_require__(49)('trimRight', function($trim){
	  return function trimRight(){
	    return $trim(this, 2);
	  };
	});

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	// JavaScript 1.6 / Strawman array statics shim
	var $       = __webpack_require__(2)
	  , $export = __webpack_require__(1)
	  , $ctx    = __webpack_require__(16)
	  , $Array  = __webpack_require__(20).Array || Array
	  , statics = {};
	var setStatics = function(keys, length){
	  $.each.call(keys.split(','), function(key){
	    if(length == undefined && key in $Array)statics[key] = $Array[key];
	    else if(key in [])statics[key] = $ctx(Function.call, [][key], length);
	  });
	};
	setStatics('pop,reverse,shift,keys,values,entries', 1);
	setStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
	setStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' +
	           'reduce,reduceRight,copyWithin,fill');
	$export($export.S, 'Array', statics);

/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(110);
	var global      = __webpack_require__(6)
	  , hide        = __webpack_require__(18)
	  , Iterators   = __webpack_require__(33)
	  , ITERATOR    = __webpack_require__(5)('iterator')
	  , NL          = global.NodeList
	  , HTC         = global.HTMLCollection
	  , NLProto     = NL && NL.prototype
	  , HTCProto    = HTC && HTC.prototype
	  , ArrayValues = Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
	if(NLProto && !NLProto[ITERATOR])hide(NLProto, ITERATOR, ArrayValues);
	if(HTCProto && !HTCProto[ITERATOR])hide(HTCProto, ITERATOR, ArrayValues);

/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(1)
	  , $task   = __webpack_require__(108);
	$export($export.G + $export.B, {
	  setImmediate:   $task.set,
	  clearImmediate: $task.clear
	});

/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	// ie9- setTimeout & setInterval additional parameters fix
	var global     = __webpack_require__(6)
	  , $export    = __webpack_require__(1)
	  , invoke     = __webpack_require__(44)
	  , partial    = __webpack_require__(150)
	  , navigator  = global.navigator
	  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
	var wrap = function(set){
	  return MSIE ? function(fn, time /*, ...args */){
	    return set(invoke(
	      partial,
	      [].slice.call(arguments, 2),
	      typeof fn == 'function' ? fn : Function(fn)
	    ), time);
	  } : set;
	};
	$export($export.G + $export.B + $export.F * MSIE, {
	  setTimeout:  wrap(global.setTimeout),
	  setInterval: wrap(global.setInterval)
	});

/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(155);
	__webpack_require__(238);
	__webpack_require__(193);
	__webpack_require__(201);
	__webpack_require__(205);
	__webpack_require__(206);
	__webpack_require__(194);
	__webpack_require__(204);
	__webpack_require__(203);
	__webpack_require__(199);
	__webpack_require__(200);
	__webpack_require__(198);
	__webpack_require__(195);
	__webpack_require__(197);
	__webpack_require__(202);
	__webpack_require__(196);
	__webpack_require__(164);
	__webpack_require__(163);
	__webpack_require__(183);
	__webpack_require__(184);
	__webpack_require__(185);
	__webpack_require__(186);
	__webpack_require__(187);
	__webpack_require__(188);
	__webpack_require__(189);
	__webpack_require__(190);
	__webpack_require__(191);
	__webpack_require__(192);
	__webpack_require__(166);
	__webpack_require__(167);
	__webpack_require__(168);
	__webpack_require__(169);
	__webpack_require__(170);
	__webpack_require__(171);
	__webpack_require__(172);
	__webpack_require__(173);
	__webpack_require__(174);
	__webpack_require__(175);
	__webpack_require__(176);
	__webpack_require__(177);
	__webpack_require__(178);
	__webpack_require__(179);
	__webpack_require__(180);
	__webpack_require__(181);
	__webpack_require__(182);
	__webpack_require__(231);
	__webpack_require__(234);
	__webpack_require__(237);
	__webpack_require__(233);
	__webpack_require__(229);
	__webpack_require__(230);
	__webpack_require__(232);
	__webpack_require__(235);
	__webpack_require__(236);
	__webpack_require__(160);
	__webpack_require__(161);
	__webpack_require__(110);
	__webpack_require__(162);
	__webpack_require__(156);
	__webpack_require__(157);
	__webpack_require__(159);
	__webpack_require__(158);
	__webpack_require__(222);
	__webpack_require__(223);
	__webpack_require__(224);
	__webpack_require__(225);
	__webpack_require__(226);
	__webpack_require__(227);
	__webpack_require__(207);
	__webpack_require__(165);
	__webpack_require__(228);
	__webpack_require__(239);
	__webpack_require__(240);
	__webpack_require__(208);
	__webpack_require__(209);
	__webpack_require__(210);
	__webpack_require__(211);
	__webpack_require__(212);
	__webpack_require__(215);
	__webpack_require__(213);
	__webpack_require__(214);
	__webpack_require__(216);
	__webpack_require__(217);
	__webpack_require__(218);
	__webpack_require__(219);
	__webpack_require__(221);
	__webpack_require__(220);
	__webpack_require__(241);
	__webpack_require__(248);
	__webpack_require__(249);
	__webpack_require__(250);
	__webpack_require__(251);
	__webpack_require__(252);
	__webpack_require__(246);
	__webpack_require__(244);
	__webpack_require__(245);
	__webpack_require__(243);
	__webpack_require__(242);
	__webpack_require__(247);
	__webpack_require__(253);
	__webpack_require__(256);
	__webpack_require__(255);
	__webpack_require__(254);
	module.exports = __webpack_require__(20);

/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	var Base64 = __webpack_require__(261);

	function b64DecodeUnicode(str) {
	  return decodeURIComponent(atob(str).replace(/(.)/g, function (m, p) {
	    var code = p.charCodeAt(0).toString(16).toUpperCase();
	    if (code.length < 2) {
	      code = '0' + code;
	    }
	    return '%' + code;
	  }));
	}

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

	  try{
	    return b64DecodeUnicode(output);
	  } catch (err) {
	    return Base64.atob(output);
	  }
	};


/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var base64_url_decode = __webpack_require__(258);
	var json_parse = __webpack_require__(260);

	module.exports = function (token) {
	  if (!token) {
	    throw new Error('Invalid token specified');
	  }
	  
	  return json_parse(base64_url_decode(token.split('.')[1]));
	};


/***/ },
/* 260 */
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
/* 261 */
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
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var nativeCreate = __webpack_require__(56);

	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;

	/**
	 * Creates an hash object.
	 *
	 * @private
	 * @returns {Object} Returns the new hash object.
	 */
	function Hash() {}

	// Avoid inheriting from `Object.prototype` when possible.
	Hash.prototype = nativeCreate ? nativeCreate(null) : objectProto;

	module.exports = Hash;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 263 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Built-in value references. */
	var Reflect = global.Reflect;

	module.exports = Reflect;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var getNative = __webpack_require__(76);

	/* Built-in method references that are verified to be native. */
	var Set = getNative(global, 'Set');

	module.exports = Set;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(111),
	    cachePush = __webpack_require__(300);

	/**
	 *
	 * Creates a set cache object to store unique values.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;

	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.push(values[index]);
	  }
	}

	// Add functions to the `SetCache`.
	SetCache.prototype.push = cachePush;

	module.exports = SetCache;


/***/ },
/* 266 */
/***/ function(module, exports) {

	/**
	 * Adds the key-value `pair` to `map`.
	 *
	 * @private
	 * @param {Object} map The map to modify.
	 * @param {Array} pair The key-value pair to add.
	 * @returns {Object} Returns `map`.
	 */
	function addMapEntry(map, pair) {
	  map.set(pair[0], pair[1]);
	  return map;
	}

	module.exports = addMapEntry;


/***/ },
/* 267 */
/***/ function(module, exports) {

	/**
	 * Adds `value` to `set`.
	 *
	 * @private
	 * @param {Object} set The set to modify.
	 * @param {*} value The value to add.
	 * @returns {Object} Returns `set`.
	 */
	function addSetEntry(set, value) {
	  set.add(value);
	  return set;
	}

	module.exports = addSetEntry;


/***/ },
/* 268 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {...*} [args] The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  var length = args ? args.length : 0;
	  switch (length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	module.exports = apply;


/***/ },
/* 269 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.every` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if all elements pass the predicate check, else `false`.
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
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(122);

	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  return !!array.length && baseIndexOf(array, value, 0) > -1;
	}

	module.exports = arrayIncludes;


/***/ },
/* 271 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.includesWith` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} target The value to search for.
	 * @param {Function} comparator The comparator invoked per element.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludesWith(array, value, comparator) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (comparator(value, array[index])) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arrayIncludesWith;


/***/ },
/* 272 */
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
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(75),
	    keys = __webpack_require__(31);

	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && copyObject(source, keys(source), object);
	}

	module.exports = baseAssign;


/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(50),
	    arrayEach = __webpack_require__(71),
	    assignValue = __webpack_require__(115),
	    baseAssign = __webpack_require__(273),
	    baseForOwn = __webpack_require__(120),
	    copyArray = __webpack_require__(127),
	    copySymbols = __webpack_require__(307),
	    getTag = __webpack_require__(128),
	    initCloneArray = __webpack_require__(321),
	    initCloneByTag = __webpack_require__(322),
	    initCloneObject = __webpack_require__(323),
	    isArray = __webpack_require__(7),
	    isHostObject = __webpack_require__(54),
	    isObject = __webpack_require__(9);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
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

	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] =
	cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
	cloneableTags[dateTag] = cloneableTags[float32Tag] =
	cloneableTags[float64Tag] = cloneableTags[int8Tag] =
	cloneableTags[int16Tag] = cloneableTags[int32Tag] =
	cloneableTags[mapTag] = cloneableTags[numberTag] =
	cloneableTags[objectTag] = cloneableTags[regexpTag] =
	cloneableTags[setTag] = cloneableTags[stringTag] =
	cloneableTags[symbolTag] = cloneableTags[uint8Tag] =
	cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] =
	cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] =
	cloneableTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, isDeep, customizer, key, object, stack) {
	  var result;
	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return copyArray(value, result);
	    }
	  } else {
	    var tag = getTag(value),
	        isFunc = tag == funcTag || tag == genTag;

	    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	      if (isHostObject(value)) {
	        return object ? value : {};
	      }
	      result = initCloneObject(isFunc ? {} : value);
	      if (!isDeep) {
	        return copySymbols(value, baseAssign(result, value));
	      }
	    } else {
	      return cloneableTags[tag]
	        ? initCloneByTag(value, tag, isDeep)
	        : (object ? value : {});
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new Stack);
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);

	  // Recursively populate clone (susceptible to call stack limits).
	  (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
	    assignValue(result, key, baseClone(subValue, isDeep, customizer, key, value, stack));
	  });
	  return isArr ? result : copySymbols(value, result);
	}

	module.exports = baseClone;


/***/ },
/* 275 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(9);

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} prototype The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = (function() {
	  function object() {}
	  return function(prototype) {
	    if (isObject(prototype)) {
	      object.prototype = prototype;
	      var result = new object;
	      object.prototype = undefined;
	    }
	    return result || {};
	  };
	}());

	module.exports = baseCreate;


/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(265),
	    arrayIncludes = __webpack_require__(270),
	    arrayIncludesWith = __webpack_require__(271),
	    arrayMap = __webpack_require__(51),
	    baseUnary = __webpack_require__(297),
	    cacheHas = __webpack_require__(299);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * The base implementation of methods like `_.difference` without support for
	 * excluding multiple arrays or iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Array} values The values to exclude.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new array of filtered values.
	 */
	function baseDifference(array, values, iteratee, comparator) {
	  var index = -1,
	      includes = arrayIncludes,
	      isCommon = true,
	      length = array.length,
	      result = [],
	      valuesLength = values.length;

	  if (!length) {
	    return result;
	  }
	  if (iteratee) {
	    values = arrayMap(values, baseUnary(iteratee));
	  }
	  if (comparator) {
	    includes = arrayIncludesWith;
	    isCommon = false;
	  }
	  else if (values.length >= LARGE_ARRAY_SIZE) {
	    includes = cacheHas;
	    isCommon = false;
	    values = new SetCache(values);
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value) : value;

	    if (isCommon && computed === computed) {
	      var valuesIndex = valuesLength;
	      while (valuesIndex--) {
	        if (values[valuesIndex] === computed) {
	          continue outer;
	        }
	      }
	      result.push(value);
	    }
	    else if (!includes(values, computed, comparator)) {
	      result.push(value);
	    }
	  }
	  return result;
	}

	module.exports = baseDifference;


/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(53);

	/**
	 * The base implementation of `_.every` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if all elements pass the predicate check, else `false`
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
/* 278 */
/***/ function(module, exports) {

	/**
	 * The base implementation of methods like `_.find` and `_.findKey`, without
	 * support for iteratee shorthands, which iterates over `collection` using
	 * `eachFunc`.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to search.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {Function} eachFunc The function to iterate over `collection`.
	 * @param {boolean} [retKey] Specify returning the key of the found element instead of the element itself.
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
/* 279 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for iteratee shorthands.
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
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(272),
	    isArguments = __webpack_require__(58),
	    isArray = __webpack_require__(7),
	    isArrayLikeObject = __webpack_require__(81);

	/**
	 * The base implementation of `_.flatten` with support for restricting flattening.
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
	    if (isArrayLikeObject(value) &&
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
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(310);

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
/* 282 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return key in Object(object);
	}

	module.exports = baseHasIn;


/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var Stack = __webpack_require__(50),
	    equalArrays = __webpack_require__(311),
	    equalByTag = __webpack_require__(312),
	    equalObjects = __webpack_require__(313),
	    getTag = __webpack_require__(128),
	    isArray = __webpack_require__(7),
	    isHostObject = __webpack_require__(54),
	    isTypedArray = __webpack_require__(82);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = getTag(object);
	    if (objTag == argsTag) {
	      objTag = objectTag;
	    } else if (objTag != objectTag) {
	      objIsArr = isTypedArray(object);
	    }
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    if (othTag == argsTag) {
	      othTag = objectTag;
	    } else if (othTag != objectTag) {
	      othIsArr = isTypedArray(other);
	    }
	  }
	  var objIsObj = objTag == objectTag && !isHostObject(object),
	      othIsObj = othTag == objectTag && !isHostObject(other),
	      isSameTag = objTag == othTag;

	  if (isSameTag && !(objIsArr || objIsObj)) {
	    return equalByTag(object, other, objTag, equalFunc, customizer, bitmask);
	  }
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	  if (!isPartial) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, bitmask, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, bitmask, stack);
	}

	module.exports = baseIsEqualDeep;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(50),
	    baseIsEqual = __webpack_require__(123);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
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
	      var stack = new Stack,
	          result = customizer ? customizer(objValue, srcValue, key, object, source, stack) : undefined;

	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;


/***/ },
/* 285 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = Object.keys;

	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @type Function
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  return nativeKeys(Object(object));
	}

	module.exports = baseKeys;


/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var Reflect = __webpack_require__(263),
	    iteratorToArray = __webpack_require__(325);

	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;

	/** Built-in value references. */
	var enumerate = Reflect ? Reflect.enumerate : undefined,
	    propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * The base implementation of `_.keysIn` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  object = object == null ? object : Object(object);

	  var result = [];
	  for (var key in object) {
	    result.push(key);
	  }
	  return result;
	}

	// Fallback for IE < 9 with es6-shim.
	if (enumerate && !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf')) {
	  baseKeysIn = function(object) {
	    return iteratorToArray(enumerate(object));
	  };
	}

	module.exports = baseKeysIn;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(284),
	    getMatchData = __webpack_require__(315);

	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
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
	      return object[key] === value &&
	        (value !== undefined || (key in Object(object)));
	    };
	  }
	  return function(object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}

	module.exports = baseMatches;


/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(123),
	    get = __webpack_require__(134),
	    hasIn = __webpack_require__(343);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  return function(object) {
	    var objValue = get(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
	  };
	}

	module.exports = baseMatchesProperty;


/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(50),
	    arrayEach = __webpack_require__(71),
	    assignMergeValue = __webpack_require__(114),
	    baseMergeDeep = __webpack_require__(290),
	    isArray = __webpack_require__(7),
	    isObject = __webpack_require__(9),
	    isTypedArray = __webpack_require__(82),
	    keysIn = __webpack_require__(83);

	/**
	 * The base implementation of `_.merge` without support for multiple sources.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Object} [stack] Tracks traversed source values and their merged counterparts.
	 */
	function baseMerge(object, source, srcIndex, customizer, stack) {
	  if (object === source) {
	    return;
	  }
	  var props = (isArray(source) || isTypedArray(source)) ? undefined : keysIn(source);
	  arrayEach(props || source, function(srcValue, key) {
	    if (props) {
	      key = srcValue;
	      srcValue = source[key];
	    }
	    if (isObject(srcValue)) {
	      stack || (stack = new Stack);
	      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
	    }
	    else {
	      var newValue = customizer ? customizer(object[key], srcValue, (key + ''), object, source, stack) : undefined;
	      if (newValue === undefined) {
	        newValue = srcValue;
	      }
	      assignMergeValue(object, key, newValue);
	    }
	  });
	}

	module.exports = baseMerge;


/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

	var assignMergeValue = __webpack_require__(114),
	    baseClone = __webpack_require__(274),
	    copyArray = __webpack_require__(127),
	    isArguments = __webpack_require__(58),
	    isArray = __webpack_require__(7),
	    isArrayLikeObject = __webpack_require__(81),
	    isFunction = __webpack_require__(38),
	    isObject = __webpack_require__(9),
	    isPlainObject = __webpack_require__(346),
	    isTypedArray = __webpack_require__(82),
	    toPlainObject = __webpack_require__(355);

	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {Object} [stack] Tracks traversed source values and their merged counterparts.
	 */
	function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
	  var objValue = object[key],
	      srcValue = source[key],
	      stacked = stack.get(srcValue);

	  if (stacked) {
	    assignMergeValue(object, key, stacked);
	    return;
	  }
	  var newValue = customizer ? customizer(objValue, srcValue, (key + ''), object, source, stack) : undefined,
	      isCommon = newValue === undefined;

	  if (isCommon) {
	    newValue = srcValue;
	    if (isArray(srcValue) || isTypedArray(srcValue)) {
	      if (isArray(objValue)) {
	        newValue = srcIndex ? copyArray(objValue) : objValue;
	      }
	      else if (isArrayLikeObject(objValue)) {
	        newValue = copyArray(objValue);
	      }
	      else {
	        isCommon = false;
	        newValue = baseClone(srcValue);
	      }
	    }
	    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      if (isArguments(objValue)) {
	        newValue = toPlainObject(objValue);
	      }
	      else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
	        isCommon = false;
	        newValue = baseClone(srcValue);
	      }
	      else {
	        newValue = srcIndex ? baseClone(objValue) : objValue;
	      }
	    }
	    else {
	      isCommon = false;
	    }
	  }
	  stack.set(srcValue, newValue);

	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
	  }
	  assignMergeValue(object, key, newValue);
	}

	module.exports = baseMergeDeep;


/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	var arrayReduce = __webpack_require__(72);

	/**
	 * The base implementation of `_.pick` without support for individual
	 * property names.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} props The property names to pick.
	 * @returns {Object} Returns the new object.
	 */
	function basePick(object, props) {
	  object = Object(object);
	  return arrayReduce(props, function(result, key) {
	    if (key in object) {
	      result[key] = object[key];
	    }
	    return result;
	  }, {});
	}

	module.exports = basePick;


/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(121);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}

	module.exports = basePropertyDeep;


/***/ },
/* 293 */
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

	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = end > length ? length : end;
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
/* 294 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(53);

	/**
	 * The base implementation of `_.some` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
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
/* 295 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;


/***/ },
/* 296 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(51);

	/**
	 * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
	 * of key-value pairs for `object` corresponding to the property names of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the new array of key-value pairs.
	 */
	function baseToPairs(object, props) {
	  return arrayMap(props, function(key) {
	    return [key, object[key]];
	  });
	}

	module.exports = baseToPairs;


/***/ },
/* 297 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing wrapper metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	module.exports = baseUnary;


/***/ },
/* 298 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(51);

	/**
	 * The base implementation of `_.values` and `_.valuesIn` which creates an
	 * array of `object` property values corresponding to the property names
	 * of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the array of property values.
	 */
	function baseValues(object, props) {
	  return arrayMap(props, function(key) {
	    return object[key];
	  });
	}

	module.exports = baseValues;


/***/ },
/* 299 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(29);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Checks if `value` is in `cache`.
	 *
	 * @private
	 * @param {Object} cache The set cache to search.
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function cacheHas(cache, value) {
	  var map = cache.__data__;
	  if (isKeyable(value)) {
	    var data = map.__data__,
	        hash = typeof value == 'string' ? data.string : data.hash;

	    return hash[value] === HASH_UNDEFINED;
	  }
	  return map.has(value);
	}

	module.exports = cacheHas;


/***/ },
/* 300 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(29);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Adds `value` to the set cache.
	 *
	 * @private
	 * @name push
	 * @memberOf SetCache
	 * @param {*} value The value to cache.
	 */
	function cachePush(value) {
	  var map = this.__data__;
	  if (isKeyable(value)) {
	    var data = map.__data__,
	        hash = typeof value == 'string' ? data.string : data.hash;

	    hash[value] = HASH_UNDEFINED;
	  }
	  else {
	    map.set(value, HASH_UNDEFINED);
	  }
	}

	module.exports = cachePush;


/***/ },
/* 301 */
/***/ function(module, exports, __webpack_require__) {

	var addMapEntry = __webpack_require__(266),
	    arrayReduce = __webpack_require__(72),
	    mapToArray = __webpack_require__(132);

	/**
	 * Creates a clone of `map`.
	 *
	 * @private
	 * @param {Object} map The map to clone.
	 * @returns {Object} Returns the cloned map.
	 */
	function cloneMap(map) {
	  var Ctor = map.constructor;
	  return arrayReduce(mapToArray(map), addMapEntry, new Ctor);
	}

	module.exports = cloneMap;


/***/ },
/* 302 */
/***/ function(module, exports) {

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;

	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp(regexp) {
	  var Ctor = regexp.constructor,
	      result = new Ctor(regexp.source, reFlags.exec(regexp));

	  result.lastIndex = regexp.lastIndex;
	  return result;
	}

	module.exports = cloneRegExp;


/***/ },
/* 303 */
/***/ function(module, exports, __webpack_require__) {

	var addSetEntry = __webpack_require__(267),
	    arrayReduce = __webpack_require__(72),
	    setToArray = __webpack_require__(133);

	/**
	 * Creates a clone of `set`.
	 *
	 * @private
	 * @param {Object} set The set to clone.
	 * @returns {Object} Returns the cloned set.
	 */
	function cloneSet(set) {
	  var Ctor = set.constructor;
	  return arrayReduce(setToArray(set), addSetEntry, new Ctor);
	}

	module.exports = cloneSet;


/***/ },
/* 304 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(70);

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = Symbol ? symbolProto.valueOf : undefined;

	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */
	function cloneSymbol(symbol) {
	  return Symbol ? Object(symbolValueOf.call(symbol)) : {};
	}

	module.exports = cloneSymbol;


/***/ },
/* 305 */
/***/ function(module, exports, __webpack_require__) {

	var cloneBuffer = __webpack_require__(126);

	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = typedArray.buffer,
	      Ctor = typedArray.constructor;

	  return new Ctor(isDeep ? cloneBuffer(buffer) : buffer, typedArray.byteOffset, typedArray.length);
	}

	module.exports = cloneTypedArray;


/***/ },
/* 306 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(115);

	/**
	 * This function is like `copyObject` except that it accepts a function to
	 * customize copied values.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObjectWith(source, props, object, customizer) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index],
	        newValue = customizer ? customizer(object[key], source[key], key, object, source) : source[key];

	    assignValue(object, key, newValue);
	  }
	  return object;
	}

	module.exports = copyObjectWith;


/***/ },
/* 307 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(75),
	    getSymbols = __webpack_require__(316);

	/**
	 * Copies own symbol properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return copyObject(source, getSymbols(source), object);
	}

	module.exports = copySymbols;


/***/ },
/* 308 */
/***/ function(module, exports, __webpack_require__) {

	var isIterateeCall = __webpack_require__(77),
	    rest = __webpack_require__(136);

	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return rest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;

	    customizer = typeof customizer == 'function' ? (length--, customizer) : undefined;
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;


/***/ },
/* 309 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(37);

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
	    if (collection == null) {
	      return collection;
	    }
	    if (!isArrayLike(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);

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
/* 310 */
/***/ function(module, exports) {

	/**
	 * Creates a base function for methods like `_.forIn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ },
/* 311 */
/***/ function(module, exports, __webpack_require__) {

	var arraySome = __webpack_require__(113);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @param {Object} [stack] Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var index = -1,
	      isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      isUnordered = bitmask & UNORDERED_COMPARE_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(array, other);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (isUnordered) {
	      if (!arraySome(other, function(othValue) {
	            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack);
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  return result;
	}

	module.exports = equalArrays;


/***/ },
/* 312 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(70),
	    Uint8Array = __webpack_require__(112),
	    mapToArray = __webpack_require__(132),
	    setToArray = __webpack_require__(133);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]';

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = Symbol ? symbolProto.valueOf : undefined;

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
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask) {
	  switch (tag) {
	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
	      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
	      return +object == +other;

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return (object != +object) ? other != +other : object == +other;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings primitives and string
	      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	      return object == (other + '');

	    case mapTag:
	      var convert = mapToArray;

	    case setTag:
	      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	      convert || (convert = setToArray);

	      // Recursively compare objects (susceptible to call stack limits).
	      return (isPartial || object.size == other.size) &&
	        equalFunc(convert(object), convert(other), customizer, bitmask | UNORDERED_COMPARE_FLAG);

	    case symbolTag:
	      return !!Symbol && (symbolValueOf.call(object) == symbolValueOf.call(other));
	  }
	  return false;
	}

	module.exports = equalByTag;


/***/ },
/* 313 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(73),
	    keys = __webpack_require__(31);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : baseHas(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  return result;
	}

	module.exports = equalObjects;


/***/ },
/* 314 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(124);

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
/* 315 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(324),
	    toPairs = __webpack_require__(354);

	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = toPairs(object),
	      length = result.length;

	  while (length--) {
	    result[length][2] = isStrictComparable(result[length][1]);
	  }
	  return result;
	}

	module.exports = getMatchData;


/***/ },
/* 316 */
/***/ function(module, exports) {

	/** Built-in value references. */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own symbol properties of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = getOwnPropertySymbols || function() {
	  return [];
	};

	module.exports = getSymbols;


/***/ },
/* 317 */
/***/ function(module, exports, __webpack_require__) {

	var hashHas = __webpack_require__(130);

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(hash, key) {
	  return hashHas(hash, key) && delete hash[key];
	}

	module.exports = hashDelete;


/***/ },
/* 318 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var nativeCreate = __webpack_require__(56);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(hash, key) {
	  if (nativeCreate) {
	    var result = hash[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(hash, key) ? hash[key] : undefined;
	}

	module.exports = hashGet;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 319 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(56);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function hashSet(hash, key, value) {
	  hash[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	}

	module.exports = hashSet;


/***/ },
/* 320 */
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
/* 321 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Used for built-in method references. */
	var objectProto = global.Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = array.constructor(length);

	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	module.exports = initCloneArray;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 322 */
/***/ function(module, exports, __webpack_require__) {

	var cloneBuffer = __webpack_require__(126),
	    cloneMap = __webpack_require__(301),
	    cloneRegExp = __webpack_require__(302),
	    cloneSet = __webpack_require__(303),
	    cloneSymbol = __webpack_require__(304),
	    cloneTypedArray = __webpack_require__(305);

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

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

	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return cloneBuffer(object);

	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);

	    case float32Tag: case float64Tag:
	    case int8Tag: case int16Tag: case int32Tag:
	    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	      return cloneTypedArray(object, isDeep);

	    case mapTag:
	      return cloneMap(object);

	    case numberTag:
	    case stringTag:
	      return new Ctor(object);

	    case regexpTag:
	      return cloneRegExp(object);

	    case setTag:
	      return cloneSet(object);

	    case symbolTag:
	      return cloneSymbol(object);
	  }
	}

	module.exports = initCloneByTag;


/***/ },
/* 323 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(275),
	    isFunction = __webpack_require__(38),
	    isPrototype = __webpack_require__(79);

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  if (isPrototype(object)) {
	    return {};
	  }
	  var Ctor = object.constructor;
	  return baseCreate(isFunction(Ctor) ? Ctor.prototype : undefined);
	}

	module.exports = initCloneObject;


/***/ },
/* 324 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(9);

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
/* 325 */
/***/ function(module, exports) {

	/**
	 * Converts `iterator` to an array.
	 *
	 * @private
	 * @param {Object} iterator The iterator to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function iteratorToArray(iterator) {
	  var data,
	      result = [];

	  while (!(data = iterator.next()).done) {
	    result.push(data.value);
	  }
	  return result;
	}

	module.exports = iteratorToArray;


/***/ },
/* 326 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(262),
	    Map = __webpack_require__(28);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapClear() {
	  this.__data__ = { 'hash': new Hash, 'map': Map ? new Map : [], 'string': new Hash };
	}

	module.exports = mapClear;


/***/ },
/* 327 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(28),
	    assocDelete = __webpack_require__(116),
	    hashDelete = __webpack_require__(317),
	    isKeyable = __webpack_require__(29);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapDelete(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashDelete(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map['delete'](key) : assocDelete(data.map, key);
	}

	module.exports = mapDelete;


/***/ },
/* 328 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(28),
	    assocGet = __webpack_require__(117),
	    hashGet = __webpack_require__(318),
	    isKeyable = __webpack_require__(29);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapGet(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashGet(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map.get(key) : assocGet(data.map, key);
	}

	module.exports = mapGet;


/***/ },
/* 329 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(28),
	    assocHas = __webpack_require__(118),
	    hashHas = __webpack_require__(130),
	    isKeyable = __webpack_require__(29);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapHas(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashHas(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map.has(key) : assocHas(data.map, key);
	}

	module.exports = mapHas;


/***/ },
/* 330 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(28),
	    assocSet = __webpack_require__(119),
	    hashSet = __webpack_require__(319),
	    isKeyable = __webpack_require__(29);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache object.
	 */
	function mapSet(key, value) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    hashSet(typeof key == 'string' ? data.string : data.hash, key, value);
	  } else if (Map) {
	    data.map.set(key, value);
	  } else {
	    assocSet(data.map, key, value);
	  }
	  return this;
	}

	module.exports = mapSet;


/***/ },
/* 331 */
/***/ function(module, exports, __webpack_require__) {

	var baseSlice = __webpack_require__(293),
	    get = __webpack_require__(134);

	/**
	 * Gets the parent value at `path` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path to get the parent value of.
	 * @returns {*} Returns the parent value.
	 */
	function parent(object, path) {
	  return path.length == 1 ? object : get(object, baseSlice(path, 0, -1));
	}

	module.exports = parent;


/***/ },
/* 332 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = { 'array': [], 'map': null };
	}

	module.exports = stackClear;


/***/ },
/* 333 */
/***/ function(module, exports, __webpack_require__) {

	var assocDelete = __webpack_require__(116);

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      array = data.array;

	  return array ? assocDelete(array, key) : data.map['delete'](key);
	}

	module.exports = stackDelete;


/***/ },
/* 334 */
/***/ function(module, exports, __webpack_require__) {

	var assocGet = __webpack_require__(117);

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  var data = this.__data__,
	      array = data.array;

	  return array ? assocGet(array, key) : data.map.get(key);
	}

	module.exports = stackGet;


/***/ },
/* 335 */
/***/ function(module, exports, __webpack_require__) {

	var assocHas = __webpack_require__(118);

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  var data = this.__data__,
	      array = data.array;

	  return array ? assocHas(array, key) : data.map.has(key);
	}

	module.exports = stackHas;


/***/ },
/* 336 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(111),
	    assocSet = __webpack_require__(119);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache object.
	 */
	function stackSet(key, value) {
	  var data = this.__data__,
	      array = data.array;

	  if (array) {
	    if (array.length < (LARGE_ARRAY_SIZE - 1)) {
	      assocSet(array, key, value);
	    } else {
	      data.array = null;
	      data.map = new MapCache(array);
	    }
	  }
	  var map = data.map;
	  if (map) {
	    map.set(key, value);
	  }
	  return this;
	}

	module.exports = stackSet;


/***/ },
/* 337 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(356);

	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	function stringToPath(string) {
	  var result = [];
	  toString(string).replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	}

	module.exports = stringToPath;


/***/ },
/* 338 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(135);

	/**
	 * Converts `value` to a function if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Function} Returns the function.
	 */
	function toFunction(value) {
	  return typeof value == 'function' ? value : identity;
	}

	module.exports = toFunction;


/***/ },
/* 339 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(342);


/***/ },
/* 340 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEvery = __webpack_require__(269),
	    baseEvery = __webpack_require__(277),
	    baseIteratee = __webpack_require__(74),
	    isArray = __webpack_require__(7),
	    isIterateeCall = __webpack_require__(77);

	/**
	 * Checks if `predicate` returns truthy for **all** elements of `collection`.
	 * Iteration is stopped once `predicate` returns falsey. The predicate is
	 * invoked with three arguments: (value, index|key, collection).
	 *
	 * @static
	 * @memberOf _
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	 * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
	 * @returns {boolean} Returns `true` if all elements pass the predicate check, else `false`.
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
	 * // using the `_.matches` iteratee shorthand
	 * _.every(users, { 'user': 'barney', 'active': false });
	 * // => false
	 *
	 * // using the `_.matchesProperty` iteratee shorthand
	 * _.every(users, ['active', false]);
	 * // => true
	 *
	 * // using the `_.property` iteratee shorthand
	 * _.every(users, 'active');
	 * // => false
	 */
	function every(collection, predicate, guard) {
	  var func = isArray(collection) ? arrayEvery : baseEvery;
	  if (guard && isIterateeCall(collection, predicate, guard)) {
	    predicate = undefined;
	  }
	  return func(collection, baseIteratee(predicate, 3));
	}

	module.exports = every;


/***/ },
/* 341 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(53),
	    baseFind = __webpack_require__(278),
	    baseFindIndex = __webpack_require__(279),
	    baseIteratee = __webpack_require__(74),
	    isArray = __webpack_require__(7);

	/**
	 * Iterates over elements of `collection`, returning the first element
	 * `predicate` returns truthy for. The predicate is invoked with three arguments:
	 * (value, index|key, collection).
	 *
	 * @static
	 * @memberOf _
	 * @category Collection
	 * @param {Array|Object} collection The collection to search.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	 * @returns {*} Returns the matched element, else `undefined`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'age': 36, 'active': true },
	 *   { 'user': 'fred',    'age': 40, 'active': false },
	 *   { 'user': 'pebbles', 'age': 1,  'active': true }
	 * ];
	 *
	 * _.find(users, function(o) { return o.age < 40; });
	 * // => object for 'barney'
	 *
	 * // using the `_.matches` iteratee shorthand
	 * _.find(users, { 'age': 1, 'active': true });
	 * // => object for 'pebbles'
	 *
	 * // using the `_.matchesProperty` iteratee shorthand
	 * _.find(users, ['active', false]);
	 * // => object for 'fred'
	 *
	 * // using the `_.property` iteratee shorthand
	 * _.find(users, 'active');
	 * // => object for 'barney'
	 */
	function find(collection, predicate) {
	  predicate = baseIteratee(predicate, 3);
	  if (isArray(collection)) {
	    var index = baseFindIndex(collection, predicate);
	    return index > -1 ? collection[index] : undefined;
	  }
	  return baseFind(collection, predicate, baseEach);
	}

	module.exports = find;


/***/ },
/* 342 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(71),
	    baseEach = __webpack_require__(53),
	    isArray = __webpack_require__(7),
	    toFunction = __webpack_require__(338);

	/**
	 * Iterates over elements of `collection` invoking `iteratee` for each element.
	 * The iteratee is invoked with three arguments: (value, index|key, collection).
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length" property
	 * are iterated like arrays. To avoid this behavior use `_.forIn` or `_.forOwn`
	 * for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @alias each
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 * @example
	 *
	 * _([1, 2]).forEach(function(value) {
	 *   console.log(value);
	 * });
	 * // => logs `1` then `2`
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => logs 'a' then 'b' (iteration order is not guaranteed)
	 */
	function forEach(collection, iteratee) {
	  return (typeof iteratee == 'function' && isArray(collection))
	    ? arrayEach(collection, iteratee)
	    : baseEach(collection, toFunction(iteratee));
	}

	module.exports = forEach;


/***/ },
/* 343 */
/***/ function(module, exports, __webpack_require__) {

	var baseHasIn = __webpack_require__(282),
	    hasPath = __webpack_require__(129);

	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': _.create({ 'c': 3 }) }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b.c');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b', 'c']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return hasPath(object, path, baseHasIn);
	}

	module.exports = hasIn;


/***/ },
/* 344 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(122),
	    isArrayLike = __webpack_require__(37),
	    isString = __webpack_require__(30),
	    toInteger = __webpack_require__(137),
	    values = __webpack_require__(357);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Checks if `value` is in `collection`. If `collection` is a string it's checked
	 * for a substring of `value`, otherwise [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * is used for equality comparisons. If `fromIndex` is negative, it's used as
	 * the offset from the end of `collection`.
	 *
	 * @static
	 * @memberOf _
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to search.
	 * @param {*} value The value to search for.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @param- {Object} [guard] Enables use as an iteratee for functions like `_.reduce`.
	 * @returns {boolean} Returns `true` if `value` is found, else `false`.
	 * @example
	 *
	 * _.includes([1, 2, 3], 1);
	 * // => true
	 *
	 * _.includes([1, 2, 3], 1, 2);
	 * // => false
	 *
	 * _.includes({ 'user': 'fred', 'age': 40 }, 'fred');
	 * // => true
	 *
	 * _.includes('pebbles', 'eb');
	 * // => true
	 */
	function includes(collection, value, fromIndex, guard) {
	  collection = isArrayLike(collection) ? collection : values(collection);
	  fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

	  var length = collection.length;
	  if (fromIndex < 0) {
	    fromIndex = nativeMax(length + fromIndex, 0);
	  }
	  return isString(collection)
	    ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
	    : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
	}

	module.exports = includes;


/***/ },
/* 345 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var isFunction = __webpack_require__(38),
	    isHostObject = __webpack_require__(54),
	    isObjectLike = __webpack_require__(24);

	/** Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns). */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = global.Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
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
	    return reIsNative.test(funcToString.call(value));
	  }
	  return isObjectLike(value) &&
	    (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
	}

	module.exports = isNative;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 346 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var isHostObject = __webpack_require__(54),
	    isObjectLike = __webpack_require__(24);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = global.Function.prototype.toString;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var getPrototypeOf = Object.getPrototypeOf;

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
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
	  if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) {
	    return false;
	  }
	  var proto = objectProto;
	  if (typeof value.constructor == 'function') {
	    proto = getPrototypeOf(value);
	  }
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = proto.constructor;
	  return (typeof Ctor == 'function' &&
	    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
	}

	module.exports = isPlainObject;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 347 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var isObjectLike = __webpack_require__(24);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	module.exports = isSymbol;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 348 */
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
/* 349 */
/***/ function(module, exports, __webpack_require__) {

	var baseMerge = __webpack_require__(289),
	    createAssigner = __webpack_require__(308);

	/**
	 * Recursively merges own and inherited enumerable properties of source
	 * objects into the destination object, skipping source properties that resolve
	 * to `undefined`. Array and plain object properties are merged recursively.
	 * Other objects and value types are overridden by assignment. Source objects
	 * are applied from left to right. Subsequent sources overwrite property
	 * assignments of previous sources.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
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
	 */
	var merge = createAssigner(function(object, source, srcIndex) {
	  baseMerge(object, source, srcIndex);
	});

	module.exports = merge;


/***/ },
/* 350 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(51),
	    baseDifference = __webpack_require__(276),
	    baseFlatten = __webpack_require__(280),
	    basePick = __webpack_require__(291),
	    keysIn = __webpack_require__(83),
	    rest = __webpack_require__(136);

	/**
	 * The opposite of `_.pick`; this method creates an object composed of the
	 * own and inherited enumerable properties of `object` that are not omitted.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {...(string|string[])} [props] The property names to omit, specified
	 *  individually or in arrays..
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': '2', 'c': 3 };
	 *
	 * _.omit(object, ['a', 'c']);
	 * // => { 'b': '2' }
	 */
	var omit = rest(function(object, props) {
	  if (object == null) {
	    return {};
	  }
	  props = arrayMap(baseFlatten(props), String);
	  return basePick(object, baseDifference(keysIn(object), props));
	});

	module.exports = omit;


/***/ },
/* 351 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(124),
	    basePropertyDeep = __webpack_require__(292),
	    isKey = __webpack_require__(78);

	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
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
	 * _.map(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
	}

	module.exports = property;


/***/ },
/* 352 */
/***/ function(module, exports, __webpack_require__) {

	var arraySome = __webpack_require__(113),
	    baseIteratee = __webpack_require__(74),
	    baseSome = __webpack_require__(294),
	    isArray = __webpack_require__(7),
	    isIterateeCall = __webpack_require__(77);

	/**
	 * Checks if `predicate` returns truthy for **any** element of `collection`.
	 * Iteration is stopped once `predicate` returns truthy. The predicate is
	 * invoked with three arguments: (value, index|key, collection).
	 *
	 * @static
	 * @memberOf _
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	 * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
	 * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
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
	 * // using the `_.matches` iteratee shorthand
	 * _.some(users, { 'user': 'barney', 'active': false });
	 * // => false
	 *
	 * // using the `_.matchesProperty` iteratee shorthand
	 * _.some(users, ['active', false]);
	 * // => true
	 *
	 * // using the `_.property` iteratee shorthand
	 * _.some(users, 'active');
	 * // => true
	 */
	function some(collection, predicate, guard) {
	  var func = isArray(collection) ? arraySome : baseSome;
	  if (guard && isIterateeCall(collection, predicate, guard)) {
	    predicate = undefined;
	  }
	  return func(collection, baseIteratee(predicate, 3));
	}

	module.exports = some;


/***/ },
/* 353 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(38),
	    isObject = __webpack_require__(9);

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `global`. */
	var freeParseInt = parseInt;

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3);
	 * // => 3
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3');
	 * // => 3
	 */
	function toNumber(value) {
	  if (isObject(value)) {
	    var other = isFunction(value.valueOf) ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	module.exports = toNumber;


/***/ },
/* 354 */
/***/ function(module, exports, __webpack_require__) {

	var baseToPairs = __webpack_require__(296),
	    keys = __webpack_require__(31);

	/**
	 * Creates an array of own enumerable key-value pairs for `object`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the new array of key-value pairs.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.toPairs(new Foo);
	 * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
	 */
	function toPairs(object) {
	  return baseToPairs(object, keys(object));
	}

	module.exports = toPairs;


/***/ },
/* 355 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(75),
	    keysIn = __webpack_require__(83);

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
	  return copyObject(value, keysIn(value));
	}

	module.exports = toPlainObject;


/***/ },
/* 356 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(70),
	    isSymbol = __webpack_require__(347);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = Symbol ? symbolProto.toString : undefined;

	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (value == null) {
	    return '';
	  }
	  if (isSymbol(value)) {
	    return Symbol ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = toString;


/***/ },
/* 357 */
/***/ function(module, exports, __webpack_require__) {

	var baseValues = __webpack_require__(298),
	    keys = __webpack_require__(31);

	/**
	 * Creates an array of the own enumerable property values of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property values.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.values(new Foo);
	 * // => [1, 2] (iteration order is not guaranteed)
	 *
	 * _.values('hi');
	 * // => ['h', 'i']
	 */
	function values(object) {
	  return object ? baseValues(object, keys(object)) : [];
	}

	module.exports = values;


/***/ },
/* 358 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;!function(a){if(true)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.oauthioWeb=a()}}(function(){var a;return function b(a,c,d){function e(g,h){if(!c[g]){if(!a[g]){var i="function"==typeof require&&require;if(!h&&i)return require(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};a[g][0].call(k.exports,function(b){var c=a[g][1][b];return e(c?c:b)},k,k.exports,b,a,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){b.exports={oauthd_url:"https://oauth.io",oauthd_api:"https://oauth.io/api",version:"web-0.5.0",options:{}}},{}],2:[function(a,b,c){"use strict";b.exports=function(a){var b,c;return b=a.getJquery(),c=function(c){return function(c,d,e){var f,g;return g=b.Deferred(),f=a.getOAuthdURL(),b.ajax({url:f+d,type:c,data:e}).then(function(a){return g.resolve(a)},function(a){return g.reject(a&&a.responseJSON)}),g.promise()}}(this),{get:function(a){return function(a,b){return c("get",a,b)}}(this),post:function(a){return function(a,b){return c("post",a,b)}}(this),put:function(a){return function(a,b){return c("put",a,b)}}(this),del:function(a){return function(a,b){return c("delete",a,b)}}(this)}}},{}],3:[function(a,b,c){"use strict";var d,e,f,g,h,i;g=a("../config"),e=a("../tools/url"),d=a("../tools/location_operations"),h=a("../tools/cookies"),i=a("../tools/lstorage"),f=a("../tools/cache"),b.exports=function(a,b,c,j){var k,l,m;return e=e(b),l=d(b),m=i.active()&&i||h,h.init(g,b),f.init(m,g),k={initialize:function(a,b){var c;if(g.key=a,b)for(c in b)g.options[c]=b[c]},setOAuthdURL:function(a){g.oauthd_url=a,g.oauthd_base=e.getAbsUrl(g.oauthd_url).match(/^.{2,5}:\/\/[^\/]+/)[0]},getOAuthdURL:function(){return g.oauthd_url},getVersion:function(){return g.version},extend:function(a,b){return this[a]=b(this)},getConfig:function(){return g},getWindow:function(){return a},getDocument:function(){return b},getNavigator:function(){return j},getJquery:function(){return c},getUrl:function(){return e},getCache:function(){return f},getStorage:function(){return m},getLocationOperations:function(){return l}}}},{"../config":1,"../tools/cache":9,"../tools/cookies":10,"../tools/location_operations":12,"../tools/lstorage":13,"../tools/url":15}],4:[function(a,b,c){"use strict";var d,e,f;d=a("../tools/cookies"),e=a("./request"),f=a("../tools/sha1"),b.exports=function(b){var c,g,h,i,j,k,l,m,n,o,p,q,r;return g=b.getUrl(),j=b.getConfig(),k=b.getDocument(),r=b.getWindow(),c=b.getJquery(),h=b.getCache(),q=a("./providers")(b),j.oauthd_base=g.getAbsUrl(j.oauthd_url).match(/^.{2,5}:\/\/[^\/]+/)[0],i=[],n=void 0,(p=function(){var a,b;b=/[\\#&]oauthio=([^&]*)/.exec(k.location.hash),b&&(k.location.hash=k.location.hash.replace(/&?oauthio=[^&]*/,""),n=decodeURIComponent(b[1].replace(/\+/g," ")),a=d.read("oauthio_state"),a&&(i.push(a),d.erase("oauthio_state")))})(),l=b.getLocationOperations(),o={request:e(b,i,q)},m={initialize:function(a,c){return b.initialize(a,c)},setOAuthdURL:function(a){j.oauthd_url=a,j.oauthd_base=g.getAbsUrl(j.oauthd_url).match(/^.{2,5}:\/\/[^\/]+/)[0]},create:function(a,b,c){var d,e,f,g;if(!b)return h.tryCache(m,a,!0);"object"!=typeof c&&q.fetchDescription(a),e=function(d){return o.request.mkHttp(a,b,c,d)},f=function(d,e){return o.request.mkHttpEndpoint(a,b,c,d,e)},g={};for(d in b)g[d]=b[d];return g.toJson=function(){var a;return a={},null!=g.access_token&&(a.access_token=g.access_token),null!=g.oauth_token&&(a.oauth_token=g.oauth_token),null!=g.oauth_token_secret&&(a.oauth_token_secret=g.oauth_token_secret),null!=g.expires_in&&(a.expires_in=g.expires_in),null!=g.token_type&&(a.token_type=g.token_type),null!=g.id_token&&(a.id_token=g.id_token),null!=g.provider&&(a.provider=g.provider),null!=g.email&&(a.email=g.email),a},g.get=e("GET"),g.post=e("POST"),g.put=e("PUT"),g.patch=e("PATCH"),g.del=e("DELETE"),g.me=o.request.mkHttpMe(a,b,c,"GET"),g},popup:function(a,b,d){var e,l,n,p,q,s,t,u,v,w,x;return p=!1,n=function(a){if(!p){if(a.origin!==j.oauthd_base)return;try{u.close()}catch(c){}return b.data=a.data,o.request.sendCallback(b,e),p=!0}},u=void 0,l=void 0,v=void 0,e=c.Deferred(),b=b||{},j.key?(2===arguments.length&&"function"==typeof b&&(d=b,b={}),h.cacheEnabled(b.cache)&&(s=h.tryCache(m,a,b.cache))?(null!=e&&e.resolve(s),d?d(null,s):e.promise()):(b.state||(b.state=f.create_hash(),b.state_type="client"),i.push(b.state),t=j.oauthd_url+"/auth/"+a+"?k="+j.key,t+="&d="+encodeURIComponent(g.getAbsUrl("/")),b&&(t+="&opts="+encodeURIComponent(JSON.stringify(b))),b.wnd_settings?(x=b.wnd_settings,delete b.wnd_settings):x={width:Math.floor(.8*r.outerWidth),height:Math.floor(.5*r.outerHeight)},x.width<1e3&&(x.width=1e3),x.height<630&&(x.height=630),x.left=Math.floor(r.screenX+(r.outerWidth-x.width)/2),x.top=Math.floor(r.screenY+(r.outerHeight-x.height)/8),w="width="+x.width+",height="+x.height,w+=",toolbar=0,scrollbars=1,status=1,resizable=1,location=1,menuBar=0",w+=",left="+x.left+",top="+x.top,b={provider:a,cache:b.cache},b.callback=function(a,c){return r.removeEventListener?r.removeEventListener("message",n,!1):r.detachEvent?r.detachEvent("onmessage",n):k.detachEvent&&k.detachEvent("onmessage",n),b.callback=function(){},v&&(clearTimeout(v),v=void 0),d?d(a,c):void 0},r.attachEvent?r.attachEvent("onmessage",n):k.attachEvent?k.attachEvent("onmessage",n):r.addEventListener&&r.addEventListener("message",n,!1),"undefined"!=typeof chrome&&chrome.runtime&&chrome.runtime.onMessageExternal&&chrome.runtime.onMessageExternal.addListener(function(a,b,c){return a.origin=b.url.match(/^.{2,5}:\/\/[^\/]+/)[0],n(a)}),!l&&(-1!==navigator.userAgent.indexOf("MSIE")||navigator.appVersion.indexOf("Trident/")>0)&&(l=k.createElement("iframe"),l.src=j.oauthd_url+"/auth/iframe?d="+encodeURIComponent(g.getAbsUrl("/")),l.width=0,l.height=0,l.frameBorder=0,l.style.visibility="hidden",k.body.appendChild(l)),v=setTimeout(function(){null!=e&&e.reject(new Error("Authorization timed out")),b.callback&&"function"==typeof b.callback&&b.callback(new Error("Authorization timed out"));try{u.close()}catch(a){}},12e5),u=r.open(t,"Authorization",w),u?(u.focus(),q=r.setInterval(function(){return null!==u&&!u.closed||(r.clearInterval(q),p||(null!=e&&e.reject(new Error("The popup was closed")),!b.callback||"function"!=typeof b.callback))?void 0:b.callback(new Error("The popup was closed"))},500)):(null!=e&&e.reject(new Error("Could not open a popup")),b.callback&&"function"==typeof b.callback&&b.callback(new Error("Could not open a popup"))),null!=e?e.promise():void 0)):(null!=e&&e.reject(new Error("OAuth object must be initialized")),null==d?e.promise():d(new Error("OAuth object must be initialized")))},redirect:function(a,b,c){var e,i;if(2===arguments.length&&(c=b,b={}),"string"!=typeof c)throw new Error("You must specify an url");return h.cacheEnabled(b.cache)&&(i=h.tryCache(m,a,b.cache))?(c=g.getAbsUrl(c)+(-1===c.indexOf("#")?"#":"&")+"oauthio=cache:"+a,l.changeHref(c),void l.reload()):(b.state||(b.state=f.create_hash(),b.state_type="client"),d.create("oauthio_state",b.state),e=encodeURIComponent(g.getAbsUrl(c)),c=j.oauthd_url+"/auth/"+a+"?k="+j.key,c+="&redirect_uri="+e,b&&(c+="&opts="+encodeURIComponent(JSON.stringify(b))),void l.changeHref(c))},isRedirect:function(a){var b,c,d;if(null==n)return!1;if("cache:"===(null!=n?n.substr(0,6):void 0))return b=null!=n?n.substr(6):void 0,a?b.toLowerCase()===a.toLowerCase():b;try{c=JSON.parse(n)}catch(e){return d=e,!1}return a?c.provider.toLowerCase()===a.toLowerCase():c.provider},callback:function(a,b,d){var e,f,g;if(e=c.Deferred(),1===arguments.length&&"function"==typeof a&&(d=a,a=void 0,b={}),1===arguments.length&&"string"==typeof a&&(b={}),2===arguments.length&&"function"==typeof b&&(d=b,b={}),h.cacheEnabled(null!=b?b.cache:void 0)||"cache:"===(null!=n?n.substr(0,6):void 0))if(a||"cache:"!==(null!=n?n.substr(0,6):void 0)||(a=n.substr(6)),g=h.tryCache(m,a,!0)){if(!d)return null!=e&&e.resolve(g),null!=e?e.promise():void 0;if(g)return d(null,g)}else if("cache:"===(null!=n?n.substr(0,6):void 0))return f=new Error("Could not fetch data from cache"),d?d(f):(null!=e&&e.reject(f),null!=e?e.promise():void 0);return n?(o.request.sendCallback({data:n,provider:a,cache:null!=b?b.cache:void 0,expires:null!=b?b.expires:void 0,callback:d},e),null!=e?e.promise():void 0):void 0},clearCache:function(a){return h.clearCache(a)},http_me:function(a){o.request.http_me&&o.request.http_me(a)},http:function(a){o.request.http&&o.request.http(a)},getVersion:function(){return b.getVersion.apply(this)}}}},{"../tools/cookies":10,"../tools/sha1":14,"./providers":5,"./request":6}],5:[function(a,b,c){"use strict";var d;d=a("../config"),b.exports=function(a){var b,c,e,f;return b=a.getJquery(),f={},e={},c={execProvidersCb:function(a,b,c){var d,f;if(e[a]){d=e[a],delete e[a];for(f in d)d[f](b,c)}},fetchDescription:function(a){f[a]||(f[a]=!0,b.ajax({url:d.oauthd_api+"/providers/"+a,data:{extend:!0},dataType:"json"}).done(function(b){f[a]=b.data,c.execProvidersCb(a,null,b.data)}).always(function(){"object"!=typeof f[a]&&(delete f[a],c.execProvidersCb(a,new Error("Unable to fetch request description")))}))},getDescription:function(a,b,d){return b=b||{},"object"==typeof f[a]?d(null,f[a]):(f[a]||c.fetchDescription(a),b.wait?(e[a]=e[a]||[],void e[a].push(d)):d(null,{}))}}}},{"../config":1}],6:[function(a,b,c){"use strict";var d,e=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};d=a("../tools/url")(),b.exports=function(a,b,c){var f,g,h,i,j;return f=a.getJquery(),h=a.getConfig(),g=a.getCache(),i=[],j=!1,{retrieveMethods:function(){var a;return a=f.Deferred(),j?a.resolve(i):f.ajax(h.oauthd_url+"/api/extended-endpoints").then(function(b){return i=b.data,j=!0,a.resolve()}).fail(function(b){return j=!0,a.reject(b)}),a.promise()},generateMethods:function(a,b,c){var d,e,f,g,h,j,k,l,m;if(null!=i){for(k=[],e=d=0,g=i.length;g>d;e=++d)l=i[e],h=l.name.split("."),j=a,k.push(function(){var a,d,e;for(e=[],f=a=0,d=h.length;d>a;f=++a)m=h[f],f<h.length-1?(null==j[m]&&(j[m]={}),e.push(j=j[m])):e.push(j[m]=this.mkHttpAll(c,b,l,arguments));return e}.apply(this,arguments));return k}},http:function(a){var b,g,i,j,k;i=function(){var a,b,c,g;if(g=k.oauthio.request||{},!g.cors){k.url=encodeURIComponent(k.url),"/"!==k.url[0]&&(k.url="/"+k.url),k.url=h.oauthd_url+"/request/"+k.oauthio.provider+k.url,k.headers=k.headers||{},k.headers.oauthio="k="+h.key,k.oauthio.tokens.oauth_token&&k.oauthio.tokens.oauth_token_secret&&(k.headers.oauthio+="&oauthv=1");for(b in k.oauthio.tokens)k.headers.oauthio+="&"+encodeURIComponent(b)+"="+encodeURIComponent(k.oauthio.tokens[b]);return delete k.oauthio,f.ajax(k)}if(k.oauthio.tokens){if(k.oauthio.tokens.access_token&&(k.oauthio.tokens.token=k.oauthio.tokens.access_token),k.url.match(/^[a-z]{2,16}:\/\//)||("/"!==k.url[0]&&(k.url="/"+k.url),k.url=g.url+k.url),k.url=d.replaceParam(k.url,k.oauthio.tokens,g.parameters),g.query){c=[];for(a in g.query)c.push(encodeURIComponent(a)+"="+encodeURIComponent(d.replaceParam(g.query[a],k.oauthio.tokens,g.parameters)));e.call(k.url,"?")>=0?k.url+="&"+c:k.url+="?"+c}if(g.headers){k.headers=k.headers||{};for(a in g.headers)k.headers[a]=d.replaceParam(g.headers[a],k.oauthio.tokens,g.parameters)}return delete k.oauthio,f.ajax(k)}},k={},j=void 0;for(j in a)k[j]=a[j];return k.oauthio.request&&k.oauthio.request!==!0?i():(g={wait:!!k.oauthio.request},b=f.Deferred(),c.getDescription(k.oauthio.provider,g,function(a,c){return a?b.reject(a):(k.oauthio.tokens.oauth_token&&k.oauthio.tokens.oauth_token_secret?k.oauthio.request=c.oauth1&&c.oauth1.request:k.oauthio.request=c.oauth2&&c.oauth2.request,void b.resolve())}),b.then(i))},http_me:function(a){var b,d,e,g,i;e=function(){var a,b,c,d;a=f.Deferred(),d=i.oauthio.request||{},i.url=h.oauthd_url+"/auth/"+i.oauthio.provider+"/me",i.headers=i.headers||{},i.headers.oauthio="k="+h.key,i.oauthio.tokens.oauth_token&&i.oauthio.tokens.oauth_token_secret&&(i.headers.oauthio+="&oauthv=1");for(b in i.oauthio.tokens)i.headers.oauthio+="&"+encodeURIComponent(b)+"="+encodeURIComponent(i.oauthio.tokens[b]);return delete i.oauthio,c=f.ajax(i),f.when(c).done(function(b){a.resolve(b.data)}).fail(function(b){b.responseJSON?a.reject(b.responseJSON.data):a.reject(new Error("An error occured while trying to access the resource"))}),a.promise()},i={};for(g in a)i[g]=a[g];return i.oauthio.request&&i.oauthio.request!==!0?e():(d={wait:!!i.oauthio.request},b=f.Deferred(),c.getDescription(i.oauthio.provider,d,function(a,c){return a?b.reject(a):(i.oauthio.tokens.oauth_token&&i.oauthio.tokens.oauth_token_secret?i.oauthio.request=c.oauth1&&c.oauth1.request:i.oauthio.request=c.oauth2&&c.oauth2.request,void b.resolve())}),b.then(e))},http_all:function(a,b,c){var d;return(d=function(){var b,c,d,e;b=f.Deferred(),e=a.oauthio.request||{},a.headers=a.headers||{},a.headers.oauthio="k="+h.key,a.oauthio.tokens.oauth_token&&a.oauthio.tokens.oauth_token_secret&&(a.headers.oauthio+="&oauthv=1");for(c in a.oauthio.tokens)a.headers.oauthio+="&"+encodeURIComponent(c)+"="+encodeURIComponent(a.oauthio.tokens[c]);return delete a.oauthio,d=f.ajax(a),f.when(d).done(function(a){var c;if("string"==typeof a.data)try{a.data=JSON.parse(a.data)}catch(d){c=d,a.data=a.data}finally{b.resolve(a.data)}}).fail(function(a){a.responseJSON?b.reject(a.responseJSON.data):b.reject(new Error("An error occured while trying to access the resource"))}),b.promise()})()},mkHttp:function(a,b,c,d){var e;return e=this,function(f,g){var h,i;if(i={},"string"==typeof f){if("object"==typeof g)for(h in g)i[h]=g[h];i.url=f}else if("object"==typeof f)for(h in f)i[h]=f[h];return i.type=i.type||d,i.oauthio={provider:a,tokens:b,request:c},e.http(i)}},mkHttpMe:function(a,b,c,d){var e;return e=this,function(f){var g;return g={},g.type=g.type||d,g.oauthio={provider:a,tokens:b,request:c},g.data=g.data||{},f&&(g.data.filter=f.join(",")),e.http_me(g)}},mkHttpAll:function(a,b,c){var d;return d=this,function(){var e,f,g,i;f={},f.type=c.method,f.url=h.oauthd_url+c.endpoint.replace(":provider",a),f.oauthio={provider:a,tokens:b},f.data={};for(e in arguments)i=arguments[e],g=c.params[e],null!=g&&(f.data[g.name]=i);return f.data=f.data||{},d.http_all(f,c,arguments)}},sendCallback:function(a,c){var d,e,f,h,i,j,k,l,m;d=this,e=void 0,h=void 0;try{e=JSON.parse(a.data)}catch(n){return f=n,c.reject(new Error("Error while parsing result")),a.callback(new Error("Error while parsing result"))}if(e&&e.provider){if(a.provider&&e.provider.toLowerCase()!==a.provider.toLowerCase())return h=new Error("Returned provider name does not match asked provider"),c.reject(h),a.callback&&"function"==typeof a.callback?a.callback(h):void 0;if("error"===e.status||"fail"===e.status)return h=new Error(e.message),h.body=e.data,c.reject(h),a.callback&&"function"==typeof a.callback?a.callback(h):void 0;if("success"!==e.status||!e.data)return h=new Error,h.body=e.data,c.reject(h),a.callback&&"function"==typeof a.callback?a.callback(h):void 0;for(e.state=e.state.replace(/\s+/g,""),i=0;i<b.length;)b[i]=b[i].replace(/\s+/g,""),i++;if(!e.state||-1===b.indexOf(e.state))return c.reject(new Error("State is not matching")),a.callback&&"function"==typeof a.callback?a.callback(new Error("State is not matching")):void 0;if(a.provider||(e.data.provider=e.provider),l=e.data,l.provider=e.provider.toLowerCase(),g.cacheEnabled(a.cache)&&l&&(a.expires&&!l.expires_in&&(l.expires_in=a.expires),g.storeCache(e.provider,l)),k=l.request,delete l.request,m=void 0,l.access_token?m={access_token:l.access_token}:l.oauth_token&&l.oauth_token_secret&&(m={oauth_token:l.oauth_token,oauth_token_secret:l.oauth_token_secret}),!k)return c.resolve(l),a.callback&&"function"==typeof a.callback?a.callback(null,l):void 0;if(k.required)for(i in k.required)m[k.required[i]]=l[k.required[i]];return j=function(a){return d.mkHttp(e.provider,m,k,a)},l.toJson=function(){var a;return a={},null!=l.access_token&&(a.access_token=l.access_token),null!=l.oauth_token&&(a.oauth_token=l.oauth_token),null!=l.oauth_token_secret&&(a.oauth_token_secret=l.oauth_token_secret),null!=l.expires_in&&(a.expires_in=l.expires_in),null!=l.token_type&&(a.token_type=l.token_type),null!=l.id_token&&(a.id_token=l.id_token),null!=l.provider&&(a.provider=l.provider),null!=l.email&&(a.email=l.email),a},l.get=j("GET"),l.post=j("POST"),l.put=j("PUT"),l.patch=j("PATCH"),l.del=j("DELETE"),l.me=d.mkHttpMe(e.provider,m,k,"GET"),this.retrieveMethods().then(function(b){return function(){return b.generateMethods(l,m,e.provider),c.resolve(l),a.callback&&"function"==typeof a.callback?a.callback(null,l):void 0}}(this)).fail(function(b){return function(b){return console.log("Could not retrieve methods",b),c.resolve(l),a.callback&&"function"==typeof a.callback?a.callback(null,l):void 0}}(this))}}}}},{"../tools/url":15}],7:[function(a,b,c){"use strict";b.exports=function(a){var b,c,d,e,f;return b=a.getJquery(),d=a.getConfig(),f=a.getStorage(),e=null,c=function(){function c(a){this.token=a.token,this.data=a.user,this.providers=a.providers,e=this.getEditableData()}return c.prototype.getEditableData=function(){var a,b;a=[];for(b in this.data)-1===["id","email"].indexOf(b)&&a.push({key:b,value:this.data[b]});return a},c.prototype.save=function(){var b,c,f,g,h,i,j,k;for(c={},f=0,i=e.length;i>f;f++)b=e[f],this.data[b.key]!==b.value&&(c[b.key]=this.data[b.key]),null===this.data[b.key]&&delete this.data[b.key];for(h=function(a){var b,c,d;for(b=0,c=e.length;c>b;b++)if(d=e[b],d.key===a)return!0;return!1},k=this.getEditableData(),g=0,j=k.length;j>g;g++)b=k[g],h(b.key)||(c[b.key]=this.data[b.key]);return this.saveLocal(),a.API.put("/api/usermanagement/user?k="+d.key+"&token="+this.token,c)},c.prototype.select=function(a){var b;return b=null},c.prototype.saveLocal=function(){var a;return a={token:this.token,user:this.data,providers:this.providers},f.erase("oio_auth"),f.create("oio_auth",JSON.stringify(a),21600)},c.prototype.hasProvider=function(a){var b;return-1!==(null!=(b=this.providers)?b.indexOf(a):void 0)},c.prototype.getProviders=function(){var c;return c=b.Deferred(),a.API.get("/api/usermanagement/user/providers?k="+d.key+"&token="+this.token).done(function(a){return function(b){return a.providers=b.data,a.saveLocal(),c.resolve(a.providers)}}(this)).fail(function(a){return c.reject(a)}),c.promise()},c.prototype.addProvider=function(c){var e;return e=b.Deferred(),"function"==typeof c.toJson&&(c=c.toJson()),c.email=this.data.email,this.providers.push(c.provider),a.API.post("/api/usermanagement/user/providers?k="+d.key+"&token="+this.token,c).done(function(a){return function(b){return a.data=b.data,a.saveLocal(),e.resolve()}}(this)).fail(function(a){return function(b){return a.providers.splice(a.providers.indexOf(c.provider),1),e.reject(b)}}(this)),e.promise()},c.prototype.removeProvider=function(c){var e;return e=b.Deferred(),this.providers.splice(this.providers.indexOf(c),1),a.API.del("/api/usermanagement/user/providers/"+c+"?k="+d.key+"&token="+this.token).done(function(a){return function(b){return a.saveLocal(),e.resolve(b)}}(this)).fail(function(a){return function(b){return a.providers.push(c),e.reject(b)}}(this)),e.promise()},c.prototype.changePassword=function(b,c){return a.API.post("/api/usermanagement/user/password?k="+d.key+"&token="+this.token,{password:c})},c.prototype.isLoggued=function(){return a.User.isLogged()},c.prototype.isLogged=function(){return a.User.isLogged()},c.prototype.logout=function(){var c;return c=b.Deferred(),f.erase("oio_auth"),a.API.post("/api/usermanagement/user/logout?k="+d.key+"&token="+this.token).done(function(){return c.resolve()}).fail(function(a){return c.reject(a)}),c.promise()},c}(),{initialize:function(b,c){return a.initialize(b,c)},setOAuthdURL:function(b){return a.setOAuthdURL(b)},signup:function(e){var g;return g=b.Deferred(),"function"==typeof e.toJson&&(e=e.toJson()),a.API.post("/api/usermanagement/signup?k="+d.key,e).done(function(a){return f.create("oio_auth",JSON.stringify(a.data),a.data.expires_in||21600),g.resolve(new c(a.data))}).fail(function(a){return g.reject(a)}),g.promise()},signin:function(e,g){var h,i;return h=b.Deferred(),"string"==typeof e||g?a.API.post("/api/usermanagement/signin?k="+d.key,{email:e,password:g}).done(function(a){return f.create("oio_auth",JSON.stringify(a.data),a.data.expires_in||21600),h.resolve(new c(a.data))}).fail(function(a){return h.reject(a)}):(i=e,"function"==typeof i.toJson&&(i=i.toJson()),a.API.post("/api/usermanagement/signin?k="+d.key,i).done(function(a){return f.create("oio_auth",JSON.stringify(a.data),a.data.expires_in||21600),h.resolve(new c(a.data))}).fail(function(a){return h.reject(a)})),h.promise()},confirmResetPassword:function(b,c){return a.API.post("/api/usermanagement/user/password?k="+d.key,{password:b,token:c})},resetPassword:function(b,c){return a.API.post("/api/usermanagement/user/password/reset?k="+d.key,{email:b})},refreshIdentity:function(){var e;return e=b.Deferred(),a.API.get("/api/usermanagement/user?k="+d.key+"&token="+JSON.parse(f.read("oio_auth")).token).done(function(a){return e.resolve(new c(a.data))}).fail(function(a){return e.reject(a)}),e.promise()},getIdentity:function(){var a;return a=f.read("oio_auth"),a?new c(JSON.parse(a)):null},isLogged:function(){var a;return a=f.read("oio_auth"),a?!0:!1}}}},{}],8:[function(b,c,d){!function(){var e,f;return f=b("./tools/jquery-lite.js"),e=b("./lib/core")(window,document,f,navigator),e.extend("OAuth",b("./lib/oauth")),e.extend("API",b("./lib/api")),e.extend("User",b("./lib/user")),"undefined"!=typeof angular&&null!==angular&&angular.module("oauthio",[]).factory("Materia",[function(){return e}]).factory("OAuth",[function(){return e.OAuth}]).factory("User",[function(){return e.User}]),window.Materia=d.Materia=e,window.User=d.User=d.Materia.User,window.OAuth=d.OAuth=d.Materia.OAuth,"function"==typeof a&&a.amd&&a(function(){return d}),("undefined"!=typeof c&&null!==c?c.exports:void 0)&&(c.exports=d),d}()},{"./lib/api":2,"./lib/core":3,"./lib/oauth":4,"./lib/user":7,"./tools/jquery-lite.js":11}],9:[function(a,b,c){"use strict";b.exports={init:function(a,b){return this.config=b,this.storage=a},tryCache:function(a,b,c){var d,e,f;if(this.cacheEnabled(c)){if(c=this.storage.read("oauthio_provider_"+b),!c)return!1;c=decodeURIComponent(c)}if("string"==typeof c)try{c=JSON.parse(c)}catch(g){return d=g,!1}if("object"==typeof c){f={};for(e in c)"request"!==e&&"function"!=typeof c[e]&&(f[e]=c[e]);return a.create(b,f,c.request)}return!1},storeCache:function(a,b){var c;c=3600,b.expires_in?c=b.expires_in:(this.config.options.expires||this.config.options.expires===!1)&&(c=this.config.options.expires),this.storage.create("oauthio_provider_"+a,encodeURIComponent(JSON.stringify(b)),c)},cacheEnabled:function(a){return"undefined"==typeof a?this.config.options.cache:a},clearCache:function(a){a?this.storage.erase("oauthio_provider_"+a):this.storage.eraseFrom("oauthio_provider_")}}},{}],10:[function(a,b,c){"use strict";b.exports={init:function(a,b){return this.config=a,this.document=b},create:function(a,b,c){var d;this.erase(a),d=new Date,c?d.setTime(d.getTime()+1e3*(c||1200)):d.setFullYear(d.getFullYear()+3),c="; expires="+d.toGMTString(),this.document.cookie=a+"="+b+c+"; path=/"},read:function(a){var b,c,d,e;for(e=a+"=",c=this.document.cookie.split(";"),d=0;d<c.length;){for(b=c[d];" "===b.charAt(0);)b=b.substring(1,b.length);if(0===b.indexOf(e))return b.substring(e.length,b.length);d++}return null},erase:function(a){var b;b=new Date,b.setTime(b.getTime()-864e5),this.document.cookie=a+"=; expires="+b.toGMTString()+"; path=/"},eraseFrom:function(a){var b,c,d,e,f;for(d=this.document.cookie.split(";"),e=0,f=d.length;f>e;e++)c=d[e],b=c.split("=")[0].trim(),b.substr(0,a.length)===a&&this.erase(b)}}},{}],11:[function(a,b,c){!function(a,c){"object"==typeof b&&"object"==typeof b.exports?b.exports=a.document?c(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return c(a)}:c(a)}("undefined"!=typeof window?window:this,function(a,b){function c(a){var b=a.length,c=B.type(a);return"function"===c||B.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}function d(a){var b=L[a]={};return B.each(a.match(K)||[],function(a,c){b[c]=!0}),b}function e(){z.removeEventListener("DOMContentLoaded",e,!1),a.removeEventListener("load",e,!1),B.ready()}function f(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=B.expando+Math.random()}function g(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(Q,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:P.test(c)?B.parseJSON(c):c}catch(e){}data_user.set(a,b,c)}else c=void 0;return c}function h(){return!0}function i(){return!1}function j(){try{return z.activeElement}catch(a){}}function k(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(K)||[];if(B.isFunction(c))for(;d=f[e++];)"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function l(a,b,c,d){function e(h){var i;return f[h]=!0,B.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||g||f[j]?g?!(i=j):void 0:(b.dataTypes.unshift(j),e(j),!1)}),i}var f={},g=a===ga;return e(b.dataTypes[0])||!f["*"]&&e("*")}function m(a,b){var c,d,e=B.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&B.extend(!0,a,d),a}function n(a,b,c){for(var d,e,f,g,h=a.contents,i=a.dataTypes;"*"===i[0];)i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function o(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];for(f=k.shift();f;)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}function p(a,b,c,d){var e;if(B.isArray(b))B.each(b,function(b,e){c||ka.test(a)?d(a,e):p(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==B.type(b))d(a,b);else for(e in b)p(a+"["+e+"]",b[e],c,d)}var q=[],r=q.slice,s=q.concat,t=q.push,u=q.indexOf,v={},w=v.toString,x=v.hasOwnProperty,y={},z=a.document,A="2.1.1 -attributes,-attributes/attr,-attributes/classes,-attributes/prop,-attributes/support,-attributes/val,-css/addGetHookIf,-css/curCSS,-css/defaultDisplay,-css/hiddenVisibleSelectors,-css/support,-css/swap,-css/var,-css/var/cssExpand,-css/var/getStyles,-css/var/isHidden,-css/var/rmargin,-css/var/rnumnonpx,-css,-effects,-effects/Tween,-effects/animatedSelector,-dimensions,-offset,-data/var/data_user,-deprecated,-event/alias,-event/support,-intro,-manipulation/_evalUrl,-manipulation/support,-manipulation/var,-manipulation/var/rcheckableType,-manipulation,-outro,-queue,-queue/delay,-selector-native,-selector-sizzle,-sizzle/dist,-sizzle/dist/sizzle,-sizzle/dist/min,-sizzle/test,-sizzle/test/jquery,-traversing,-traversing/findFilter,-traversing/var/rneedsContext,-traversing/var,-wrap,-exports,-exports/amd",B=function(a,b){return new B.fn.init(a,b)},C=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,D=/^-ms-/,E=/-([\da-z])/gi,F=function(a,b){return b.toUpperCase()};B.fn=B.prototype={jquery:A,constructor:B,selector:"",length:0,toArray:function(){return r.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:r.call(this)},pushStack:function(a){var b=B.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return B.each(this,a,b)},map:function(a){return this.pushStack(B.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(r.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:t,sort:q.sort,splice:q.splice},B.extend=B.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||B.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(B.isPlainObject(d)||(e=B.isArray(d)))?(e?(e=!1,f=c&&B.isArray(c)?c:[]):f=c&&B.isPlainObject(c)?c:{},g[b]=B.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},B.extend({expando:"jQuery"+(A+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===B.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return!B.isArray(a)&&a-parseFloat(a)>=0},isPlainObject:function(a){return"object"!==B.type(a)||a.nodeType||B.isWindow(a)?!1:a.constructor&&!x.call(a.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?v[w.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=B.trim(a),a&&(1===a.indexOf("use strict")?(b=z.createElement("script"),b.text=a,z.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(D,"ms-").replace(E,F)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,d){var e,f=0,g=a.length,h=c(a);if(d){if(h)for(;g>f&&(e=b.apply(a[f],d),e!==!1);f++);else for(f in a)if(e=b.apply(a[f],d),e===!1)break}else if(h)for(;g>f&&(e=b.call(a[f],f,a[f]),e!==!1);f++);else for(f in a)if(e=b.call(a[f],f,a[f]),e===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(C,"")},makeArray:function(a,b){var d=b||[];return null!=a&&(c(Object(a))?B.merge(d,"string"==typeof a?[a]:a):t.call(d,a)),d},inArray:function(a,b,c){return null==b?-1:u.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,d){var e,f=0,g=a.length,h=c(a),i=[];if(h)for(;g>f;f++)e=b(a[f],f,d),null!=e&&i.push(e);else for(f in a)e=b(a[f],f,d),null!=e&&i.push(e);return s.apply([],i)},guid:1,proxy:function(a,b){var c,d,e;return"string"==typeof b&&(c=a[b],b=a,a=c),B.isFunction(a)?(d=r.call(arguments,2),e=function(){return a.apply(b||this,d.concat(r.call(arguments)))},e.guid=a.guid=a.guid||B.guid++,e):void 0},now:Date.now,support:y}),B.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){v["[object "+b+"]"]=b.toLowerCase()});var G,H=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,I=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,J=B.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:I.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||G).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof B?b[0]:b,B.merge(this,B.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:z,!0)),H.test(c[1])&&B.isPlainObject(b))for(c in b)B.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=z.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=z,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,
	this.length=1,this):B.isFunction(a)?"undefined"!=typeof G.ready?G.ready(a):a(B):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),B.makeArray(a,this))};J.prototype=B.fn,G=B(z);var K=/\S+/g,L={};B.Callbacks=function(a){a="string"==typeof a?L[a]||d(a):B.extend({},a);var b,c,e,f,g,h,i=[],j=!a.once&&[],k=function(d){for(b=a.memory&&d,c=!0,h=f||0,f=0,g=i.length,e=!0;i&&g>h;h++)if(i[h].apply(d[0],d[1])===!1&&a.stopOnFalse){b=!1;break}e=!1,i&&(j?j.length&&k(j.shift()):b?i=[]:l.disable())},l={add:function(){if(i){var c=i.length;!function d(b){B.each(b,function(b,c){var e=B.type(c);"function"===e?a.unique&&l.has(c)||i.push(c):c&&c.length&&"string"!==e&&d(c)})}(arguments),e?g=i.length:b&&(f=c,k(b))}return this},remove:function(){return i&&B.each(arguments,function(a,b){for(var c;(c=B.inArray(b,i,c))>-1;)i.splice(c,1),e&&(g>=c&&g--,h>=c&&h--)}),this},has:function(a){return a?B.inArray(a,i)>-1:!(!i||!i.length)},empty:function(){return i=[],g=0,this},disable:function(){return i=j=b=void 0,this},disabled:function(){return!i},lock:function(){return j=void 0,b||l.disable(),this},locked:function(){return!j},fireWith:function(a,b){return!i||c&&!j||(b=b||[],b=[a,b.slice?b.slice():b],e?j.push(b):k(b)),this},fire:function(){return l.fireWith(this,arguments),this},fired:function(){return!!c}};return l},B.extend({Deferred:function(a){var b=[["resolve","done",B.Callbacks("once memory"),"resolved"],["reject","fail",B.Callbacks("once memory"),"rejected"],["notify","progress",B.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return B.Deferred(function(c){B.each(b,function(b,f){var g=B.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&B.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?B.extend(a,d):d}},e={};return d.pipe=d.then,B.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b,c,d,e=0,f=r.call(arguments),g=f.length,h=1!==g||a&&B.isFunction(a.promise)?g:0,i=1===h?a:B.Deferred(),j=function(a,c,d){return function(e){c[a]=this,d[a]=arguments.length>1?r.call(arguments):e,d===b?i.notifyWith(c,d):--h||i.resolveWith(c,d)}};if(g>1)for(b=new Array(g),c=new Array(g),d=new Array(g);g>e;e++)f[e]&&B.isFunction(f[e].promise)?f[e].promise().done(j(e,d,f)).fail(i.reject).progress(j(e,c,b)):--h;return h||i.resolveWith(d,f),i.promise()}});var M;B.fn.ready=function(a){return B.ready.promise().done(a),this},B.extend({isReady:!1,readyWait:1,holdReady:function(a){a?B.readyWait++:B.ready(!0)},ready:function(a){(a===!0?--B.readyWait:B.isReady)||(B.isReady=!0,a!==!0&&--B.readyWait>0||(M.resolveWith(z,[B]),B.fn.triggerHandler&&(B(z).triggerHandler("ready"),B(z).off("ready"))))}}),B.ready.promise=function(b){return M||(M=B.Deferred(),"complete"===z.readyState?setTimeout(B.ready):(z.addEventListener("DOMContentLoaded",e,!1),a.addEventListener("load",e,!1))),M.promise(b)},B.ready.promise();var N=B.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===B.type(c)){e=!0;for(h in c)B.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,B.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(B(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};B.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType},f.uid=1,f.accepts=B.acceptData,f.prototype={key:function(a){if(!f.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=f.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,B.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(B.isEmptyObject(f))B.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,B.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{B.isArray(b)?d=b.concat(b.map(B.camelCase)):(e=B.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(K)||[])),c=d.length;for(;c--;)delete g[d[c]]}},hasData:function(a){return!B.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var O=new f,P=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Q=/([A-Z])/g;B.extend({hasData:function(a){return data_user.hasData(a)||O.hasData(a)},data:function(a,b,c){return data_user.access(a,b,c)},removeData:function(a,b){data_user.remove(a,b)},_data:function(a,b,c){return O.access(a,b,c)},_removeData:function(a,b){O.remove(a,b)}}),B.fn.extend({data:function(a,b){var c,d,e,f=this[0],h=f&&f.attributes;if(void 0===a){if(this.length&&(e=data_user.get(f),1===f.nodeType&&!O.get(f,"hasDataAttrs"))){for(c=h.length;c--;)h[c]&&(d=h[c].name,0===d.indexOf("data-")&&(d=B.camelCase(d.slice(5)),g(f,d,e[d])));O.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){data_user.set(this,a)}):N(this,function(b){var c,d=B.camelCase(a);if(f&&void 0===b){if(c=data_user.get(f,a),void 0!==c)return c;if(c=data_user.get(f,d),void 0!==c)return c;if(c=g(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=data_user.get(this,d);data_user.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&data_user.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){data_user.remove(this,a)})}});var R=(/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,"undefined"),S=/^key/,T=/^(?:mouse|pointer|contextmenu)|click/,U=/^(?:focusinfocus|focusoutblur)$/,V=/^([^.]*)(?:\.(.+)|)$/;B.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=O.get(a);if(q)for(c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=B.guid++),(i=q.events)||(i=q.events={}),(g=q.handle)||(g=q.handle=function(b){return typeof B!==R&&B.event.triggered!==b.type?B.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(K)||[""],j=b.length;j--;)h=V.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n&&(l=B.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=B.event.special[n]||{},k=B.extend({type:n,origType:p,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&B.expr.match.needsContext.test(e),namespace:o.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,o,g)!==!1||a.addEventListener&&a.addEventListener(n,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),B.event.global[n]=!0)},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=O.hasData(a)&&O.get(a);if(q&&(i=q.events)){for(b=(b||"").match(K)||[""],j=b.length;j--;)if(h=V.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n){for(l=B.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+o.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;f--;)k=m[f],!e&&p!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,o,q.handle)!==!1||B.removeEvent(a,n,q.handle),delete i[n])}else for(n in i)B.event.remove(a,n+b[j],c,d,!0);B.isEmptyObject(i)&&(delete q.handle,O.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,j,k,l,m=[d||z],n=x.call(b,"type")?b.type:b,o=x.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||z,3!==d.nodeType&&8!==d.nodeType&&!U.test(n+B.event.triggered)&&(n.indexOf(".")>=0&&(o=n.split("."),n=o.shift(),o.sort()),j=n.indexOf(":")<0&&"on"+n,b=b[B.expando]?b:new B.Event(n,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=o.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+o.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:B.makeArray(c,[b]),l=B.event.special[n]||{},e||!l.trigger||l.trigger.apply(d,c)!==!1)){if(!e&&!l.noBubble&&!B.isWindow(d)){for(i=l.delegateType||n,U.test(i+n)||(g=g.parentNode);g;g=g.parentNode)m.push(g),h=g;h===(d.ownerDocument||z)&&m.push(h.defaultView||h.parentWindow||a)}for(f=0;(g=m[f++])&&!b.isPropagationStopped();)b.type=f>1?i:l.bindType||n,k=(O.get(g,"events")||{})[b.type]&&O.get(g,"handle"),k&&k.apply(g,c),k=j&&g[j],k&&k.apply&&B.acceptData(g)&&(b.result=k.apply(g,c),b.result===!1&&b.preventDefault());return b.type=n,e||b.isDefaultPrevented()||l._default&&l._default.apply(m.pop(),c)!==!1||!B.acceptData(d)||j&&B.isFunction(d[n])&&!B.isWindow(d)&&(h=d[j],h&&(d[j]=null),B.event.triggered=n,d[n](),B.event.triggered=void 0,h&&(d[j]=h)),b.result}},dispatch:function(a){a=B.event.fix(a);var b,c,d,e,f,g=[],h=r.call(arguments),i=(O.get(this,"events")||{})[a.type]||[],j=B.event.special[a.type]||{};if(h[0]=a,a.delegateTarget=this,!j.preDispatch||j.preDispatch.call(this,a)!==!1){for(g=B.event.handlers.call(this,a,i),b=0;(e=g[b++])&&!a.isPropagationStopped();)for(a.currentTarget=e.elem,c=0;(f=e.handlers[c++])&&!a.isImmediatePropagationStopped();)(!a.namespace_re||a.namespace_re.test(f.namespace))&&(a.handleObj=f,a.data=f.data,d=((B.event.special[f.origType]||{}).handle||f.handler).apply(e.elem,h),void 0!==d&&(a.result=d)===!1&&(a.preventDefault(),a.stopPropagation()));return j.postDispatch&&j.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?B(e,this).index(i)>=0:B.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||z,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[B.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];for(g||(this.fixHooks[e]=g=T.test(e)?this.mouseHooks:S.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new B.Event(f),b=d.length;b--;)c=d[b],a[c]=f[c];return a.target||(a.target=z),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==j()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===j()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&B.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return B.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=B.extend(new B.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?B.event.trigger(e,null,b):B.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},B.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},B.Event=function(a,b){return this instanceof B.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?h:i):this.type=a,b&&B.extend(this,b),this.timeStamp=a&&a.timeStamp||B.now(),void(this[B.expando]=!0)):new B.Event(a,b)},B.Event.prototype={isDefaultPrevented:i,isPropagationStopped:i,isImmediatePropagationStopped:i,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=h,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=h,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=h,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},B.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){B.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!B.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),y.focusinBubbles||B.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){B.event.simulate(b,a.target,B.event.fix(a),!0)};B.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=O.access(d,b);e||d.addEventListener(a,c,!0),O.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=O.access(d,b)-1;e?O.access(d,b,e):(d.removeEventListener(a,c,!0),O.remove(d,b))}}}),B.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=i;else if(!d)return this;return 1===e&&(f=d,d=function(a){return B().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=B.guid++)),this.each(function(){B.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,B(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=i),this.each(function(){B.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){B.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?B.event.trigger(a,b,c,!0):void 0}});var W=B.now(),X=/\?/;B.parseJSON=function(a){return JSON.parse(a+"")},B.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&B.error("Invalid XML: "+a),b};var Y,Z,$=/#.*$/,_=/([?&])_=[^&]*/,aa=/^(.*?):[ \t]*([^\r\n]*)$/gm,ba=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,ca=/^(?:GET|HEAD)$/,da=/^\/\//,ea=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,fa={},ga={},ha="*/".concat("*");try{Z=location.href}catch(ia){Z=z.createElement("a"),Z.href="",Z=Z.href}Y=ea.exec(Z.toLowerCase())||[],B.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Z,type:"GET",isLocal:ba.test(Y[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":ha,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":B.parseJSON,"text xml":B.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?m(m(a,B.ajaxSettings),b):m(B.ajaxSettings,a)},ajaxPrefilter:k(fa),ajaxTransport:k(ga),ajax:function(a,b){function c(a,b,c,g){var i,k,l,u,v,x=b;2!==w&&(w=2,h&&clearTimeout(h),d=void 0,f=g||"",y.readyState=a>0?4:0,i=a>=200&&300>a||304===a,c&&(u=n(m,y,c)),u=o(m,u,y,i),i?(m.ifModified&&(v=y.getResponseHeader("Last-Modified"),v&&(B.lastModified[e]=v),v=y.getResponseHeader("etag"),v&&(B.etag[e]=v)),204===a||"HEAD"===m.type?x="nocontent":304===a?x="notmodified":(x=u.state,k=u.data,l=u.error,i=!l)):(l=x,(a||!x)&&(x="error",0>a&&(a=0))),y.status=a,y.statusText=(b||x)+"",i?r.resolveWith(p,[k,x,y]):r.rejectWith(p,[y,x,l]),y.statusCode(t),t=void 0,j&&q.trigger(i?"ajaxSuccess":"ajaxError",[y,m,i?k:l]),s.fireWith(p,[y,x]),j&&(q.trigger("ajaxComplete",[y,m]),--B.active||B.event.trigger("ajaxStop")))}"object"==typeof a&&(b=a,a=void 0),b=b||{};var d,e,f,g,h,i,j,k,m=B.ajaxSetup({},b),p=m.context||m,q=m.context&&(p.nodeType||p.jquery)?B(p):B.event,r=B.Deferred(),s=B.Callbacks("once memory"),t=m.statusCode||{},u={},v={},w=0,x="canceled",y={readyState:0,getResponseHeader:function(a){var b;if(2===w){if(!g)for(g={};b=aa.exec(f);)g[b[1].toLowerCase()]=b[2];b=g[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===w?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return w||(a=v[c]=v[c]||a,u[a]=b),this},overrideMimeType:function(a){return w||(m.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>w)for(b in a)t[b]=[t[b],a[b]];else y.always(a[y.status]);return this},abort:function(a){var b=a||x;return d&&d.abort(b),c(0,b),this}};if(r.promise(y).complete=s.add,y.success=y.done,y.error=y.fail,m.url=((a||m.url||Z)+"").replace($,"").replace(da,Y[1]+"//"),m.type=b.method||b.type||m.method||m.type,m.dataTypes=B.trim(m.dataType||"*").toLowerCase().match(K)||[""],null==m.crossDomain&&(i=ea.exec(m.url.toLowerCase()),m.crossDomain=!(!i||i[1]===Y[1]&&i[2]===Y[2]&&(i[3]||("http:"===i[1]?"80":"443"))===(Y[3]||("http:"===Y[1]?"80":"443")))),m.data&&m.processData&&"string"!=typeof m.data&&(m.data=B.param(m.data,m.traditional)),l(fa,m,b,y),2===w)return y;j=m.global,j&&0===B.active++&&B.event.trigger("ajaxStart"),m.type=m.type.toUpperCase(),m.hasContent=!ca.test(m.type),e=m.url,m.hasContent||(m.data&&(e=m.url+=(X.test(e)?"&":"?")+m.data,delete m.data),m.cache===!1&&(m.url=_.test(e)?e.replace(_,"$1_="+W++):e+(X.test(e)?"&":"?")+"_="+W++)),m.ifModified&&(B.lastModified[e]&&y.setRequestHeader("If-Modified-Since",B.lastModified[e]),B.etag[e]&&y.setRequestHeader("If-None-Match",B.etag[e])),(m.data&&m.hasContent&&m.contentType!==!1||b.contentType)&&y.setRequestHeader("Content-Type",m.contentType),y.setRequestHeader("Accept",m.dataTypes[0]&&m.accepts[m.dataTypes[0]]?m.accepts[m.dataTypes[0]]+("*"!==m.dataTypes[0]?", "+ha+"; q=0.01":""):m.accepts["*"]);for(k in m.headers)y.setRequestHeader(k,m.headers[k]);if(m.beforeSend&&(m.beforeSend.call(p,y,m)===!1||2===w))return y.abort();x="abort";for(k in{success:1,error:1,complete:1})y[k](m[k]);if(d=l(ga,m,b,y)){y.readyState=1,j&&q.trigger("ajaxSend",[y,m]),m.async&&m.timeout>0&&(h=setTimeout(function(){y.abort("timeout")},m.timeout));try{w=1,d.send(u,c)}catch(z){if(!(2>w))throw z;c(-1,z)}}else c(-1,"No Transport");return y},getJSON:function(a,b,c){return B.get(a,b,c,"json")},getScript:function(a,b){return B.get(a,void 0,b,"script")}}),B.each(["get","post"],function(a,b){B[b]=function(a,c,d,e){return B.isFunction(c)&&(e=e||d,d=c,c=void 0),B.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),B.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){B.fn[b]=function(a){return this.on(b,a)}});var ja=/%20/g,ka=/\[\]$/,la=/\r?\n/g,ma=/^(?:submit|button|image|reset|file)$/i,na=/^(?:input|select|textarea|keygen)/i;B.param=function(a,b){var c,d=[],e=function(a,b){b=B.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=B.ajaxSettings&&B.ajaxSettings.traditional),B.isArray(a)||a.jquery&&!B.isPlainObject(a))B.each(a,function(){e(this.name,this.value)});else for(c in a)p(c,a[c],b,e);return d.join("&").replace(ja,"+")},B.fn.extend({serialize:function(){return B.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=B.prop(this,"elements");return a?B.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!B(this).is(":disabled")&&na.test(this.nodeName)&&!ma.test(a)&&(this.checked||!rcheckableType.test(a))}).map(function(a,b){var c=B(this).val();return null==c?null:B.isArray(c)?B.map(c,function(a){return{name:b.name,value:a.replace(la,"\r\n")}}):{name:b.name,value:c.replace(la,"\r\n")}}).get()}}),B.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var oa=0,pa={},qa={0:200,1223:204},ra=B.ajaxSettings.xhr();a.ActiveXObject&&B(a).on("unload",function(){for(var a in pa)pa[a]()}),y.cors=!!ra&&"withCredentials"in ra,y.ajax=ra=!!ra,B.ajaxTransport(function(a){var b;return y.cors||ra&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++oa;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete pa[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(qa[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=pa[g]=b("abort");try{f.send(a.hasContent&&a.data||null)}catch(h){if(b)throw h}},abort:function(){b&&b()}}:void 0}),B.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return B.globalEval(a),a}}}),B.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),B.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=B("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),z.head.appendChild(b[0])},abort:function(){c&&c()}}}});var sa=[],ta=/(=)\?(?=&|$)|\?\?/;B.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=sa.pop()||B.expando+"_"+W++;return this[a]=!0,a}}),B.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(ta.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&ta.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=B.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(ta,"$1"+e):b.jsonp!==!1&&(b.url+=(X.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||B.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,sa.push(e)),g&&B.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),B.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||z;var d=H.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=B.buildFragment([a],b,e),e&&e.length&&B(e).remove(),B.merge([],d.childNodes))};var ua=B.fn.load;return B.fn.load=function(a,b,c){if("string"!=typeof a&&ua)return ua.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=B.trim(a.slice(h)),a=a.slice(0,h)),B.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&B.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?B("<div>").append(B.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},B.noConflict=function(){},B})},{}],12:[function(a,b,c){"use strict";b.exports=function(a){return{reload:function(){return a.location.reload()},getHash:function(){return a.location.hash},setHash:function(b){return a.location.hash=b},changeHref:function(b){return a.location.href=b}}}},{}],13:[function(a,b,c){"use strict";var d;d=function(a){var b;return b=localStorage.getItem("oauthio_cache"),b=b?JSON.parse(b):{},a(b,function(){return localStorage.setItem("oauthio_cache",JSON.stringify(b))})},b.exports={init:function(a,b){return this.config=a,this.document=b},active:function(){return"undefined"!=typeof localStorage&&null!==localStorage},create:function(a,b,c){var e;this.erase(a),e=new Date,localStorage.setItem(a,b),d(function(b,d){return b[a]=null!=c?c:e.getTime()+(c||1200)*{1e3:!1},d()})},read:function(a){return d(function(b,c){return null==b[a]?null:b[a]===!1?localStorage.getItem(a):(new Date).getTime()<b[a]?(localStorage.removeItem(a),delete b[a],c(),null):localStorage.getItem(a)})},erase:function(a){return d(function(b,c){return localStorage.removeItem(a),delete b[a],c()})},eraseFrom:function(a){d(function(b,c){var d,e,f,g;for(d=Object.keys(b),e=0,f=d.length;f>e;e++)g=d[e],g.substr(0,a.length)===a&&(localStorage.removeItem(g),delete b[g]);return c()})}}},{}],14:[function(a,b,c){var d,e;e=0,d="",b.exports={hex_sha1:function(a){return this.rstr2hex(this.rstr_sha1(this.str2rstr_utf8(a)))},b64_sha1:function(a){return this.rstr2b64(this.rstr_sha1(this.str2rstr_utf8(a)))},any_sha1:function(a,b){return this.rstr2any(this.rstr_sha1(this.str2rstr_utf8(a)),b)},hex_hmac_sha1:function(a,b){return this.rstr2hex(this.rstr_hmac_sha1(this.str2rstr_utf8(a),this.str2rstr_utf8(b)))},b64_hmac_sha1:function(a,b){return this.rstr2b64(this.rstr_hmac_sha1(this.str2rstr_utf8(a),this.str2rstr_utf8(b)))},any_hmac_sha1:function(a,b,c){return this.rstr2any(this.rstr_hmac_sha1(this.str2rstr_utf8(a),this.str2rstr_utf8(b)),c)},sha1_vm_test:function(){return"a9993e364706816aba3e25717850c26c9cd0d89d"===thishex_sha1("abc").toLowerCase()},rstr_sha1:function(a){return this.binb2rstr(this.binb_sha1(this.rstr2binb(a),8*a.length))},rstr_hmac_sha1:function(a,b){var c,d,e,f,g;for(c=this.rstr2binb(a),c.length>16&&(c=this.binb_sha1(c,8*a.length)),f=Array(16),g=Array(16),e=0;16>e;)f[e]=909522486^c[e],g[e]=1549556828^c[e],e++;return d=this.binb_sha1(f.concat(this.rstr2binb(b)),512+8*b.length),this.binb2rstr(this.binb_sha1(g.concat(d),672))},rstr2hex:function(a){var b,c,d,f,g;try{}catch(h){b=h,e=0}for(c=e?"0123456789ABCDEF":"0123456789abcdef",f="",g=void 0,d=0;d<a.length;)g=a.charCodeAt(d),f+=c.charAt(g>>>4&15)+c.charAt(15&g),d++;return f},rstr2b64:function(a){var b,c,e,f,g,h,i;try{}catch(j){b=j,d=""}for(h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",g="",f=a.length,c=0;f>c;){for(i=a.charCodeAt(c)<<16|(f>c+1?a.charCodeAt(c+1)<<8:0)|(f>c+2?a.charCodeAt(c+2):0),e=0;4>e;)g+=8*c+6*e>8*a.length?d:h.charAt(i>>>6*(3-e)&63),e++;c+=3}return g},rstr2any:function(a,b){var c,d,e,f,g,h,i,j,k;for(d=b.length,j=Array(),f=void 0,h=void 0,k=void 0,i=void 0,c=Array(Math.ceil(a.length/2)),f=0;f<c.length;)c[f]=a.charCodeAt(2*f)<<8|a.charCodeAt(2*f+1),f++;for(;c.length>0;){for(i=Array(),k=0,f=0;f<c.length;)k=(k<<16)+c[f],h=Math.floor(k/d),k-=h*d,(i.length>0||h>0)&&(i[i.length]=h),f++;j[j.length]=k,c=i}for(g="",f=j.length-1;f>=0;)g+=b.charAt(j[f]),f--;for(e=Math.ceil(8*a.length/(Math.log(b.length)/Math.log(2))),f=g.length;e>f;)g=b[0]+g,f++;return g},str2rstr_utf8:function(a){var b,c,d,e;for(c="",b=-1,d=void 0,e=void 0;++b<a.length;)d=a.charCodeAt(b),e=b+1<a.length?a.charCodeAt(b+1):0,d>=55296&&56319>=d&&e>=56320&&57343>=e&&(d=65536+((1023&d)<<10)+(1023&e),b++),127>=d?c+=String.fromCharCode(d):2047>=d?c+=String.fromCharCode(192|d>>>6&31,128|63&d):65535>=d?c+=String.fromCharCode(224|d>>>12&15,128|d>>>6&63,128|63&d):2097151>=d&&(c+=String.fromCharCode(240|d>>>18&7,128|d>>>12&63,128|d>>>6&63,128|63&d));return c},str2rstr_utf16le:function(a){var b,c;for(c="",b=0;b<a.length;)c+=String.fromCharCode(255&a.charCodeAt(b),a.charCodeAt(b)>>>8&255),b++;return c},str2rstr_utf16be:function(a){var b,c;for(c="",b=0;b<a.length;)c+=String.fromCharCode(a.charCodeAt(b)>>>8&255,255&a.charCodeAt(b)),b++;return c},rstr2binb:function(a){var b,c;for(c=Array(a.length>>2),b=0;b<c.length;)c[b]=0,b++;for(b=0;b<8*a.length;)c[b>>5]|=(255&a.charCodeAt(b/8))<<24-b%32,b+=8;return c},binb2rstr:function(a){var b,c;for(c="",b=0;b<32*a.length;)c+=String.fromCharCode(a[b>>5]>>>24-b%32&255),b+=8;return c},binb_sha1:function(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p;for(a[b>>5]|=128<<24-b%32,a[(b+64>>9<<4)+15]=b,p=Array(80),c=1732584193,d=-271733879,e=-1732584194,f=271733878,g=-1009589776,h=0;h<a.length;){for(j=c,k=d,l=e,m=f,n=g,i=0;80>i;)16>i?p[i]=a[h+i]:p[i]=this.bit_rol(p[i-3]^p[i-8]^p[i-14]^p[i-16],1),o=this.safe_add(this.safe_add(this.bit_rol(c,5),this.sha1_ft(i,d,e,f)),this.safe_add(this.safe_add(g,p[i]),this.sha1_kt(i))),g=f,f=e,e=this.bit_rol(d,30),d=c,c=o,i++;c=this.safe_add(c,j),d=this.safe_add(d,k),e=this.safe_add(e,l),f=this.safe_add(f,m),g=this.safe_add(g,n),h+=16}return Array(c,d,e,f,g)},sha1_ft:function(a,b,c,d){return 20>a?b&c|~b&d:40>a?b^c^d:60>a?b&c|b&d|c&d:b^c^d},sha1_kt:function(a){return 20>a?1518500249:40>a?1859775393:60>a?-1894007588:-899497514},safe_add:function(a,b){var c,d;return c=(65535&a)+(65535&b),d=(a>>16)+(b>>16)+(c>>16),d<<16|65535&c},bit_rol:function(a,b){return a<<b|a>>>32-b},create_hash:function(){var a;return a=this.b64_sha1((new Date).getTime()+":"+Math.floor(9999999*Math.random())),a.replace(/\+/g,"-").replace(/\//g,"_").replace(/\=+$/,"")}}},{}],15:[function(a,b,c){b.exports=function(a){return{getAbsUrl:function(b){var c;return b.match(/^.{2,5}:\/\//)?b:"/"===b[0]?a.location.protocol+"//"+a.location.host+b:(c=a.location.protocol+"//"+a.location.host+a.location.pathname,"/"!==c[c.length-1]&&"#"!==b[0]?c+"/"+b:c+b)},replaceParam:function(a,b,c){return a=a.replace(/\{\{(.*?)\}\}/g,function(a,c){return b[c]||""}),c&&(a=a.replace(/\{(.*?)\}/g,function(a,b){return c[b]||""})),a}}}},{}]},{},[8])(8)});

/***/ },
/* 359 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Emitter = __webpack_require__(360);
	var reduce = __webpack_require__(361);

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
	  this._formData.append(field, file, filename || file.name);
	  return this;
	};

	/**
	 * Send `data` as the request body, defaulting the `.type()` to "json" when
	 * an object is given.
	 *
	 * Examples:
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
	    e.direction = 'download';
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

	request['del'] = del;
	request['delete'] = del;

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
/* 360 */
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
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
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
	  function on() {
	    this.off(event, on);
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
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
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
	    , callbacks = this._callbacks['$' + event];

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
	  return this._callbacks['$' + event] || [];
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
/* 361 */
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

/***/ },
/* 362 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }
/******/ ])
});
;