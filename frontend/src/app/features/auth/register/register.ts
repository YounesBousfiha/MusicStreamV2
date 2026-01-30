import {Component, inject} from '@angular/core';
import { RouterLink} from '@angular/router';
import {AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import {AuthStore} from '../../../core/store/auth.store';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  private fb = inject(FormBuilder);
  readonly store = inject(AuthStore);


  registerForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, {
    validators: this.passwordMatchValidator
  });

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if(password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true});
      return { mismatch: true};
    } else {
      if(confirmPassword?.hasError('mismatch')) {
        delete confirmPassword?.errors?.['mismatch'];
        if(!Object.keys(confirmPassword?.errors || {}).length) {
          confirmPassword?.setErrors(null);
        }
      }
    }
    return null;
  }

  onSubmit() {
    if(this.registerForm.invalid)  {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formValue = this.registerForm.value;

    this.store.register({
      email: formValue.email!,
      password: formValue.password!,
      firstName: formValue.firstName!,
      lastName: formValue.lastName!,
    });
  }
}
