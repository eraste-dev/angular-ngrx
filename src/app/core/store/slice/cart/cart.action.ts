import { createAction, props } from '@ngrx/store';
import { Product } from '../../../model/product.model';

export const addToCart = createAction(
  '[Cart] Add to cart',
  props<{ product: Product }>()
);

export const removeFromCart = createAction('[Cart] Remove from cart');
