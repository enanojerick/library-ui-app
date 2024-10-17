import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from 'src/app/interfaces/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent implements OnInit {

  updateBook!: Book;
  bookToUpdate!: Book;

  updateForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    author: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    isbn: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    publishedDate: new FormControl('', [Validators.required, Validators.maxLength(200)]),
  });

  constructor(public dialogRef: MatDialogRef<UpdateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Book, private booksService: BooksService) {
    this.bookToUpdate = data;
  }

  ngOnInit() {
    this.updateForm.controls['title'].setValue(this.bookToUpdate.title);
    this.updateForm.controls['author'].setValue(this.bookToUpdate.author);
    this.updateForm.controls['isbn'].setValue(this.bookToUpdate.isbn);
    this.updateForm.controls['publishedDate'].setValue(this.bookToUpdate.publishedDate.toString());
    console.log(this.bookToUpdate);
  }

  onSubmit() {
    this.updateBook = {
      id: this.bookToUpdate.id,
      title: this.updateForm.controls['title'].value as string,
      author: this.updateForm.controls['author'].value as string,
      isbn: this.updateForm.controls['isbn'].value as string,
      publishedDate: this.updateForm.controls['publishedDate'].value as unknown as Date
    };

    this.booksService.updateBook(this.updateBook).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Book updated successfully');
      }
    });

    this.dialogRef.close();
  }
}
