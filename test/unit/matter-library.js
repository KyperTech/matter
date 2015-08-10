import Matter from '../../src/matter-library';

describe('Matter', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(Matter, 'greet');
      Matter.greet();
    });

    it('should have been run once', () => {
      expect(Matter.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(Matter.greet).to.have.always.returned('hello');
    });
  });
});
