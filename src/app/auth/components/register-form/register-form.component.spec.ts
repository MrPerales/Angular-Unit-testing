import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormComponent } from './register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';

fdescribe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['create']);

    await TestBed.configureTestingModule({
      imports: [RegisterFormComponent, ReactiveFormsModule],
      providers: [{ provide: UserService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
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
});
