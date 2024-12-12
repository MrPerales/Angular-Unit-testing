import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { RegisterFormComponent } from './register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import {
  asyncData,
  asyncError,
  clickElement,
  getText,
  mockObservable,
  query,
  setInputCheckbox,
  setInputValue,
} from '../../../../testing';
import { generateOneUser } from '../../../models/user.mock';

fdescribe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', [
      'create',
      'isAvailableByEmail',
    ]);

    await TestBed.configureTestingModule({
      imports: [RegisterFormComponent, ReactiveFormsModule],
      providers: [{ provide: UserService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    //ya que en algunos tests utilizan al utilizar el metodo "create" este mismo utiliza el otro metodo "isavailableByEmail"
    userService.isAvailableByEmail.and.returnValue(
      mockObservable({ isAvailable: true })
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // name
  it('should the nameField be invvalid', () => {
    component.nameField?.setValue('');
    expect(component.nameField?.invalid).withContext('empty').toBeTruthy();
    component.nameField?.setValue('1234');
    expect(component.nameField?.invalid).withContext('lenght 4').toBeTruthy();
  });

  // email
  it('should the emailField be invalid', () => {
    component.emailField?.setValue('esto no es un email');
    expect(component.emailField?.invalid)
      .withContext('wrong email')
      .toBeTruthy();

    component.emailField?.setValue('');
    expect(component.emailField?.invalid).withContext('empty').toBeTruthy();
  });
  // password
  it('should the passwordField be invalid', () => {
    component.passwordField?.setValue('');
    expect(component.passwordField?.invalid).withContext('empty').toBeTruthy();

    component.passwordField?.setValue('12345');
    expect(component.passwordField?.invalid)
      .withContext('lenght 5')
      .toBeTruthy();

    component.passwordField?.setValue('abcdef123');
    expect(component.passwordField?.valid)
      .withContext('password right')
      .toBeTruthy();
  });
  // password confirmed
  it('should the confirmPasswordField be invalid', () => {
    component.confirmPasswordField?.setValue('');
    expect(component.confirmPasswordField?.invalid)
      .withContext('empty')
      .toBeTruthy();
  });
  // checkTerms
  it('should the checkTermsField be invalid', () => {
    component.checkTermsField?.setValue(false);
    expect(component.checkTermsField?.invalid).toBeTruthy();
  });
  // todo el formulario
  it('should the form be invalid', () => {
    component.form.patchValue({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      checkTerms: true,
    });
    expect(component.form.invalid).toBeTruthy();
  });

  // render html name
  it('should the nameField be invvalid from UI', () => {
    const inputDebug = query(fixture, 'input#name'); //por id
    const inputElement: HTMLInputElement = inputDebug.nativeElement;

    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input'));
    inputElement.dispatchEvent(new Event('blur')); //desenfoque para que aparesca el mensaje si es valido o no (para el small)
    fixture.detectChanges();

    expect(component.nameField?.invalid).withContext('empty').toBeTruthy();

    // comporbando el mensaje en el small
    const textError = getText(fixture, 'nameField-required');
    expect(textError).toContain('Required');
  });

  it('should the nameField be invvalid from UI with setInputValue', () => {
    setInputValue(fixture, 'input#name', '');
    fixture.detectChanges();

    expect(component.nameField?.invalid).withContext('empty').toBeTruthy();

    // comporbando el mensaje en el small
    const textError = getText(fixture, 'nameField-required');
    expect(textError).toContain('Required');
  });

  // render html email
  it('should the emailField be invvalid from UI', () => {
    // wrong email
    setInputValue(fixture, 'input#email', 'esto no es un email');
    fixture.detectChanges();
    expect(component.emailField?.invalid)
      .withContext('wrong email')
      .toBeTruthy();

    const textError = getText(fixture, 'emailField-error');
    expect(textError)
      .withContext('error message')
      .toContain("It's not a email");

    // empty
    setInputValue(fixture, 'input#email', '');
    fixture.detectChanges();
    expect(component.emailField?.invalid).withContext('empty').toBeTruthy();
    const textErrorRequired = getText(fixture, 'emailField-required');
    expect(textErrorRequired).withContext('required').toContain('Required');
  });
  it('should show error with an email invalid', () => {
    userService.isAvailableByEmail.and.returnValue(
      mockObservable({ isAvailable: false })
    );
    setInputValue(fixture, 'input#email', 'carlos@mail.com');
    // act
    fixture.detectChanges();

    // assert
    expect(component.emailField?.invalid).toBeTrue();
    expect(userService.isAvailableByEmail).toHaveBeenCalledWith(
      'carlos@mail.com'
    );
    const textError = getText(fixture, 'emailField-not_available');
    expect(textError)
      .withContext('error message')
      .toContain('The email is alredy register');
  });

  // render html password
  it('should the passwordField be invalid from UI', () => {
    // empty
    setInputValue(fixture, 'input#password', '');
    fixture.detectChanges();
    expect(component.passwordField?.invalid).withContext('empty').toBeTruthy();

    const textErrorRequired = getText(fixture, 'passwordField-required');
    expect(textErrorRequired).withContext('required').toContain('Required');

    // password lenght
    setInputValue(fixture, 'input#password', '1234');
    fixture.detectChanges();
    expect(component.passwordField?.invalid)
      .withContext('lenght 5')
      .toBeTruthy();

    const textErrorLenght = getText(fixture, 'passwordField-error');
    expect(textErrorLenght)
      .withContext('lenght')
      .toContain('Should be greater 6');

    // password without numbers
    setInputValue(fixture, 'input#password', 'qwertyu');
    fixture.detectChanges();
    expect(component.passwordField?.invalid)
      .withContext('without numbers')
      .toBeTruthy();

    const textErrorNumbers = getText(fixture, 'passwordField-errorNumbers');
    expect(textErrorNumbers)
      .withContext('without numbers')
      .toContain('Should contain numbers');
  });
  // render html confirmpassword
  // it('should the confirmPasswordField be invalid from UI', () => {
  //   // password
  //   // setInputValue(fixture, 'input#password', 'password1234');
  //   setInputValue(fixture, 'input#confirmPassword', 'password123');
  //   fixture.detectChanges();
  //   expect(component.confirmPasswordField?.invalid)
  //     .withContext('not match')
  //     .toBeTruthy();
  //   // const textError = getText(fixture, 'confirmPasswordField-error');
  //   // expect(textError).withContext('text not match').toContain('Not matching');
  // });

  // render html terms
  it('should checkbox be invalid from UI', () => {
    setInputCheckbox(fixture, 'input#terms', false);
    fixture.detectChanges();
    expect(component.checkTermsField?.invalid)
      .withContext('checkbox')
      .toBeTruthy();

    const checkboxDebug = query(fixture, 'input#terms');
    const checkboxElement: HTMLInputElement = checkboxDebug.nativeElement;
    expect(checkboxElement.checked).toBeFalsy(); //falsy ya que no esta seleccionado
  });
  it('should the form be invalid', () => {
    component.form.patchValue({
      name: 'Carlos',
      email: 'carlos@mail.com',
      confirmPassword: '123456',
      password: '123456',
      checkTerms: false,
    });
    expect(component.form.invalid).toBeTruthy();
  });

  it('should send the form successfully', () => {
    component.form.patchValue({
      name: 'Carlos',
      email: 'carlos@mail.com',
      confirmPassword: '123456',
      password: '123456',
      checkTerms: true,
    });
    const mockUser = generateOneUser();
    userService.create.and.returnValue(mockObservable(mockUser)); //spy
    // act
    component.register(new Event('submit'));
    expect(component.form.valid).toBeTruthy();
    expect(userService.create).withContext('haveBeenCalled').toHaveBeenCalled();
  });

  it('should send the form successfully and status "loading" => "success"', fakeAsync(() => {
    component.form.patchValue({
      name: 'Carlos',
      email: 'carlos@mail.com',
      confirmPassword: '123456',
      password: '123456',
      checkTerms: true,
    });
    const mockUser = generateOneUser();
    userService.create.and.returnValue(asyncData(mockUser)); //async data para tener el control con tick()

    component.register(new Event('submit'));
    expect(component.status).toEqual('loading');

    tick();
    fixture.detectChanges();
    expect(component.status).toEqual('success');

    expect(component.form.valid).toBeTruthy();
    expect(userService.create).withContext('haveBeenCalled').toHaveBeenCalled();
  }));

  it('should send the form succcessfully from UI', fakeAsync(() => {
    setInputValue(fixture, 'input#name', 'Carlos');
    setInputValue(fixture, 'input#email', 'Carlos@mail.com');
    setInputValue(fixture, 'input#password', '123456');
    setInputValue(fixture, 'input#confirmPassword', '123456');
    setInputCheckbox(fixture, 'input#terms', true);

    const mockUser = generateOneUser();
    userService.create.and.returnValue(asyncData(mockUser));

    // query(fixture, 'form').triggerEventHandler('ngSubmit', new Event('submit'));//otra forma
    clickElement(fixture, 'btn-submit', true); //hacemos click en el btn
    expect(component.status).toEqual('loading');
    fixture.detectChanges();

    tick();
    fixture.detectChanges();
    expect(component.status).toEqual('success');

    expect(component.form.valid).toBeTruthy();
    expect(userService.create).withContext('haveBeenCalled').toHaveBeenCalled();
  }));

  it('should send the form  from UI but with server error', fakeAsync(() => {
    setInputValue(fixture, 'input#name', 'Carlos');
    setInputValue(fixture, 'input#email', 'Carlos@mail.com');
    setInputValue(fixture, 'input#password', '123456');
    setInputValue(fixture, 'input#confirmPassword', '123456');
    setInputCheckbox(fixture, 'input#terms', true);

    const mockUser = generateOneUser();
    userService.create.and.returnValue(asyncError(mockUser));

    clickElement(fixture, 'btn-submit', true); //hacemos click en el btn
    expect(component.status).toEqual('loading');
    fixture.detectChanges();

    tick();
    fixture.detectChanges();
    expect(component.status).toEqual('error');

    expect(component.form.valid).toBeTruthy();
    expect(userService.create).withContext('haveBeenCalled').toHaveBeenCalled();
  }));
});
