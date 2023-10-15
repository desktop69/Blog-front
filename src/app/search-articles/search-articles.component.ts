import { Component, OnInit } from '@angular/core';
import { Article } from '../models/Article.model';
import { ArticleService } from '../services/article.service';
import { Category } from '../models/Category.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-search-articles',
  templateUrl: './search-articles.component.html',
  styleUrls: ['./search-articles.component.scss']
})
export class SearchArticlesComponent implements OnInit {
  Articles!: Article[];
  categories!: Category[];
  selectedCategory: string | null = null;

  constructor(private services: ArticleService,
    private categoryService: CategoryService,) { }

  ngOnInit(): void {
  
    this.GetAllCategory();
    this.GetArticleByCategoryId();


  }
  GetArticleByCategoryId() {
    if (this.selectedCategory) {
     // console.log("on change id is ", this.selectedCategory)
      this.services.findByCategory(this.selectedCategory).subscribe(res => {
     //   console.log(res)
        this.Articles = res;
      })
    }

  }
  GetAllCategory() {
    // a placeholder to skeep the first value of the p dropdown
    const placeholderCategory: Category = {
      _id: '',
      name: 'Select a category',
      articles: [] 
    };
    this.categoryService.getAll().subscribe((res) => {
      console.log(res);
      this.categories = [placeholderCategory, ...res];
    })
  }


}
