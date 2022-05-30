import { NgModule } from '@angular/core';
import { ProyectosRoutingModule } from './proyectos-routing.module';
import { ProyectosComponent } from '../../layout/proyectos/proyectos.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [ProyectosComponent],
    imports: [
        QuillModule.forRoot(),
        FormsModule,
        MaterialModule,
        CommonModule,
        ProyectosRoutingModule
    ]
    })

    export class ProyectosModule { }
