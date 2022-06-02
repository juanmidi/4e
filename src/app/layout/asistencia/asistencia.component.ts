import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { environment } from '../../../environments/environment';
// import { Router } from '@angular/router';
// import { HttpErrorResponse } from '@angular/common/http';
import { SecurityService } from '../../shared/services/security.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-asistencia',
    templateUrl: './asistencia.component.html',
    styleUrls: ['./asistencia.component.scss'],
})
export class AsistenciaComponent implements OnInit {
    constructor(
        private dataService: DataService,
        private securityService: SecurityService,
        public datepipe: DatePipe,
        private _snackBar: MatSnackBar
    ) {}

    catedras;
    selectedCated;
    horarios;
    estudiantes;
    displayedColumns: string[] = ['Apellido', 'Nombre', 'Estado'];
    startDate;
    fechaActual;
    ocultarPanel;
    diaHabilitado;
    horaInicio;
    horaActual;
    horaHabilitado;
    chkInterval;
    dias: number[] = [1, 2];
    cantDiasPorSemana: number;

    date1 = new Date();
    currentYear = this.date1.getUTCFullYear();
    currentMonth = this.date1.getMonth() + 1;
    currentDay = this.date1.getDate() + 1;
    finalMonth: any;
    finalDay: any;
    role;
    docentes;
    selectedDocente;

    ngOnInit(): void {
        let data: {};
        data = this.securityService.getDecodeToken();
        this.role = data['user'].role;

        if (this.currentMonth < 10) {
            this.finalMonth = '0' + this.currentMonth;
        } else {
            this.finalMonth = this.currentMonth;
        }

        if (this.currentDay < 10) {
            this.finalDay = '0' + this.currentDay;
        } else {
            this.finalDay = this.currentDay;
        }

        // this.estudiantes = [];
        const codPers = sessionStorage.getItem('codPers');
        this.ocultarPanel = false;
        this.cargarCatedrasPorProfe(codPers);
        this.cargarDocentes();
        this.startDate = new Date();
        this.fechaActual =
            this.currentYear + '-' + this.finalMonth + '-' + this.finalDay;
        this.diaHabilitado = false;
        this.chkInterval = false;
    }




