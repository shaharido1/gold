import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { testSelector } from '../../store/core.selectors';
import { IGoldAppState } from '../../../goldApp/interfaces/goldApp.interface';
import { Observable } from 'rxjs/Observable';
import { TestAction } from '../../store/core.actions';
import 'rxjs-compat/add/operator/filter';
import 'rxjs-compat/add/operator/map';
import 'rxjs-compat/add/operator/do';
import { QueryAction } from '../../../apollo/store/apollo.action';
import { messageAddedSelector } from '../../../apollo/store/apollo.selectors';

@Component({
  selector: 'gold-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
})

export class CoreComponent {

  name$ : Observable<string> = this.store.select(testSelector);
  books$ : Observable<any> = this.store.select(messageAddedSelector)
    .filter(Boolean)
    // .do(query => console.log(query))


  constructor(private store: Store<IGoldAppState>) {
      this.store.dispatch(new QueryAction())


  }

  testAction() {


      setTimeout(() => {
        this.store.dispatch(new TestAction("haim"))
      }, 5000)

      this.books$.subscribe(book => {
        console.log(book)
      })


    }
}









