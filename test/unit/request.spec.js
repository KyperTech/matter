import Matter from '../../src';
import * as request from '../../src/utils/request';
import superagent from 'superagent';
import logger from '../../src/utils/logger';
let mockLog; let mockWarn; let mockInfo; let mockError; let mockDebug;

let mockGet = sinon.stub(superagent, 'get', (url) => {
 if (url == '/testQuery') {
  return new Promise((resolve) => {
    let req = {};
    req.query = () => {
      // console.log('mock query called');
    };
    resolve(req);
  });
 } else {
  return new Promise((resolve) => {
    resolve({body: {}});
  });
 }
});
let mockPut = sinon.stub(superagent, 'put', (url, putData) => {
 // console.log('mock put called with:', arguments);
 return new Promise((resolve) => {
   resolve({body: {}});
 });
});
let mockPost = sinon.stub(superagent, 'post', (url, postData) => {
 // console.log('mock post called with:', arguments);
 return new Promise((resolve, reject) => {
   if (!postData || postData == {}) {
     reject({});
   }
   resolve({body: {}});
 });
});

describe('Request Util', () => {
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
  describe('get', () => {
    it('exists', () => {
      // console.log('request get exists');
      expect(request).to.respondTo('get');
    });
    it('makes get request', () => {
      expect(request.get('')).to.eventually.have.property('response');
    });
    // it('accepts query data', () => {
    //   request.get('', {some: 'data'}).then(() => {
    //     expect(mockGetQuery).to.have.been.calledOnce;
    //   });
    // });
  });
  describe('put', () => {
    it('exists', () => {
      expect(request).to.respondTo('put');
    });
    it('makes put request', () => {
      request.put('/endpoint', {}).then(() => {
        expect(mockPut).to.have.been.calledOnce;
      });
    });
  });
  describe('post', () => {
    it('exists', () => {
      expect(request).to.respondTo('post');
    });
    it('makes post request', () => {
      request.post('/endpoint', {}).then(() => {
        expect(mockPost).to.have.been.calledOnce;
      });
    });
  });
  describe('del', () => {
    it('makes put request', () => {
      request.del('/endpoint', {}).then(() => {
        expect(mockPut).to.have.been.calledOnce;
      });
    });
  });
});
