import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { DataService } from '../../shared/services/data.service';
import { SecurityService } from '../../shared/services/security.service';
import { Prestamos } from './../../models/prestamos.model';
import { finalize } from 'rxjs/operators';
import { map } from 'rxjs/operators';

interface TmpFila {
    cod_alumn: string;
    articulo: string;
}
@Component({
    selector: 'app-prestamo-instrumento',
    templateUrl: './prestamo-instrumento.component.html',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./prestamo-instrumento.component.scss'],
})
export class PrestamoInstrumentoComponent implements OnInit {
    constructor(
        private router: Router,
        private dataService: DataService,
        private securityService: SecurityService
    ) {}

    @Input()
    set salida(salida: string) {
        this.x++;
        if (this.x === 1) {
            this.hideCamera = true;
            this.action.stop();
            // console.log(salida);
            // this.nuevaFila.articulo = salida;
            // this.nuevaFila.cod_alumn = this.idUser;
            this.agregarPrestamoTmp(salida, 123);
            this.x = 0;
        }
    }

    @ViewChild('action', { static: false }) action: NgxScannerQrcodeComponent;



    hideCamera: boolean;
    displayedColumns: string[] = [
        'Retira',
        'Entrega',
        'Artículo',
        'DNI',
        'Nombre',
        'Observaciones',
    ];
    x: number;
    data: Prestamos[];
    dataSource: MatTableDataSource<Prestamos>;
    nuevaFila: Prestamos;
    tmpFila: TmpFila[];
    nDni;
    res;
    nombre;
    isLoading: boolean;
    step: number;
    articulos;
    startDate;
    fechaActual;
    verArticulos: boolean;
    idUser;

    ngOnInit(): void {
        this.x = 0;
        this.hideCamera = true;
        this.dataSource = new MatTableDataSource(this.data);
        this.cargar('2022-06-17');
        this.cargarArticulos();
        // this.nuevaFila = {};
        this.nombre = '';
        this.isLoading = false;
        this.step = 0;
        this.tmpFila = [];
        // navigator.mediaDevices.getUserMedia({video: true});
    }

    cargar(fecha) {
        const url = `${environment.apiBaseUrl}/prestamos?fecha=${fecha}`;
        console.log(url);
        const params = {};
        this.dataService.get<Prestamos[]>(url, params).subscribe(
            (respuesta) => {
                this.dataSource.data = respuesta.body;
                console.log(this.data);
            },
            (error) => {
                if (error.status === 401) {
                }
            }
        );
    }

    scan() {
        this.hideCamera = false;
        this.action.start();
    }

    buscarDNI(dni) {
        console.log(dni);
        this.nombre = '';
        const url = `${environment.apiBaseUrl}/buscar_dni?dni=${dni}`;
        const params = {};
        this.isLoading = true;
        this.dataService.get<Prestamos[]>(url, params).subscribe(
            (respuesta) => {
                if ( respuesta.body !== null) {
                    this.res = respuesta.body;
                    this.nombre = this.res.nombre;
                    this.idUser = this.res.NDOC_ALUMN;
                    console.log(this.res.nombre);
                    this.isLoading = false;
                    this.step = 2;
                }
            },
            (error) => {
                // console.log(error.status);
                if (error.status === 200) {
                    this.isLoading = false;
                }
                if (error.status === 401) {
                    this.isLoading = false;
                }
            }
        );
    }

    cargarArticulos() {
      this.nombre = '';
      const url = `${environment.apiBaseUrl}/articulos`;
      const params = {};
      this.isLoading = true;
      this.dataService.get<Prestamos[]>(url, params).subscribe(
          (respuesta) => {
              this.res = respuesta.body;
              this.articulos = this.res;
          },
          (error) => {
              if (error.status === 401) {
                  this.isLoading = false;
              }
          }
      );
    }

    pom() {
        this.dataSource.data.push(this.nuevaFila);

        console.log(this.dataSource.data);

        // Actualiza la Tabla!!!!!!!!
        this.dataSource.filter = '';
    }

    agregarPrestamoTmp (articulo, x) {
        console.log(articulo);
        let tmp: TmpFila; // const tmp = {cod_alumn: '', articulo: ''};
        tmp = {cod_alumn: '', articulo: ''};
        tmp.cod_alumn = x;
        tmp.articulo = articulo;
        console.log(tmp);
        this.tmpFila.push(tmp);
    }

    mostrarArticulos() {
        if (this.verArticulos) {
            this.verArticulos = false;
        } else {
            this.verArticulos = true;
        }
    }
    eliminarArticulo(index) {
        this.tmpFila.splice(index, 1);
    }
}
