import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../shared/services/rest__.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public email;
    public password;
    public emailPattern = '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$';
    public error: string;

    constructor(public restService: RestService,
        public fb: FormBuilder,
        public router: Router) {

            this.loginForm = this.fb.group({
              password: new FormControl('', Validators.required),
              email: new FormControl('', [
                Validators.required,
                Validators.pattern(this.emailPattern),
                Validators.maxLength(20),
              ]),
            });
            this.email = this.loginForm.get('email');
            this.password = this.loginForm.get('password');
          }

    ngOnInit() {
        this.loginForm.valueChanges.subscribe(() => {
            this.error = null;
          });
    }

    onLogin() {

        this.error = null;
        console.log(this.loginForm.valid);
        if (this.loginForm.valid) {
          this.restService.login(this.loginForm.getRawValue())
            .subscribe(
              res => this.router.navigate(['/dashboard']),
              error => this.error = error.error.message,
            );
            // this.router.navigate(['/dashboard']);
            localStorage.setItem('isLoggedin', 'true');
        }
    }
}
