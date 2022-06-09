import {  Component, ChangeDetectionStrategy, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-prestamo-instrumento',
  templateUrl: './prestamo-instrumento.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./prestamo-instrumento.component.scss']
})
export class PrestamoInstrumentoComponent implements OnInit {
  private _salida = '';

  @Input()
  set salida(salida: string) {
     this._salida = salida;
     console.log(salida);
     this.router.navigate(['/bug']);
  }

  get salida(): string { return this._salida; }


  constructor(private router: Router) {}



  ngOnInit(): void {

  }


}
