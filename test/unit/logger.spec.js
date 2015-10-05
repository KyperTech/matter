import logger from '../../src/utils/logger';

describe('Logger Util', () => {
  describe('log', () => {
    it('exists', () => {
      expect(logger).to.respondTo('log');
    });
    it('logs a string', () => {
      logger.log('asdf');
    });
    it('logs an object', () => {
      logger.log({description: 'testing', file: 'test', obj: 'test'});
    });
  });
  describe('info', () => {
    it('exists', () => {
      expect(logger).to.respondTo('info');
    });
    it('logs a string', () => {
      logger.info('asdf');
    });
    it('logs an object', () => {
      logger.info({description: 'testing', file: 'test', func: 'test', obj: 'test'});
    });
  });
  describe('warn', () => {
    it('exists', () => {
      expect(logger).to.respondTo('warn');
    });
    it('logs a string', () => {
      logger.warn('asdf');
    });
    it('logs an object', () => {
      logger.warn({description: 'testing', file: 'test', func: 'test'});
    });
  });
  describe('debug', () => {
    it('exists', () => {
      expect(logger).to.respondTo('debug');
    });
    it('logs a string', () => {
      logger.debug('asdf');
    });
    it('logs an object', () => {
      logger.debug({description: 'testing', file: 'test', obj: 'test', test: {}});
    });
  });
  describe('error', () => {
    it('exists', () => {
      expect(logger).to.respondTo('error');
    });
    it('logs a string', () => {
      logger.error('asdf');
    });
    it('logs an object', () => {
      logger.error({description: 'testing', file: 'test', obj: 'test'});
    });
  });
});
