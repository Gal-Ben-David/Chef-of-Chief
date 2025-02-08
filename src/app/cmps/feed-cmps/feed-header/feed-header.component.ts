import { Component, Input } from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { RecipeModel } from '../../../models/recipe.model';

@Component({
  selector: 'feed-header',
  imports: [],
  templateUrl: './feed-header.component.html',
  styleUrl: './feed-header.component.scss'
})
export class FeedHeaderComponent {
  @Input() data!: { user: UserModel | null, recipes: RecipeModel[] }

}
