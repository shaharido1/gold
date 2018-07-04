import { Component } from '@angular/core';
import {
  BillboardGraphic,
  EllipseOpacityLevel, EllipseScaleLevel,
  EllipseGraphic, LabelGraphic,
  MapEntity, PointGraphic, ZoomLevels
} from '../../interfaces/map.interfaces';
import { AcNotification, ActionType } from 'angular-cesium';
import { Store } from '@ngrx/store';
import { IGoldAppState } from '../../../goldApp/interfaces/goldApp.interface';
import { Subject } from 'rxjs/Subject';
import { ApolloService } from '../../../apollo/services/apollo.service';
import { Actions } from '@ngrx/effects';
import { ApolloActionTypes } from '../../../apollo/store/apollo.action';

@Component({
  selector: 'gold-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  mockData$: Subject<AcNotification> = new Subject<AcNotification>();
  observePosition$: Subject<any> = new Subject<any>();

  constructor(
    private store: Store<IGoldAppState>,
    private apolloService: ApolloService,
    private actions$: Actions
  ) {
    this.actions$.ofType(ApolloActionTypes.SUBSCRIBER_DATA).subscribe(res => {
      this.observePosition$.next(res);
    });
    this.observePosition$
      .map(res => res.payload.data.messageAdded)
      .subscribe(result => {
        let newData: AcNotification = { ...this.fillEntityFields(result) };
        this.mockData$.next(newData);
      });
  }

  fillEntityFields(res) {
    const firstEllipse = new EllipseGraphic(res.rank, res.category, EllipseOpacityLevel.First, EllipseScaleLevel.First);
    const secondEllipse = new EllipseGraphic(res.rank, res.category, EllipseOpacityLevel.Second, EllipseScaleLevel.Second);
    const thirdEllipse = new EllipseGraphic(res.rank, res.category, EllipseOpacityLevel.Third, EllipseScaleLevel.Third);
    const point = new PointGraphic(res.category, 10, Cesium.Color.WHITE,0.7);
    const label = new LabelGraphic(res.category);
    const billboard = new BillboardGraphic(res.category)
    const levels: ZoomLevels = {
      level1: { point, firstEllipse, secondEllipse, thirdEllipse },
      level2: { label, billboard }
    };

    const entity = new MapEntity('test', levels, res.position);

    return {
      id: res.id,
      entity,
      actionType: ActionType.ADD_UPDATE
    };
  }
}
