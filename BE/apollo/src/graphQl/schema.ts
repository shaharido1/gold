import { mergeSchemas, PubSub } from 'apollo-server';
import { MissionSchema } from './mission/mission.schema';

export class SchemaManager {
  public schema;
  public pubSub = new PubSub();
  missionSchema: any;
  constructor() {
    this.missionSchema = new MissionSchema(this.pubSub);
    this.schema =  mergeSchemas({ schemas: [ this.missionSchema.schema ] });

  }
}

