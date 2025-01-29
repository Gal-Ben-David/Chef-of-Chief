import { Component, Input } from '@angular/core';
import { Comment } from '../../models/recipe.model';
import { CommonModule } from '@angular/common';
import { CommentPreviewComponent } from '../comment-preview/comment-preview.component';

@Component({
  selector: 'comment',
  imports: [CommonModule, CommentPreviewComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input() comments!: Comment[]
}
