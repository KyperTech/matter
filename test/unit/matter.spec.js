import Matter from '../../src/matter';
import request from '../../src/utils/request';
import config from '../../src/config';
import logger from '../../src/utils/logger';
import ProviderAuth from '../../src/utils/providerAuth';
let responseState = 'success';
let exampleAppName = 'exampleApp';
let matter = new Matter(exampleAppName);
let mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
let mockLog; let mockWarn; let mockInfo; let mockError;
let mockGet = sinon.stub(request, 'get', function() {
 // console.log('mock get called with:', arguments);
  return new Promise((resolve, reject) => {
    if (responseState == 'success') {
      resolve({body: {}});
    } else {
      //reset response state
      responseState = 'success';
      reject({message: 'Error'});
    }
  });
});
let mockPut = sinon.stub(request, 'put', function(putData) {
 // console.log('mock put called with:', arguments);
 return new Promise((resolve, reject) => {
    if (responseState == 'success') {
      resolve({body: {}});
    } else {
      //reset response state
      responseState = 'success';
      reject({message: 'Error'});
    }
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

let auth = new ProviderAuth({app: matter, provider: 'google'});
let mockProviderAuthSignup = sinon.stub(auth, 'signup', function() {
 // console.log('mock get called with:', arguments);
 return new Promise((resolve, reject) => {
    if (responseState == 'success') {
      resolve({body: {}});
    } else {
      //reset response state
      responseState = 'success';
      reject({message: 'Error'});
    }
  });
});
let mockProviderAuthLogin = sinon.stub(auth, 'login', function() {
 // console.log('mock get called with:', arguments);
 return new Promise((resolve, reject) => {
    if (responseState == 'success') {
      resolve({body: {}});
    } else {
      //reset response state
      responseState = 'success';
      reject({message: 'Error'});
    }
  });
});

mockLog = sinon.stub(logger, 'log', function() {
});
mockWarn = sinon.stub(logger, 'warn', function() {
});
mockInfo = sinon.stub(logger, 'info', function() {
});
mockError = sinon.stub(logger, 'error', function() {
});
// TODO: Test options functionality
describe('Matter', () => {
  describe('Config', () => {
    it('sets correct serverUrl', () => {
      expect(matter.endpoint).to.equal(`${config.serverUrl}/apps/${exampleAppName}`);
    });
  });
  describe('Constructor', () => {
    it('throws error if no app name is given', () => {
      let error;
      try {
        new Matter();
      } catch (err) {
        error = err;
      }
      expect(error).to.exist;
      expect(error).to.be.an.instanceof(Error);
    });
    it('handles being passed options', () => {
      let matterWithOptions;
      try {
        matterWithOptions = new Matter(exampleAppName, {localServer: true});
      } catch (err) {
        logger.error({description: 'Error testing options capability.'});
      }
      expect(matterWithOptions).to.exist;
      expect(matterWithOptions).to.be.an.instanceof(Matter);
    });
    it('sets localServer mode based on option', () => {
      let matterWithOptions;
      try {
        matterWithOptions = new Matter(exampleAppName, {localServer: true});
      } catch (err) {
        logger.error({description: 'Error testing options capability.'});
      }
      expect(matterWithOptions.endpoint).to.exist;
      expect(matterWithOptions.endpoint).to.equal(`http://localhost:4000/apps/${exampleAppName}`);
    });
    // it('handles tessellate as app name', () => {
    //   let matterWithOptions;
    //   try {
    //     matterWithOptions = new Matter(exampleAppName, {localServer: true});
    //   } catch (err) {
    //     logger.error({description: 'Error testing options capability.'});
    //   }
    //   expect(matterWithOptions.endpoint).to.exist;
    //   expect(matterWithOptions.endpoint).to.equal(`http://localhost:4000/apps/${exampleAppName}`);
    // });
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
    it('accepts third party login', () => {
      matter.login('google').then(() => {
        expect(mockProviderAuthLogin).to.have.been.calledOnce;
      });
    });
    it('handles no input', () => {
      matter.login();
      expect(matter.login).to.have.been.calledOnce;
    });
    it('handles invalid input object', () => {
      expect(matter.login({})).to.eventually.have.property('message');
    });
    it('handles invalid input', () => {
      expect(matter.login(['asdf'])).to.eventually.have.property('message');
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
    it('handles no input', () => {
      expect(matter.signup()).to.eventually.have.property('message');
    });
    it('handles incorrectly formatted signup data', () => {
      expect(matter.signup([''])).to.eventually.have.property('message');
    });
     it('accepts third party signup/login', () => {
      matter.signup('google').then(() => {
        expect(mockProviderAuthSignup).to.have.been.calledOnce;
      });
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
    it('handles user not being logged in', () => {
      matter.token.delete();
      expect(matter.logout()).to.eventually.have.property('message');
    });
    it('calls logout endpoint', () => {
      matter.logout().then(() =>  {
        expect(mockPut).to.have.been.calledOnce;
      });
    });
    it('removes token', () => {
      matter.logout().then(() =>  {
        expect(matter.token.string).to.be(null);
      });
    });
    it('logs user out', () => {
      matter.logout().then(() =>  {
        expect(matter.isLoggedIn).to.be(false);
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
  describe('currentUser object', () => {
    it('exists', () => {
      expect(matter.currentUser).to.be.defined;
    });
    it('returns user data based on token', () => {
      if (typeof window == 'undefined') {
        matter.token.string = mockToken;
        expect(matter.currentUser).to.be.an('object');
      } else {
        expect(matter.currentUser).to.equal(null);
      }
    });
    // it.skip('returns null if no current user', () =>  {
    //   matter.token.delete();
    //   expect(matter.currentUser).to.equal(null);
    // });
  });

  describe('updateProfile method', () => {
    it('requests recover endpoint', () => {
      matter.token.string = mockToken;
      matter.updateProfile().then((user) =>  {
        expect(mockPut).to.have.been.calledOnce;
      });
    });
    it('handles user not being logged in', () => {
      matter.token.delete();
      expect(matter.updateProfile()).to.eventually.have.property('message');
    });
  });

  describe('changePassword method', () => {
    it('requests recover endpoint', () => {
      matter.token.string = mockToken;
      matter.changePassword().then((user) =>  {
        expect(mockPut).to.have.been.calledOnce;
      });
    });
    it('handles user not being logged in', () => {
      matter.token.delete();
      expect(matter.changePassword()).to.eventually.have.property('message');
    });
  });

  describe('recoverPassword method', () => {
    it('requests recover endpoint', () => {
      matter.token.string = mockToken;
      matter.recoverPassword().then((user) =>  {
        expect(mockPut).to.have.been.calledOnce;
      });
    });
    it('handles user not being logged in', () => {
      matter.token.delete();
      expect(matter.recoverPassword()).to.eventually.have.property('message');
    });
  });
  describe('isInGroups method', () => {
    beforeEach(() => {
      matter.token.string = mockToken;
    });
    it('exists', () => {
      expect(matter).to.respondTo('isInGroups');
    });
    it('handles no input', () => {
      let inGroups = matter.isInGroups();
      expect(inGroups).to.equal(false);
    });
    it('accepts array of group names', () => {
      let inGroups = matter.isInGroups(['group1', 'group2']);
      expect(inGroups).to.equal(false);
    });
    it('accepts array of group objects with names', () => {
      let inGroups = matter.isInGroups([{name: 'group1'}, {name: 'group2'}]);
      expect(inGroups).to.equal(false);
    });
    it('handles array invalid group objects', () => {
      let inGroups = matter.isInGroups([{}, {}]);
      expect(inGroups).to.equal(false);
    });
    it('accepts string list of groups', () => {
      let inGroups = matter.isInGroups('group1,group2');
      expect(inGroups).to.equal(false);
    });
    it('accepts string group name', () => {
      let inGroups = matter.isInGroups('group1');
      expect(inGroups).to.equal(false);
    });
    it('handles user not being logged in', () => {
      matter.token.delete();
      let inGroups = matter.isInGroups('');
      expect(inGroups).to.equal(false);
    });
  });
  describe('isInGroup method', () => {
    beforeEach(() => {
      matter.token.string = mockToken;
    });
    it('exists', () => {
      expect(matter).to.respondTo('isInGroup');
    });
    it('handles no input', () => {
      let inGroup = matter.isInGroup();
      expect(inGroup).to.equal(false);
    });
    it('handles string group name', () => {
      let inGroup = matter.isInGroup('group1');
      expect(inGroup).to.equal(false);
    });
    it('handles array of group names', () => {
      let inGroups = matter.isInGroup(['group1', 'group2']);
      expect(inGroups).to.equal(false);
    });
    it('handles user not being logged in', () => {
      matter.token.delete();
      let inGroup = matter.isInGroup('');
      expect(inGroup).to.equal(false);
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
