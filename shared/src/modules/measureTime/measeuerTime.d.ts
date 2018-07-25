import { TimeSetup } from './TimeSetup';
export declare class MeasureTime {
    timeSetup: TimeSetup;
    timeWrapper(message: object): {
        message: object;
        start: number;
    };
    showMeasureTime(end: any, start: any, timeSetup: TimeSetup, config: any): void;
}
