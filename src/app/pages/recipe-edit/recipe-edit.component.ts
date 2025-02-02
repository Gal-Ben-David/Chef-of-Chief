import { Component, DestroyRef, inject, Input, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { RecipeModel } from '../../models/recipe.model';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'recipe-edit',
  imports: [FormsModule, CommonModule],
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss'
})
export class RecipeEditComponent {
  private route = inject(ActivatedRoute)
  private destroyRef = inject(DestroyRef)
  private recipeService = inject(RecipeService)
  private router = inject(Router)
  postType: string = 'post'
  recipe!: RecipeModel

  ngOnInit(): void {
    this.route.data.pipe(
      map(data => data['recipe']),
      tap(recipe => console.log(recipe)),
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

  onChangePostType(type: string) {
    this.postType = type
  }

}
