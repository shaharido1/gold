import { Component } from '@angular/core';
import {
  MapEntity
} from '../../interfaces/map.interfaces';
import { AcNotification, ActionType } from 'angular-cesium';
import { Store } from '@ngrx/store';
import { IGoldAppState } from '../../../goldApp/interfaces/goldApp.interface';
import { Subject } from 'rxjs/Subject';
import { ApolloService } from '../../../apollo/services/apollo.service';
import { Actions } from '@ngrx/effects';
import { ApolloActionTypes } from '../../../apollo/store/apollo.action';
import { MapService } from './map.service';

@Component({
  selector: 'gold-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [MapService]
})
export class MapComponent {
  mockData$: Subject<AcNotification> = new Subject<AcNotification>();
  observePosition$: Subject<any> = new Subject<any>();

  constructor(
    private store: Store<IGoldAppState>,
    private apolloService: ApolloService,
    private actions$: Actions,
    private mapService: MapService
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
    let {
      firstElipse,
      secondElipse,
      thirdElipse
    } = this.mapService.fillElipseFields(res);
    let point = this.mapService.fillPointFields(res);
    let label = this.mapService.fillLabelFields(res);
    let billboard = this.mapService.fillBillboardFields(res);

    let entity: MapEntity = {
      name: 'test',
      position: new Cesium.Cartesian3.fromDegrees(
        res.position.x,
        res.position.y
      ),
      zoomLevelOne: { point, firstElipse, secondElipse, thirdElipse },
      zoomLevelTwo: { label, billboard}
    };

    return {
      id: res.id,
      entity,
      actionType: ActionType.ADD_UPDATE
    };
  }
}
