import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipeIndexComponent } from '../pages/recipe-index/recipe-index.component';
import { AppHeaderComponent } from '../cmps/app-header/app-header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RecipeIndexComponent, AppHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'chef-of-chief';
}
