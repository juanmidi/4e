import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelojComponent } from './reloj.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [RelojComponent ],
  imports: [
    CommonModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ]
})
export class RelojModule { }
