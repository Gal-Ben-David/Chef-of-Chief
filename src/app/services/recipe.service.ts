import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { RecipeModel } from '../models/recipe.model';
import { recipes } from '../data/data';
import { UserService } from './user.service';
import { UserModel } from '../models/user.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { makeId } from '../services/util.service'

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
    const recipeToAdd = { ...recipe, _id: makeId() }
    console.log('recipeToAdd', recipeToAdd)
    recipes.push(recipeToAdd)
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

  async uploadImg(imgData: string) {
    const CLOUD_NAME = 'webify'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData()
    formData.append('file', imgData)
    formData.append('upload_preset', 'webify')
    try {
      const res = await fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      return data.secure_url
    } catch (err) {
      console.log(err)
    }
  }

}
