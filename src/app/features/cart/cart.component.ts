import { ToastrService } from 'ngx-toastr';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Cart } from './modules/cart.interface';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  cartData = signal<Cart>({
    products: [],
    totalCartPrice: 0,
    _id: '',
    cartOwner: '',
    createdAt: '',
    updatedAt: '',
    __v: 0,
  });
  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.getCartData();
    }
  }
  getCartData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartData.set(res.data);
      },
    });
  }
  removeItem(id: string): void {
    this.cartService.removeProductItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartService.cartCount.set(res.numOfCartItems);
        this.toastrService.success(res.message, 'Route farshCart');
        this.cartData.set(res.data);
      },
    });
  }
  updata(id: string, count: number): void {
    this.cartService.updataCartCount(id, count).subscribe({
      next: (res) => {
        console.log(res);
        this.cartData.set(res.data);
        this.toastrService.success(res.message, 'this is update Sucess Cart');
      },
    });
  }
  clearItems(): void {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartService.cartCount.set(res.numOfCartItems);
        this.cartData.set(res.data);
        this.toastrService.success(res.message, ' clear  All Crad');
      },
    });
  }
}
