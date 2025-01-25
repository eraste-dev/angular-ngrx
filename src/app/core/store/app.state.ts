import { Product } from '../model/product.model';

export interface CartItemState {
  id: number;
  item: Product;
  quantity: number;
}

export interface CartState {
  items: CartItemState[];
}

export interface AppState {
  cart: CartState;
}
