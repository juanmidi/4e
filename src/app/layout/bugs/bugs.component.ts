import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { environment } from '../../../environments/environment';
import { SecurityService } from '../../shared/services/security.service';



@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.scss']
})


export class BugsComponent implements OnInit {
  displayedColumns: string[] = ['Fecha', 'Reporte', 'Resuelto'];
  data;
  bug: any = {};

  constructor(
    private dataService: DataService,
    private securityService: SecurityService,
  ) {}


  ngOnInit(): void {
    const codpers = sessionStorage.getItem('codPers');
    this.cargarBugs(codpers);
    this.bug.codpers = codpers;
    this.bug.reporte = '';
  }

  cargarBugs(codPers) {
    const url = `${environment.apiBaseUrl}/bugs?codpers=${codPers}`;
    const params = {};
    this.dataService.get(url, params).subscribe(
        (respuesta) => {
            this.data = respuesta.body;
        },
        (error) => {
            if (error.status === 401) {
            }
        }
    );
  }


  guardar() {
    const url = `${environment.apiBaseUrl}/bug_send`;
    this.dataService.post(url, this.bug).subscribe(
        (data) => {
            this.cargarBugs(this.bug.codpers);
            this.bug.reporte = '';
        },
        (error) => {
            if (error.status === 401) {
            }
        }
    );
  }

}
