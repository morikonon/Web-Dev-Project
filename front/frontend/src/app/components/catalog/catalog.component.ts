import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { Book } from '../../models/book';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  books: Book[] = [];
  genres: string[] = [];
  publishers: string[] = [];
  ageLimits: string[] = [];

  selectedGenre: string = '';
  selectedPublisher: string = '';
  selectedAgeLimit: string = '';
  maxPrice: number | null = null;
  searchQuery: string = '';

  constructor(private bookService: BookService, private cartService: CartService) {}

  ngOnInit(): void {
    this.loadBooks();
    this.bookService.getGenres().subscribe(data => this.genres = data);
    this.bookService.getPublishers().subscribe(data => this.publishers = data);
    this.bookService.getAgeLimits().subscribe(data => this.ageLimits = data);
  }

  loadBooks(): void {
    this.bookService.getFilteredBooks(
      this.selectedGenre,
      this.selectedPublisher,
      this.selectedAgeLimit,
      this.maxPrice
    ).subscribe({
      next: (data: Book[]) => {
        this.books = data;
      },
      error: () => alert('Ошибка при загрузке книг'),
    });
  }

  onFilterChange(): void {
    this.loadBooks();
  }

  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      this.loadBooks();
    } else {
      this.bookService.searchBooks(this.searchQuery).subscribe({
        next: (data: Book[]) => {
          this.books = data;
        },
        error: () => alert('Ошибка при поиске книг'),
      });
    }
  }

  addToCart(bookId: number): void {
    this.cartService.addToCart(bookId, 1).subscribe({
      next: () => alert('Книга добавлена в корзину'),
      error: () => alert('Ошибка при добавлении в корзину'),
    });
  }
}
