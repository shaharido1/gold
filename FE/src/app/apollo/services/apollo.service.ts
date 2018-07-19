import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import graphqlTag from 'graphql-tag';

@Injectable()
export class ApolloService {

  constructor(private apollo: Apollo) {

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
            content
          }
        }
      `,
    })
    .subscribe(some => console.log(some));

  }
}
