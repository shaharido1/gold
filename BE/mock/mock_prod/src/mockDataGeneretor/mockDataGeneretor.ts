import { v4 } from 'uuid';

export class MockDataGeneretor {

  static createBatch(batchNumber): string {
    let i = 0;
    const mockData: Array<{ message: string, id: string }> = [];
    while (i < batchNumber) {
      const msg = { message: `ms-${i}`, id: v4() };
      mockData.push(msg);
      i++;
    }

    return MockDataGeneretor.stringifyMessage(mockData);
  }

  static stringifyMessage(message: Array<any>): string {
    const js = {
      message,
      rabbitStart: new Date().getTime()
    };

    return JSON.stringify(js);
  }

}