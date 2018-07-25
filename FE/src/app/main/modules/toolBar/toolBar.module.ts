import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToolBarComponent } from './components/toolBar.component';


@NgModule({
  declarations: [
    ToolBarComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
  ],
  exports: [
    ToolBarComponent
  ]
})

export class ToolBarModule { }
