import Matter from '../../src/matter';
import request from '../../src/utils/request';

let matter = new Matter('exampleApp');
let mockGet = sinon.stub(request, 'get', function() {
 console.log('mock get called with:', arguments);
 return new Promise((resolve) => {
   resolve({body: {}});
 });
});
let mockPut = sinon.stub(request, 'put', function(putData) {
 console.log('mock put called with:', arguments);
 return new Promise((resolve) => {
   resolve({body: {}});
 });
});
let mockPost = sinon.stub(request, 'post', function(url, postData) {
 console.log('mock post called with:', arguments);
 return new Promise((resolve, reject) => {
   if (!postData || postData == {}) {
     reject({});
   }
   resolve({body: {}});
 });
});
// TODO: Test options functionality
describe('Matter', () => {
  describe('Login method', () => {
    beforeEach(() => {
      spy(matter, 'login');
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
      spy(matter, 'signup');
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
      spy(matter, 'logout');
      matter.token.string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
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
  describe('currentUser method', () => {
    it('requests user endpoint', () => {
      matter.currentUser.then((user) =>  {
        expect(mockGet).to.have.been.calledOnce;
      });
    });
    it('loads current user from memory', () =>  {
      matter.storage.setItem('currentUser', {username: 'testUser'});
      matter.currentUser.then((user) =>  {
        expect(user).to.have.property('username');
        expect(user.username).to.be('testUser');
      });
    });
  });
  describe('utils', () => {
    it('exists', () => {
      matter.currentUser.then((user) =>  {
        expect(mockGet).to.have.been.calledOnce;
      });
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
