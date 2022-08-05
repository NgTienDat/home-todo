import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/apiService/api.service';
import { AuthService } from 'src/app/services/authentication/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    password2: new FormControl(''),
  });

  onSubmit() {
    let username = this.registerForm.value.username;
    let password = this.registerForm.value.password;
    let password2 = this.registerForm.value.password2;

    if (username && password && password2 && password == password2) {
      this.apiService.registerUser(username, password);
    }
  }

  ngOnInit(): void {}
}
