import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  missionDescriptionSelector,
  missionNameSelector,
  missionTagListSelector
} from '../../store/mission.selectors';
import { Observable } from 'rxjs/index';
import { IMissionState } from '../../interfaces/mission.state';
import { ICoreState, Member, Tag } from '@goldStar/shared/interfaces/core.interfaces';
import { membersSelector } from '@goldStar/core/store/core.selectors';
import { AddMemberAction } from '@goldStar/core/store/core.actions';

@Component({
  selector: 'app-mission-editor',
  templateUrl: './missionEditor.component.html',
  styleUrls: ['./missionEditor.component.scss']
})


export class MissionEditorComponent implements OnInit {
  name = '';
  MISSION_NAME = 'Mission name';
  MISSION_DESCRIPTION = 'Mission description';
  missionName$: Observable<string> = this.missionStore.select(missionNameSelector);
  missionTagList$: Observable<Array<Tag>> = this.missionStore.select(missionTagListSelector);
  missionMembers$: Observable<Array<Member>> = this.coreStore.select(membersSelector);
  missionDescription$: Observable<string> = this.missionStore.select(missionDescriptionSelector);
  constructor(private appRoutes: Router, private missionStore: Store<IMissionState>, private coreStore: Store<ICoreState> ) {
  }

  launch() {
    this.appRoutes.navigate(['main'])

  }

  ngOnInit() {
  }

  addNewMember() {
    this.coreStore.dispatch(new AddMemberAction({ newMember: { name: 'new', color: 'black' } }));
    console.log('from mission new member was pressed');
    this.missionMembers$.subscribe(name => {
      console.log(name);
    });
  }

}
