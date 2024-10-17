import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BooksService } from '../services/books.service';
import { Book } from '../interfaces/book';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDialogComponent } from '../dialogs/update-dialog/update-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-contacts',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  booksArray: any = [];

  dataSource = new MatTableDataSource<Book>();

  columnsToDisplay = ['Title', 'Author', 'Isbn', 'PublishedDate', 'Update'];

  constructor(private booksService: BooksService, private dialog: MatDialog) { }

  ngOnInit() {
    this.updateDataSource();
  }

  onUpdate(book: Book) {
    let dialogRef = this.dialog.open(UpdateDialogComponent, {
      height: '500px',
      width: '500px',
      data: book,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateDataSource();
    });
  }

  updateDataSource() {
    this.booksService.getBooks().subscribe({
      next: (data) => {
        console.log(data);
        this.booksArray = data;
        this.dataSource = new MatTableDataSource<Book>(this.booksArray);
        console.log("this.dataSource: ", this.dataSource);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Data loaded successfully');
      }
    });
  }
}
