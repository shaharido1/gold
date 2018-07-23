import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-zoom-level-one',
  templateUrl: './zoom-level-one.component.html',
  styleUrls: ['./zoom-level-one.component.css']
})
export class ZoomLevelOneComponent implements OnInit {

  // a;
  // private _plane;
  @Input() plane;
  // set plane(value) {
  //   if (value) {
  //     this._plane = this.fillEntityFields(value);
  //     console.log(this._plane);
  //     this.a = this._plane
  //
  //   }
  // }
  //
  // get plane() {
  //   console.log(this._plane);
  //   return this._plane;
  // }
  //
  constructor() {

  }

  ngOnInit() {
    if (this.plane) {
      console.log('yay', this.plane);
    }
  }
  // getFields() {
  //   let str;
  //   // if(this.plane){
  //   //   str = `
  //   // position: ${this.plane.position},
  //   //               pixelSize: ${this.plane.data.point.pixelSize},
  //   //               color: ${this.plane.data.point.color},
  //   //               outlineColor: ${this.plane.data.point.outlineColor},
  //   //               outlineWidth: ${this.plane.data.point.outlineWidth}
  //   // `
  //   //
  //   // }
  //
  //  return JSON.stringify(this.plane)
  // }
}



