declare const resolvers: {
    Query: {
        messages(root: any, {}: {}, context: any): any[];
    };
    Mutation: {
        addMessage: (root: any, { message }: {
            message: any;
        }) => any[];
    };
    Subscription: {
        messageAdded: {
            subscribe: () => any;
        };
    };
};
export default resolvers;
