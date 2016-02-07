import storage from '../../src/utils/envStorage';
import logger from '../../src/utils/logger';
let mockLog; let mockWarn; let mockInfo; let mockError; let mockDebug;

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

describe('envStorage Util', () => {
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
  describe('localExists', () => {
    it('handles no document', () => {
      if (typeof window !== 'undefined') {
        expect(storage.localExists).to.be.false;
      }
    });
  });
  describe('item', () => {
    it('exists', () => {
      expect(storage).to.respondTo('item');
    });
    it('loads an item from storage', () => {
      storage.item('test', {message: 'test'});
      if (typeof window !== 'undefined') {
        expect(storage.getItem('test')).to.be.a('object');
      }
    });
  });
  describe('setItem', () => {
    it('exists', () => {
      expect(storage).to.respondTo('setItem');
    });
    it('saves object to storage', () => {
      if (typeof window !== 'undefined') {
        storage.setItem('testObj', {message: 'test'});
        expect(storage.getItem('testObj')).to.be.an('object');
      }
    });
    it('saves a string to storage', () => {
      if (typeof window !== 'undefined') {
        storage.setItem('testStr', 'test string value');
        expect(storage.getItem('testStr')).to.be.an('string');
      }
    });
  });
  describe('getItem', () => {
    it('exists', () => {
      expect(storage).to.respondTo('getItem');
    });
    it('removes all items from storage', () => {
      if (typeof window !== 'undefined') {
        storage.setItem('test', {message: 'test'});
        expect(storage.getItem('test')).to.be.an('object');
      }
    });
  });
  describe('removeItem', () => {
    it('exists', () => {
      expect(storage).to.respondTo('removeItem');
    });
    it('removes all items from storage', () => {
      if (typeof window !== 'undefined') {
        storage.setItem('test', {message: 'test'});
        storage.removeItem('test');
        expect(storage.getItem('test')).to.be.null;
      }
    });
  });
  describe('clear', () => {
    it('exists', () => {
      expect(storage).to.respondTo('clear');
    });
    it('removes all items from storage', () => {
      if (typeof window !== 'undefined') {
        storage.clear();
        expect(storage.getItem('test')).to.be.null;
      }
    });
  });
});
