import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisMateriasComponent } from './mis-materias.component';

const routes: Routes = [
    {
        path: '',
        component: MisMateriasComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MisMateriasRoutingModule {}
