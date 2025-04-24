import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  username: string = '';

  constructor(public authService: AuthService, private router: Router) {
    this.username = this.getUsernameFromToken();
  }

  getUsernameFromToken(): string {
    const token = localStorage.getItem('access');
    if (!token) return '';
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.username || '';
  }

  logout(): void {
    this.authService.logout();
  }
}
