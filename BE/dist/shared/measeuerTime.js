"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MeaseuerTime {
    showMeasuerTime() {
        const timeSec = (rabbitEnd - parsedData.rabbitStart) * 0.001;
        this.numberOfRounds++;
        this.avgTime += timeSec;
        this.roundTime += timeSec;
        if (this.numberOfRounds % this.config.config_totalNumberOfRounds == 0) {
            this.totalTime += this.roundTime / this.config.config_totalNumberOfRounds;
            console.log(`\n********************************************`);
            console.log(`Average time for this round: ${this.roundTime / this.config.config_totalNumberOfRounds}`);
            console.log(`Finished ${this.numberOfRounds} number of rounds`);
            console.log(`avg time: ${(this.avgTime / this.numberOfRounds)} sec`);
            console.log(`Total entities : ${this.numberOfRounds * this.config.config_batchNumber}`);
            console.log(`********************************************\n`);
            this.roundTime = 0;
        }
    }
}
exports.MeaseuerTime = MeaseuerTime;
//# sourceMappingURL=mesureTime.js.map