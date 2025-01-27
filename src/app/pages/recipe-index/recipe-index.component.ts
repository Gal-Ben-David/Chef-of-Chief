import { Component } from '@angular/core';
import { recipes } from '../../data/data';
import { RecipeModel } from '../../models/recipe.model';
import { RecipeListComponent } from '../../cmps/recipe-list/recipe-list.component';

@Component({
  selector: 'recipe-index',
  imports: [RecipeListComponent],
  templateUrl: './recipe-index.component.html',
  styleUrl: './recipe-index.component.scss'
})
export class RecipeIndexComponent {
  recipes: RecipeModel[] | null = null

  constructor() {
    this.recipes = recipes
  }

}
