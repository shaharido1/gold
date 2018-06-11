import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { AcNotification } from 'angular-cesium';
import { entitiesSelector } from '../../store/map.selectors';
import { Store } from '@ngrx/store';
import { IMapState } from '../../interfaces/map.interfaces';

@Component({
  selector: 'gold-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.css']
})
export class EntitiesComponent implements OnDestroy {
  testDataSubscription: Subscription;
  entities$ = this.store.select(entitiesSelector);
  mockDataExample$: Subject<AcNotification> = new Subject<AcNotification>();

  constructor(private store: Store<IMapState>) {
    setTimeout(() =>
      this.testDataSubscription = this.entities$.subscribe(x => {
        x.forEach(y => this.mockDataExample$.next(y));
      }), 0);
  }

  ngOnDestroy() {
    this.testDataSubscription.unsubscribe();
  }
}
