import { NgModule } from '@angular/core';
import { BugsRoutingModule } from './bugs-routing.module';
import { BugsComponent } from '../bugs/bugs.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { ResueltoPendientePipe} from '../../shared/pipes/resueltopendiente.pipe';

@NgModule({
    declarations: [BugsComponent, ResueltoPendientePipe],
    imports: [
        FormsModule,
        MaterialModule,
        CommonModule,
        BugsRoutingModule,
        //
    ]
    })

    export class BugsModule { }
