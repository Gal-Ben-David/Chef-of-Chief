import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { RecipeModel } from '../models/recipe.model';
import { recipes } from '../data/data';
import { UserService } from './user.service';
import { UserModel } from '../models/user.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private _recipes$ = new BehaviorSubject<RecipeModel[]>([])
  public recipes$ = this._recipes$.asObservable()
  private loggedInUser!: UserModel


  constructor(private userService: UserService) {
    this._recipes$.next(recipes)

    this.userService.loggedInUser$.pipe(
      takeUntilDestroyed() // Automatically unsubscribes when component is destroyed
    ).subscribe(user => {
      this.loggedInUser = user
    })
  }

  public getEmptyRecipe(): Partial<RecipeModel> {
    return {
      txt: '',
      imgUrl: '',
      by: {
        _id: this.loggedInUser._id,
        fullname: this.loggedInUser.fullname,
        imgUrl: this.loggedInUser.imgUrl,
      },
      comments: [],
      likedBy: [],
      tags: [],
    }
  }


  public save(recipe: RecipeModel) {
    return of(recipe._id ? this._edit(recipe) : this._add(recipe))
  }

  private _add(recipe: RecipeModel) {
    const recipes = [...this._recipes$.value]
    recipes.push(recipe)
    this._recipes$.next(recipes)
    return recipe
  }

  private _edit(recipe: RecipeModel) {
    const recipes = [...this._recipes$.value]
    const recipeIdx = recipes.findIndex(_recipe => _recipe._id === recipe._id)
    recipes[recipeIdx] = recipe
    this._recipes$.next(recipes)
    return recipe
  }

}
