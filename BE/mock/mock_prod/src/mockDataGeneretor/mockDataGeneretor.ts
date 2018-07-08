import { v4 } from 'uuid';
import { MockDataType } from './mockDataType';
import { Observable } from 'rxjs/index';

export class MockDataGenerator {
  private repeated = 0;

  static createBatch(batchNumber): string {
    let i = 0;
    const mockData: Array< MockDataType> = [];
    while (i < batchNumber) {
      const msg = { message: `ms-${i}`, id: v4() };
      mockData.push(msg);
      i++;
    }
    return MockDataGenerator.stringifyMessage(mockData);
  }

  static stringifyMessage(message: Array<any>): string {
    const js = {
      message,
      rabbitStart: new Date().getTime()
    };

    return JSON.stringify(js);
  }


  static generateMockData(timeToRepeat: number) : Observable<any> {
    return new Observable(observer => {
      const interval = setInterval(() => {
        if (++this.repeated === timeToRepeat) {
          clearInterval(interval);
        }
        const batch = MockDataGenerator.createBatch(this.config.config_batchNumber);
        console.log(batch);
        observer.next(batch);
        // }, this.config.config_batchNumber / 10);
      }, 2000);
    })
  }

}