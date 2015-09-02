import Matter from '../../src/matter';
import request from '../../src/utils/request';
import superagent from 'superagent';

let matter = new Matter('exampleApp');
let mockGet = sinon.stub(superagent, 'get', (url) => {
 console.log('mock get called with:', arguments);
 if (url == '/testQuery') {
  return new Promise((resolve) => {
    let req = {};
    req.query = () => {
      console.log('mock query called');
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
 console.log('mock put called with:', arguments);
 return new Promise((resolve) => {
   resolve({body: {}});
 });
});
let mockPost = sinon.stub(superagent, 'post', (url, postData) => {
 console.log('mock post called with:', arguments);
 return new Promise((resolve, reject) => {
   if (!postData || postData == {}) {
     reject({});
   }
   resolve({body: {}});
 });
});
describe('Matter', () => {
  describe('get', () => {
    it('makes get request', () => {
      request.get('').then(() => {
        expect(mockGet).to.have.been.calledOnce;
      });
    });
    // it('accepts query data', () => {
    //   request.get('', {some: 'data'}).then(() => {
    //     expect(mockGetQuery).to.have.been.calledOnce;
    //   });
    // });
  });
  describe('put', () => {
    it('makes put request', () => {
      request.put('/endpoint', {}).then(() => {
        expect(mockPut).to.have.been.calledOnce;
      });
    });
  });
  describe('post', () => {
    it('makes post request', () => {
      request.post('/endpoint', {}).then(() => {
        expect(mockPost).to.have.been.calledOnce;
      });
    });
  });
  // describe('del', () => {
  //   it('makes put request', () => {
  //     request.del('/endpoint', {}).then(() => {
  //       expect(mockPut).to.have.been.calledOnce;
  //     });
  //   });
  // });
});
