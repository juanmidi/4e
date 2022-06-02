import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-prestamo-instrumento',
  templateUrl: './prestamo-instrumento.component.html',
  styleUrls: ['./prestamo-instrumento.component.scss']
})
export class PrestamoInstrumentoComponent implements OnInit, OnDestroy, OnChanges {
  constructor() { }
@Input() output: string;

@Output() changeData = new EventEmitter<string>();


ngOnChanges(changes: SimpleChanges) {

    // console.log(changes.output.currentValue);
    // You can also use categoryId.previousValue and
    // categoryId.firstChange for comparing old and new values

}
  // output;

ngOnInit(): void {

}
ngOnDestroy(): void {
}

modelChangeFn(x) {
  // console.log('cambio');
}

}
