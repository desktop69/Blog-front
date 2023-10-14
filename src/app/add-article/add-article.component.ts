import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/Article.model';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {
  articleForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private articleService: ArticleService ) {

   }

  ngOnInit(): void {
    this.articleForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.articleForm.valid) {
      const articleData = this.articleForm.value as Article;
      
      this.articleService.add(articleData).subscribe((response) => {
       // console.log('Article added:', response);
        // redirect to the article
      });
    }
  }

}
