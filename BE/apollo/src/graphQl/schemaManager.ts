import { mergeSchemas, PubSub } from 'apollo-server';
import { MissionSchema } from './mission/mission.schema';
import { EntitySchema } from './entity/entity.schema';

export class SchemaManager {
  public schema;
  public pubSub;
  missionSchema: any;
  entitySchema: any;


  constructor(isDev) {
    this.pubSub = new PubSub();
    this.missionSchema = new MissionSchema(this.pubSub, isDev);
    this.entitySchema = new EntitySchema(this.pubSub, isDev);
    this.schema =  mergeSchemas({ schemas: [ this.missionSchema.schema, this.entitySchema.schema ] });
  }
}