    cargarCatedrasPorProfe(codPers) {
        // if (this.currentMonth < 10) {
        //     this.finalMonth = '0' + this.currentMonth;
        // } else {
        //     this.finalMonth = this.currentMonth;
        // }

        // if (this.currentDay < 10) {
        //     this.finalDay = '0' + this.currentDay;
        // } else {
        //     this.finalDay = this.currentDay;
        // }

        // this.ocultarPanel = false;
        // this.startDate = new Date();
        // this.fechaActual = this.currentYear + '-' + this.finalMonth + '-' + this.finalDay;
        // this.diaHabilitado = false;

        const url = `${environment.apiBaseUrl}/cated_by_prof?idprof=${codPers}`;
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

    cargarDatos(idcomision, fecha) {
        // this.horaInicio = undefined;
        // this.diaHabilitado = false;
        const fecha_ = this.datepipe.transform(fecha, 'yyyy-MM-dd');
        this.horariosCatedra(idcomision, fecha);
        this.estudiantesPorComision(idcomision, fecha_);
        const tmpDate = new Date();
        this.horaActual = tmpDate.getHours() * 60 + tmpDate.getMinutes();
    }

    cargarDocentes() {
        const url = `${environment.apiBaseUrl}/profesores`;
        const params = {};
        this.dataService.get(url, params).subscribe(
            (respuesta) => {
                this.docentes = respuesta.body;
            },
            (error) => {
                if (error.status === 401) {
                }
            }
        );
    }

    setDocente(codPers) {
        this.cargarCatedrasPorProfe(codPers);
        // console.log(codPers);
    }

    horariosCatedra(idcomision, fecha) {
        const url = `${environment.apiBaseUrl}/horarios_cated?idcomision=${idcomision}`;
        const params = {};
        this.dataService.get(url, params).subscribe(
            (respuesta) => {
                this.horarios = respuesta.body;
                this.cantDiasPorSemana = this.horarios.length;

                // tmpDate toma la fecha actual y la compara con el dataPicker
                // para que al cambiar el dataPicker si coincide con el día pero no con la fecha
                // actual no permita editar
                const tmpDate = new Date();

                this.diaHabilitado = this.diasCatedra(
                    this.horarios,
                    fecha,
                    tmpDate
                );
                this.horaHabilitado = false;
                this.horaActual =
                    tmpDate.getHours() * 60 + tmpDate.getMinutes();
                const horaInicio = this.horaInicioCatedra(this.horarios, fecha);

                // console.log('diaHabilitado ', this.diaHabilitado);
                // -->
                if (horaInicio === undefined) {
                    this.horaInicio = undefined;
                } else {
                    const hora = Number(horaInicio.slice(0, 2));
                    const min = Number(horaInicio.slice(2));
                    this.horaInicio = hora * 60 + min;

                    // console.log('benja');
                    // console.log(this.horaActual, this.horaInicio);
                }

                // -->
                this.comprobarMinutosGuardar(fecha);

                clearInterval(this.chkInterval);
                this.chkInterval = setInterval(() => {
                    console.log('setInterval');
                    this.comprobarMinutosGuardar(fecha);
                }, 60000);

                // if (this.diaHabilitado && this.horaHabilitado) {
                //     this.chkInterval = setInterval(() => {
                //         console.log('setInterval');
                //         this.comprobarMinutosGuardar(fecha);
                //     }, 60000);
                // }

                this.dias = this.horarios.map(function (x) {
                    return Number(x.id_dia);
                });
                // console.log(this.dias);
            },
            (error) => {
                if (error.status === 401) {
                }
            }
        );
    }

    estudiantesPorComision(idcomision, fecha) {
        const url = `${environment.apiBaseUrl}/asistencia_estudiantes_por_comision?idcomision=${idcomision}&fecha=${fecha}`;
        // console.log(fecha, url);
        const params = {};
        this.dataService.get(url, params).subscribe(
            (respuesta) => {
                this.estudiantes = respuesta.body;
            },
            (error) => {
                if (error.status === 401) {
                }
            }
        );
    }

    mono(el) {
        if (this.horaHabilitado || Number(this.role) === 1) {
            // console.log(el);
            if (el.estado === 'p') {
                el.estado = 'a';
            } else {
                el.estado = 'p';
            }
        }
    }

    diasCatedra(x, fecha, fechaHoy): boolean {
        const dia = fecha.getDay(); // 1,2,3,4,5,6,7 número de día
        const diaHoy = fechaHoy.getDay();
        // console.log('diasCatedra -> dia ', dia, diaHoy);
        for (const i in x) {
            if (x[i].id_dia) {
                /*console.log(
                    'diasCatedra -> en if ---> dia --> ',
                    dia,
                    'diaHoy --> ',
                    diaHoy
                );*/
                if (dia === Number(x[i].id_dia) && diaHoy === dia) {
                    /*console.log(
                        'monoooooooooooo######################',
                        dia,
                        x[i].id_dia,
                        diaHoy
                    );*/
                    return true;
                }
            }
        }
        return false;
    }

    /*
    diasCatedra(x, fecha): boolean {
        const dia = fecha.getDay();
        const dias = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];

        for (const i in x) {
            if (x[i].dia) {
                console.log(x[i].dia, dias[dia]);

                if (dias[dia] === x[i].dia) {
                    // console.log('coincide el día: ' + dias[dia], x[i].dia);
                    // this.diaA = dia;
                    return true;
                }
            }
        }
        return false;
    }
*/

    horaInicioCatedra(x, fecha): string {
        const dia = fecha.getDay(); // 1,2,3,4,5,6,7 número de día
        for (const i in x) {
            if (x[i].id_dia) {
                if (dia === Number(x[i].id_dia)) {
                    return x[i].hora_d;
                }
            }
        }
    }

    // this.dias = this.horarios.map(function(x) {
    //     return Number(x.id_dia);
    // });

    /*
    horaInicioCatedra(x, fecha): string {
        console.log(x);
        const dia = fecha.getDay();
        const dias = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];

        for (const i in x) {
            if (x[i].dia) {
                if (dias[dia] === x[i].dia) {
                    return x[i].hora_d;
                }
            }
        }
    }

*/

    comprobarMinutosGuardar(fecha) {
        // console.log('en comprobarMinutosGuardar');
        let ahora = null;
        let dife = null;
        ahora = new Date();
        this.horaActual = ahora.getHours() * 60 + ahora.getMinutes();
        dife = this.horaActual - this.horaInicio;
        // console.log(this.horaActual, this.horaInicio, dife);
        if (dife < 15 && dife >= 0) {
            this.horaHabilitado = true;
            if (dife === 14) {
                this.playAudio();
            }
        } else {
            this.horaHabilitado = false;

            // clearInterval(this.chkInterval);
        }
        // console.log(this.horaActual);
    }

    guardar(idcomision, fecha) {
        // el parámetro fecha recibe la fecha para releer los datos
        const url = `${environment.apiBaseUrl}/asistencia_guardar`;
        // console.log(url);
        // console.log(this.estudiantes);
        this.dataService.post(url, this.estudiantes).subscribe(
            (data) => {
                this.cargarDatos(idcomision, fecha);
            },
            (error) => {
                if (error.status === 401) {
                }
            }
        );
    }

    myFilter = (d: Date | null): boolean => {
        const day = (d || new Date()).getDay();
        // Prevent Saturday and Sunday from being selected.
        return day === this.dias[0] || day === this.dias[1];
    }

    openSnackBar(msg) {
        this._snackBar.open(msg, 'Aceptar');
    }

    playAudio() {
        // this.renderer.setProperty(this.myButton, 'color', 'red');
        // this.renderer.setAttribute(this.myButton.nativeElement , 'color', 'warning');
        const audio = new Audio();
        audio.src = '../../../../assets/sounds/warn.mp3';
        audio.load();
        audio.play();
    }

    verColumnas(e) {
        // console.log(e.checked);
        if (e.checked) {
            this.displayedColumns.push('Faltas Tot.');
        } else {
            this.displayedColumns.pop();
        }
    }
}
