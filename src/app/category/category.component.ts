import { Component, OnInit, ViewChild } from '@angular/core';
import { UpdateCategoryComponent } from '../update-category/update-category.component';
import { Category } from '../models/Category.model';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { CategoryService } from '../services/category.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryNotificationService } from '../services/category-notification.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories!: Category[];
  @ViewChild(UpdateCategoryComponent) updateComponent!: UpdateCategoryComponent;
  @ViewChild(AddCategoryComponent) addComponent!: AddCategoryComponent;
  constructor(private services: CategoryService,
    private messageService: MessageService,
    private categoryNotificationService: CategoryNotificationService,
    private confirmationService: ConfirmationService
  ) {
    this.categoryNotificationService.articleAdded$.subscribe(() => {
      this.GetAllCategory();
    });
  }
  ngOnInit(): void {
    this.GetAllCategory();
  }
  GetAllCategory() {
    this.services.getAll().subscribe(res => {
      console.log(res);
      this.categories = res;
    })
  }
  OnDeletecategory(id: string) {
    this.services.delete(id).subscribe(res => {
      console.log("delete", res);
      if (res) {
        this.GetAllCategory();
      }
    })

  }
  openUpdateModal(app_obj: Category) {
    this.updateComponent.loadDataforUpdate(app_obj);
  }
  openAddModal() {
    this.addComponent.showModalDialog();
  }
  OnconfirmForDelete(event: Event, id: string, name: string) {
    this.confirmationService.confirm({
      target: event.target!,
      message: "Are you sure that you want to Delete this Article ?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.OnDeletecategory(id);
        this.messageService.add({
          severity: "info",
          summary: "Success",
          detail: ("You have successfully deleted  " + name),
        });
      },
      reject: () => {
        this.messageService.add({
          severity: "error",
          summary: "Rejected",
          detail: ("You have rejected Deleting " + name),
        });
      }
    });
  }
}
