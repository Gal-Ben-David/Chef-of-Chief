import { Component, Input } from '@angular/core';
import { Comment } from '../../models/recipe.model';

@Component({
  selector: 'comment-preview',
  imports: [],
  templateUrl: './comment-preview.component.html',
  styleUrl: './comment-preview.component.scss'
})
export class CommentPreviewComponent {
  @Input() comment!: Comment
}
