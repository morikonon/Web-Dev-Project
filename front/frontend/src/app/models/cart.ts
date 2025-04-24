import { Book } from './book'

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface Cart {
  id: number;
  created_at: string;
  items: CartItem[];
}
