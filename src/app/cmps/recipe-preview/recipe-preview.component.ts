import { Component, Input } from '@angular/core';
import { RecipeModel } from '../../models/recipe.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'recipe-preview',
  imports: [CommonModule],
  templateUrl: './recipe-preview.component.html',
  styleUrl: './recipe-preview.component.scss'
})
export class RecipePreviewComponent {
  @Input() recipe!: RecipeModel
}
