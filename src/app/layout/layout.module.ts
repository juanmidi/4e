import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../shared/modules/material/material.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NavComponent } from './nav/nav.component';
import { Screen2Component } from './screen2/screen2.component';
// import { ProyectosComponent } from './proyectos/proyectos.component';
// import { PrestamoInstrumentoComponent } from './prestamo-instrumento/prestamo-instrumento.component';
// import { BugsComponent } from './bugs/bugs.component';
// import { MisMateriasComponent } from './mis-materias/mis-materias.component';
// import { AsistenciaComponent } from './asistencia/asistencia.component';
// import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        MaterialModule,
        TranslateModule
    ],
    declarations: [
        Screen2Component,
        LayoutComponent,
        NavComponent,
        TopnavComponent,
        SidebarComponent,
        // BugsComponent,
        // PrestamoInstrumentoComponent
        // ProyectosComponent,
        // PerfilComponent
    ]

})
export class LayoutModule { }
