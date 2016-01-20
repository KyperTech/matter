'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _find = require('lodash/collection/find');

var _find2 = _interopRequireDefault(_find);

var _has = require('lodash/object/has');

var _has2 = _interopRequireDefault(_has);

var _merge = require('lodash/object/merge');

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