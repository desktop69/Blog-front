import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/Article.model';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/Category.model';
import { ArticleNotificationService } from '../services/article-notification.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {
  articleForm!: FormGroup;
  categories!: Category[];
  displayModal!: boolean;
  displayPosition!: boolean;
  position!: string;
  constructor(private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private articleNotificationService: ArticleNotificationService) {
  }
  GetAllCategory() {
    this.categoryService.getAll().subscribe((res) => {
      console.log(res);
      this.categories = res;
    })
  }

  onSubmit() {
    if (this.articleForm.valid) {
      const articleData = this.articleForm.value as Article;

      this.articleService.add(articleData).subscribe((response) => {
       
        // Notify the ArticlesComponent that an article has been added
        this.articleNotificationService.notifyArticleAdded();
        // redirect to the article
        this.closeAllModals()
      });
    }
  }
  ngOnInit(): void {
    this.articleForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      category: [''] // Initializing
    });
    this.GetAllCategory();
  }
  showModalDialog() {
    this.displayModal = true;
  }
  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }
  closeModal() {
    //  this.displayModal = false;
    this.showPositionDialog('bottom');
  }
  closeButtomModal() {
    this.displayPosition = false;
    this.showPositionDialog('bottom');
  }
  closeAllModals() {
    this.displayModal = false
    this.displayPosition = false;
  }

}
