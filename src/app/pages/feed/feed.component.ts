import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { combineLatest } from 'rxjs';
import { FeedHeaderComponent } from '../../cmps/feed-cmps/feed-header/feed-header.component';

@Component({
  selector: 'feed',
  imports: [CommonModule, FeedHeaderComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent {
  private userService = inject(UserService)
  private recipeService = inject(RecipeService)
  recipes$ = this.recipeService.recipes$
  loggedInUser$ = this.userService.loggedInUser$

  combinedData$ = combineLatest([this.loggedInUser$, this.recipes$])
}
