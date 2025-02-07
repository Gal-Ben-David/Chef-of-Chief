import { Component, Input } from '@angular/core';
import { Comment } from '../../models/recipe.model';
import { CommonModule } from '@angular/common';
import { CommentPreviewComponent } from '../comment-preview/comment-preview.component';
import { Observable } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule } from '@angular/forms';
import { makeId } from '../../services/util.service';

@Component({
  selector: 'comment',
  imports: [CommonModule, CommentPreviewComponent, TextFieldModule, FormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input() comments!: Comment[]
  @Input() recipeId!: string
  @Input() byUser!: UserModel
  emojis: string[] = ['😎', '😂', '❤️', '😭', '🤩', '👍', '👏', '💪', '🙏']
  commentTxt: string = ''

  onSendComment() {
    this.comments.unshift({
      id: makeId(),
      txt: this.commentTxt,
      by: { ...this.byUser }
    })
    this.commentTxt = ''
  }

  onEnterPress(event: KeyboardEvent) {
    event.preventDefault()
  }

  addEmoji(emoji: string): void {
    this.commentTxt += emoji
  }
}
