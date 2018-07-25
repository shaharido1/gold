import { v4 } from 'uuid';
import { MockDataType } from './mockDataType';
import { Observable } from 'rxjs/index';

export class MockDataGenerator {
  private interval: any;


  private static createBatch(batchNumber): string {
    let i = 0;
    const mockData: Array<MockDataType> = [];
    while (i < batchNumber) {
      const msg = { message: `ms-${i}`, id: v4() };
      mockData.push(msg);
      i++;
    }
    return MockDataGenerator.stringifyMessage(mockData);
  }

  private static stringifyMessage(message: Array<any>): string {
    const js = {
      message,
      rabbitStart: new Date().getTime()
    };

    return JSON.stringify(js);
  }


  public generateMockData(timeToRepeat: number, batchNumber: number): Observable<any> {
    let repeated = 0;
    this.killSourceMockData();
    return new Observable(observer => {
      this.interval = setInterval(() => {
        if (++repeated === timeToRepeat) {
          this.killSourceMockData();
        }
        const batch = MockDataGenerator.createBatch(batchNumber);
        // console.log(batch);
        observer.next(batch);
        // }, this.config.config_batchNumber / 10);
      }, 2000);
    });
  }

  public killSourceMockData() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

}