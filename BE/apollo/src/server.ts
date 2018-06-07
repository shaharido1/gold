
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors"
import { appConfig } from "./config/appConfig";
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { schema } from './graphqlStuff';

const app = express();
app.use('*', cors());
app.use(morgan("dev"));
app.use('/graphql', cors(), bodyParser.json({ limit: "10mb" }), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.get('/test', (req, res) => res.send("apollo server up and running"));

app.listen(appConfig.port, () => {
  console.log(`apollo server running on localhost:${appConfig.port}`);
});

module.exports = {
  app: app
};

