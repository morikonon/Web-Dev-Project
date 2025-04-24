import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private BASE_URL = 'http://127.0.0.1:8000/api/users';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string, password: string }) {
    return this.http.post(`${this.BASE_URL}/login/`, credentials);
  }

  register(data: { username: string, password: string }) {
    return this.http.post(`${this.BASE_URL}/register/`, data);
  }

  logout() {
    localStorage.removeItem('access');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access');
  }
}
