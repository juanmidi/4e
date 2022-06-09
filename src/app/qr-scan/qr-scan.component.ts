import { Component, OnInit, Output } from '@angular/core';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-qr-scan',
  templateUrl: './qr-scan.component.html',
  styleUrls: ['./qr-scan.component.scss']
})
export class QrScanComponent implements OnInit {
@Output() data: string;

output;


  constructor() { }

  ngOnInit(): void {
  }

}
