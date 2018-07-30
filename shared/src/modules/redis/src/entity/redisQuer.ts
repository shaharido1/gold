export enum RedisInterceptionCoreFields {
  static = 'static',
  dynamic = 'dynamic',
  related_missions = 'related_missions',
  rank = 'rank',
  tags = 'tags',
  byTime = 'byTime',
  byRank = 'byRank'
}


export enum RedisDataType {
  mission = 'M',
  interception = 'I',
  sensor = 'S'
}


export interface RedisSetFormat {
  type: RedisDataType;
  id: string;
  mainFieldId?: RedisInterceptionCoreFields;
  entFields: Array<RedisInput>
}



export interface RedisInput {
  subField: string;
  value: string | Array<string> | object;
}


export interface RedisQuestion {
  type: RedisDataType;
  entityId: string;
  missionId: string;
  static: StaticFields;
  dynamic?: boolean;
  related_missions?: boolean;
  rank: boolean;
  tags: boolean;
}

export interface RedisAnswer {
  type: RedisDataType;
  entityId: any;
  missionId: any;
  static: any;
  dynamic?: any;
  related_missions?: any;
  rank: any;
  tags: any;
}


export interface StaticFields {
  name: boolean;
  surName: boolean;
  address: boolean;
}


export interface RedisQueryGetMission {
  type: RedisDataType;
  missionId: string;
  mainFieldId?: RedisInterceptionCoreFields;

}

export interface RedisReturnCB {
  argsToResolve: any,
  response: any
}

export interface redisMission extends RedisReturnCB {
  max: number ,
  min: number
}



export interface KeyScore {
  key: string,
  score: number
}