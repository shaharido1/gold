import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { store } from '@angular/core/src/render3/instructions';
import { apolloSelector, testSelector } from '../store/core.selectors';
import { IGoldAppState } from '../../goldApp/interfaces/goldApp.interface';
import { Observable } from 'rxjs/Observable';
import { TestAction } from '../store/core.actions';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'gold-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
})

export class CoreComponent {

  name$ : Observable<string> = this.store.select(testSelector);
  books$ : Observable<any> = this.store.select(apolloSelector);
  constructor(private store: Store<IGoldAppState>, apollo: Apollo) {
    setTimeout(() => {
      this.store.dispatch(new TestAction("haim"))
    }, 5000)

    this.books$.subscribe(book => {
      console.log(book)
    })
    apollo
      .query({
        query: gql`
          {
            books {
              author
            }
          }
        `,
      })
      .subscribe(console.log);
  }






}
