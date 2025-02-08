import { Component, DestroyRef, inject, Input, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { RecipeModel } from '../../models/recipe.model';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field'

@Component({
  selector: 'recipe-edit',
  imports: [FormsModule, CommonModule, TextFieldModule],
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss'
})
export class RecipeEditComponent {
  private route = inject(ActivatedRoute)
  private destroyRef = inject(DestroyRef)
  private recipeService = inject(RecipeService)
  private router = inject(Router)
  private userService = inject(UserService)

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

  onSaveRecipe(): void {
    this.recipeService.save(this.recipe as RecipeModel)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        error: err => console.log('err:', err),
        complete: () => this.router.navigateByUrl('/')
      })
  }

  onCancelEdit(): void {
    this.router.navigateByUrl('/')
  }

  onChangePostType(type: string): void {
    this.postType = type
  }

  onLoadImage(ev: Event): void {
    const reader = new FileReader()
    const input = ev.target as HTMLInputElement
    if (!input.files || input.files.length === 0) return

    const file = input.files[0]

    reader.onload = async (event: ProgressEvent<FileReader>) => {
      const base64Img = event.target?.result as string

      try {
        const uploadedImgUrl = await this.recipeService.uploadImg(base64Img)
        this.recipe.imgUrl = uploadedImgUrl

        // const img = new Image()
        // img.crossOrigin = 'Anonymous'
        // img.src = uploadedImgUrl
        // img.onload = () => {
        //   this.recipe.imgUrl = uploadedImgUrl
        // }

      } catch (error) {
        console.error('Image upload failed:', error)
      }
    }

    reader.readAsDataURL(file)
  }

}
