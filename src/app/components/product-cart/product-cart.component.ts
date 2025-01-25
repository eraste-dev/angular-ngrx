import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Product } from '../../core/model/product.model';
import { Store } from '@ngrx/store';
import {
  addToCart,
  removeFromCart,
} from '../../core/store/slice/cart/cart.action';
import { CartItemState, CartState } from '../../core/store/app.state';

@Component({
  selector: 'app-product-cart',
  imports: [],
  template: `
    @if(product) {
    <div class="product-card col-md-4 p-2">
      <div class="card" style="width: 18rem;">
        <img src="https://picsum.photos/200/200" alt="Product Image" />
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <p>Price: $ {{ product.price }}</p>

          @if(isPresentInCart(product)) {
          <button class="btn btn-primary me-4" (click)="increaseQuantity()">
            +
          </button>

          <button class="btn btn-primary" (click)="decreaseQuantity()">
            -
          </button>

          <span>Quantity :{{ quantity() }}</span>
          } @else {

          <button (click)="addToCart()" class="btn btn-primary">
            Add to Cart
          </button>
          }
        </div>
      </div>
    </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ProductCartComponent implements OnInit {
  @Input() product: Product | null = null;

  carts: CartItemState[] = [];

  constructor(
    private cd: ChangeDetectorRef,
    private store: Store<{ cart: CartState }>
  ) {}

  ngOnInit(): void {
    this.store.select('cart').subscribe((cart) => {
      this.carts = cart.items;
    });
  }

  addToCart() {
    this.store.dispatch(addToCart({ product: this.product! }));
  }

  increaseQuantity() {
    console.log('increaseQuantity', this.product);
    this.addToCart();
  }

  decreaseQuantity() {
    console.log('decreaseQuantity', this.product);
  }

  removeFromCart() {
    if (this.product) {
      this.store.dispatch(removeFromCart());
    }
  }

  isPresentInCart(product: Product) {
    return this.carts.some((item) => item.id === product.id);
  }

  quantity() {
    if (!this.product) {
      return 0;
    }

    return (
      this.carts.find((item) => item.id === (this.product!.id ?? 0))
        ?.quantity || 0
    );
  }
}
