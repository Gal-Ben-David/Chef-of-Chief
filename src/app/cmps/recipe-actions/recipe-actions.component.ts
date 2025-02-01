import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'recipe-actions',
  imports: [RouterLink],
  templateUrl: './recipe-actions.component.html',
  styleUrl: './recipe-actions.component.scss'
})
export class RecipeActionsComponent {
  @Input() recipeId!: string
}
