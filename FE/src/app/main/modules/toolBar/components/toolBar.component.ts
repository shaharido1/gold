import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './toolBar.component.html',
  styleUrls: ['./toolBar.component.css']
})
export class ToolBarComponent implements OnInit {

  private _color: string = 'blue';
  set color(value) {
    this._color = value;
  }
  get color() {
    return this._color;
  }



  constructor(private router: Router) { }

  ngOnInit() {
  }

}
