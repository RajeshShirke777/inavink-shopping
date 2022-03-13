import { Product } from 'src/app/shared/models/product';

// cart items
export interface CartItem {
  product: Product;
  quantity: number;
  price?: number;
  shipping?: number;
  minOrder?: number;
  total?: number;
}
