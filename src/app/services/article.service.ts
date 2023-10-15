import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../models/Article.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:3000/article';
  constructor(private http: HttpClient) { }

  // Get All articles
  Get(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl)
  }
  GetById(id: string): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }
  // Add a new Article
  add(article: Article): Observable<Article> {
    
    return this.http.post<Article>(this.apiUrl, article)
  }

  remove(id: string): Observable<Article> {
    return this.http.delete<Article>(`${this.apiUrl}/${id}`);
  }
  updateArticle(id: string, article: Article): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/${id}`, article);
  }
  findByCategory(Id: string): Observable<Article[]> {
    const url = `${this.apiUrl}/by-category/${Id}`;
    return this.http.get<Article[]>(url);
  }
}
