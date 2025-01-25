import { AppState } from '../../app.state';

export const cartItems = (state: AppState) => state.cart.items;

/**
 * Selects the total count of items in the cart.
 * @param state The AppState from the store.
 * @returns The total count of items in the cart.
 */
export const cartCountState = (state: AppState) => {
  let cartCount = 0;
  const items = state.cart.items;
  items.map((item) => {
    cartCount += item.quantity;
  });

  return cartCount;
};
