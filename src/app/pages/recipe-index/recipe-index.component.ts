import { Component, inject } from '@angular/core';
import { recipes } from '../../data/data';
import { RecipeModel } from '../../models/recipe.model';
import { RecipeListComponent } from '../../cmps/recipe-list/recipe-list.component';
import { RecipeService } from '../../services/recipe.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'recipe-index',
  imports: [RecipeListComponent, CommonModule],
  templateUrl: './recipe-index.component.html',
  styleUrl: './recipe-index.component.scss'
})
export class RecipeIndexComponent {
  private recipeService = inject(RecipeService)
  private userService = inject(UserService)

  recipes$ = this.recipeService.recipes$
  loggedInUser$ = this.userService.loggedInUser$

  constructor() {
  }

}
