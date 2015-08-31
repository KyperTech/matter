import Matter from '../../src/matter';
import request from '../../src/utils/request';

let matter = new Matter('exampleApp');
let mockGet = sinon.stub(request, 'get', function() {
 console.log('mock get called with:', arguments);
 return new Promise((resolve) => {
   resolve({body: {}});
 });
});
let mockPut = sinon.stub(request, 'put', function() {
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
describe('Matter', () => {
  describe('Login method', () => {
    beforeEach(() => {
      spy(matter, 'login');
      spy(console, 'error');
    });

    it('should have been run once', () => {
      matter.login({username: 'test', password: 'test'});
      expect(matter.login).to.have.been.calledOnce;
    });
    it('handle no input', () => {
      matter.login();
      expect(matter.login).to.have.been.calledOnce;
    });
  });
  describe('Signup method', () => {
    beforeEach(() => {
      spy(matter, 'signup');
      matter.signup({username: 'test', password: 'test'});
    });

    it('should have been run once', () => {
      expect(matter.signup).to.have.been.calledOnce;
    });

  });
  describe('Logout method', () => {
    beforeEach(() => {
      spy(matter, 'logout');
      matter.logout();
    });

    it('should have been run once', () => {
      expect(matter.logout).to.have.been.calledOnce;
    });

  });
  describe('getCurrentUser method', () => {
    beforeEach(() => {
      spy(matter, 'getCurrentUser');
      matter.getCurrentUser();
    });

    it('should have been run once', () => {
      expect(matter.getCurrentUser).to.have.been.calledOnce;
    });
  });
  describe('getAuthToken method', () => {
    beforeEach(() => {
      spy(matter, 'getAuthToken');
    });

    it('should have been run once', () => {
      matter.getAuthToken();
      expect(matter.getAuthToken).to.have.been.calledOnce;
    });
    it('get auth token', () => {
      window = {localStorage: {}};
      window.localStorage.getItem = () => {
        return '';
      };
      matter.getAuthToken();
      expect(matter.getAuthToken).to.have.been.calledOnce;
    });
  });
});
