import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { MockData } from './mockData';
import { EllipseGraphic, MapEntity, PointGraphic } from '../../interfaces/map.interfaces';
import { AcNotification, ActionType } from 'angular-cesium';
import { Guid } from 'guid-typescript';
import { Store } from '@ngrx/store';
import { IGoldAppState } from '../../../goldApp/interfaces/goldApp.interface';
import {
  apolloSelector
} from '../../../apollo/store/apollo.selectors';
import 'rxjs-compat/add/operator/withLatestFrom';
import { auditTime, throttleTime } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ApolloService } from '../../../apollo/services/apollo.service';
import { Actions } from '@ngrx/effects';
import { ApolloActionTypes, SubscriberData } from '../../../apollo/store/apollo.action';
import { CoreActionTypes } from '../../../core/store/core.actions';

enum Color {
  'a' = 'RED',
  'b' = 'BLUE'
}

enum ElipseLevel {
  FIRST, SECOND, THIRD
}

@Component({
  selector: 'gold-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  public id: Guid;
  mockDataSrc$;
  mockDataExample$;

  observeEntity$ = this.actions$
    .ofType(ApolloActionTypes.SUBSCRIBER_DATA)
    .map(data => console.log(data));

  mockData$: Subject<AcNotification> = new Subject<AcNotification>();
  observePosition$: Subject<any> = new Subject<any>();


  constructor(
    private store: Store<IGoldAppState>,
    private apolloService: ApolloService,
    private actions$: Actions
  ) {
    this.actions$
      .ofType(ApolloActionTypes.SUBSCRIBER_DATA).subscribe(res => {
      this.observePosition$.next(res.payload.data.messageAdded);
    });
    // SubscriberData
    this.apolloService.apolloData$.subscribe(data => console.log(data));
    this.mockDataSrc$ = Observable.from(MockData);

    this.observePosition$.pipe(auditTime(1000)).subscribe(res => {
      if (res.position) {
        let newData: AcNotification = { ...this.fillEntityFields(res) };
        this.mockData$.next(newData);
      }
    });
  }

  fillEntityFields(res) {
    const minSize = 100000;
    const multiplier = res.rank;
    const scaleStep = minSize * multiplier;
    // let obj = {
    //   id: res.id,
    //   entity: new MapEntity({
    //       name: 'test',
    //       position: new Cesium.Cartesian3.fromDegrees(res.position.x, res.position.y),
    //       pixelSize: 10,
    //       color: Cesium.Color[Color[res.category]],
    //       outlineColor: Cesium.Color.WHITE,
    //       outlineWidth: 0.7,
    //       semiMinorAxisLevelA: scaleStep,//500000.0,
    //       semiMajorAxisLevelA: scaleStep,
    //       materialLevelA: Cesium.Color[Color[res.category]].withAlpha(0.3),
    //       semiMinorAxisLevelB: scaleStep + scaleStep / 2,
    //       semiMajorAxisLevelB: scaleStep + scaleStep / 2,
    //       materialLevelB: Cesium.Color[Color[res.category]].withAlpha(0.25),
    //       semiMinorAxisLevelC: scaleStep + scaleStep,
    //       semiMajorAxisLevelC: scaleStep + scaleStep,
    //       materialLevelC: Cesium.Color[Color[res.category]].withAlpha(0.1),
    //       outline: true // height must be set for outline to display
    //     }
    //   ),
    //   actionType: ActionType.ADD_UPDATE
    // };
    let { firstElipse, secondElipse, thirdElipse } = this.fillElipseFields(res);
    let point = this.fillPointFields(res);

    let entity: MapEntity = {
      name: 'test',
      position: new Cesium.Cartesian3.fromDegrees(res.position.x, res.position.y),
      zoomLevelOne: { point, firstElipse, secondElipse, thirdElipse }
    };

    let obj = {
      id: res.id,
      entity,
      actionType: ActionType.ADD_UPDATE
    };
    return obj;
  }

  fillElipseFields(res) {
    const minSize = 100000;
    const multiplier = res.rank;
    const scaleStep = minSize * multiplier;

    let firstElipse: EllipseGraphic = {
      semiMinorAxis: scaleStep,//500000.0,
      semiMajorAxis: scaleStep,
      color: Cesium.Color[Color[res.category]].withAlpha(0.3)
    };
    let secondElipse: EllipseGraphic = {
      semiMinorAxis: scaleStep + scaleStep / 2,//500000.0,
      semiMajorAxis: scaleStep + scaleStep / 2,
      color: Cesium.Color[Color[res.category]].withAlpha(0.25)
    };
    let thirdElipse: EllipseGraphic = {
      semiMinorAxis: scaleStep + scaleStep,//500000.0,
      semiMajorAxis: scaleStep + scaleStep,
      color: Cesium.Color[Color[res.category]].withAlpha(0.1)
    };

    return {
      firstElipse, secondElipse, thirdElipse
    };
  }

  fillPointFields(res) {
    let point:PointGraphic = {
      pixelSize: 10,
      color: Cesium.Color[Color[res.category]],
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 0.7
    };
    return point;
  }
}
