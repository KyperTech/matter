// import { jsdom } from 'jsdom'
// global.document = jsdom('<!doctype html><html><body></body></html>')
// global.window = document.defaultView;
// global.navigator = global.window.navigator;
// global.window.sessionStorage = {};
global.sinon = require('sinon');
global.chai = require('chai');
global.expect = require('chai').expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
