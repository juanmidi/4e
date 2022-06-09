import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { QrScanComponent} from './qr-scan.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [QrScanComponent],
    imports: [
        FormsModule,
        CommonModule,
        NgxScannerQrcodeModule
    ]
    })

    export class PrestamoInstrumentoModule { }
