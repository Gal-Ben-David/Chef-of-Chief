import { Component, Input } from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { MiniRecipe } from '../../../models/recipe.model';

@Component({
  selector: 'feed-post-list',
  imports: [CommonModule],
  templateUrl: './feed-post-list.component.html',
  styleUrl: './feed-post-list.component.scss'
})
export class FeedPostListComponent {
  @Input() post!: MiniRecipe
}
