import { Product } from './../../core/models/product.interface';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { CardComponent } from '../../shared/ui/card/card.component';
import { WishListService } from '../../core/services/wish-list.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detials',
  imports: [CardComponent],
  templateUrl: './detials.component.html',
  styleUrl: './detials.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetialsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishListService = inject(WishListService);
  private readonly toastrService = inject(ToastrService);
  prodcutDetalis = signal<Product>({} as Product);
  quantity = signal<number>(1);
  islouading = signal<boolean>(false);
  activeTab = signal<string>('details');
  ProudectsLikes = signal<Product[]>([]);
  headCount = signal<number>(0);
  filterheader = signal<[]>([]);
  heartBoolean = signal<boolean>(false);
  priceDitalesPluse = computed(() => {
    return this.prodcutDetalis().price * this.quantity();
  });
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((parmas) => {
      this.getproductDetealis(parmas.get('id')!);
    });
    this.getProudectsLike();
  }
  getproductDetealis(id: string): void {
    this.productsService.getSpecificProduct(id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.prodcutDetalis.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  changeQuantityPluse(num: number): void {
    const newQtyPluse = this.quantity() + num;

    if (newQtyPluse >= 1) {
      this.quantity.set(newQtyPluse);
    }
  }
  changeQuantityNative(num: number): void {
    const newQtyNative = this.quantity() - num;
    if (newQtyNative >= 1) {
      this.quantity.set(newQtyNative);
    }
  }

  addToCart(id: string): void {
    this.cartService.addproductToCard(id).subscribe({
      next: (res) => {
        console.log('تمت الإضافة بنجاح', res);
        this.cartService.cartCount.set(res.numOfCartItems);
      },
    });
  }

  changeTab(tab: string) {
    this.activeTab.set(tab);
  }
  getProudectsLike(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.ProudectsLikes.set(res.data);
      },
    });
  }
  isFav = computed(() => this.wishListService.wishlistIds().includes(this.prodcutDetalis()._id));
  addheart(id: string): void {
    this.islouading.set(true);
    if (this.isFav()) {
      this.wishListService.removeProuductWishList(id).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            console.log(res);
            this.wishListService.wishlistIds.set(res.data);
            this.wishListService.heartCount.set(res.data.length);
            this.toastrService.error(res.message);
          }
          this.islouading.set(false);
        },
      });
    } else {
      this.wishListService.addProuductWishList(id).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            this.islouading.set(true);
            console.log(res);
            this.wishListService.wishlistIds.set(res.data);
            this.wishListService.heartCount.set(res.data.length);
            this.toastrService.success(res.message);
          }
          this.islouading.set(false);
        },
      });
    }
  }
}
