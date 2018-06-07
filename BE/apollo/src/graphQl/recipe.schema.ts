import { buildSchema } from 'type-graphql';
import { RecipeResolver } from './recipe.resolver';

export const RecipieSchema =  buildSchema({
  resolvers: [RecipeResolver]
})