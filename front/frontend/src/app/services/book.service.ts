import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({ providedIn: 'root' })
export class BookService {
  private BASE_URL = 'http://127.0.0.1:8000/api/books';

  constructor(private http: HttpClient) {}

  // Получить все книги
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.BASE_URL}/`);
  }

  // Получить книгу по ID
  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.BASE_URL}/${id}/`);
  }

  // Поиск книг по названию
  searchBooks(query: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.BASE_URL}/?search=${encodeURIComponent(query)}`);
  }

  // Фильтрация книг по жанру, издательству, возрасту и цене
  getFilteredBooks(
    genre: string,
    publisher: string,
    ageLimit: string,
    maxPrice: number | null
  ): Observable<Book[]> {
    let queryParams: string[] = [];
    if (genre) queryParams.push(`genre=${encodeURIComponent(genre)}`);
    if (publisher) queryParams.push(`publisher=${encodeURIComponent(publisher)}`);
    if (ageLimit) queryParams.push(`age_limit=${encodeURIComponent(ageLimit)}`);
    if (maxPrice !== null) queryParams.push(`max_price=${maxPrice}`);

    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
    return this.http.get<Book[]>(`${this.BASE_URL}/${queryString}`);
  }

  // Получить список жанров
  getGenres(): Observable<string[]> {
    return this.http.get<string[]>(`${this.BASE_URL}/genres/choices/`);
  }

  // Получить список издательств
  getPublishers(): Observable<string[]> {
    return this.http.get<string[]>(`${this.BASE_URL}/publishers/choices/`);
  }

  // Получить список возрастных ограничений
  getAgeLimits(): Observable<string[]> {
    return this.http.get<string[]>(`${this.BASE_URL}/age-limits/`);
  }
}
