import { Component, OnInit } from '@angular/core';
import { Article } from '../models/Article.model';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.scss']
})
export class UpdateArticleComponent implements OnInit {
  app_obj!: Article;
  displayModal!: boolean;
  displayPosition!: boolean;
  position!: string;
  constructor(private services: ArticleService) { }


  ngOnInit(): void {
  }
  loadDataforUpdate(data: Article) {
    this.app_obj = data;
    console.log("hey from update component child: " + this.app_obj.title);
    this.showModalDialog();
    // console.log("App Obj Status:", this.app_obj.status);
  }
  showModalDialog() {
    this.displayModal = true;
  }
  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }
  closeModal() {
    this.displayModal = false;
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
  onSubmit(): void {
    if (this.app_obj && this.app_obj._id) {
      this.updateArticle(this.app_obj._id, this.app_obj);
    }
    this.closeAllModals()
  }
  updateArticle(id : string, article: Article) {
    this.services.updateArticle(id, article).subscribe(data => {
      console.log("data updated", data);
    })
  }

}
