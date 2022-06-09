import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsistenciaComponent } from './asistencia.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AsistenciaRoutingModule } from './asistencia-routing.module';
// import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
// import { MatCheckbox } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../shared/modules/material/material.module';
// import { RelojModule} from '../../layout/reloj/reloj.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { NgxLoadingButtonsModule } from 'ngx-loading-buttons';

@NgModule({
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    DatePipe
  ],
  declarations: [AsistenciaComponent],
  imports: [
    CommonModule,
    AsistenciaRoutingModule,
    MatSelectModule,
    // MatLabel,
    MatFormFieldModule,  // 24-04-2022
    MatInputModule,  // 24-04-2022
    FormsModule,
    MatTableModule,
    // MatButtonModule,
    MaterialModule,
    NgxLoadingButtonsModule,
    // RelojModule,
    // MatCheckbox,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ]
})

export class AsistenciaModule {}
