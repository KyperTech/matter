import Matter from '../../src';
import * as request from '../../src/utils/request';
import config from '../../src/config';
import logger from '../../src/utils/logger';

let responseState = 'success';
let name = 'exampleApp';
let owner = 'test';
let matter = new Matter({name, owner});
let mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
let mockLog; let mockWarn; let mockInfo; let mockError; let mockDebug;
let mockGet = sinon.stub(request, 'get', () => {
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
let mockPut = sinon.stub(request, 'put', (putData) => {
 // console.log('mock put called with:', arguments);
 return new Promise((resolve, reject) => {
		if (responseState == 'success') {
			resolve({body: {token: mockToken, user: {username: 'testUser'}}});
		} else {
			//reset response state
			responseState = 'success';
			reject({message: 'Error'});
		}
	});
});
let mockPost = sinon.stub(request, 'post', (url, postData) => {
 // console.log('mock post called with:', arguments);
 return new Promise((resolve, reject) => {
	 if (!postData || postData == {}) {
		 reject({});
	 }
	 resolve({body: {token: mockToken, account: {username: 'testUser'}}});
 });
});


// TODO: Test options functionality
describe('Matter', () => {
	beforeEach(() => {
		mockLog = sinon.stub(logger, 'log', () => {});
		mockWarn = sinon.stub(logger, 'warn', () => {});
		mockInfo = sinon.stub(logger, 'info', () => {});
		mockDebug = sinon.stub(logger, 'debug', () => {});
		mockError = sinon.stub(logger, 'error', () => {});
	});
	afterEach(() => {
		logger.log.restore();
		logger.warn.restore();
		logger.info.restore();
		logger.debug.restore();
		logger.error.restore();
	});
	describe('Config', () => {
		it('sets correct serverUrl', () => {
			expect(matter.endpoint).to.equal(`${config.serverUrl}/users/${owner}/projects/${name}`);
		});
	});
	describe.skip('Constructor', () => {
		it('throws error if no project name is given', () => {
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
			expect(matterWithOptions.endpoint).to.equal(`http://localhost:4000/projects/${exampleAppName}`);
		});
		// it('handles tessellate as app name', () => {
		//	 let matterWithOptions;
		//	 try {
		//		 matterWithOptions = new Matter(exampleAppName, {localServer: true});
		//	 } catch (err) {
		//		 logger.error({description: 'Error testing options capability.'});
		//	 }
		//	 expect(matterWithOptions.endpoint).to.exist;
		//	 expect(matterWithOptions.endpoint).to.equal(`http://localhost:4000/apps/${exampleAppName}`);
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
			return matter.login({username: 'test', password: 'test'}).then(() => {
				expect(mockPut).to.have.been.calledOnce;
			})
		});
		// it('accepts third party login', () => {
		// 	matter.login('google').then(() => {
		// 		expect(mockProviderAuthLogin).to.have.been.calledOnce;
		// 	});
		// });
		// it('handles no input', () => {
		// 	matter.login();
		// 	expect(matter.login).to.have.been.calledOnce;
		// });
		it('handles invalid input object', () => {
			expect(matter.login({})).to.eventually.have.property('message');
		});
		it('handles invalid input', () => {
			expect(matter.login(['asdf'])).to.eventually.have.property('message');
		});
		it.skip('sets token', () => {
			//TODO: Stub call so that response can include a token
			return matter.login({username: 'test', password: 'test'}).then(() => {
				expect(matter.token.string).to.be.a('string');
			});
		});
		it.skip('sets token data', () => {
			return matter.login({username: 'test', password: 'test'}).then(() => {
				expect(matter.token.data).to.be.an('object');
			});
		});
		it.skip('logs user in', () => {
			return matter.login({username: 'test', password: 'test'}).then(() => {
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
			expect(matter.signup('google')).to.be.rejectedWith('Client id is required to authenticate with Google.');
		});
		it('calls signup endpoint', () => {
			return matter.signup({username: 'test', email:'test@test.com', password: 'test'}).then(() => {
				expect(mockPut).to.have.been.calledOnce;
			});
		});
		it.skip('sets token string', () => {
			return matter.signup({username: 'test', password: 'test'}).then(() => {
				expect(matter.token.string).to.be.a('string');
			});
		});
		it.skip('sets token data', () => {
			return matter.signup({username: 'test', password: 'test'}).then(() => {
				expect(matter.token.data).to.be.an('object');
			});
		});
		it.skip('signs user in', () => {
			return matter.signup({username: 'test', password: 'test'}).then(() => {
				expect(matter.isLoggedIn).to.be(true);
			});
		});
	});
	describe('Provider auth method', () => {
		beforeEach(() => {
			sinon.spy(matter, 'authUsingProvider');
		});
		afterEach(() => {
			matter.authUsingProvider.restore();
		});
		it('handles no input', () => {
			expect(matter.authUsingProvider()).to.be.rejectedWith('Provider data is required to signup.');
		});
		it('handles incorrectly formatted data', () => {
			expect(matter.authUsingProvider([''])).to.eventually.have.property('message');
		});
		it('accepts third party signupUsingProvider/login', () => {
			expect(matter.authUsingProvider('google')).to.be.rejectedWith('Client id is required to authenticate with Google.');
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
			return matter.logout().then(() =>	{
				expect(mockPut).to.have.been.calledOnce;
			});
		});
		it('removes token', () => {
			return matter.logout().then(() =>	{
				expect(matter.token.string).to.equal(null);
			});
		});
		it('logs user out', () => {
			return matter.logout().then(() =>	{
				expect(matter.isLoggedIn).to.equal(false);
			});
		});
	});
	describe('getCurrentUser method', () => {
		it('requests user endpoint', () => {
			matter.token.string = mockToken;
			return matter.getCurrentUser().then((user) =>	{
				expect(mockGet).to.have.been.calledOnce;
			});
		});
		it('loads current user from memory', () =>	{
			matter.token.string = mockToken;
			return matter.getCurrentUser().then((user) =>	{
				expect(user).to.have.property('body');
				// expect(user.username).to.be('testUser');
			});
		});
	});
	describe('currentUser object', () => {
		it('exists', () => {
			expect(matter.currentUser).to.be.defined;
		});
		it('returns user data based on token', () => {
			matter.token.string = mockToken;
			expect(matter.currentUser).to.be.an('object');
		});
		// it.skip('returns null if no current user', () =>	{
		//	 matter.token.delete();
		//	 expect(matter.currentUser).to.equal(null);
		// });
	});

	describe('updateAccount method', () => {
		it('exists', () => {
			expect(matter).to.respondTo('updateAccount');
		});
		it('requests endpoint', () => {
			matter.token.string = mockToken;
			return matter.updateAccount({name: 'new name'}).then((user) =>	{
				expect(mockPut).to.have.been.calledOnce;
			});
		});
		it('handles user not being logged in', () => {
			matter.token.delete();
			expect(matter.updateAccount()).to.eventually.have.property('message');
		});
	});

	describe('changePassword method', () => {
		it('exists', () => {
			expect(matter).to.respondTo('changePassword');
		});
		it('requests update endpoint', () => {
			matter.token.string = mockToken;
			return matter.changePassword().then((user) =>	{
				expect(mockPut).to.have.been.calledOnce;
			});
		});
		it('handles user not being logged in', () => {
			matter.token.delete();
			expect(matter.changePassword()).to.eventually.have.property('message');
		});
	});

	describe('recoverAccount method', () => {
		it('exists', () => {
			expect(matter).to.respondTo('recoverAccount');
		});
		it('handles no data', () => {
			expect(matter.recoverAccount()).to.be.rejectedWith('Account data is required to recover an account');
		});
		it('calls recover endpoint', () => {
			matter.token.string = mockToken;
			return matter.recoverAccount('test').then((user) =>	{
				expect(mockPut).to.have.been.calledOnce;
			});
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
		it('has request', () =>	{
			expect(matter.utils).to.have.property('request');
		});
		it('has logger', () =>	{
			expect(matter.utils).to.have.property('logger');
		});
		it('has storage', () =>	{
			expect(matter.utils).to.have.property('logger');
		});
	});
});
