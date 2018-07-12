"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MeasureTime {
    timeWrapper(message) {
        return {
            message,
            start: new Date().getTime()
        };
    }
    showMeasureTime(end, start, timeSetup, config) {
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
            console.log(`Total entities : ${timeSetup.numberOfRounds * config.config_batchNumber}`);
            console.log(`********************************************\n`);
            timeSetup.roundTime = 0;
        }
    }
}
exports.MeasureTime = MeasureTime;
//# sourceMappingURL=measeuerTime.js.map