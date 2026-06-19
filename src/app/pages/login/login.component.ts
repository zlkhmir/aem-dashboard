import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { PouchdbAuthService } from '../../services/pouchdb-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private pouchdbAuthService: PouchdbAuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    if (this.authService.getToken()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.isSubmitting = false;

        if (res.token) {
          this.authService.setToken(res.token);
          this.router.navigate(['/dashboard']);
        } else {
          alert(res.message || 'Invalid email or password.');
        }
      },

      error: async (err) => {
        console.log('Login API failed:', err);

        const { email, password } = this.loginForm.value;

        const valid = await this.pouchdbAuthService.validateUser(
          email,
          password
        );

        this.isSubmitting = false;

        if (valid) {
          this.authService.setToken('local-pouchdb-token');
          alert('Login successful.');
          this.router.navigate(['/dashboard']);
        } else {
          alert('Invalid email or password.');
        }
      }
    });
  }
}