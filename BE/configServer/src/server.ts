import { appConfig } from '../config/configServer';
import { appConfig as prod } from '../config/configProducer';
import { appConfig as cons } from '../config/configConsumer';
import { appConfig as enri } from '../config/configEnrich';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = appConfig.config_rabbitPort;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/test', function (req, res) {
  console.log('WORKS!!!');
  res.send('WORKS!!!');
});

app.get('/getConfig', function (req, res) {
  console.log(req.query.type);
  if (req.query.type === 'producer') {
    res.json(prod);
  }
  else if (req.query.type === 'consumer') {
    res.json(cons);
  }
  else if (req.query.type === 'enrich') {
    res.json(enri);
  }
  else {
    res.send('404');
  }
});

app.listen(port, () => console.log(`Service Listening on Port ${port}`));
