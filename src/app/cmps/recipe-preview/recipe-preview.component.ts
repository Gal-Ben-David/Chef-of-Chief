import { Component, DestroyRef, EventEmitter, inject, Input } from '@angular/core';
import { ByUser, RecipeModel } from '../../models/recipe.model';
import { CommonModule } from '@angular/common';
import { SvgService } from '../../services/svg.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RelativeTimePipe } from '../../custom-pipe/relative-time.pipe';
import { ModalComponent } from '../modal/modal.component';
import { CommentComponent } from '../comment/comment.component';
import { RouterLink } from '@angular/router';
import { RecipeActionsComponent } from '../recipe-actions/recipe-actions.component';
import { UserService } from '../../services/user.service';
import { filter, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RecipeService } from '../../services/recipe.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'recipe-preview',
  imports: [CommonModule, RelativeTimePipe, ModalComponent, RouterLink],
  templateUrl: './recipe-preview.component.html',
  styleUrl: './recipe-preview.component.scss'
})
export class RecipePreviewComponent {
  @Input() recipe!: RecipeModel
  @Input() loggedInUser!: UserModel
  isModalOpen = false
  modalComponent: any
  modalData: any
  modalType: string = ''

  private svgService = inject(SvgService)
  private sanitizer = inject(DomSanitizer)
  private userService = inject(UserService)
  private destroyRef = inject(DestroyRef)
  private recipeService = inject(RecipeService)

  byUser!: ByUser //miniUser
  userToSave!: UserModel
  likedByLoggedInUser: boolean = false
  savedByLoggedInUser: boolean = false

  icons: { [key: string]: SafeHtml } = {}

  ngOnInit(): void {
    this.loadIcons(['heart', 'fullHeart', 'comment', 'save', 'saved', 'more'])
    this.userToSave = { ...this.loggedInUser }
    const { fullname, imgUrl, _id } = this.loggedInUser
    this.byUser = { fullname, imgUrl, _id }

    this.likedByLoggedInUser = this.recipe.likedBy.some(likedBy => likedBy._id === this.byUser._id)
    this.savedByLoggedInUser = this.userToSave.savedRecipeIds.some(savedRecipeId => savedRecipeId === this.recipe._id)
  }

  private loadIcons(iconNames: string[]): void {
    iconNames.forEach((iconName) => {
      const svgContent = this.svgService.getIcon(iconName)
      this.icons[iconName] = this.sanitizer.bypassSecurityTrustHtml(svgContent)
    })
  }

  openModal(type: string): void {
    this.isModalOpen = true

    if (type === 'comments') {
      this.modalComponent = CommentComponent
      this.modalData = {
        recipe: { ...this.recipe },
        byUser: { ...this.byUser }
      }
    } else if (type === 'actions') {
      this.modalComponent = RecipeActionsComponent
      this.modalData = {
        recipeId: this.recipe._id,
      }
    }
  }

  handleCloseModal(): void {
    this.isModalOpen = false
  }

  onToggleLike(): void {
    this.likedByLoggedInUser = !this.likedByLoggedInUser
    let recipeToSave = { ...this.recipe }
    const newLikedByList = this.likedByLoggedInUser
      ? [...recipeToSave.likedBy, { ...this.byUser }]
      : recipeToSave.likedBy.filter(likeBy => likeBy._id !== this.byUser._id)

    recipeToSave.likedBy = newLikedByList

    this.recipeService.save(recipeToSave)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        error: err => console.log('err:', err),
        complete: () => console.log('Toggling like')
      })
  }

  onToggleSavedRecipe(): void {
    this.savedByLoggedInUser = !this.savedByLoggedInUser
    const newSavedRecipeIds = this.savedByLoggedInUser
      ? [...this.userToSave.savedRecipeIds, this.recipe._id]
      : this.userToSave.savedRecipeIds.filter(recipeId => recipeId !== this.recipe._id)

    this.userToSave.savedRecipeIds = newSavedRecipeIds

    this.userService.saveUser(this.userToSave)
  }
}
