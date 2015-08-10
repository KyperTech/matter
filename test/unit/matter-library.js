import Matter from '../../src/matter-library';

describe('Matter', () => {
  describe('Login method', () => {
    beforeEach(() => {
      spy(Matter, 'login');
      Matter.login({username: 'test', password: 'test'});
    });

    it('should have been run once', () => {
      expect(Matter.login).to.have.been.calledOnce;
    });

  });
  describe('Signup method', () => {
    beforeEach(() => {
      spy(Matter, 'signup');
      Matter.signup({username: 'test', password: 'test'});
    });

    it('should have been run once', () => {
      expect(Matter.signup).to.have.been.calledOnce;
    });

  });
  describe('Logout method', () => {
    beforeEach(() => {
      spy(Matter, 'logout');
      Matter.logout();
    });

    it('should have been run once', () => {
      expect(Matter.logout).to.have.been.calledOnce;
    });

  });
  describe('getCurrentUser method', () => {
    beforeEach(() => {
      spy(Matter, 'getCurrentUser');
      Matter.getCurrentUser();
    });

    it('should have been run once', () => {
      expect(Matter.getCurrentUser).to.have.been.calledOnce;
    });
  });
  describe('getAuthToken method', () => {
    beforeEach(() => {
      spy(Matter, 'getAuthToken');
      Matter.getAuthToken();
    });

    it('should have been run once', () => {
      expect(Matter.getAuthToken).to.have.been.calledOnce;
    });
  });
  describe('getApps method', () => {
    beforeEach(() => {
      spy(Matter, 'getApps');
      Matter.getApps();
    });

    it('should have been run once', () => {
      expect(Matter.getApps).to.have.been.calledOnce;
    });
  });
});
