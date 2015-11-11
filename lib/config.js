Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

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
			logLevel: 'warn'
		}
	},
	tokenName: 'tessellate',
	tokenDataName: 'tessellate-tokenData',
	tokenUserDataName: 'tessellate-currentUser'
};
var instance = null;
var envName = 'prod';

var Config = (function () {
	function Config() {
		_classCallCheck(this, Config);

		if (!instance) {
			instance = this;
		}
		// console.log({description: 'Config object created.', config: merge(this, defaultConfig), func: 'constructor', obj: 'Config'});
		return (0, _lodash.merge)(instance, defaultConfig);
	}

	_createClass(Config, [{
		key: 'applySettings',
		value: function applySettings(settings) {
			(0, _lodash.merge)(instance, settings);
		}
	}, {
		key: 'serverUrl',
		get: function get() {
			var url = defaultConfig.envs[envName].serverUrl;
			if (typeof window !== 'undefined' && (0, _lodash.has)(window, 'location') && (0, _lodash.has)(window.location, 'host') && window.location.host !== '') {
				var matchingEnv = (0, _lodash.find)(defaultConfig.envs, function (e) {
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
		get: function get() {
			return defaultConfig.envs[envName].logLevel;
		}
	}, {
		key: 'envName',
		set: function set(newEnv) {
			envName = newEnv;
			// this.envName = newEnv;
			// console.log('Environment name set:', envName);
		}
	}, {
		key: 'env',
		get: function get() {
			return defaultConfig.envs[envName];
		}
	}]);

	return Config;
})();

var config = new Config();

exports['default'] = config;
module.exports = exports['default'];