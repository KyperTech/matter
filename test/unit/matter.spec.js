import Matter from '../../src/matter';
import request from '../../src/utils/request';
import config from '../../src/config';
import logger from '../../src/utils/logger';

let exampleAppName = 'exampleApp';
let matter = new Matter(exampleAppName);
let mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
let mockGet = sinon.stub(request, 'get', function() {
 // console.log('mock get called with:', arguments);
 return new Promise((resolve) => {
   resolve({body: {}});
 });
});
let mockPut = sinon.stub(request, 'put', function(putData) {
 // console.log('mock put called with:', arguments);
 return new Promise((resolve) => {
   resolve({body: {}});
 });
});
let mockPost = sinon.stub(request, 'post', function(url, postData) {
 // console.log('mock post called with:', arguments);
 return new Promise((resolve, reject) => {
   if (!postData || postData == {}) {
     reject({});
   }
   resolve({body: {}});
 });
});
let mockLog = sinon.stub(logger, 'log', function() {

});
let mockWarn = sinon.stub(logger, 'warn', function() {

});
let mockInfo = sinon.stub(logger, 'info', function() {

});
let mockError = sinon.stub(logger, 'error', function() {

});
// TODO: Test options functionality
describe('Matter', () => {
  describe('Config', () => {
    it('sets correct serverUrl', () => {
      expect(matter.endpoint).to.equal(`${config.serverUrl}/apps/${exampleAppName}`);
    });
  });
  describe('Login method', () => {
    beforeEach(() => {
      sinon.spy(matter, 'login');
    });
    afterEach(() => {
      matter.login.restore();
    });
    it('accepts username and password', () => {
      matter.login({username: 'test', password: 'test'});
      expect(mockPut).to.have.been.calledOnce;
    });
    it('handles no input', () => {
      matter.login();
      expect(matter.login).to.have.been.calledOnce;
    });
    it('sets token', () => {
      matter.login({username: 'test', password: 'test'}).then(() => {
        expect(matter.token.string).to.be.a('string');
      });
    });
    it('sets token data', () => {
      matter.login({username: 'test', password: 'test'}).then(() => {
        expect(matter.token.data).to.be.an('object');
      });
    });
    it('logs user in', () => {
      matter.login({username: 'test', password: 'test'}).then(() => {
        expect(matter.isLoggedIn).to.be(true);
      });
    });
  });
  describe('Signup method', () => {
    beforeEach(() => {
      sinon.spy(matter, 'signup');
    });
    afterEach(() => {
      matter.signup.restore();
    });
    it('calls signup endpoint', () => {
      matter.signup({username: 'test', password: 'test'}).then(() => {
        expect(mockPut).to.have.been.calledOnce;
      });
    });
    it('sets token string', () => {
      matter.signup({username: 'test', password: 'test'}).then(() => {
        expect(matter.token.string).to.be.a('string');
      });
    });
    it('sets token data', () => {
      matter.signup({username: 'test', password: 'test'}).then(() => {
        expect(matter.token.data).to.be.an('object');
      });
    });
    it('signs user in', () => {
      matter.signup({username: 'test', password: 'test'}).then(() => {
        expect(matter.isLoggedIn).to.be(true);
      });
    });

  });
  describe('Logout method', () => {
    beforeEach(() => {
      sinon.spy(matter, 'logout');
      matter.token.string = mockToken;
    });
    afterEach(() => {
      matter.logout.restore();
    });
    it('should call logout endpoint', () => {
      matter.logout().then(() =>  {
        expect(mockPut).to.have.been.calledOnce;
      });
    });
    it('should remove token', () => {
      matter.logout().then(() =>  {
        expect(matter.token.string).to.be(null);
      });
    });
    it('logs user out', () => {
      matter.logout().then(() =>  {
        expect(matter.isLoggedIn).to.be(null);
      });
    });
  });
  describe('getCurrentUser method', () => {
    it('requests user endpoint', () => {
      matter.token.string = mockToken;
      matter.getCurrentUser().then((user) =>  {
        expect(mockGet).to.have.been.calledOnce;
      });
    });
    it('loads current user from memory', () =>  {
      matter.token.string = mockToken;
      matter.getCurrentUser().then((user) =>  {
        expect(user).to.have.property('username');
        expect(user.username).to.be('testUser');
      });
    });
  });
  describe('changePassword method', () => {
    it('requests recover endpoint', () => {
      matter.token.string = mockToken;
      matter.changePassword().then((user) =>  {
        expect(mockPut).to.have.been.calledOnce;
      });
    });
  });
  describe('recoverPassword method', () => {
    it('requests recover endpoint', () => {
      matter.token.string = mockToken;
      matter.recoverPassword().then((user) =>  {
        expect(mockPut).to.have.been.calledOnce;
      });
    });
  });
  describe('utils', () => {
    it('exists', () => {
      expect(matter.utils).to.be.an('object');
    });
    it('has request', () =>  {
      expect(matter.utils).to.have.property('request');
    });
    it('has logger', () =>  {
      expect(matter.utils).to.have.property('logger');
    });
    it('has storage', () =>  {
      expect(matter.utils).to.have.property('logger');
    });
  });
});
