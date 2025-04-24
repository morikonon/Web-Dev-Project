import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getUserCart().subscribe({
      next: (data: any) => {
        this.cartItems = data.items;
        this.totalPrice = this.cartItems.reduce(
          (total, item) => total + item.book.price * item.quantity,
          0
        );
      },
      error: () => alert('Ошибка при загрузке корзины')
    });
  }
}
