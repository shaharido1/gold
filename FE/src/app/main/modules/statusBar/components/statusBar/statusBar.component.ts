import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ICoreState, Member } from '../../../../../shared/interfaces/core.interfaces';
import { Store } from '@ngrx/store';
import { membersSelector } from '../../../../../core/store/core.selectors';

@Component({
  selector: 'app-status-bar',
  templateUrl: './statusBar.component.html',
  styleUrls: ['./statusBar.component.scss']
})
export class StatusBarComponent implements OnInit {
  missionName: string = 'sivan Mission';
  missionMembers$: Observable<Array<Member>> = this.store.select(membersSelector)
  constructor(private store: Store<ICoreState>) {

}

  ngOnInit() {
  }

}
