'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _merge = require('lodash/merge');

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