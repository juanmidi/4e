import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../shared/services/data.service';
import { environment} from '../../environments/environment';
import { observable, Subscription } from 'rxjs';
import { SecurityService } from '../shared/services/security.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public user;
    public password;
    public emailPattern = '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$';
    public error: string;
    public url = `${environment.apiBaseUrl}`;
    subRef$: Subscription;

    constructor(public dataService: DataService,
        public fb: FormBuilder,
        public router: Router,
        private securityService: SecurityService,
        private _snackBar: MatSnackBar) {

            this.loginForm = this.fb.group({
              password: new FormControl('', Validators.required),
              user: new FormControl('', [
                Validators.required,
                // Validators.pattern(this.emailPattern),
                Validators.maxLength(20),
              ]),
            });
            this.user = this.loginForm.get('user');
            this.password = this.loginForm.get('password');
          }

    ngOnInit() {
        this.loginForm.valueChanges.subscribe(() => {
            this.error = null;
          });
    }

    /*
    onLogin_OLD() {

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
    */

    onLogin() {
      this.router.navigate(['/dashboard']);
      this.error = null;

      if (this.loginForm.valid) {
          this.subRef$ = this.dataService.post(`${this.url}/login`, this.loginForm.getRawValue())
            .subscribe(res => {
              const token = res.body.accessToken;
              // console.log(token);
              const refresh_token = res.body.refresh_token;
              this.securityService.SetAuthData(token, refresh_token);

              const data = this.securityService.getDecodeToken();

              sessionStorage.setItem('codPers', data['user'].cod_pers);
              sessionStorage.setItem('apellido', data['user'].apellido);
              sessionStorage.setItem('nombre', data['user'].nombre);
              sessionStorage.setItem('email', data['user'].email);


              this.router.navigate(['/dashboard']);
              // reemplazar esta línea por acceso a security
              // localStorage.setItem('isLoggedin', 'true');
            }, err => {
              // console.log('Error en el login', err);
              this.openSnackBar('No se puede conectar al servidor', 'Cerrar');
            });
      }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
