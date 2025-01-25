import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { Product } from '../core/model/product.model';

@Component({
  selector: 'app-product',
  imports: [ProductCartComponent],
  template: `
    <div class="d-flex justify-content-center flex-column my-4">
      <h1>Product List</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ad totam
        consectetur ea maiores enim numquam aspernatur, molestias doloribus
        laudantium vel? Quidem dicta recusandae, est fuga iure deserunt tempore
        cupiditate.
      </p>
    </div>

    <div class=" d-flex" style="width: 100%; bground-color: #ccc">
      @for (item of products; track $index) {
      <app-product-cart [product]="item"></app-product-cart>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.products = [
      { id: 1, name: 'Product 1', price: 10 },
      { id: 2, name: 'Product 2', price: 20 },
      { id: 3, name: 'Product 3', price: 30 },
    ];
    this.cd.detectChanges();
  }
}
