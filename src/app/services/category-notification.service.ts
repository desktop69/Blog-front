import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryNotificationService {
  private categoryAddedSource = new Subject<void>();
  articleAdded$ = this.categoryAddedSource.asObservable();

  
  notifyCategoryAdded() {
    this.categoryAddedSource.next();
  }
}
