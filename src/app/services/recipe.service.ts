import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, from, Observable, of, retry, tap, throwError } from 'rxjs';
import { RecipeModel } from '../models/recipe.model';
import { recipes } from '../data/data';
import { UserService } from './user.service';
import { UserModel } from '../models/user.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { makeId } from '../services/util.service'
import { storageService } from './async-storage.service';
import { HttpErrorResponse } from '@angular/common/http';

const ENTITY = 'recipes'
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private _recipes$ = new BehaviorSubject<RecipeModel[]>([])
  public recipes$ = this._recipes$.asObservable()
  private loggedInUser: UserModel | null = null


  constructor(private userService: UserService) {
    const recipes = JSON.parse(localStorage.getItem(ENTITY) || '[]')
    if (!recipes || recipes.length === 0) {
      localStorage.setItem(ENTITY, JSON.stringify(this._createRecipes()))
    }

    this.userService.loggedInUser$.pipe(
      takeUntilDestroyed() // Automatically unsubscribes when component is destroyed
    ).subscribe(user => {
      this.loggedInUser = user
    })
  }


  public query() {
    return from(storageService.query<RecipeModel>(ENTITY))
      .pipe(
        tap(recipes => {
          // const filterBy = this._filterBy$.value
          // const termRegex = new RegExp(filterBy.term, 'i')
          // pets = pets.filter(pet => termRegex.test(pet.name))
          this._recipes$.next(recipes)
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  public getEmptyRecipe(): Partial<RecipeModel> {
    if (!this.loggedInUser) {
      throw new Error('User not found')
    }

    const { _id, fullname, imgUrl } = this.loggedInUser

    return {
      txt: '',
      imgUrl: '/img/new-post.jpeg',
      by: { _id, fullname, imgUrl },
      comments: [],
      likedBy: [],
      tags: [],
    }
  }


  public getById(recipeId: string): Observable<RecipeModel> {
    return from(storageService.get<RecipeModel>(ENTITY, recipeId))
      .pipe(
        retry(1),
        catchError(this._handleError)
      )
  }

  public remove(recipeId: string) {
    return from(storageService.remove(ENTITY, recipeId))
      .pipe(
        tap(() => {
          const recipes = [...this._recipes$.value]
          const recipeIdx = recipes.findIndex(recipe => recipe._id === recipeId)
          recipes.splice(recipeIdx, 1)
          this._recipes$.next(recipes)
          return recipeId
        }),
        retry(1),
        catchError(this._handleError)
      )
  }


  public save(recipe: RecipeModel) {
    return recipe._id ? this._edit(recipe) : this._add(recipe)
  }

  private _add(recipe: RecipeModel) {
    return from(storageService.post(ENTITY, recipe))
      .pipe(
        tap(newRecipe => {
          const recipes = [...this._recipes$.value]
          recipes.push(newRecipe)
          this._recipes$.next(recipes)
          return newRecipe
        }),
        tap(addedRecipe => {
          const { _id, imgUrl } = addedRecipe, miniRecipe = { _id, imgUrl }
          this.userService.addPostToUser(miniRecipe)
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  private _edit(recipe: RecipeModel) {
    return from(storageService.put(ENTITY, recipe))
      .pipe(
        tap(updatedRecipe => {
          const recipes = [...this._recipes$.value]
          const recipeIdx = recipes.findIndex(_recipe => _recipe._id === recipe._id)
          recipes[recipeIdx] = updatedRecipe
          this._recipes$.next(recipes)
          return updatedRecipe
        }),
        retry(1),
        catchError(this._handleError)
      )
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

  private _createRecipes() {
    const newRecipes: RecipeModel[] = recipes
    return newRecipes
  }

  private _handleError(err: HttpErrorResponse) {
    console.log('err:', err)
    return throwError(() => err)
  }

}
