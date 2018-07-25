import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: string;
  password: string;
  private JOIN_MISSION = 'Join Mission';
  private NEW_MISSION = 'New Mission';
  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onClickJoin() {
    console.log('pressed');

    this.router.navigate(['mission'])
      .then(()=>{
        console.log('pressed');
      })
      .catch(e => console.log(e))
  }

  onClickNew() {
    console.log(this.userName);
  }
}
