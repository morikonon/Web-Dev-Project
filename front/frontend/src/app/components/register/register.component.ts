import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.authService.register({ username: this.username, password: this.password })
      .subscribe({
        next: () => {
          alert('Регистрация прошла успешно!');
          this.router.navigate(['/login']);
        },
        error: () => alert('Ошибка при регистрации')
      });
  }
}
