import { Component, Input } from '@angular/core';
import { CommentModel } from '../../models/recipe.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'comment',
  imports: [CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input() comments!: CommentModel[]
}
