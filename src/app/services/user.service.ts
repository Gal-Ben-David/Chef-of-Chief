import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { BehaviorSubject, catchError, filter, retry, take, tap, throwError } from 'rxjs';
import { user } from '../data/user';
import { MiniRecipe } from '../models/recipe.model';
import { HttpErrorResponse } from '@angular/common/http';

const ENTITY_USER = 'user'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _loggedInUser$ = new BehaviorSubject<UserModel | null>(null)
  public loggedInUser$ = this._loggedInUser$.asObservable()


  constructor() {
    const savedUser = JSON.parse(localStorage.getItem(ENTITY_USER) || 'null')
    if (!savedUser) {
      localStorage.setItem(ENTITY_USER, JSON.stringify(user))
      this._loggedInUser$.next(user)
    } else {
      this._loggedInUser$.next(savedUser)
    }
  }

  saveUser(user: UserModel) {
    this._loggedInUser$.next(user)
    localStorage.setItem(ENTITY_USER, JSON.stringify(user))
  }

  addPostToUser(miniPost: MiniRecipe) {
    this._loggedInUser$.pipe(
      take(1),
      filter(user => !!user),
      tap(user => {
        const updatedUser = { ...user, myRecipes: [...(user.myRecipes || []), miniPost] }
        this.saveUser(updatedUser)
      }),
      retry(1),
      catchError(this._handleError)
    ).subscribe()
  }

  private _handleError(err: HttpErrorResponse) {
    console.log('err:', err)
    return throwError(() => err)
  }
}
