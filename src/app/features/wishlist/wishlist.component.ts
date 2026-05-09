import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { WishListService } from '../../core/services/wish-list.service';
import { Product } from '../cart/modules/cart.interface';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  private readonly wishListService = inject(WishListService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);
  productWishList = signal<Product[]>([]);
  cartIds = signal<string[]>([]);
  isLoggedIn = signal<boolean>(false);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('freshUser');
      if (token) {
        this.isLoggedIn.set(true);
        this.getAllProductWishList();
        this.getLoggedUserCart();
      }
    }
  }
  getLoggedUserCart(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        const ids = res.data.products.map((item: any) => item.product._id);
        this.cartIds.set(ids);
      },
      error: (err) => console.log(err),
    });
  }

  getAllProductWishList(): void {
    this.wishListService.getallWishList().subscribe({
      next: (res) => {
        console.log(res.data);
        this.productWishList.set(res.data);
      },
    });
  }
  removeWish(id: string): void {
    this.wishListService.removeProuductWishList(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.productWishList.update((oldWishlist) =>
            oldWishlist.filter((item) => item._id !== id),
          );

          this.wishListService.heartCount.set(res.data.length);
          this.toastrService.success(res.message);
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  addToCart(id: string): void {
    this.cartService.addproductToCard(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.cartService.cartCount.set(res.numOfCartItems);

          this.cartIds.update((oldIds) => [...oldIds, id]);

          this.toastrService.success(res.message);
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
