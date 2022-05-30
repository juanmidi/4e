import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrestamoInstrumentoComponent } from './prestamo-instrumento.component';

const routes: Routes = [
    {
        path: '',
        component: PrestamoInstrumentoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PrestamoInstrumentoRoutingModule {}
