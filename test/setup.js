 global.sinon = require('sinon');
global.chai = require('chai');
global.expect = require('chai').expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var Promise = require('es6-promise').Promise;
global.Promise = Promise;
// If window or document is needed
var jsdom = require('jsdom');
var doc = jsdom.jsdom("<html><body></body></html>");
var win = doc.defaultView;
global.document = doc;
global.window = win;
global.navigator = win.navigator;
