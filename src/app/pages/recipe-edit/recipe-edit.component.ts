import { Component, DestroyRef, inject, Input } from '@angular/core';
import { RecipeModel } from '../../models/recipe.model';
import { filter, map, Observable, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'recipe-edit',
  imports: [FormsModule],
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss'
})
export class RecipeEditComponent {
  private route = inject(ActivatedRoute)
  private destroyRef = inject(DestroyRef)
  private recipeService = inject(RecipeService)
  private router = inject(Router)
  recipe!: RecipeModel

  ngOnInit(): void {
    this.route.data.pipe(
      map(data => data['recipe']),
      filter(recipe => !!recipe),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(recipe => {
      this.recipe = { ...recipe }
    })
  }

  onSaveRecipe() {
    this.recipeService.save(this.recipe as RecipeModel)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        error: err => console.log('err:', err),
        complete: () => this.router.navigateByUrl('/')
      })
  }

  onCancelEdit() {
    this.router.navigateByUrl('/')
  }

}
