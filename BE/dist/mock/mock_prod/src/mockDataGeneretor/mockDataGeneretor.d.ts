import { Observable } from 'rxjs/index';
export declare class MockDataGenerator {
    private interval;
    private static createBatch;
    private static stringifyMessage;
    generateMockData(timeToRepeat: number, batchNumber: number): Observable<any>;
    killSourceMockData(): void;
}
