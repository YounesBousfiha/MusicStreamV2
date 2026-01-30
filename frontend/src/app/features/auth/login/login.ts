import {Component, inject} from '@angular/core';
import { RouterLink} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthStore} from '../../../core/store/auth.store';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
    private fb = inject(FormBuilder);
    readonly  store = inject(AuthStore);


    loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(12)]]
    });

    onSubmit() {
      if(this.loginForm.invalid) {
        this.loginForm.markAllAsTouched();
        return;
      }

      const { email, password }  = this.loginForm.value;

      this.store.login({
        email: email!,
        password: password!
      });
    }
}
