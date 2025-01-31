import { Routes } from '@angular/router';
import { RecipeIndexComponent } from './pages/recipe-index/recipe-index.component';
import { RecipeEditComponent } from './pages/recipe-edit/recipe-edit.component';

export const routes: Routes = [
    { path: '', component: RecipeIndexComponent },
    { path: 'edit', component: RecipeEditComponent },
]