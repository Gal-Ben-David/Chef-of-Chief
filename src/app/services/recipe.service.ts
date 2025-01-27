import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RecipeModel } from '../models/recipe.model';
import { recipes } from '../data/data';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private _recipes$ = new BehaviorSubject<RecipeModel[]>([])
  public recipes$ = this._recipes$.asObservable()

  constructor() {
    this._recipes$.next(recipes)
  }
}
