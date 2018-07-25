import { Component, OnInit } from '@angular/core';
import { IMissionState, Mission } from '../../interfaces/mission.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { missionsSelector } from '../../store/mission.selectors';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-missions-view',
  templateUrl: './missionsView.component.html',
  styleUrls: ['./missionsView.component.scss']
})
export class MissionsViewComponent implements OnInit {

  allMissions$: Observable<Array<Mission>> = this.store.select(missionsSelector);
  presentedMissions$ : Observable<Array<Mission>> = this.allMissions$;

  // private allMissions: Array<any> = [];
  // private presentedMissions: Array<any> = [];

  constructor(private store: Store<IMissionState>) {
  }

  ngOnInit() {
    // this.allMissions$.subscribe();
  }

  // missionsToDisplay(filterBy: string): Observable<Array<IMissionState>> {
  //   return this.allMissions$.filter((mission: Array<IMissionState>) =>);
  // }

  //
  // changeDispalay(filterCretria) {
  //
  //   this.presentedMissions = this.allMissions.filter((mission) => mission === filterCretria);
  // }

  changeDisplay(filterCretria) {
    if (filterCretria === 'All')
    {
      this.presentedMissions$ = this.allMissions$
    }else {
      this.presentedMissions$ = this.allMissions$.pipe(map(missions => missions.filter(mission => mission.status === filterCretria)));
    }
  }
}
