import { Person } from './person.model';

fdescribe('test for Person', () => {
  let person: Person;
  beforeEach(() => {
    person = new Person('Carlos', 'carlos', 30, 100, 1.9);
  });
  it('attrs', () => {
    expect(person.name).toEqual('Carlos');
    expect(person.lastName).toEqual('carlos');
  });

  describe('test for calcIMC', () => {
    it('should return a string down', () => {
      person.weigth = 40;
      person.heigth = 1.6;

      const rta = person.calcIMC();
      expect(rta).toEqual('down');
    });
    it('should return a string normal', () => {
      person.weigth = 70;
      person.heigth = 1.8;

      const rta = person.calcIMC();
      expect(rta).toEqual('normal');
    });
  });
});
