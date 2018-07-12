export declare const resolvers: {
    Query: {
        channels: () => {
            id: string;
            name: string;
            messages: {
                id: string;
                text: string;
            }[];
        }[];
        channel: (root: any, { id }: {
            id: any;
        }) => {
            id: string;
            name: string;
            messages: {
                id: string;
                text: string;
            }[];
        };
    };
    Mutation: {
        addChannel: (root: any, args: any) => {
            id: string;
            messages: any[];
            name: any;
        };
        addMessage: (root: any, { message }: {
            message: any;
        }) => {
            id: string;
            text: any;
        };
    };
    Subscription: {
        messageAdded: {
            subscribe: () => any;
        };
    };
};
