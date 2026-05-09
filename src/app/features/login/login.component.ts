import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/serivces/auth.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
      ],
    ],
  });

  submitForm(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.signIp(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message == 'success') {
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('freshToken', res.token);
              localStorage.setItem('freshUser', JSON.stringify(res.user));
              this.authService.islogged.set(true);
              console.log(this.authService.islogged());
              this.router.navigate(['/']);
            }
          }
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
