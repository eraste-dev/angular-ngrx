import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartState } from './core/store/app.state';
import { cartCountState } from './core/store/slice/cart/cart.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ngrx';

  cartCount = 0;

  constructor(private store: Store<{ cart: CartState }>) {}

  ngOnInit(): void {
    this.store
      .select(cartCountState)
      .subscribe((cartCount) => (this.cartCount = cartCount));
  }
}
