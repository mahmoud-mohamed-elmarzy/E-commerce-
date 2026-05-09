import {
  Component,
  computed,
  Inject,
  inject,
  Input,
  input,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { Product } from '../../../core/models/product.interface';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart.service';
import { WishListService } from '../../../core/services/wish-list.service';
import { isPlatformBrowser } from '@angular/common';
import { error } from 'console';
@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  private readonly toastrService = inject(ToastrService);
  private readonly cartService = inject(CartService);
  private readonly wishListService = inject(WishListService);
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}
  isLoading = signal<boolean>(false);
  @Input() imagespace: string = '';

  
  addToCart(id: string): void {
    if (localStorage.getItem('freshToken')) {
      this.isLoading.set(true);

      this.cartService.addproductToCard(id).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status === 'success') {
            this.cartService.cartCount.set(res.numOfCartItems);
            this.toastrService.success(res.message, 'freshCart', {
              progressBar: true,
              closeButton: true,
            });
          }
          this.isLoading.set(false);
        },
        error: (err: any) => {
          console.log(err);
          this.isLoading.set(false);
        },
      });
    } else {
      this.toastrService.warning('login first', 'freshCart', {
        progressBar: true,
        closeButton: true,
      });
      this.isLoading.set(false);
    }
  }

  product = input.required<Product>();
  hasDiscount = input<boolean>(false);

  wishlistIds = signal<string[]>([]);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getWishlistData();
    }
  }
  getWishlistData(): void {
    if (localStorage.getItem('freshToken')) {
      this.wishListService.getallWishList().subscribe({
        next: (res) => {
          const ids = res.data.map((item: any) => item._id);
          this.wishlistIds.set(ids);
        },
      });
    }
  }

  addProuductWishList(productId: string): void {
    const token = localStorage.getItem('freshUser');
    if (!token) {
      this.toastrService.warning('Please login first');
      return;
    }

    const isInWishlist = this.wishlistIds().includes(productId);

    if (isInWishlist) {
      this.wishListService.removeProuductWishList(productId).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            this.wishlistIds.set(res.data);
            this.toastrService.error(res.message);
          }
        },
      });
    } else {
      this.wishListService.addProuductWishList(productId).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            console.log(res);
            this.wishlistIds.set(res.data);
            this.wishListService.heartCount.set(res.data.length);
            this.toastrService.success(res.message);
          }
        },
      });
    }
  }
}
