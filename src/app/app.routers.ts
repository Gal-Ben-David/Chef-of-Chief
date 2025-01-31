import { Routes } from '@angular/router';
import { RecipeIndexComponent } from './pages/recipe-index/recipe-index.component';
import { RecipeEditComponent } from './pages/recipe-edit/recipe-edit.component';
import { recipeResolver } from './resolvers/recipe.resolver';

export const routes: Routes = [
    { path: 'edit', component: RecipeEditComponent },
    {
        path: '', component: RecipeIndexComponent, children: [
            { path: 'edit', component: RecipeEditComponent },
            {
                path: 'edit/:recipeId',
                component: RecipeEditComponent,
                resolve: { recipe: recipeResolver }
            },
        ]
    }
]