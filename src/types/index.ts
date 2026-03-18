export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  description: string;
  longDescription: string;
  category: string;
  tags: string[];
  color: string; // CSS color for placeholder image background
  accentColor: string;
  inStock: boolean;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
