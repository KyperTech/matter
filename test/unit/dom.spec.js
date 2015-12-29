import dom from '../../src/utils/dom';
import { expect } from 'chai';

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

describe('Dom Util', () => {
  describe('loadCss', () => {
    it('exists', () => {
      expect(dom).to.respondTo('loadCss');
    });
    it.skip('handles no document', () => {
      if (typeof window !== 'undefined') {
        let error;
        try {
          dom.loadCss('sasdf');
        } catch (err) {
          error = err;
        }
        expect(error).to.be.undefined;
      }
    });
  });
  describe('loadJs', () => {
    it('exists', () => {
      expect(dom).to.respondTo('loadJs');
    });
    it('handles no document', () => {
      if (typeof window !== 'undefined') {
        let error;
        try {
          dom.loadJs('sasdf');
        } catch (err) {
          error = err;
        }
        expect(error).to.be.undefined;
      }
    });
  });
  describe('asyncLoadJs', () => {
    it('exists', () => {
      expect(dom).to.respondTo('asyncLoadJs');
    });
    it('handles no document', () => {
      if (typeof window !== 'undefined') {
        let error;
        try {
          dom.asyncLoadJs('sasdf');
        } catch (err) {
          error = err;
        }
        expect(error).to.be.undefined;
      }
    });
  });
});
