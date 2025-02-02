import { ResolveFn, Router } from '@angular/router';
import { recipes } from '../data/data';
import { RecipeModel } from '../models/recipe.model';
import { inject } from '@angular/core';
import { RecipeService } from '../services/recipe.service';

export const recipeResolver: ResolveFn<Partial<RecipeModel>> = (route, state) => {
  const recipeService = inject(RecipeService)
  const recipeId = route.params['recipeId']
  let recipe: Partial<RecipeModel> = recipes.find(recipe => recipe._id === recipeId) || recipeService.getEmptyRecipe()

  console.log('recipe', recipe)

  return recipe
}
