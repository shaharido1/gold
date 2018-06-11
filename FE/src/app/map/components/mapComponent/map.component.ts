import { Component} from '@angular/core';
import { Observable } from 'rxjs/observable';
import { MockData } from './mockData';
import { IMapState } from '../../interfaces/map.interfaces';
import { AcNotification, ActionType } from 'angular-cesium';
import { Guid } from 'guid-typescript';
import { Store } from '@ngrx/store';
import { Apollo } from 'apollo-angular';
import { entitiesSelector } from '../../store/map.selectors';
import { DeleteAction, LoadAction } from '../../store/map.actions';


@Component({
  selector: 'gold-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent {
  public id: Guid;
  entities$ = this.store.select(entitiesSelector);
  mockDataSrc$;
  testArr: AcNotification[] = [];

  constructor(private store: Store<IMapState>, private apollo: Apollo) {
    this.mockDataSrc$ = Observable.from(MockData);
  }

  getMockData() {
    return this.mockDataSrc$.map(entity => ({
      actionType: ActionType.ADD_UPDATE,
      id: this.id = Guid.create(),
      entity: ({
          name: 'test',
          image: new Cesium.PinBuilder().fromText('?', Cesium.Color.BLACK, 48).toDataURL(),
          bbPosition: new Cesium.Cartesian3.fromDegrees(entity.position.x, entity.position.y)
        }
      )
    }));
  }

  testDispatch() {
    this.getMockData().subscribe(x => this.testArr.push(x));
    this.store.dispatch(new LoadAction(this.testArr));
  }

  removeData() {
    this.store.dispatch(new DeleteAction(this.testArr));
  }
}
