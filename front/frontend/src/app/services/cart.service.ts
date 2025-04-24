import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CartService {
  private BASE_URL = 'http://127.0.0.1:8000/api/orders';

  constructor(private http: HttpClient) {}

  getUserCart() {
    return this.http.get(`${this.BASE_URL}/user_cart/`);
  }

  addToCart(bookId: number, quantity: number = 1) {
    return this.http.post(`${this.BASE_URL}/add-to-cart/`, {
      book_id: bookId,
      quantity: quantity
    });
  }
}
