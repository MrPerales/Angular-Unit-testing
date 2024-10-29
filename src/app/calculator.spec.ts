import { Calculator } from './calculator';

describe('test for calculator', () => {
  describe('tests for multiply', () => {
    it('should return 9', () => {
      // Arrange
      const calculator = new Calculator();
      // Act
      const rta = calculator.multiply(3, 3);
      // Assert
      expect(rta).toEqual(9);
    });

    it('should return 9', () => {
      // Arrange
      const calculator = new Calculator();
      // Act
      const rta = calculator.multiply(3, 3);
      // Assert
      expect(rta).toEqual(9);
    });
  });
  describe('tests for divide', () => {
    it('for 0', () => {
      // Arrange
      const calculator = new Calculator();
      // Act
      const rta = calculator.devide(3, 0);
      // Assert
      expect(rta).toBeNull();
    });

    it('should return some numbers', () => {
      // Arrange
      const calculator = new Calculator();
      // Act
      const rta = calculator.devide(6, 3);
      const rta2 = calculator.devide(2, 2);
      // Assert
      expect(rta).toEqual(2);
      expect(rta2).toEqual(1);
    });
  });

  it('test matches', () => {
    const name = 'carlos';
    let name2;

    expect(name).toBeDefined();
    expect(name2).toBeUndefined();

    expect(1 + 3 === 4).toBeTruthy(); // 4
    expect(1 + 1 === 3).toBeFalsy();

    expect(5).toBeLessThan(10);
    expect(25).toBeGreaterThan(10);

    expect('123456').toMatch(/123/);
    expect(['apples', 'oranges', 'pears']).toContain('oranges');
  });
});
