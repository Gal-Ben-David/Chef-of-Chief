import { Component, inject } from '@angular/core';
import { RecipeListComponent } from '../../cmps/recipe-list/recipe-list.component';
import { RecipeService } from '../../services/recipe.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs';

@Component({
  selector: 'recipe-index',
  imports: [RecipeListComponent, CommonModule, RouterOutlet],
  templateUrl: './recipe-index.component.html',
  styleUrl: './recipe-index.component.scss'
})
export class RecipeIndexComponent {
  private recipeService = inject(RecipeService)
  private userService = inject(UserService)

  recipes$ = this.recipeService.recipes$
  loggedInUser$ = this.userService.loggedInUser$

  isEditRouteActive = false
  private routeSubscription!: Subscription

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if 'edit' exists in the current URL
        this.isEditRouteActive = this.router.url.includes('/edit')
        console.log('this.isEditRouteActive', this.isEditRouteActive)
      }
    })
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe(); // Unsubscribe
    }
  }

}
