import { NgModule } from '@angular/core';
import { PrestamoInstrumentoRoutingModule } from './prestamo-instrumento-routing.module';
import { PrestamoInstrumentoComponent } from '../../layout/prestamo-instrumento/prestamo-instrumento.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { CommonModule } from '@angular/common';
// the scanner!
@NgModule({
    declarations: [PrestamoInstrumentoComponent],
    imports: [
        FormsModule,
        MaterialModule,
        CommonModule,
        PrestamoInstrumentoRoutingModule
    ]
    })

    export class PrestamoInstrumentoModule { }
