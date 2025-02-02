import { Component, Input } from '@angular/core';
import { RecipeModel } from '../../models/recipe.model';
import { RecipePreviewComponent } from '../recipe-preview/recipe-preview.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'recipe-list',
  imports: [RecipePreviewComponent, CommonModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent {
  @Input() recipes: RecipeModel[] | null = null

  trackByFn(idx: number, recipe: RecipeModel): string {
    return recipe._id
  }

}
