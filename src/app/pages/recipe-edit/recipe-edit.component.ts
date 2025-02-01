import { Component, DestroyRef, inject, Input } from '@angular/core';
import { RecipeModel } from '../../models/recipe.model';
import { filter, map, Observable, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'recipe-edit',
  imports: [],
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss'
})
export class RecipeEditComponent {
  private route = inject(ActivatedRoute)
  private destroyRef = inject(DestroyRef)
  recipe!: RecipeModel

  ngOnInit(): void {
    this.route.data.pipe(
      map(data => data['recipe']),
      filter(recipe => !!recipe),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(recipe => {
      this.recipe = recipe
    })
  }

}
