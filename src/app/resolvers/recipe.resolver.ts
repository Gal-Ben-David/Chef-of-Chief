import { ResolveFn, Router } from '@angular/router';
import { recipes } from '../data/data';
import { RecipeModel } from '../models/recipe.model';
import { inject } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { catchError, of } from 'rxjs';

export const recipeResolver: ResolveFn<Partial<RecipeModel>> = (route, state) => {
  const recipeService = inject(RecipeService)
  const recipeId = route.params['recipeId']

  if (!recipeId) return of(recipeService.getEmptyRecipe())

  return recipeService.getById(recipeId).pipe(
    catchError(() => of(recipeService.getEmptyRecipe())) // handle the fallback inside the resolver
  )
}
