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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _has = __webpack_require__(160);

	var _has2 = _interopRequireDefault(_has);

	var _every = __webpack_require__(157);

	var _every2 = _interopRequireDefault(_every);

	var _isArray = __webpack_require__(1);

	var _isArray2 = _interopRequireDefault(_isArray);

	var _some = __webpack_require__(171);

	var _some2 = _interopRequireDefault(_some);

	var _isString = __webpack_require__(9);

	var _isString2 = _interopRequireDefault(_isString);

	var _isObject = __webpack_require__(2);

	var _isObject2 = _interopRequireDefault(_isObject);

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(12);

	var _config2 = _interopRequireDefault(_config);

	var _logger = __webpack_require__(3);

	var _logger2 = _interopRequireDefault(_logger);

	var _dom = __webpack_require__(36);

	var dom = _interopRequireWildcard(_dom);

	var _request = __webpack_require__(38);

	var request = _interopRequireWildcard(_request);

	var _providerAuth = __webpack_require__(70);

	var ProviderAuth = _interopRequireWildcard(_providerAuth);

	var _token = __webpack_require__(39);

	var _token2 = _interopRequireDefault(_token);

	var _envStorage = __webpack_require__(37);

	var envStorage = _interopRequireWildcard(_envStorage);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Matter = function () {
	  /** Constructor
	   * @param {String|Object} project Project name or object containing project name and owner
	   */

	  function Matter(project, opts) {
	    _classCallCheck(this, Matter);

	    if (!project) {
	      _logger2.default.error({
	        description: 'Project name required to use Matter.',
	        func: 'constructor', obj: 'Matter'
	      });
	      throw new Error('Project name is required to use Matter');
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
	    }
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
	   *   console.log('There is currently an account logged in.')
	   * } else {
	   *   console.warn('There is no account currently logged in.')
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
	     * var signupData = {username: 'testuser1', email:'test@email.com', password: 'testpassword'}
	     * matter.signup(signupData).then(function(signupRes){
	     *  console.log('New user signed up successfully. New account: ', signupRes.account)
	     * }, function(err){
	     *  console.error('Error signing up:', err)
	     * })
	     */
	    value: function signup(signupData) {
	      var _this = this;

	      _logger2.default.debug({
	        description: 'Signup called.', signupData: signupData,
	        func: 'signup', obj: 'Matter'
	      });
	      if (!signupData) {
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
	      // Handle no username or email
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
	     * var loginData = {username: 'testuser1', password: 'testpassword'}
	     * matter.login(loginData).then(function(loginRes){
	     *  console.log('New user logged in succesfully. Account: ', loginRes.user)
	     * }, function(err){
	     *  console.error('Error logging in:', err)
	     * })
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
	      // Provider login
	      if ((0, _isString2.default)(loginData)) {
	        return this.authUsingProvider(loginData);
	      }
	      // No username or email
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
	      // Handle null or invalid password
	      if (!loginData.password || loginData.password === '') {
	        return Promise.reject({
	          message: 'Password is required to login.',
	          status: 'PASS_REQUIRED'
	        });
	      }
	      // Username/Email Login
	      return request.put(this.endpoint + '/login', loginData).then(function (response) {
	        if (response.data && response.data.status && response.data.status === 409) {
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
	        if (error.status === 409 || error.status === 400) {
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
	     *  console.log('Logged out successfully')
	     * }, function(err){
	     *  console.error('Error logging out:', err)
	     * })
	     */

	  }, {
	    key: 'logout',
	    value: function logout() {
	      var _this3 = this;

	      // TODO: Handle logging out of providers
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
	     * matter.authUsingProvider('google').then(function(signupRes){
	     *  console.log('New user logged in succesfully. Account: ', signupRes.user)
	     * }, function(err){
	     *  console.error('Error logging in:', err)
	     * })
	     */

	  }, {
	    key: 'authUsingProvider',
	    value: function authUsingProvider(provider) {
	      var _this4 = this;

	      if (!provider) {
	        _logger2.default.info({
	          description: 'Provider required to sign up.',
	          func: 'authUsingProvider', obj: 'Matter'
	        });
	        return Promise.reject({ message: 'Provider data is required to signup.' });
	      }
	      return ProviderAuth.authWithServer(provider).then(function (response) {
	        _logger2.default.info({
	          description: 'Provider login successful.',
	          response: response, func: 'authUsingProvider', obj: 'Matter'
	        });
	        if (response && response.token) {
	          _this4.token.string = response.token;
	        }
	        if (response && response.user || response.data) {
	          _this4.currentUser = response.data || response.user;
	        }
	        return _this4.currentUser;
	      }, function (error) {
	        _logger2.default.error({
	          description: 'Provider signup error.', error: error,
	          func: 'authUsingProvider', obj: 'Matter'
	        });
	        return Promise.reject(error);
	      });
	    }

	    /** getCurrentUser
	     * @return {Promise}
	     * @example
	     * //Logout of currently logged in account
	     * matter.getCurrentUser().then(function(currentAccount){
	     *  console.log('Currently logged in account:', currentAccount)
	     * }, function(err){
	     *  console.error('Error logging out:', err)
	     * })
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
	        // TODO: Save user information locally
	        _logger2.default.log({
	          description: 'Current User Request responded.',
	          response: response, func: 'currentUser', obj: 'Matter'
	        });
	        _this5.currentUser = response;
	        return response;
	      })['catch'](function (error) {
	        if (error.status === 401) {
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
	     *  console.log('Currently logged in account:', updatedAccount)
	     * }, function(err){
	     *  console.error('Error updating profile:', err)
	     * })
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
	      // Send update request
	      return request.put(this.endpoint + '/users/' + this.currentUser.username, updateData).then(function (response) {
	        _logger2.default.info({
	          description: 'Update profile request responded.',
	          response: response, func: 'updateAccount', obj: 'Matter'
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

	    /** uploadAvatar
	     * @description Upload account avatar to Tessellate
	     * @param {Object} file - File object to upload
	     * @return {Promise}
	     * @example
	     * //Upload image to tessellate
	     * matter.uploadAvatar(file).then(function(imgUrl){
	     *  console.log('Currently logged in account:', imgUrl)
	     * }, function(err){
	     *  console.error('Error uploading image:', err)
	     * })
	     */

	  }, {
	    key: 'uploadAvatar',
	    value: function uploadAvatar(file) {
	      if (!this.isLoggedIn) {
	        _logger2.default.error({
	          description: 'Must be logged in to upload an image.',
	          func: 'uploadAvatar', obj: 'Matter'
	        });
	        return Promise.reject({
	          message: 'Must be logged in to upload image.'
	        });
	      }
	      if (!file) {
	        _logger2.default.error({
	          description: 'File is required to upload Avatar.',
	          func: 'uploadAvatar', obj: 'Matter'
	        });
	        return Promise.reject({
	          message: 'Data required to update profile.',
	          status: 'NULL_DATA'
	        });
	      }
	      var reqData = { files: [{ key: 'image', file: file }] };
	      // Send update request
	      return request.put(this.endpoint + '/users/' + this.currentUser.username + '/avatar', reqData);
	    }

	    /** changePassword
	     * @param {String} updateData New password for account.
	     * @return {Promise}
	     * @example
	     * //Update current account's password
	     * var newPassword = 'asdfasdfasdf'
	     * matter.changePassword(newPassword).then(function(updatedAccount){
	     *  console.log('Currently logged in account:', updatedAccount)
	     * }, function(err){
	     *  console.error('Error changing password:', err)
	     * })
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
	      // Send update request
	      return request.put(this.endpoint + '/user/password', newPassword);
	    }

	    /** recoverAccount
	     * @param {String} updateData New password for account.
	     * @return {Promise}
	     * @example
	     * //Recover current users password
	     * matter.recoverAccount().then(function(updatedAccount){
	     *  console.log('Currently logged in account:', updatedAccount)
	     * }, function(err){
	     *  console.error('Error updating profile:', err)
	     * })
	     */

	  }, {
	    key: 'recoverAccount',
	    value: function recoverAccount(accountData) {
	      if (!accountData) {
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
	      return request.put(this.endpoint + '/user/recover', account);
	    }

	    /** Check that user is in a single group or in all of a list of groups
	     * @param {Array} checkGroups - List of groups to check for account membership
	     * @return {Boolean}
	     * @example
	     * //Check for group membership
	     * var isBoth =
	     * if(matter.isInGroup('admins')){
	     * console.log('Current account is an admin!')
	     * } else {
	     * console.warn('Current account is not an admin.')
	     * }
	     */

	  }, {
	    key: 'isInGroup',
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
	      // Check if user is within groups
	      if ((0, _isString2.default)(checkGroups)) {
	        var _ret = function () {
	          var groupName = checkGroups;
	          // Single role or string list of roles
	          var groupsArray = groupName.split(',');
	          if (groupsArray.length > 1) {
	            // String list of groupts
	            _logger2.default.info({
	              description: 'String list of groups.', list: groupsArray,
	              func: 'isInGroup', obj: 'Matter'
	            });
	            return {
	              v: _this7.isInGroups(groupsArray)
	            };
	          }
	          // Single group
	          var groups = _this7.token.data.groups || [];
	          _logger2.default.log({
	            description: 'Checking if user is in group.',
	            group: groupName, userGroups: _this7.token.data.groups,
	            func: 'isInGroup', obj: 'Matter'
	          });
	          return {
	            v: (0, _some2.default)(groups, function (group) {
	              return groupName === group.name;
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
	     * var isBoth = matter.isInGroups(['admins', 'users'])
	     * if(isBoth){
	     * console.log('Current account is both an admin and a user')
	     * } else {
	     * console.warn('Current account is not both an admin and a user')
	     * }
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
	      // Check if user is in some of the provided groups
	      if ((0, _isArray2.default)(checkGroups)) {
	        return (0, _every2.default)(checkGroups.map(function (group) {
	          if ((0, _isString2.default)(group)) {
	            // Group is string
	            return _this8.isInGroup(group);
	          }
	          // Group is object
	          if ((0, _has2.default)(group, 'name')) {
	            return _this8.isInGroup(group.name);
	          }
	          _logger2.default.error({
	            description: 'Invalid group object.',
	            group: group, func: 'isInGroups', obj: 'Matter'
	          });
	          return false;
	        }), true);
	      }
	      if ((0, _isString2.default)(checkGroups)) {
	        // TODO: Handle spaces within string list
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
	      return (0, _isString2.default)(this.token.string);
	    }

	    /** Endpoint generation that handles default/provided settings and environment
	     * @return {String} endpoint - endpoint for tessellate application
	     */

	  }, {
	    key: 'endpoint',
	    get: function get() {
	      // Remove url if host is a tessellate server
	      if (typeof window !== 'undefined' && (0, _has2.default)(window, 'location') && window.location.host.indexOf('tessellate') !== -1) {
	        _logger2.default.info({
	          description: 'App is Tessellate and Host is Tessellate Server, serverUrl simplified!',
	          func: 'endpoint', obj: 'Matter'
	        });
	        return '';
	      }
	      // Handle tessellate as name
	      if (this.name !== 'tessellate') {
	        return this.owner ? _config2.default.serverUrl + '/users/' + this.owner + '/projects/' + this.name : _config2.default.serverUrl + '/projects/' + this.name;
	      }
	      return _config2.default.serverUrl;
	    }

	    /** Save current user (handled automatically by default)
	     * @param {Object} userData - Account data to set for current user
	     * @example
	     * //Save account response to current user
	     * matter.currentUser = {username: 'testuser1', email: 'test@email.com'}
	     * console.log('New current user set:', matter.currentUser)
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
	     * console.log('Current user account: ', matter.currentUser)
	     * } else {
	     * console.log('No current user. Current user: ', matter.currentUser)
	     * }
	     * matter.currentUser
	     * console.log('New current user set:', matter.currentUser)
	     */
	    ,
	    get: function get() {
	      if (this.storage.getItem(_config2.default.tokenUserDataName)) {
	        return this.storage.getItem(_config2.default.tokenUserDataName);
	      }
	      return null;
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
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @type {Function}
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _isString = __webpack_require__(9);

	var _isString2 = _interopRequireDefault(_isString);

	var _keys = __webpack_require__(10);

	var _keys2 = _interopRequireDefault(_keys);

	var _omit = __webpack_require__(169);

	var _omit2 = _interopRequireDefault(_omit);

	var _each = __webpack_require__(156);

	var _each2 = _interopRequireDefault(_each);

	var _isObject = __webpack_require__(2);

	var _isObject2 = _interopRequireDefault(_isObject);

	var _config = __webpack_require__(12);

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
	  // Safley run console methods or use console log
	  if (methodName && console[methodName]) {
	    return console[methodName].apply(console, methodData);
	  } else {
	    return console.log.apply(console, methodData);
	  }
	}
	function buildMessageArgs(logData) {
	  var msgStr = '';
	  var msgObj = {};
	  // TODO: Attach time stamp
	  // Attach location information to the beginning of message
	  if ((0, _isObject2.default)(logData)) {
	    (function () {
	      if (logData.func) {
	        if (logData.obj) {
	          // Object and function provided
	          msgStr += '[' + logData.obj + '.' + logData.func + '()]\n ';
	        } else if (logData.file) {
	          msgStr += '[' + logData.file + ' > ' + logData.func + '()]\n ';
	        } else {
	          msgStr += '[' + logData.func + '()]\n ';
	        }
	      }
	      var hideList = ['func', 'obj', 'file'];
	      // Print each key and its value other than obj and func
	      (0, _each2.default)((0, _omit2.default)((0, _keys2.default)(logData), hideList), function (key) {
	        if (hideList.indexOf(key) === -1) {
	          if (key === 'description' || key === 'message') {
	            msgStr += logData[key];
	            return msgStr;
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {var checkGlobal = __webpack_require__(116);

	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};

	/** Detect free variable `exports`. */
	var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
	  ? exports
	  : undefined;

	/** Detect free variable `module`. */
	var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
	  ? module
	  : undefined;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);

	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(objectTypes[typeof self] && self);

	/** Detect free variable `window`. */
	var freeWindow = checkGlobal(objectTypes[typeof window] && window);

	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(objectTypes[typeof this] && this);

	/**
	 * Used as a reference to the global object.
	 *
	 * The `this` value is used if it's the global object to avoid Greasemonkey's
	 * restricted `window` object, otherwise the `window` object is used.
	 */
	var root = freeGlobal ||
	  ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) ||
	    freeSelf || thisGlobal || Function('return this')();

	module.exports = root;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(67)(module), (function() { return this; }())))

/***/ },
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(17),
	    root = __webpack_require__(4);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ },
/* 7 */
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
	    (type == 'string' && value != '__proto__') || value == null;
	}

	module.exports = isKeyable;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(2);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

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


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(1),
	    isObjectLike = __webpack_require__(5);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

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


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(27),
	    baseKeys = __webpack_require__(100),
	    indexKeys = __webpack_require__(60),
	    isArrayLike = __webpack_require__(11),
	    isIndex = __webpack_require__(19),
	    isPrototype = __webpack_require__(32);

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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(131),
	    isFunction = __webpack_require__(8),
	    isLength = __webpack_require__(23);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _find = __webpack_require__(158);

	var _find2 = _interopRequireDefault(_find);

	var _merge = __webpack_require__(168);

	var _merge2 = _interopRequireDefault(_merge);

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
	  oauthioKey: 'sxwuB9Gci8-4pBH7xjD0V_jooNU',
	  oauthioCDN: 'https://s3.amazonaws.com/kyper-cdn/js/libs/oauthio-web/v0.5.0/oauth.min.js'
	};

	var instance = null;
	var envName = 'prod';
	var level = null;

	var Config = function () {
	  function Config() {
	    _classCallCheck(this, Config);

	    if (!instance) {
	      (0, _merge2.default)(this, defaultConfig);
	      instance = this;
	    }
	    return instance;
	  }

	  _createClass(Config, [{
	    key: 'applySettings',
	    value: function applySettings(settings) {
	      if (settings) {
	        (0, _merge2.default)(this, settings);
	      }
	    }
	  }, {
	    key: 'serverUrl',
	    get: function get() {
	      if (typeof window !== 'undefined' && window.location && window.location.host && window.location.host !== '') {
	        var matchingEnv = (0, _find2.default)(defaultConfig.envs, function (env) {
	          return env.serverUrl === window.location.host;
	        });
	        if (matchingEnv) {
	          return '';
	        }
	      }
	      return defaultConfig.envs[this.envName].serverUrl;
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
	      return defaultConfig.envs[this.envName].logLevel;
	    }
	  }, {
	    key: 'envName',
	    set: function set(newEnv) {
	      envName = newEnv;
	    },
	    get: function get() {
	      return envName;
	    }
	  }, {
	    key: 'env',
	    get: function get() {
	      if (defaultConfig.envs[this.envName]) {
	        return defaultConfig.envs[this.envName];
	      }
	    }
	  }]);

	  return Config;
	}();

	var config = new Config();

	exports.default = config;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var stackClear = __webpack_require__(149),
	    stackDelete = __webpack_require__(150),
	    stackGet = __webpack_require__(151),
	    stackHas = __webpack_require__(152),
	    stackSet = __webpack_require__(153);

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
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
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(21);

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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(50),
	    createBaseEach = __webpack_require__(126);

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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(164);

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
/* 18 */
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
/* 19 */
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(17);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;


/***/ },
/* 21 */
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLikeObject = __webpack_require__(33);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

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


/***/ },
/* 23 */
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
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(4);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 25 */
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
/* 26 */
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
/* 27 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

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


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(102),
	    baseMatchesProperty = __webpack_require__(103),
	    identity = __webpack_require__(64),
	    isArray = __webpack_require__(1),
	    property = __webpack_require__(170);

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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var copyObjectWith = __webpack_require__(123);

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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(21),
	    isArrayLike = __webpack_require__(11),
	    isIndex = __webpack_require__(19),
	    isObject = __webpack_require__(2);

	/**
	 * Checks if the given arguments are from an iteratee call.
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(1);

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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(8);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (isFunction(Ctor) && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(11),
	    isObjectLike = __webpack_require__(5);

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(23),
	    isObjectLike = __webpack_require__(5);

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
	var objectProto = Object.prototype;

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
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}

	module.exports = isTypedArray;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var baseKeysIn = __webpack_require__(101),
	    indexKeys = __webpack_require__(60),
	    isIndex = __webpack_require__(19),
	    isPrototype = __webpack_require__(32);

	/** Used for built-in method references. */
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


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isBrowser = isBrowser;
	exports.loadCss = loadCss;
	exports.loadJs = loadJs;
	exports.asyncLoadJs = asyncLoadJs;
	exports.getQueryParam = getQueryParam;

	var _logger = __webpack_require__(3);

	var _logger2 = _interopRequireDefault(_logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @description Checks to see if current context is a browser
	 * @return {Boolean}
	 */
	function isBrowser() {
	  return typeof window !== 'undefined' && typeof document !== 'undefined';
	}

	/**
	 * @description Appends given css source to DOM head.
	 * @param {String} src - url src for css to append
	 */
	function loadCss(src) {
	  if (!isBrowser()) {
	    _logger2.default.error({
	      description: 'Load CSS only works within browsers.',
	      func: 'loadCss', obj: 'dom'
	    });
	    throw new Error('Document object is required to load assets.');
	  }
	  var css = document.createElement('link');
	  css.rel = 'stylesheet';
	  css.type = 'text/css';
	  css.href = src;
	  document.getElementsByTagName('head')[0].insertBefore(css, document.getElementsByTagName('head')[0].firstChild);
	  _logger2.default.debug({
	    description: 'CSS was loaded into document.', element: css,
	    func: 'loadCss', obj: 'dom'
	  });
	  // Return link element
	  return css;
	}

	/**
	 * @description Appends given javascript source to DOM head.
	 * @param {String} src - url src for javascript to append
	 */
	function loadJs(src) {
	  if (!isBrowser()) {
	    _logger2.default.error({
	      description: 'Document does not exsist to load assets into.',
	      func: 'loadJs', obj: 'dom'
	    });
	    throw new Error('Document object is required to load assets.');
	  }
	  var js = window.document.createElement('script');
	  js.src = src;
	  js.type = 'text/javascript';
	  window.document.getElementsByTagName('head')[0].appendChild(js);
	  _logger2.default.debug({
	    description: 'JS was loaded into document.', element: js,
	    func: 'loadJs', obj: 'dom'
	  });
	  // Return script element
	  return js;
	}

	/**
	 * @description Appends given javascript source to DOM head.
	 * @param {String} src - url src for javascript to append
	 *
	 */
	function asyncLoadJs(src) {
	  if (!isBrowser()) {
	    _logger2.default.error({
	      description: 'Document does not exsist to load assets into.',
	      func: 'asyncLoadJs', obj: 'dom'
	    });
	    throw new Error('Document object is required to load assets.');
	  }
	  var js = window.document.createElement('script');
	  js.src = src;
	  js.type = 'text/javascript';
	  window.document.getElementsByTagName('head')[0].appendChild(js);
	  _logger2.default.log({
	    description: 'JS was loaded into document.', element: js,
	    func: 'asyncLoadJs', obj: 'dom'
	  });
	  return new Promise(function (resolve) {
	    window.setTimeout(resolve, 200);
	  });
	}

	/**
	 * @description Get query param from current location/url
	 * @param {String} name - Name of query parameter to get
	 *
	 */
	function getQueryParam(name) {
	  if (!isBrowser()) {
	    _logger2.default.error({
	      description: 'Browser is required to get query params.',
	      func: 'asyncLoadJs', obj: 'dom'
	    });
	    throw new Error('Query parameters are only available within browsers.');
	  }
	  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	  var results = regex.exec(window.location.search);
	  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _isObject = __webpack_require__(2);

	var _isObject2 = _interopRequireDefault(_isObject);

	exports.localExists = localExists;
	exports.setItem = setItem;
	exports.getItem = getItem;
	exports.removeItem = removeItem;
	exports.clear = clear;

	var _logger = __webpack_require__(3);

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
	  if (typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined') {
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
	    // Convert object to string
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
	    // Check that str is not null before parsing
	    if (itemStr) {
	      var isObj = false;
	      var itemObj = null;
	      // Try parsing to object
	      try {
	        itemObj = JSON.parse(itemStr);
	        isObj = true;
	      } catch (err) {
	        // Parsing failed, this must just be a string
	        // logger.log({message: 'String could not be parsed.', error: err, func: 'getItem', obj: 'storage'})
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
	  // TODO: Only remove used items
	  if (data[itemName]) {
	    data[itemName] = null;
	  }
	  if (localExists() && getItem(itemName)) {
	    try {
	      // Clear session storage
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
	  // TODO: Only remove used items
	  data = {};
	  if (localExists()) {
	    try {
	      // Clear session storage
	      window.sessionStorage.clear();
	    } catch (error) {
	      _logger2.default.warn({
	        description: 'Session storage could not be cleared.', error: error,
	        obj: 'storage', func: 'removeItem'
	      });
	    }
	  }
	}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.get = get;
	exports.post = post;
	exports.put = put;
	exports.del = del;

	var _logger = __webpack_require__(3);

	var _logger2 = _interopRequireDefault(_logger);

	var _token = __webpack_require__(39);

	var _token2 = _interopRequireDefault(_token);

	var _superagent = __webpack_require__(178);

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
	  var imageData = data && data.files ? handleFiles(data) : null;
	  var req = _superagent2.default.post(endpoint);
	  req = addAuthHeader(req);
	  req.send(imageData || data);
	  return handleResponse(req);
	}

	function put(endpoint, data) {
	  var imageData = data && data.files ? handleFiles(data) : null;
	  var req = _superagent2.default.put(endpoint);
	  req = addAuthHeader(req);
	  req.send(imageData || data);
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
	        if (errorRes.status === 401) {
	          _logger2.default.warn({
	            description: 'Unauthorized. You must be signed into make this request.',
	            func: 'handleResponse'
	          });
	        }
	        var response = errorRes.response;

	        var error = response && response.body ? response.body : errorRes;
	        _logger2.default.error({
	          description: 'Error in request.', error: error,
	          file: 'request', func: 'handleResponse'
	        });
	        return reject(error || errorRes);
	      }
	      if (res.error) {
	        _logger2.default.error({
	          description: 'Error in request.', error: res.error,
	          file: 'request', func: 'handleResponse'
	        });
	        return reject(res.error);
	      }
	      // logger.debug({
	      // 	message: 'Successful response recieved.', response: res.body,
	      // 	func: 'handleResponse', file: 'request'
	      // })
	      resolve(res.body);
	    });
	  });
	}
	/**
	 * @description Add auth header to request
	 * @param {Object} request - Request object on which to add auth header
	 */
	function addAuthHeader(req) {
	  if (_token2.default.string) {
	    req = req.set('Authorization', 'Bearer ' + _token2.default.string);
	    // logger.debug({
	    // 	message: 'Set auth header', token: token.string,
	    // 	func: 'addAuthHeader', file: 'request'
	    // })
	  }
	  return req;
	}

	/**
	 * @description Turn array of files into FormData for a server request
	 * @param {Array} files Array of file objects
	 */
	function handleFiles(files) {
	  var filesData = new window.FormData();
	  files.forEach(function (fileObj) {
	    if (fileObj.key && fileObj.file) {
	      filesData.append(fileObj.key || 'image', fileObj.file);
	    }
	  });
	  return filesData;
	}

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _isString = __webpack_require__(9);

	var _isString2 = _interopRequireDefault(_isString);

	var _config = __webpack_require__(12);

	var _config2 = _interopRequireDefault(_config);

	var _logger = __webpack_require__(3);

	var _logger2 = _interopRequireDefault(_logger);

	var _cookies = __webpack_require__(69);

	var cookiesUtil = _interopRequireWildcard(_cookies);

	var _envStorage = __webpack_require__(37);

	var envStorage = _interopRequireWildcard(_envStorage);

	var _jwtDecode = __webpack_require__(73);

	var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var token = {

	  /** Get string value of token
	   * @return {String}
	   * @example
	   * console.log('String value of current token', token.string)
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
	   * console.log('Data of current token:', token.data)
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
	    // Handle object being passed
	    if (!(0, _isString2.default)(tokenStr)) {
	      // Token is included in object
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
	    // Remove string token
	    cookiesUtil.deleteCookie(_config2.default.tokenName);
	    // Remove user data
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var mapClear = __webpack_require__(143),
	    mapDelete = __webpack_require__(144),
	    mapGet = __webpack_require__(145),
	    mapHas = __webpack_require__(146),
	    mapSet = __webpack_require__(147);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(4);

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.exports = Uint8Array;


/***/ },
/* 42 */
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(21);

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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(21);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

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
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}

	module.exports = assignValue;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(15);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

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


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(15);

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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(15);

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
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(15);

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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(1),
	    stringToPath = __webpack_require__(154);

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function baseCastPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}

	module.exports = baseCastPath;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(96),
	    keys = __webpack_require__(10);

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
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var baseCastPath = __webpack_require__(49),
	    isKey = __webpack_require__(31);

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path + ''] : baseCastPath(path);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[path[index++]];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var indexOfNaN = __webpack_require__(137);

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
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(98),
	    isObject = __webpack_require__(2),
	    isObjectLike = __webpack_require__(5);

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
/* 54 */
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
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var Uint8Array = __webpack_require__(41);

	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var Ctor = arrayBuffer.constructor,
	      result = new Ctor(arrayBuffer.byteLength),
	      view = new Uint8Array(result);

	  view.set(new Uint8Array(arrayBuffer));
	  return result;
	}

	module.exports = cloneArrayBuffer;


/***/ },
/* 56 */
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
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(6),
	    Set = __webpack_require__(77),
	    WeakMap = __webpack_require__(79);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect maps, sets, and weakmaps. */
	var mapCtorString = Map ? funcToString.call(Map) : '',
	    setCtorString = Set ? funcToString.call(Set) : '',
	    weakMapCtorString = WeakMap ? funcToString.call(WeakMap) : '';

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

	// Fallback for IE 11 providing `toStringTag` values for maps, sets, and weakmaps.
	if ((Map && getTag(new Map) != mapTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : null,
	        ctorString = typeof Ctor == 'function' ? funcToString.call(Ctor) : '';

	    if (ctorString) {
	      switch (ctorString) {
	        case mapCtorString: return mapTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	module.exports = getTag;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var baseCastPath = __webpack_require__(49),
	    isArguments = __webpack_require__(22),
	    isArray = __webpack_require__(1),
	    isIndex = __webpack_require__(19),
	    isKey = __webpack_require__(31),
	    isLength = __webpack_require__(23),
	    isString = __webpack_require__(9),
	    last = __webpack_require__(167),
	    parent = __webpack_require__(148);

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
	    path = baseCastPath(path);
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
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(20);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

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


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(110),
	    isArguments = __webpack_require__(22),
	    isArray = __webpack_require__(1),
	    isLength = __webpack_require__(23),
	    isString = __webpack_require__(9);

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
/* 61 */
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
/* 62 */
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
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(51);

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
/* 64 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
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
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(82),
	    toInteger = __webpack_require__(66);

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
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var toNumber = __webpack_require__(172);

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
/* 67 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 68 */
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
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _includes = __webpack_require__(162);

	var _includes2 = _interopRequireDefault(_includes);

	exports.getCookie = getCookie;
	exports.setCookie = setCookie;
	exports.deleteCookie = deleteCookie;

	var _logger = __webpack_require__(3);

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
	  if (typeof window === 'undefined' || typeof document === 'undefined') {
	    return '';
	  }
	  var name = cookieName + '=';
	  var ca = document.cookie.split(';');
	  for (var i = 0; i < ca.length; i++) {
	    var c = ca[i];
	    while (c.charAt(0) === ' ') {
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
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.authWithServer = authWithServer;

	var _request = __webpack_require__(38);

	var _logger = __webpack_require__(3);

	var _logger2 = _interopRequireDefault(_logger);

	var _config = __webpack_require__(12);

	var _config2 = _interopRequireDefault(_config);

	var _dom = __webpack_require__(36);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import { OAuth, User } from 'oauthio-web' // window/document undefined error

	if ((0, _dom.isBrowser)()) {
	  loadOAuthio().then(function () {
	    initializeOAuth();
	  });
	}

	/**
	 * @description Signup using a token generated from the server (so server and client are both aware of auth state)
	 */
	function authWithServer(provider) {
	  initializeOAuth();
	  return (0, _request.get)(_config2.default.serverUrl + '/stateToken').then(function (params) {
	    return new Promise(function (resolve, reject) {
	      window.OAuth.popup(provider, { state: params.token }).done(function (result) {
	        _logger2.default.info({
	          description: 'Result from oauth:', result: result, provider: provider, params: params,
	          func: 'authWithServer', obj: 'providerAuth'
	        });
	        (0, _request.put)(_config2.default.serverUrl + '/auth', { provider: provider, code: result.code, stateToken: params.token }).then(function (loggedInData) {
	          _logger2.default.warn({
	            description: 'logged in info', result: loggedInData,
	            func: 'authWithServer', obj: 'providerAuth'
	          });
	          resolve(loggedInData);
	        }, function (error) {
	          reject(error);
	        });
	      }).fail(function (error) {
	        _logger2.default.error({
	          description: 'error with request', error: error,
	          func: 'authWithServer', obj: 'providerAuth'
	        });
	        return Promise.reject(error);
	      });
	    });
	  }, function (error) {
	    _logger2.default.error({
	      description: 'error with request', error: error,
	      func: 'authWithServer', obj: 'providerAuth'
	    });
	    return Promise.reject(error);
	  });
	}

	/**
	 * @description Run initial setup of OAuth Library
	 */
	function initializeOAuth() {
	  if ((0, _dom.isBrowser)() && window.OAuth) {
	    console.log('initializing oauth');
	    window.OAuth.initialize(_config2.default.oauthioKey);
	  }
	}

	/**
	 * @description Load OAuthio-web Library into body as script element
	 */
	function loadOAuthio() {
	  // console.log('loading oauthio into script tag:', config.oauthioCDN)
	  if (typeof window.OAuth !== 'undefined') {
	    return Promise.resolve();
	  }
	  return (0, _dom.asyncLoadJs)(_config2.default.oauthioCDN).then(function () {
	    if (window.OAuth) {
	      window.OAuth.initialize(_config2.default.oauthioKey);
	    }
	  });
	}

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
	// 		})
	// 		const newUser = await User.signup(res)
	// 		return newUser
	// 	} catch(error) {
	// 		logger.error({
	// 			description: 'error in oauth request', error
	// 		})
	// 		return error
	// 	}
	// }

	/**
	 * @description Login to external provider
	 * @param {String} provider Provider with which to log into (Google/Github Etc)
	 */
	// export async function login(provider) {
	// 	try {
	// 		const res = await OAuth.popup(provider, {cache: true})
	// 		const newUser = await User.signin(res)
	// 		console.log('user:', newUser)
	// 		return newUser
	// 	} catch(error) {
	// 		console.error('error in oauth request', error)
	// 		return error
	// 	}
	// }

	/**
	 * @description Logout external provider service (Stormpath/oauthio)
	 */
	// export async function logout() {
	// 	if(!currentlyLoggedIn()) return
	// 	try {
	// 		const user = User.getIdentity()
	// 		return await user.logout()
	// 	} catch(error) {
	// 		console.error('error logging out', error)
	// 		return error
	// 	}
	// }

	/**
	 * @description Get currently connected user
	 */
	// export function getCurrentUser() {
	// 	return User.getIdentity()
	// }

	/**
	 * @description Local user data from external provider service (Stormpath/oauthio)
	 */
	// export async function getUserData(provider) {
	// 	try {
	// 		const result = await OAuth.popup(provider, {cache: true})
	// 		return await result.me()
	// 	} catch(error) {
	// 		console.error('error in oauth request', error)
	// 	}
	// }

	/**
	 * @description Update user with external provider service (Stormpath/oauthio)
	 */
	// export async function updateUserData(newData) {
	// 	try {
	// 		user = User.getIdentity()
	// 		user.data = newData
	// 		return await user.save()
	// 	} catch(error) {
	// 		console.error('error updating user data', error)
	// 	}
	// }

	/**
	 * @description Check to see if a user is currently logged in to external provider service (Stormpath/oauthio)
	 */
	// export function currentlyLoggedIn() {
	// 	return User.isLogged()
	// }

/***/ },
/* 71 */
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
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var Base64 = __webpack_require__(68);

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
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var base64_url_decode = __webpack_require__(72);
	var json_parse = __webpack_require__(74);

	module.exports = function (token) {
	  if (!token) {
	    throw new Error('Invalid token specified');
	  }
	  
	  return json_parse(base64_url_decode(token.split('.')[1]));
	};


/***/ },
/* 74 */
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
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(20);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Creates an hash object.
	 *
	 * @private
	 * @constructor
	 * @returns {Object} Returns the new hash object.
	 */
	function Hash() {}

	// Avoid inheriting from `Object.prototype` when possible.
	Hash.prototype = nativeCreate ? nativeCreate(null) : objectProto;

	module.exports = Hash;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(4);

	/** Built-in value references. */
	var Reflect = root.Reflect;

	module.exports = Reflect;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(17),
	    root = __webpack_require__(4);

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	module.exports = Set;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(40),
	    cachePush = __webpack_require__(115);

	/**
	 *
	 * Creates a set cache object to store unique values.
	 *
	 * @private
	 * @constructor
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
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(17),
	    root = __webpack_require__(4);

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	module.exports = WeakMap;


/***/ },
/* 80 */
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
/* 81 */
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
/* 82 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {...*} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  var length = args.length;
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
/* 83 */
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
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(52);

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
/* 85 */
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
/* 86 */
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
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(29),
	    keys = __webpack_require__(10);

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
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(64);

	/**
	 * Casts `value` to `identity` if it's not a function.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the array-like object.
	 */
	function baseCastFunction(value) {
	  return typeof value == 'function' ? value : identity;
	}

	module.exports = baseCastFunction;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(13),
	    arrayEach = __webpack_require__(25),
	    assignValue = __webpack_require__(44),
	    baseAssign = __webpack_require__(87),
	    baseForOwn = __webpack_require__(50),
	    cloneBuffer = __webpack_require__(117),
	    copyArray = __webpack_require__(56),
	    copySymbols = __webpack_require__(124),
	    getTag = __webpack_require__(57),
	    initCloneArray = __webpack_require__(138),
	    initCloneByTag = __webpack_require__(139),
	    initCloneObject = __webpack_require__(140),
	    isArray = __webpack_require__(1),
	    isBuffer = __webpack_require__(163),
	    isHostObject = __webpack_require__(18),
	    isObject = __webpack_require__(2);

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

	    if (isBuffer(value)) {
	      return cloneBuffer(value, isDeep);
	    }
	    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	      if (isHostObject(value)) {
	        return object ? value : {};
	      }
	      result = initCloneObject(isFunc ? {} : value);
	      if (!isDeep) {
	        return copySymbols(value, baseAssign(result, value));
	      }
	    } else {
	      if (!cloneableTags[tag]) {
	        return object ? value : {};
	      }
	      result = initCloneByTag(value, tag, isDeep);
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
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(2);

	/** Built-in value references. */
	var objectCreate = Object.create;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} prototype The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	function baseCreate(proto) {
	  return isObject(proto) ? objectCreate(proto) : {};
	}

	module.exports = baseCreate;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(78),
	    arrayIncludes = __webpack_require__(84),
	    arrayIncludesWith = __webpack_require__(85),
	    arrayMap = __webpack_require__(14),
	    baseUnary = __webpack_require__(112),
	    cacheHas = __webpack_require__(114);

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
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(16);

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
/* 93 */
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
/* 94 */
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
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(86),
	    isArguments = __webpack_require__(22),
	    isArray = __webpack_require__(1),
	    isArrayLikeObject = __webpack_require__(33);

	/**
	 * The base implementation of `_.flatten` with support for restricting flattening.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {number} depth The maximum recursion depth.
	 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, depth, isStrict, result) {
	  result || (result = []);

	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    var value = array[index];
	    if (depth > 0 && isArrayLikeObject(value) &&
	        (isStrict || isArray(value) || isArguments(value))) {
	      if (depth > 1) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, depth - 1, isStrict, result);
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
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(127);

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
/* 97 */
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
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(13),
	    equalArrays = __webpack_require__(128),
	    equalByTag = __webpack_require__(129),
	    equalObjects = __webpack_require__(130),
	    getTag = __webpack_require__(57),
	    isArray = __webpack_require__(1),
	    isHostObject = __webpack_require__(18),
	    isTypedArray = __webpack_require__(34);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

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


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(13),
	    baseIsEqual = __webpack_require__(53);

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
/* 100 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = Object.keys;

	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  return nativeKeys(Object(object));
	}

	module.exports = baseKeys;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var Reflect = __webpack_require__(76),
	    iteratorToArray = __webpack_require__(142);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

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


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(99),
	    getMatchData = __webpack_require__(132);

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
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(53),
	    get = __webpack_require__(63),
	    hasIn = __webpack_require__(161);

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
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(13),
	    arrayEach = __webpack_require__(25),
	    assignMergeValue = __webpack_require__(43),
	    baseMergeDeep = __webpack_require__(105),
	    isArray = __webpack_require__(1),
	    isObject = __webpack_require__(2),
	    isTypedArray = __webpack_require__(34),
	    keysIn = __webpack_require__(35);

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
	  var props = (isArray(source) || isTypedArray(source))
	    ? undefined
	    : keysIn(source);

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
	      var newValue = customizer
	        ? customizer(object[key], srcValue, (key + ''), object, source, stack)
	        : undefined;

	      if (newValue === undefined) {
	        newValue = srcValue;
	      }
	      assignMergeValue(object, key, newValue);
	    }
	  });
	}

	module.exports = baseMerge;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var assignMergeValue = __webpack_require__(43),
	    baseClone = __webpack_require__(89),
	    copyArray = __webpack_require__(56),
	    isArguments = __webpack_require__(22),
	    isArray = __webpack_require__(1),
	    isArrayLikeObject = __webpack_require__(33),
	    isFunction = __webpack_require__(8),
	    isObject = __webpack_require__(2),
	    isPlainObject = __webpack_require__(165),
	    isTypedArray = __webpack_require__(34),
	    toPlainObject = __webpack_require__(174);

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
	  var newValue = customizer
	    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
	    : undefined;

	  var isCommon = newValue === undefined;

	  if (isCommon) {
	    newValue = srcValue;
	    if (isArray(srcValue) || isTypedArray(srcValue)) {
	      if (isArray(objValue)) {
	        newValue = objValue;
	      }
	      else if (isArrayLikeObject(objValue)) {
	        newValue = copyArray(objValue);
	      }
	      else {
	        isCommon = false;
	        newValue = baseClone(srcValue, true);
	      }
	    }
	    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      if (isArguments(objValue)) {
	        newValue = toPlainObject(objValue);
	      }
	      else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
	        isCommon = false;
	        newValue = baseClone(srcValue, true);
	      }
	      else {
	        newValue = objValue;
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
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var arrayReduce = __webpack_require__(26);

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
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(51);

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
/* 108 */
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
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(16);

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
/* 110 */
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
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(14);

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
/* 112 */
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
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(14);

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
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(7);

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
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(7);

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
/* 116 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return (value && value.Object === Object) ? value : null;
	}

	module.exports = checkGlobal;


/***/ },
/* 117 */
/***/ function(module, exports) {

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var Ctor = buffer.constructor,
	      result = new Ctor(buffer.length);

	  buffer.copy(result);
	  return result;
	}

	module.exports = cloneBuffer;


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var addMapEntry = __webpack_require__(80),
	    arrayReduce = __webpack_require__(26),
	    mapToArray = __webpack_require__(61);

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
/* 119 */
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
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var addSetEntry = __webpack_require__(81),
	    arrayReduce = __webpack_require__(26),
	    setToArray = __webpack_require__(62);

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
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(24);

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
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(55);

	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var arrayBuffer = typedArray.buffer,
	      buffer = isDeep ? cloneArrayBuffer(arrayBuffer) : arrayBuffer,
	      Ctor = typedArray.constructor;

	  return new Ctor(buffer, typedArray.byteOffset, typedArray.length);
	}

	module.exports = cloneTypedArray;


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(44);

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
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : source[key];

	    assignValue(object, key, newValue);
	  }
	  return object;
	}

	module.exports = copyObjectWith;


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(29),
	    getSymbols = __webpack_require__(133);

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
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var isIterateeCall = __webpack_require__(30),
	    rest = __webpack_require__(65);

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

	    customizer = typeof customizer == 'function'
	      ? (length--, customizer)
	      : undefined;

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
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(11);

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
/* 127 */
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
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var arraySome = __webpack_require__(42);

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
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(24),
	    Uint8Array = __webpack_require__(41),
	    mapToArray = __webpack_require__(61),
	    setToArray = __webpack_require__(62);

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
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(27),
	    keys = __webpack_require__(10);

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
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(54);

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
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(141),
	    toPairs = __webpack_require__(173);

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
/* 133 */
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
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var hashHas = __webpack_require__(59);

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
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(20);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

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


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(20);

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
/* 137 */
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
/* 138 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

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


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(55),
	    cloneMap = __webpack_require__(118),
	    cloneRegExp = __webpack_require__(119),
	    cloneSet = __webpack_require__(120),
	    cloneSymbol = __webpack_require__(121),
	    cloneTypedArray = __webpack_require__(122);

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
	      return cloneArrayBuffer(object);

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
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(90),
	    isFunction = __webpack_require__(8),
	    isPrototype = __webpack_require__(32);

	/** Built-in value references. */
	var getPrototypeOf = Object.getPrototypeOf;

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return (isFunction(object.constructor) && !isPrototype(object))
	    ? baseCreate(getPrototypeOf(object))
	    : {};
	}

	module.exports = initCloneObject;


/***/ },
/* 141 */
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
/* 142 */
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
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(75),
	    Map = __webpack_require__(6);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapClear() {
	  this.__data__ = {
	    'hash': new Hash,
	    'map': Map ? new Map : [],
	    'string': new Hash
	  };
	}

	module.exports = mapClear;


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(6),
	    assocDelete = __webpack_require__(45),
	    hashDelete = __webpack_require__(134),
	    isKeyable = __webpack_require__(7);

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
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(6),
	    assocGet = __webpack_require__(46),
	    hashGet = __webpack_require__(135),
	    isKeyable = __webpack_require__(7);

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
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(6),
	    assocHas = __webpack_require__(47),
	    hashHas = __webpack_require__(59),
	    isKeyable = __webpack_require__(7);

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
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(6),
	    assocSet = __webpack_require__(48),
	    hashSet = __webpack_require__(136),
	    isKeyable = __webpack_require__(7);

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
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	var baseSlice = __webpack_require__(108),
	    get = __webpack_require__(63);

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
/* 149 */
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
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	var assocDelete = __webpack_require__(45);

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
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	var assocGet = __webpack_require__(46);

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
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	var assocHas = __webpack_require__(47);

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
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(40),
	    assocSet = __webpack_require__(48);

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
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(175);

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
/* 155 */
/***/ function(module, exports) {

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var getter = _.constant(object);
	 *
	 * getter() === object;
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}

	module.exports = constant;


/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(159);


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEvery = __webpack_require__(83),
	    baseEvery = __webpack_require__(92),
	    baseIteratee = __webpack_require__(28),
	    isArray = __webpack_require__(1),
	    isIterateeCall = __webpack_require__(30);

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
	 * // The `_.matches` iteratee shorthand.
	 * _.every(users, { 'user': 'barney', 'active': false });
	 * // => false
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.every(users, ['active', false]);
	 * // => true
	 *
	 * // The `_.property` iteratee shorthand.
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
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(16),
	    baseFind = __webpack_require__(93),
	    baseFindIndex = __webpack_require__(94),
	    baseIteratee = __webpack_require__(28),
	    isArray = __webpack_require__(1);

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
	 * // The `_.matches` iteratee shorthand.
	 * _.find(users, { 'age': 1, 'active': true });
	 * // => object for 'pebbles'
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.find(users, ['active', false]);
	 * // => object for 'fred'
	 *
	 * // The `_.property` iteratee shorthand.
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
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(25),
	    baseCastFunction = __webpack_require__(88),
	    baseEach = __webpack_require__(16),
	    isArray = __webpack_require__(1);

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
	    : baseEach(collection, baseCastFunction(iteratee));
	}

	module.exports = forEach;


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(27),
	    hasPath = __webpack_require__(58);

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
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	var baseHasIn = __webpack_require__(97),
	    hasPath = __webpack_require__(58);

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
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(52),
	    isArrayLike = __webpack_require__(11),
	    isString = __webpack_require__(9),
	    toInteger = __webpack_require__(66),
	    values = __webpack_require__(176);

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
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var constant = __webpack_require__(155),
	    root = __webpack_require__(4);

	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};

	/** Detect free variable `exports`. */
	var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
	  ? exports
	  : undefined;

	/** Detect free variable `module`. */
	var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
	  ? module
	  : undefined;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = (freeModule && freeModule.exports === freeExports)
	  ? freeExports
	  : undefined;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = !Buffer ? constant(false) : function(value) {
	  return value instanceof Buffer;
	};

	module.exports = isBuffer;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(67)(module)))

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(8),
	    isHostObject = __webpack_require__(18),
	    isObjectLike = __webpack_require__(5);

	/** Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns). */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

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


