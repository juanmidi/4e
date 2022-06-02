import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { environment } from '../../../environments/environment';
// import { Router } from '@angular/router';
// import { HttpErrorResponse } from '@angular/common/http';
import { SecurityService } from '../../shared/services/security.service';
import {FormControl, Validators} from '@angular/forms';


interface Icorrelatividades {
    COD_MATER: String;
    MAT_CORREL: String;
    estado: String;
}

interface IEquivalencias {
    COD_MATER: String;
    COD_EQUIV: String;
}
@Component({
    selector: 'app-mis-materias',
    templateUrl: './mis-materias.component.html',
    styleUrls: ['./mis-materias.component.scss'],
})


export class MisMateriasComponent implements OnInit {
    constructor(
        private dataService: DataService,
        private securityService: SecurityService
    ) {}
    catedras;
    carreras;
    res;
    selectedValue;
    selectedCated;
    mono;
    faltantes;
    displayedColumns: string[] = ['materia', 'anio', 'estado'];
    correlatividades: Icorrelatividades[];
    equivalencias: IEquivalencias[];

    ngOnInit(): void {
        this.getCorrelatividades(5766);
        this.getEquivalencias();
        this.cargarData();
        this.cargarCatedrasPorProfe();
    }

    async fetchData(idplan) {
        const url = `${environment.apiBaseUrl}/plan_materias?idplan=${idplan}`;
        const tmp = await this.dataService
          .get<any>(url)
          .toPromise();
        this.mono = tmp.body;
    }

    async misMaterias(idplan, idEstudiante) {
        // const url = `${environment.apiBaseUrl}/mis_materias?idplan=${idplan}&idestudiante=${idEstudiante}`;
        const url = `${environment.apiBaseUrl}/get_materias_estudiante?idestudiante=${idEstudiante}`;
        const tmp = await this.dataService
          .get<any>(url)
          .toPromise();
        this.mono = tmp.body;
    }

    checkAprobadas(codMater): boolean {
        let result = false;
        this.correlatividades.map((res) => {
            if (res.COD_MATER === codMater) {
              // console.log(res.COD_MATER, codMater);
              if (res.estado === '9') {
                result = true;
              } else {
                result = false;
              }
          }
        });
        return result;
    }

    checkCorrelatividades(codMater): boolean {
        const faltantes = [];
        this.correlatividades.map((res) => {
            const equiv = this.getEquivalencia(res.COD_MATER);
            if (res.COD_MATER === codMater) {
              if (res.estado === '9') {
                faltantes.push(res.MAT_CORREL);
              }
          }
        });
        if (faltantes.length > 0) {
          return false;
        } else {
          return true;
        }
    }


    checkMateria_copia(codMater): boolean {
        // let res;
        // for (const x of this.correlatividades) {
        //   if (x.COD_MATER === codMater) {
        //     // console.log('estado TRUE de ' + x.COD_MATER, x.estado);
        //     res = true;
        //   } else {
        //     // console.log('estado FALSE de ' + x.COD_MATER, x.estado);
        //     res = false;
        //   }
        // }
        // return res;

        // const materias = [];
        const faltantes = [];
        const aprobadas = [];
        this.correlatividades.map((res) => {
            const equiv = this.getEquivalencia(res.COD_MATER);
            // console.log(equiv);
            // if (equiv === codMater) {
            //     if (res.estado !== '9') {
            //       faltantes.push(res.MAT_CORREL);
            //     }
            // }
            if (res.COD_MATER === codMater) {
              if (res.estado !== '9') {
                faltantes.push(res.MAT_CORREL);
              }
          }
        });

        // si la longitud de faltantes es 0 entonces puede inscribirse
        // porque tiene las correlativas anteriores aprobadas
        if (faltantes.length > 0) {
        //   console.log(faltantes.length, 'false', codMater);
        //   console.log(faltantes);
          return false;
        } else {
        //   console.log(faltantes.length, 'true', codMater);
          return true;
        }
    }



    async getCorrelatividades(idEstudiante) {
        const url = `${environment.apiBaseUrl}/correlatividades?idestudiante=${idEstudiante}`;
        const tmp = await this.dataService
          .get<any>(url)
          .toPromise();
        this.correlatividades = tmp.body;
        // console.log(tmp.body);
    }

    async getEquivalencias() {
        const url = `${environment.apiBaseUrl}/equivalencias`;
        const tmp = await this.dataService
          .get<any>(url)
          .toPromise();
        this.equivalencias = tmp.body;
        // console.log(tmp.body);
    }

    getEquivalencia(codMater) {
        let result: String;
        this.equivalencias.map((res) => {
            // console.log(res.COD_MATER, codMater);
            if (res.COD_MATER === codMater) {
                result = res.COD_EQUIV;
          }
        });
        return result;
    }

    buscarCorrelativa() {
        // console.log(this.buscarCorrelativa_XXX('15030'));
    }

    buscarCorrelativa_XXX(codMater: string): any {
        let j;
        for (let i = 0; i < this.correlatividades.length; i++) {
            let obj;
            obj = this.correlatividades[i];
            for (const key in obj) {
                if (key === 'COD_MATER' && obj['COD_MATER'] === codMater) {
                //   const value = obj['MAT_CORREL'];
                //   console.log(value);
                    j++;
              }
            }
          }
          return j;
    }

    async materiasFaltantes(idplan, idEstudiante) {
        const url = `${environment.apiBaseUrl}/materias_sin_cursar?idplan=${idplan}&idestudiante=${idEstudiante}`;
        const tmp = await this.dataService
          .get<any>(url)
          .toPromise();
        this.faltantes = tmp.body;
    }

    cargarData() {
        const url = `${environment.apiBaseUrl}/planes`;
        // const params = {
        //     mono: 'sorcho',
        //     calesita: 'caballo',
        // };
        const params = {};
        this.dataService.get(url, params).subscribe(
            (respuesta) => {
                this.carreras = respuesta.body;
                // console.log(this.carreras);
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
                    // console.log(this.securityService.isTokenExpired());
                    // this.router.navigate(['/dashboard']);
                }
            }
        );
    }

    cargarCatedrasPorProfe() {
      const url = `${environment.apiBaseUrl}/cated_by_prof?idprof=33`;
      const params = {};
      this.dataService.get(url, params).subscribe(
          (respuesta) => {
              this.catedras = respuesta.body;
          },
          (error) => {
              if (error.status === 401) {

              }
          }
      );
  }

}
