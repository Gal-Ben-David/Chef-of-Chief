import { Component, Input } from '@angular/core';
import { Comment } from '../../models/recipe.model';
import { CommonModule } from '@angular/common';
import { CommentPreviewComponent } from '../comment-preview/comment-preview.component';
import { Observable } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'comment',
  imports: [CommonModule, CommentPreviewComponent, TextFieldModule, FormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input() comments!: Comment[]
  @Input() loggedInUser$!: Observable<UserModel>
  commentTxt: string = ''
}
