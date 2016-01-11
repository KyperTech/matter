import cookiesUtil from '../../src/utils/cookies';
import logger from '../../src/utils/logger';
global.sinon = require('sinon');
global.chai = require('chai');
global.expect = require('chai').expect;
let mockLog; let mockWarn; let mockInfo; let mockError; let mockDebug;

let error;
// let mockGet = sinon.stub(superagent, 'get', (url) => {
//  console.log('mock get called with:', arguments);
//  if (url == '/testQuery') {
//   return new Promise((resolve) => {
//     let req = {};
//     req.query = () => {
//       console.log('mock query called');
//     };
//     resolve(req);
//   });
//  } else {
//   return new Promise((resolve) => {
//     resolve({body: {}});
//   });
//  }
// });
// let mockPut = sinon.stub(superagent, 'put', (url, putData) => {
//  console.log('mock put called with:', arguments);
//  return new Promise((resolve) => {
//    resolve({body: {}});
//  });
// });
// let mockPost = sinon.stub(superagent, 'post', (url, postData) => {
//  console.log('mock post called with:', arguments);
//  return new Promise((resolve, reject) => {
//    if (!postData || postData == {}) {
//      reject({});
//    }
//    resolve({body: {}});
//  });
// });
describe('Cookies Util', () => {
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
  describe('loadCss', () => {
    it('exists', () => {
      expect(cookiesUtil).to.respondTo('getCookie');
    });
    it('gets cookie', () => {
      if (typeof window !== 'undefined') {
        try {
          cookiesUtil.getCookie('sasdf');
        } catch (err) {
          error = err;
        }
        // expect(error).to.be.undefined;
      }
    });
  });
  describe('setCookie method', () => {
    it('exists', () => {
      expect(cookiesUtil).to.respondTo('setCookie');
    });
    it('sets cookie', () => {
      if (typeof window !== 'undefined') {
        try {
          cookiesUtil.setCookie('sasdf', 'cookie value');
        } catch (err) {
          error = err;
        }
        expect(error).to.be.undefined;
      }
    });
  });
  describe('deleteCookie method', () => {
    it('exists', () => {
      expect(cookiesUtil).to.respondTo('deleteCookie');
    });
    it('removes cookie', () => {
      cookiesUtil.setCookie('sasdf', 'testvalue');
      if (typeof window !== 'undefined') {
        try {
          cookiesUtil.deleteCookie('sasdf');
        } catch (err) {
          error = err;
        }
        // expect(error).to.be.undefined;
      }
    });
  });
});
