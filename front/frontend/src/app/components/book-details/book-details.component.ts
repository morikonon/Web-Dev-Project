import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  book: any = null;
  cartId: number = 1; 

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.bookService.getBook(id).subscribe({
      next: (data: any) => {
        this.book = data;
      },
      error: () => alert('Ошибка при загрузке книги'),
    });
    
  }

  addToCart(): void {
    if (this.book) {
      this.cartService.addToCart(this.cartId, this.book.id).subscribe({
        next: () => alert('Книга добавлена в корзину'),
        error: () => alert('Ошибка при добавлении в корзину')
      });
    }
  }
}
