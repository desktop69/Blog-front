import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleNotificationService {
  
  private articleAddedSource = new Subject<void>();
  articleAdded$ = this.articleAddedSource.asObservable();

  
  notifyArticleAdded() {
    this.articleAddedSource.next();
  }
}
