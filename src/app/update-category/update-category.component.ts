import { Component, OnInit } from '@angular/core';
import { Category } from '../models/Category.model';
import { CategoryService } from '../services/category.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {

  app_obj!: Category;
  displayModal!: boolean;
  displayPosition!: boolean;
  position!: string;
  constructor(private services: CategoryService, private messageService: MessageService) { }

  ngOnInit(): void {
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
  loadDataforUpdate(data: Category) {
    this.app_obj = data;
    console.log("hey from update component child: " + this.app_obj.name);
    this.showModalDialog();
    // console.log("App Obj Status:", this.app_obj.status);
  }
  updateCategory(id: string, category: Category) {
    this.services.update(id, category).subscribe(data => {
      console.log("data updated", data);
    })
  }

  onSubmit(): void {
    if (this.app_obj && this.app_obj._id) {
      this.updateCategory(this.app_obj._id, this.app_obj);
      this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Category Updated successfully' });
    }
    this.closeAllModals()
  }

}
