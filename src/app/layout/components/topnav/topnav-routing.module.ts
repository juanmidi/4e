import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TopnavComponent } from './topnav.component';
import { PerfilComponent } from '../../perfil/perfil.component';

import { AuthGuard } from '../../../shared/services/auth/auth-guard';

const routes: Routes = [
    {
        path: '',
        component: TopnavComponent
        // ,
        // children: [
        //     {
        //         path: 'perfil',
        //         component: PerfilComponent
        //     }
        // ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TopNavRoutingModule {}
