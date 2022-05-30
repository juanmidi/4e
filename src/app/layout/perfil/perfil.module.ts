import { NgModule } from '@angular/core';
import { PerfilComponent } from './perfil.component';
import { PerfilRoutingModule } from './perfil-routing.module';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [PerfilComponent],
  imports: [
    PerfilRoutingModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ]
})

export class PerfilModule { }

