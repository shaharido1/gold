import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './components/progressBar/progress-bar.component';
import { RankingToggleComponent } from './components/rankingToggle/ranking-toggle.component';
import { StatusBarComponent } from './components/statusBar/statusBar.component';
import { CoreModule } from '../../../core/core.module';


@NgModule({
  declarations: [
    ProgressBarComponent,
    RankingToggleComponent,
    StatusBarComponent,
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  providers: [
  ],
  exports: [
    ProgressBarComponent,
    RankingToggleComponent,
    StatusBarComponent
  ]
})

export class StatusBarModule { }
