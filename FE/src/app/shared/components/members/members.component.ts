import { Component, OnInit, Input, Output,  EventEmitter } from '@angular/core';
import { Member } from '../../interfaces/core.interfaces';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  @Input() needAddButton: boolean;
  @Input() members : Array<Member>;
  @Output() addMember = new EventEmitter<boolean>();

  ADD_SIGN = '+';

  constructor() { }

  ngOnInit() {
  }

   onAddMember(){
    this.addMember.emit(true);
  }

}
