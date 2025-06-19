import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private loginService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const credentials = {
      username: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.loginService.login(credentials).subscribe({
      next: (res) => {
        if (res.success) {
          localStorage.setItem('token', res.data);
          this.router.navigate(['/orders']); 
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      },
      error: (err) => {
        console.error('Error en login:', err);
        alert('Ocurrió un error al autenticar');
      }
    });
  }

  get fc() {
    return this.loginForm.controls;
  }

  get fv() {
    return this.loginForm.value;
  }
}
