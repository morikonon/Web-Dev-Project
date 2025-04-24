import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private BASE_URL = 'http://127.0.0.1:8000/api/orders';

  constructor(private http: HttpClient) {}

  getUserOrders() {
    return this.http.get(`${this.BASE_URL}/user/`);
  }

  createOrder(data: any) {
    return this.http.post(`${this.BASE_URL}/`, data);
  }
}
