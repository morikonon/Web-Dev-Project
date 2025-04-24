export interface Book {
    id: number;
    title: string;
    description: string;
    author: string;
    genre: string;
    publisher: string;
    publication_date: string; 
    age_limit: number;
    price: number;
    stock: number;
    popularity: number;
    image_url: string;
    image?: string; 
  }
  