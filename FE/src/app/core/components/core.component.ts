import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { testSelector } from '../store/core.selectors';
import { IGoldAppState } from '../../goldApp/interfaces/goldApp.interface';
import { Observable } from 'rxjs/Observable';
import { TestAction } from '../store/core.actions';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import 'rxjs-compat/add/operator/filter';
import 'rxjs-compat/add/operator/map';
import { apolloSelector } from '../../apollo/apollo.selectors';

@Component({
  selector: 'gold-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
})

export class CoreComponent {

  name$ : Observable<string> = this.store.select(testSelector);
  books$ : Observable<any> = this.store.select(apolloSelector)
    .map (books => {
      console.log(books)
    })
  // .filter(Boolean)
    // .filter(query => Boolean(query["ROOT_QUERY.books.0"]))
    // .filter(query => Boolean(query["ROOT_QUERY.books.0"]["author"]))
    // .map(query => query["ROOT_QUERY.books.0"]["author"]);

  constructor(private store: Store<IGoldAppState>, private apollo: Apollo) {
      this.testBooksQuery();
      this.testAction();



  }

  testBooksQuery() {
    this.apollo
    .query({
      query: gql`
          {
            books {
              author
            }
          }
        `,
    })
    .subscribe(data => {
      console.log(data)
    });

    this.books$.subscribe();

  }

  testAction() {


      setTimeout(() => {
        this.store.dispatch(new TestAction("haim"))
      }, 5000)


      // this.books$.subscribe(book => {
      //   console.log(book)
      // })


    }
}









