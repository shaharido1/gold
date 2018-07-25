import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main.routing.module';
import { MainComponent } from './components/main/main.component';
import { StatusBarModule } from './modules/statusBar/statusBar.module';
import { ToolBarModule } from './modules/toolBar/toolBar.module';
import { SharedModule } from '@goldStar/shared/shared.module';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule,
    StatusBarModule,
    ToolBarModule
  ],
  providers: [
  ],
  exports: [
    MainComponent
  ]
})

export class MainModule { }
