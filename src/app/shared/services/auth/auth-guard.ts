import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SecurityService } from '../security.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private securityService: SecurityService
    ) { }

    canActivate() {
        if (this.securityService.getUser()) {
            if (this.securityService.isTokenExpired()) {
                console.log('token expirado');
                console.log(this.securityService.minutesExpiredTime());
                // this.securityService.LogOff();
                // this.router.navigate(['/login']);
            } else {
              return true;
            }
        } else {
            this.router.navigate(['/login']);
        }
    }

}
