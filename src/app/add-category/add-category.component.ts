import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../models/Category.model';
import { CategoryService } from '../services/category.service';
import { CategoryNotificationService } from '../services/category-notification.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  displayModal!: boolean;
  displayPosition!: boolean;
  position!: string;

  constructor(private formBuilder: FormBuilder,
    private Service: CategoryService,
    private categoryService: CategoryService,
    private messageService: MessageService,
    private categoryNotificationService: CategoryNotificationService
  ) {
  }
  onSubmit() {
    if (this.categoryForm.valid) {
      const Data = this.categoryForm.value as Category;
      console.log(" name is blah", Data.name)
      this.Service.add(Data).subscribe((response) => {

        // Notify the ArticlesComponent that an article has been added
        this.categoryNotificationService.notifyCategoryAdded();
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Category added successfully' });

        this.closeAllModals()
      });
    }
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
  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],

    });

  }

}
