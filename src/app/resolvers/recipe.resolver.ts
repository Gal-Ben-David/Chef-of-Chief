import { ResolveFn, Router } from '@angular/router';
import { recipes } from '../data/data';
import { RecipeModel } from '../models/recipe.model';
import { inject } from '@angular/core';

export const recipeResolver: ResolveFn<RecipeModel> = (route, state) => {
  const recipeId = route.params['recipeId']
  const recipe = recipes.find(recipe => recipe._id === recipeId)
  console.log('recipe', recipe)

  if (!recipe) {
    const router = inject(Router)
    router.navigate(['/recipe']) // Redirects to '/recipe' if not found
    return null as unknown as RecipeModel // Avoids type error
  }

  return recipe
}
