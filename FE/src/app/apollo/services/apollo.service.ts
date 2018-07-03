import { EventEmitter, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs/Observable';
import { Actions } from '@ngrx/effects';
import { tap } from 'rxjs/operators';


@Injectable()
export class ApolloService {
  apolloData$ = new EventEmitter();

  constructor(private apollo: Apollo, protected actions$: Actions) {

  }

  init(): Observable<Object> {
    // this.apollo.subscribe()
    return this.apollo.subscribe({
      query: gql`
        subscription {
          messageAdded {
            id,
            message,
            position {
              x,
              y
            },
            rank,
            category
          }
        }
      `
    })
    // .pipe(
    //   // tap((res) => this.apolloData$.emit(res))
    // );
  }

  readQuery() {
    // const client = this.apollo.getClient();
    // const query = client.readQuery({
    //   query: gql`
    //     subscription{
    //       messageAdded{
    //         id
    //       }
    //     }
    //   `
    // });
    // console.log(query);
  }

  query() {
    // const sub = this.apollo.watchQuery({
    //   query: gql`
    //     query {
    //       channels {
    //         id
    //       }
    //     }
    //   `
    // })
    // .valueChanges
    // .subscribe(some => console.log(some));
    //
    // const sub2 = this.apollo.query({
    //   query: gql`
    //     query {
    //       messages {
    //         id
    //       }
    //     }
    //   `
    // })
    // .subscribe(some => console.log(some));
    // setInterval(() => {
    //
    // const dsaf = this.apollo.mutate({
    //   mutation: gql`
    //     mutation {
    //       addMessage(message: {channelId: 1, text:"hello"}) {
    //         id
    //       }
    //       }
    //   `
    // })
    // .subscribe(some => console.log(some));
    // }, 1000)
    //

    const sub3 = this.apollo.subscribe({
      query: gql`
        subscription {
          messageAdded {
            id,
            message,
            position {
              x,
              y
            },
            rank
          }
        }
      `
    })
    .subscribe(some => console.log(some));

  }
}


