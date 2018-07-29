import { InterceptionEntity } from './entity.interface';


export class EntityClass {
  dynamic: {
    name: string,
    surName: string,
    address: {
      city: string
    }
  };
  relatedMissions: Map<string, boolean>;
  rank: Map<string, boolean>;
  tags: Map<string, Array<string>>;

  constructor() {

  }
}