import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MisMateriasComponent } from './mis-materias.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MisMateriasRoutingModule } from './mis-materias-routing.module';
// import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule  } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [MisMateriasComponent],
  imports: [
    CommonModule,
    MisMateriasRoutingModule,
    MatSelectModule,
    // MatLabel,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ]
})

export class MisMateriasModule { }
