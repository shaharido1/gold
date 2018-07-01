"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const express_1 = require("express");
const apollo_server_express_1 = require("apollo-server-express");
const body_parser_1 = require("body-parser");
const cors_1 = require("cors");
const http_1 = require("http");
const graphql_1 = require("graphql");
const subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
// schema file
const schema_1 = require("./redisModule/schema");
// Express server
const server = express_1.default();
// origin must be same as your client URI
// endpoint for clients to interact with server
server.use('*', cors_1.default());
server.use('/graphql', body_parser_1.default.json(), apollo_server_express_1.graphqlExpress({
    schema: schema_1.default
}));
// endpoint for browser client and test tool
server.use('/graphiql', apollo_server_express_1.graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:${config_1.default.serverPort}/subscriptions`
}));
// IMPORTANT: wrap the Express server with new http client instance
const ws = http_1.createServer(server);
ws.listen(config_1.default.serverPort, () => {
    console.log(`Apollo Server is now running on http://localhost:${config_1.default.serverPort}`);
    // Set up the WebSocket for handling GraphQL subscriptions
    new subscriptions_transport_ws_1.SubscriptionServer({
        execute: graphql_1.execute,
        subscribe: graphql_1.subscribe,
        schema: schema_1.default
    }, {
        server: ws,
        path: '/subscriptions',
    });
});
//# sourceMappingURL=server.js.map