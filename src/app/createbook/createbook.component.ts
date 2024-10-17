import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from '../services/books.service';
import { Book } from '../interfaces/book';

@Component({
  selector: 'app-createbook',
  templateUrl: './createbook.component.html',
  styleUrls: ['./createbook.component.scss']
})
export class CreateBookComponent {

  newBook!: Book;

  createForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    author: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    isbn: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    publishedDate: new FormControl('', [Validators.required, Validators.maxLength(200)]),
  });

  constructor(private router: Router, private booksService: BooksService) { }

  onSubmit() {

    this.newBook = {
      id: 0,
      title: this.createForm.controls['title'].value as string,
      author: this.createForm.controls['author'].value as string,
      isbn: this.createForm.controls['isbn'].value as string,
      publishedDate: this.createForm.controls['publishedDate'].value as unknown as Date
    };

    this.booksService.createBook(this.newBook).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Book created successfully');
      }
    });

    this.router.navigate(['books']);
  }

  onCancel() {
    this.router.navigate(['books']);
  }
}
