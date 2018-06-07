import { Field, InputType } from 'type-graphql';
import { Recipe } from './recipe.types';

@InputType()
export class RecipeInput implements Partial<Recipe> {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;
}