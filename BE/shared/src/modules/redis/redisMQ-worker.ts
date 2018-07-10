import * as RSMQWorker from 'rsmq-worker';

export class RedisMQWorkerAdapter {

  worker: RSMQWorker;

  constructor(qName: string, host: string) {
    console.log('initRMSQ-worker');
    return this.worker = new RSMQWorker(qName, { host, interval: 0 })
  }


}