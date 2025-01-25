import { createReducer, on } from '@ngrx/store';
import { addToCart, removeFromCart } from './cart.action';
import { Product } from '../../../model/product.model';
import { CartItemState, CartState } from '../../app.state';

export const initialState: CartState = { items: [] };

const productAlreadyInCart = (product: Product, cart: CartState) => {
  return cart.items.some((item) => item.id === product.id);
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, props) => {
    console.log('cartReducer', props);

    if (productAlreadyInCart(props.product, state)) {
      console.log('productAlreadyInCart');

      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === props.product.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        }),
      };
    }

    return {
      ...state,
      items: [
        ...state.items,
        { id: props.product.id, item: props.product, quantity: 1 },
      ],
    };
  }),
  on(removeFromCart, (state, props) => {
    return state;
    // return {
    //   ...state,
    //   cart: state.cart.filter((item) => item.id !== props.product.id),
    // };
  })
);
