import mergeSchemas from 'graphql-tools/dist/stitching/mergeSchemas';
import { missionSchema } from './mission/mission.schema';

export const schema = mergeSchemas({ schemas: [missionSchema] });
