import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/Article.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UpdateArticleComponent } from '../update-article/update-article.component';
import { AddArticleComponent } from '../add-article/add-article.component';
import { ArticleNotificationService } from '../services/article-notification.service';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  Articles!: Article[];
  @ViewChild(UpdateArticleComponent) updateComponent!: UpdateArticleComponent;
  @ViewChild(AddArticleComponent) addComponent!: AddArticleComponent;
  constructor(private services: ArticleService,
    private messageService: MessageService,
    private articleNotificationService: ArticleNotificationService,
    private confirmationService: ConfirmationService
  ) {
    this.articleNotificationService.articleAdded$.subscribe(() => {
      this.GetAllArticle();
    });
  }

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
      }
    })

  }

  openUpdateModal(app_obj: Article) {
    this.updateComponent.loadDataforUpdate(app_obj);
  }
  openAddModal() {
    this.addComponent.showModalDialog();
  }
  OnconfirmForDelete(event: Event, id: string, title: string) {
    this.confirmationService.confirm({
      target: event.target!,
      message: "Are you sure that you want to Delete this Article ?",
      icon: "pi pi-exclamation-triangle",
      acceptButtonStyleClass: "",
      rejectButtonStyleClass: "",
      accept: () => {
        this.OnDeleteArticle(id);
        this.messageService.add({
          severity: "info",
          summary: "Success",
          detail: ("You have successfully deleted  " + title),
        });
      },
      reject: () => {
        this.messageService.add({
          severity: "error",
          summary: "Rejected",
          detail: ("You have rejected Deleting " + title),
        });
      }
    });
  }



}
