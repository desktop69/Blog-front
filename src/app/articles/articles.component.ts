import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/Article.model';
import { MessageService } from 'primeng/api';
import { UpdateArticleComponent } from '../update-article/update-article.component';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  Articles!: Article[];
  @ViewChild(UpdateArticleComponent) updateComponent!: UpdateArticleComponent;
  constructor(private services: ArticleService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.GetAllArticle();
    
  }
  GetAllArticle() {
    this.services.Get().subscribe(res => {
      console.log(res);
      this.Articles = res;
    })
  }
  OnDeleteArticle(id: string) {
    this.services.remove(id).subscribe(res => {
      console.log("delete", res);
      if (res) {
        this.GetAllArticle();
           this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Image deleted successfully', life: 3000 });
      } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Deleting  image', life: 3000 });
      }
    })

  }

  openUpdateModal(app_obj :Article) {
    this.updateComponent.loadDataforUpdate(app_obj);
  }


}
