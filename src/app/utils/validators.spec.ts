import { FormControl, FormGroup } from '@angular/forms';
import { MyValidators } from './validators';
import { UserService } from '../services/user.service';
import { mockObservable } from '../../testing';

fdescribe('Tests for MyValidators', () => {
  describe('tests for isPriceValid', () => {
    it('should return null when the price is rigth ', () => {
      // Arrange
      const control = new FormControl(9999);
      // act
      const rta = MyValidators.isPriceValid(control);
      // assert
      expect(rta).toBeNull();
    });
    it('should return true when the price is wrong ', () => {
      const control = new FormControl(10001);
      const rta = MyValidators.isPriceValid(control);
      expect(rta?.price_invalid).toBeTrue();
    });
  });
  describe('tests for validPassword', () => {
    it('should return true when password is wrong', () => {
      // Arrange
      const control = new FormControl();
      control.setValue('abcdefg');
      // act
      const rta = MyValidators.validPassword(control);
      // assert
      expect(rta?.invalid_password).toBeTrue();
    });

    it('should return null when password is right', () => {
      const control = new FormControl();
      control.setValue('abcdfg123');
      const rta = MyValidators.validPassword(control);
      expect(rta).toBeNull();
    });
  });
  describe('test for matchPassword', () => {
    it('should return null', () => {
      const group = new FormGroup({
        password: new FormControl('123456'),
        confirmPassword: new FormControl('123456'),
      });
      const rta = MyValidators.matchPasswords(group);

      expect(rta).toBeNull();
    });
    it('should return true when password not match', () => {
      const group = new FormGroup({
        password: new FormControl('123456'),
        confirmPassword: new FormControl('123456abc'),
      });
      const rta = MyValidators.matchPasswords(group);
      expect(rta?.match_password).toBeTrue();
    });
    it('should return message error ', () => {
      const group = new FormGroup({
        campo: new FormControl('123456'),
        otroCampo: new FormControl('123456abc'),
      });
      // para testear throw necesitamos mandarlo como function
      const fn = () => MyValidators.matchPasswords(group);
      expect(fn).toThrow(new Error('matchPasswords : fields not found'));
    });
  });

  describe('test for validateEmailAsync', () => {
    it('should return null with valid email ', (doneFn) => {
      // Arrange
      // mocking
      const userService: jasmine.SpyObj<UserService> = jasmine.createSpyObj(
        'UserService',
        ['isAvalibleByEmail']
      );
      const control = new FormControl('carlos@mail.com');
      // act
      userService.isAvalibleByEmail.and.returnValue(
        mockObservable({ isAvalible: true })
      );
      const validator = MyValidators.validateEmailAsync(userService); //solo tenemos la funcion ya que nos pide un servicio
      // mandamos el valor del campo para que lo valide el cual es un observable y nos podemos subcribir
      validator(control).subscribe({
        next: (rta) => {
          // assert
          console.log(rta);

          expect(rta).toBeNull();
          doneFn();
        },
      });
    });
  });
});
