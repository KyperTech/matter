import logger from '../../src/utils/logger';

describe('Logger Util', () => {
  describe('log', () => {
    it('exists', () => {
      console.log('request get exists');
      expect(logger).to.respondTo('log');
    });
    it('makes get request', () => {
      logger.log('asdf');
    });
  });
});
