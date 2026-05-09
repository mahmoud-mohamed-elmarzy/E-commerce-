import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { CardComponent } from '../../shared/ui/card/card.component';
import { Product } from '../../core/models/product.interface';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-shop',
  imports: [CardComponent, NgxPaginationModule, RouterLink],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  productList = signal<Product[]>([]);
  pageSize = signal<number>(0);
  cp = signal<number>(1);
  total = signal<number>(10);

  ngOnInit(): void {
    this.getproductsData();
  }
  getproductsData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.productList.set(res.data);
        this.pageSize.set(res.metadata.limit);
        this.cp.set(res.metadata.currentpage);
        this.total.set(res.results);
      },
    });
  }
  pageChange(num: number): void {
    this.productsService.getAllProducts(num).subscribe({
      next: (res) => {
        console.log(res);
        this.productList.set(res.data);
        this.total.set(res.results);
        this.pageSize.set(res.metadata.limit);
        this.cp.set(num);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    });
  }
}
