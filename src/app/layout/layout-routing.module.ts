import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { Screen1Component } from './screen1/screen1.component';
import { Screen2Component } from './screen2/screen2.component';

import { AuthGuard } from '../../app/shared/services/auth/auth-guard';
import { MisMateriasComponent } from './mis-materias/mis-materias.component';
// import { ProyectosModule } from '../../app/layout/proyectos/proyectos.module';
// import { AsistenciaComponent } from './asistencia/asistencia.component';
// import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'screen1',
                loadChildren: () => import('./screen1/screen1.module').then(m => m.Screen1Module),
                canActivate: [AuthGuard]
            },
            {
                path: 'screen2',
                component: Screen2Component
            },
            {
                path: 'asistencia',
                loadChildren: () => import('./asistencia/asistencia.module').then(m => m.AsistenciaModule),
                // component: AsistenciaComponent
                canActivate: [AuthGuard]
            },
            {
                path: 'mismaterias',
                component: MisMateriasComponent
            },
            {
                path: 'proyectos',
                loadChildren: () => import('./proyectos/proyectos.module').then(m => m.ProyectosModule),
            },
            {
                path: 'prestamo-instrumento',
                loadChildren: () => import('./prestamo-instrumento/prestamo-instrumento.module').then(m => m.PrestamoInstrumentoModule),
            },
            {
                path: 'perfil',
                loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule),
                canActivate: [AuthGuard]
                // component: PerfilComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule {}
