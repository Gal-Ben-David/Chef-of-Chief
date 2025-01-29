import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { user } from '../data/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _loggedInUser$ = new BehaviorSubject<UserModel>(user)
  public loggedInUser$ = this._loggedInUser$.asObservable()

  constructor() {
  }
}
