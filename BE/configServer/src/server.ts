import { appConfig } from '../../shared/config/configServer';
import { appConfig as prod } from '../../shared/config/configProducer';
import { appConfig as cons } from '../../shared/config/configConsumer';
import { appConfig as enri } from '../../shared/config/configEnrich';

import express from 'express';
import bodyParser from 'body-parser';


const app = express();
const port = appConfig.rabbitPort;


app.set('port', port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/test', function (req, res) {
  console.log('WORKS!!!');
  res.send('WORKS!!!');
});

app.get('/prod', function (req, res) {
  res.json(prod);
});

app.get('/consumer', function (req, res) {
  res.json(cons);
});

app.get('/enrich', function (req, res) {
  res.json(enri);
});


app.listen(port, () => console.log(`Service Listening on Port ${port}`));