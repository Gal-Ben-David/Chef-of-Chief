import { Component, DestroyRef, inject, Input } from '@angular/core';
import { Comment, RecipeModel } from '../../models/recipe.model';
import { CommonModule } from '@angular/common';
import { CommentPreviewComponent } from '../comment-preview/comment-preview.component';
import { Observable } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule } from '@angular/forms';
import { makeId } from '../../services/util.service';
import { RecipeService } from '../../services/recipe.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'comment',
  imports: [CommonModule, CommentPreviewComponent, TextFieldModule, FormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input() recipe!: RecipeModel
  @Input() byUser!: UserModel
  emojis: string[] = ['😎', '😂', '❤️', '😭', '🤩', '👍', '👏', '💪', '🙏']
  commentTxt: string = ''
  commentsList!: Comment[]
  private recipeService = inject(RecipeService)
  private destroyRef = inject(DestroyRef)

  ngOnInit() {
    this.commentsList = this.recipe.comments
  }

  onSendComment() {
    this.commentsList.unshift({
      id: makeId(),
      txt: this.commentTxt,
      by: { ...this.byUser }
    })
    this.commentTxt = ''

    const recipeToSave = { ...this.recipe, comments: [...this.commentsList] }

    this.recipeService.save(recipeToSave)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        error: err => console.log('err:', err),
        complete: () => console.log('Comment saved')
      })
  }

  onEnterPress(event: KeyboardEvent) {
    event.preventDefault()
  }

  addEmoji(emoji: string): void {
    this.commentTxt += emoji
  }
}
