import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ranking-toggle',
  templateUrl: './ranking-toggle.component.html',
  styleUrls: ['./ranking-toggle.component.scss']
})
export class RankingToggleComponent implements OnInit {
TOGGLE_NAME = 'Ranking Filter';
@Input() toggleName : string;
  constructor() { }

  ngOnInit() {
  }

}
