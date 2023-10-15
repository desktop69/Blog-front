import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { CategoryComponent } from './category/category.component';
import { SearchArticlesComponent } from './search-articles/search-articles.component';

const routes: Routes = [
  {
    path: 'article', component: ArticlesComponent,
  },
  {
    path: 'category', component: CategoryComponent,
  },
  {
    path: 'search', component: SearchArticlesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
