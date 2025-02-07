import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { user } from '../data/user';

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
}
