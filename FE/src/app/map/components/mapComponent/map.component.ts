import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { MockData } from './mockData';
import { MapEntity } from '../../interfaces/map.interfaces';
import { AcNotification, ActionType } from 'angular-cesium';
import { Guid } from 'guid-typescript';


@Component({
  selector: 'gold-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  public id: Guid;
  mockDataSrc$;
  mockDataExample$;

  constructor() {
    this.mockDataSrc$ = Observable.from(MockData);
  }

  ngOnInit() {
    this.mockDataExample$ = this.getMockData();
  }

  getMockData(): Observable<AcNotification[]> {
    return this.mockDataExample$ = this.mockDataSrc$.map(entity => ({
      id: this.id = Guid.create(),
      entity: new MapEntity({
          name: 'test',
          image: new Cesium.PinBuilder().fromText('?', Cesium.Color.BLACK, 48).toDataURL(),
          bbPosition: new Cesium.Cartesian3.fromDegrees(entity.position.x, entity.position.y),
        }
      ),
      actionType: ActionType.ADD_UPDATE
    }));
  }
}
