import {  Component, OnInit, Input, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import { NgxScannerQrcodeModule, NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-prestamo-instrumento',
  templateUrl: './prestamo-instrumento.component.html',
  // changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./prestamo-instrumento.component.scss']
})
export class PrestamoInstrumentoComponent implements OnInit {
  private _salida = '';
  hideCamera: boolean;

  @Input()
  set salida(salida: string) {
    // this.hideCamera = true;
    this.action.stop();
    console.log(salida);
    // this._salida = salida;

    // setTimeout(() => {                           // <<<---using ()=> syntax
    //     console.log(salida);
    // }, 3000);

    //  this.router.navigate(['/bug']);
  }
  // get salida(): string { return this._salida; }



  // @ViewChild('salida', { static: true }) salida: NgxScannerQrcodeComponent;

  @ViewChild('action', { static: true }) action: NgxScannerQrcodeComponent;
  // TODO something this.action


  constructor(private router: Router) {
  }



  ngOnInit(): void {
    this.hideCamera = false;
  }

  scan() {
    this.action.stop();
  }

  setDelay(times) {
    if (times.length > 0) {
      // Remove the first time from the array
      const wait = times.shift();
      // Wait for the given amount of time
      setTimeout(() => {
          // Call the setDelay function again with the remaining times
          this.setDelay(times);
      }, wait);
    }
  }
}
