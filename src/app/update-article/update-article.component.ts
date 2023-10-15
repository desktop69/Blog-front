import { Component, OnInit } from '@angular/core';
import { Article } from '../models/Article.model';
import { ArticleService } from '../services/article.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/Category.model';
import { MessageService } from 'primeng/api';


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
  categories!: Category[];
  constructor(private services: ArticleService,
    private messageService: MessageService,
    private categoryService: CategoryService,) { }


  ngOnInit(): void {

  }
  loadDataforUpdate(data: Article) {
    this.app_obj = data;


    // console.log("hey from update component child: " + this.app_obj.title);
    this.GetAllCategory();
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
      this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Article Updated successfully' });
    }
    this.closeAllModals()
  }
  updateArticle(id: string, article: Article) {
    this.services.updateArticle(id, article).subscribe(data => {
      // console.log("data updated", data);
    })
  }
  GetAllCategory() {
    this.categoryService.getAll().subscribe((res) => {
      console.log(res);
      this.categories = res;

    })
  }


}
