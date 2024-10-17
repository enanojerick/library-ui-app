import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  headers : HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('X-API-KEY', 'gF31Jt9Uxw4oG6XIeiWkReKKD0wmmKstAmDkbUWH7CL8SkpIpZZMIA9SY2UG80BQ');
  }


  getBooks() {
    return this.http.get<Book>('https://localhost:7280/books', { headers : this.headers });
  }

  getBook(id: number) {
    return this.http.get<Book>('https://localhost:7280/book/' + id, { headers : this.headers });
  }

  createBook(newBook: Book) {
    return this.http.post<Book>('https://localhost:7280/book', newBook, { headers : this.headers });
  }

  updateBook(updateBook: Book) {
    return this.http.put<Book>('https://localhost:7280/book/' + updateBook.id, updateBook, { headers : this.headers });
  }
}
