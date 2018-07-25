import { Component, Input, OnInit } from '@angular/core';
import { Tag } from '@goldStar/shared/interfaces/core.interfaces';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})

export class TagsComponent implements OnInit {

  @Input() list: Array<Tag>;
  @Input() needAddButton: Boolean;
  constructor() {
  }

  ngOnInit() {
  }

}
