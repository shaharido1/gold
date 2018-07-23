import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-zoom-level-two',
  templateUrl: './zoom-level-two.component.html',
  styleUrls: ['./zoom-level-two.component.css']
})
export class ZoomLevelTwoComponent {
  @Input() plane;

  constructor() {
  }
}
