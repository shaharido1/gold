import { KeyScore, RedisInput, RedisReturnCB } from './entity/redisQuer';

export class Parser {


  public static fromRedisArrayToObject(unstructuredMissions: Array<string>): Array<KeyScore> {
    //todo change names!
    const objectOut = [];
    for (let x = 0; x < unstructuredMissions.length; x += 2) {
      const tmp = {
        key: unstructuredMissions[x],
        score: Math.round(Number(unstructuredMissions[x + 1]) * 100) / 100
      };
      objectOut.push(tmp);
    }
    return objectOut;
  }

  public static fromRedisArrayToMap(argsToResolve,response): Map<string, any> {
    const missionsMap: Map<string, any> = new Map();
    const arrayMissions = [];
    for (let x = 0; x < response.length; x += 2) {
      const missinObject = {
        key: response[x],
        score: Math.round(Number(response[x + 1]) * 100) / 100
      };
      arrayMissions.push(missinObject);
    }
    missionsMap.set(argsToResolve, arrayMissions);

    return missionsMap;
  }


  public static redisInputIntoArrayString(redisInput: Array<RedisInput>) {
    const redisInputArray = [];
    redisInput.forEach(input => {
      if (typeof input.value === 'object'){
        input.value = JSON.stringify(input.value);
      }
      redisInputArray.push(input.subField, input.value);
    });
    return redisInputArray;
  }

}