/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	var isHostObject = __webpack_require__(18),
	    isObjectLike = __webpack_require__(5);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

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
	  if (!isObjectLike(value) ||
	      objectToString.call(value) != objectTag || isHostObject(value)) {
	    return false;
	  }
	  var proto = getPrototypeOf(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = proto.constructor;
	  return (typeof Ctor == 'function' &&
	    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
	}

	module.exports = isPlainObject;


/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(5);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

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


/***/ },
/* 167 */
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
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	var baseMerge = __webpack_require__(104),
	    createAssigner = __webpack_require__(125);

	/**
	 * Recursively merges own and inherited enumerable properties of source objects
	 * into the destination object. Source properties that resolve to `undefined`
	 * are skipped if a destination value exists. Array and plain object properties
	 * are merged recursively. Other objects and value types are overridden by
	 * assignment. Source objects are applied from left to right. Subsequent
	 * sources overwrite property assignments of previous sources.
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
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(14),
	    baseDifference = __webpack_require__(91),
	    baseFlatten = __webpack_require__(95),
	    basePick = __webpack_require__(106),
	    keysIn = __webpack_require__(35),
	    rest = __webpack_require__(65);

	/**
	 * The opposite of `_.pick`; this method creates an object composed of the
	 * own and inherited enumerable properties of `object` that are not omitted.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {...(string|string[])} [props] The property names to omit, specified
	 *  individually or in arrays.
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
	  props = arrayMap(baseFlatten(props, 1), String);
	  return basePick(object, baseDifference(keysIn(object), props));
	});

	module.exports = omit;


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(54),
	    basePropertyDeep = __webpack_require__(107),
	    isKey = __webpack_require__(31);

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
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	var arraySome = __webpack_require__(42),
	    baseIteratee = __webpack_require__(28),
	    baseSome = __webpack_require__(109),
	    isArray = __webpack_require__(1),
	    isIterateeCall = __webpack_require__(30);

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
	 * // The `_.matches` iteratee shorthand.
	 * _.some(users, { 'user': 'barney', 'active': false });
	 * // => false
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.some(users, ['active', false]);
	 * // => true
	 *
	 * // The `_.property` iteratee shorthand.
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
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(8),
	    isObject = __webpack_require__(2);

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

	/** Built-in method references without a dependency on `root`. */
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
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	var baseToPairs = __webpack_require__(111),
	    keys = __webpack_require__(10);

	/**
	 * Creates an array of own enumerable key-value pairs for `object` which
	 * can be consumed by `_.fromPairs`.
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
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(29),
	    keysIn = __webpack_require__(35);

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
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(24),
	    isSymbol = __webpack_require__(166);

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
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	var baseValues = __webpack_require__(113),
	    keys = __webpack_require__(10);

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
/* 177 */
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
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Emitter = __webpack_require__(71);
	var reduce = __webpack_require__(177);

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


/***/ }
/******/ ])
});
;