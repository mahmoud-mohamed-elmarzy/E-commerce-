import {
  Component,
  computed,
  ElementRef,
  inject,
  PLATFORM_ID,
  QueryList,
  signal,
  ViewChild,
} from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth/serivces/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { BrandService } from '../../core/services/brand.service';
import { CategoryService } from '../../core/services/category.service';
import { WishListService } from '../../core/services/wish-list.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly authService = inject(AuthService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly cartService = inject(CartService);
  private readonly categoryService = inject(CategoryService);
  private readonly wishListService = inject(WishListService);
  private readonly router = inject(Router);
  constructor(private flowbiteService: FlowbiteService) {}
  categories = signal<any[]>([]);
  count = computed(() => this.cartService.cartCount());
  heart = computed(() => this.wishListService.heartCount());
  logged = computed(() => this.authService.islogged());
  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.getCartCount();
      this.getheartCount();
      if (localStorage.getItem('freshToken')) {
        this.authService.islogged.set(true);
        this.getAllCategories();
      }
    }

    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  logOut(): void {
    this.authService.signOut();
  }
  getCartCount(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartService.cartCount.set(res.numOfCartItems);
      },
    });
  }
  getAllCategories(): void {
    this.categoryService.getAllCatgories().subscribe({
      next: (res) => {
        console.log(res);
        this.categories.set(res.data);
      },
    });
  }
  getheartCount(): void {
    this.wishListService.getallWishList().subscribe({
      next: (res) => {
        if (res.status === 'success') {
          console.log(res);
          this.wishListService.heartCount.set(res.data.length);
        }
      },
    });
  }

  goToSearch(val: string) {
    console.log('Input value:', val);
    const query = val.trim();

    if (query) {
      this.router
        .navigate(['/search'], {
          queryParams: { q: query },
        })
        .then((status) => {
          console.log('هل الانتقال نجح؟', status);
        })
        .catch((err) => {
          console.error('فشل الانتقال بسبب:', err);
        });
    }
  }
}
