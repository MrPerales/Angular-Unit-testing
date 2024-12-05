import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MyValidators } from '../../../utils/validators';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        MyValidators.validPassword,
      ],
    ],
    confirmPassword: ['', [Validators.required]],
    checkTerms: [false, [Validators.requiredTrue]],
  });

  constructor(private fb: FormBuilder, private usersService: UserService) {}

  register(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value: any = this.form.value; // revisar bien el tipado any
      console.log(value);

      this.usersService.create(value).subscribe((rta) => {
        console.log(rta);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  get nameField() {
    return this.form.get('name');
  }

  get lastNameField() {
    return this.form.get('lastName');
  }

  get emailField() {
    return this.form.get('email');
  }

  get passwordField() {
    return this.form.get('password');
  }

  get confirmPasswordField() {
    return this.form.get('confirmPassword');
  }

  get checkTermsField() {
    return this.form.get('checkTerms');
  }
}
