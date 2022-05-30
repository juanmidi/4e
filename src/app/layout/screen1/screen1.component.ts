import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SecurityService } from '../../shared/services/security.service';
@Component({
    selector: 'app-screen1',
    templateUrl: './screen1.component.html',
    styleUrls: ['./screen1.component.scss'],
})
export class Screen1Component implements OnInit {
    constructor(
        private dataService: DataService,
        private securityService: SecurityService,
        public router: Router
    ) {}

    displayedColumns: string[] = ['nombre', 'apellido'];
    mono;

    ngOnInit() {
        this.cargarData();
    }

    cargarData() {
        const url = `${environment.apiBaseUrl}/monoget`;
        const params = {
            mono: 'sorcho',
            calesita: 'caballo',
        };
        this.dataService.get(url, params).subscribe(
            (respuesta) => {
                this.mono = respuesta.body;
                console.log(this.mono);
                /*
                console.log(this.securityService.getDecodeToken());
                const unixTime = this.securityService.getExpiryTime();
                const date = new Date(unixTime * 1000);
                console.log(date.toLocaleDateString('ar-ES'));
                console.log(this.securityService.isTokenExpired());
                console.log(this.securityService.getUser());
                */
            },
            (error) => {
                if (error.status === 401) {
                    console.log(this.securityService.isTokenExpired());
                    // this.router.navigate(['/dashboard']);
                }
            }
        );
    }
}
