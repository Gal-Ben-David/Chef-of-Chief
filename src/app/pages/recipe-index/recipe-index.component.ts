import { Component, DestroyRef, inject } from '@angular/core';
import { RecipeListComponent } from '../../cmps/recipe-list/recipe-list.component';
import { RecipeService } from '../../services/recipe.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RecipeModel } from '../../models/recipe.model';

@Component({
  selector: 'recipe-index',
  imports: [RecipeListComponent, CommonModule, RouterOutlet],
  templateUrl: './recipe-index.component.html',
  styleUrl: './recipe-index.component.scss'
})
export class RecipeIndexComponent {
  private recipeService = inject(RecipeService)
  private userService = inject(UserService)
  private destroyRef = inject(DestroyRef)

  recipes$ = this.recipeService.recipes$
  loggedInUser$ = this.userService.loggedInUser$

  routeActiveType = 'home'
  private routeSubscription!: Subscription

  constructor(private router: Router) {
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if 'edit' exists in the current URL
        switch (true) {
          case this.router.url.includes('/edit'):
            this.routeActiveType = 'edit'
            break;
          case this.router.url.includes('/search'):
            this.routeActiveType = 'search'
            break;
          case this.router.url.includes('/feed'):
            this.routeActiveType = 'feed'
            break;
          default:
            this.routeActiveType = 'home'
        }
      }
    })
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe()
    }
  }

}
