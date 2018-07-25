export interface RedisEntity {
  type: RedisDataType;
  entityId: string;
  mainField?: string
  redisInput: Array<RedisInput>
}

export interface RedisInput {
  subField: string;
  value: string;
}


export enum RedisDataType {
  mission = 'M',
  interception = 'I',
  sensor = 'S'
}

export type RedisInterCeptionFiedls = RedisInterceptionCoreFields | RedisInterceptionMissionRelatedFields

export type RedisInterceptionQuery = RedisQueryMissionRelated | RedisQueryCore;


export interface RedisQueryMissionRelated extends RedisQuery {
  missionRelatedFields: Array<RedisInterceptionMissionRelatedFields>;
  subField: string;
}

export interface RedisQueryCore extends RedisQuery {
  subField: Array<RedisInput>;
}

export interface RedisQuery {
  type: RedisDataType;
  entityId: string;
}

export enum RedisInterceptionCoreFields {
  static = 'static',
  dynamic = 'dynamic',
}

export enum RedisInterceptionMissionRelatedFields {
  related_missions = 'related_missions',
  rank = 'rank',
  tags = 'tags'
}

export interface RedisInterCeptionEntity {
  coreFields: RedisInterceptionCoreFields
  missionRelatedFields: RedisInterceptionMissionRelatedFields
}
