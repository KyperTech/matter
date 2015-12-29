import token from '../../src/utils/token';
import { expect } from 'chai';
const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';

describe('token Util', () => {
  describe('string', () => {
    it('handles no token being set', () => {
      if (typeof window !== 'undefined') {
        expect(token.string).to.be.null;
      }
    });
    it('loads token string', () => {
      if (typeof window !== 'undefined') {
        token.string = mockToken;
        expect(token.string).to.be.a('string');
      }
    });
  });
  describe('data()', () => {
    it('sets token data', () => {
      token.data = {some: 'data'};
      expect(token.data).to.be.a('object');
    });
    it('gets token data', () => {
      token.data = {message: 'test'};
      expect(token.data).to.be.a('object');
    });
    it('set token data from string', () => {
      token.data = mockToken;
      expect(token.data).to.be.a('object');
    });
  });
  describe('string()', () => {
    it('exists', () => {
      expect(token.string).to.be.defined;
    });
  });
  describe('save', () => {
    it('exists', () => {
      expect(token).to.respondTo('save');
    });
    // it('saves token string', () => {
    //   token.save('sometoken');
    // });
  });
  describe('delete', () => {
    it('removes token', () => {
      expect(token).to.respondTo('delete');
    });
  });
});
