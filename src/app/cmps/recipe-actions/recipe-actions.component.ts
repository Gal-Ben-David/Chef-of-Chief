import { Component, DestroyRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'recipe-actions',
  imports: [RouterLink, ModalComponent, CommonModule],
  templateUrl: './recipe-actions.component.html',
  styleUrl: './recipe-actions.component.scss'
})
export class RecipeActionsComponent {
  @Input() recipeId!: string
  @Input() modalType!: string
  @Input() openModal!: Function
  @Output() openModalRequest = new EventEmitter()
  private destroyRef = inject(DestroyRef)
  private recipeService = inject(RecipeService)

  isDeleteRecipe = false
  modalComponent: any
  modalData: any

  onToggleDeleteRecipe() {
    this.isDeleteRecipe = !this.isDeleteRecipe
  }

  onDeleteRecipe() {
    this.recipeService.remove(this.recipeId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        error: err => console.log('err:', err),
        complete: () => console.log('recipe has been removed')
        // complete: () => this.router.navigateByUrl('/')
      })
  }

}
