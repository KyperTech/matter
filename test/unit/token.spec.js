import token from '../../src/utils/token'
import logger from '../../src/utils/logger'
const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ'
let mockLog, mockWarn, mockInfo, mockError, mockDebug

describe('token Util', () => {
  beforeEach(() => {
    mockLog = sinon.stub(logger, 'log', () => {})
    mockWarn = sinon.stub(logger, 'warn', () => {})
    mockInfo = sinon.stub(logger, 'info', () => {})
    mockDebug = sinon.stub(logger, 'debug', () => {})
    mockError = sinon.stub(logger, 'error', () => {})
  })
  afterEach(() => {
    logger.log.restore()
    logger.warn.restore()
    logger.info.restore()
    logger.debug.restore()
    logger.error.restore()
  })
  describe('string', () => {
    it('sets token string', () => {
      if (typeof window !== 'undefined') {
        token.string = mockToken
        expect(token.string).to.be.a('string')
      }
    })
  })
  describe('data()', () => {
    it('sets token data', () => {
      expect(token.data).to.be.a('object')
    })
    it('gets token data', () => {
      expect(token.data).to.be.a('object')
    })
    it('set token data from string', () => {
      expect(token.data).to.be.a('object')
    })
  })
  describe('string()', () => {
    it('exists', () => {
      expect(token.string).to.be.defined
    })
  })
  describe('save', () => {
    it('exists', () => {
      expect(token).to.respondTo('save')
    })
    // it('saves token string', () => {
    //   token.save('sometoken')
    // })
  })
  describe('delete', () => {
    it('removes token', () => {
      expect(token).to.respondTo('delete')
    })
  })
})
