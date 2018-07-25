import { TimeSetup } from './TimeSetup';

export class MeasureTime {

  timeSetup: TimeSetup;

  public timeWrapper(message: object) {
    return {
      message,
      start: new Date().getTime()
    };
  }

  public showMeasureTime(end, start, timeSetup: TimeSetup, config): void {
    const timeSec = (end - start) * 0.001;
    timeSetup.numberOfRounds++;
    timeSetup.avgTime += timeSec;
    timeSetup.roundTime += timeSec;

    if (timeSetup.numberOfRounds % config.config_totalNumberOfRounds == 0) {

      timeSetup.totalTime += timeSetup.roundTime / config.config_totalNumberOfRounds;
      console.log(`\n********************************************`);
      console.log(`Average time for this round: ${timeSetup.roundTime / config.config_totalNumberOfRounds}`);
      console.log(`Finished ${timeSetup.numberOfRounds} number of rounds`);
      console.log(`avg time: ${(timeSetup.avgTime / timeSetup.numberOfRounds)} sec`);
      console.log(`Total entities : ${timeSetup.numberOfRounds * config.config_batchNumber }`);
      console.log(`********************************************\n`);
      timeSetup.roundTime = 0;


    }
  }
}
