import { NgModule } from '@angular/core';
import { PrestamoInstrumentoRoutingModule } from './prestamo-instrumento-routing.module';
import { PrestamoInstrumentoComponent } from '../../layout/prestamo-instrumento/prestamo-instrumento.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { CommonModule } from '@angular/common';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
@NgModule({
    declarations: [PrestamoInstrumentoComponent],
    imports: [
        FormsModule,
        MaterialModule,
        CommonModule,
        PrestamoInstrumentoRoutingModule,
        NgxScannerQrcodeModule,
    ]
    })

    export class PrestamoInstrumentoModule { }
