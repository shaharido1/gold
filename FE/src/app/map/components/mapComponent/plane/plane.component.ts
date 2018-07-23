import { Component } from '@angular/core';
import {
  BillboardGraphic,
  EllipseOpacityLevel,
  EllipseScaleLevel,
  EllipseGraphic,
  LabelGraphic,
  PointGraphic,
  GraphicEntity
} from '../../../interfaces/map.interfaces';
import { AcNotification, ActionType } from 'angular-cesium';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { ApolloActionTypes, SubscriberData } from '../../../../apollo/store/apollo.action';
import { IGoldAppState } from '../../../../goldApp/interfaces/goldApp.interface';
import { ApolloService } from '../../../../apollo/services/apollo.service';


@Component({
  selector: 'plane',
  templateUrl: './plane.component.html',
  styleUrls: ['./plane.component.css']
})

export class PlaneComponent {
  planeSource$: Observable<AcNotification> = this.actions$
    .ofType(ApolloActionTypes.SUBSCRIBER_DATA)
    .map(({ payload }: SubscriberData) => {
        return payload.data.messageAdded;
      }
    )
    .map(plane => {
      let entity = new GraphicEntity(plane.id, {
        ...this.fillEntityLevelOneFields(plane),
        ...this.fillEntityLevelTwoFields(plane)
      }, plane.position);
      return {
        id: plane.id,
        entity,
        actionType: ActionType.ADD_UPDATE
      };
    });

  constructor(
    private store: Store<IGoldAppState>,
    private apolloService: ApolloService,
    private actions$: Actions
  ) {
    this.planeSource$.subscribe();
  }

  fillEntityLevelOneFields(res) {
    const { rank, category } = res;
    res.firstEllipse = this.createElipse(EllipseOpacityLevel.First, EllipseScaleLevel.First, rank, category);
    res.secondEllipse = this.createElipse(EllipseOpacityLevel.Second, EllipseScaleLevel.Second, rank, category);
    res.thirdEllipse = this.createElipse(EllipseOpacityLevel.Third, EllipseScaleLevel.Third, rank, category);
    res.point = new PointGraphic(res.category, 10, Cesium.Color.WHITE, 0.7);
    return res;
  }

  fillEntityLevelTwoFields(res) {
    res.billboard = new BillboardGraphic(res.category);
    res.label = new LabelGraphic(res.category, res.message);
    return res;
  }

  createElipse(opacity: EllipseOpacityLevel, scale: EllipseScaleLevel, rank, category) {
    return new EllipseGraphic(
      rank,
      category,
      opacity,
      scale
    );
  }
}
