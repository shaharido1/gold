import { RedisInput } from './entity/redisQuer';

export class Parser {


  public static fromRedisArrayToObject(str): Array<{ key: string, score: number }> {
    const objectOut = [];
    for (let x = 0; x < str.length; x += 2) {
      const tmp = {
        key: str[x],
        score: Math.round(str[x + 1] * 100) / 100
      };
      objectOut.push(tmp);
    }
    return objectOut;
  }


  public static redisInputIntoArrayString(redisInput: Array<RedisInput>) {
    const redisInputArray = [];
    redisInput.forEach(input => {
      redisInputArray.push(input.subField, input.value);
    });
    return redisInputArray;
  }

}