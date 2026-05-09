import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { Product } from '../../../../core/models/product.interface';

import { CardComponent } from '../../../../shared/ui/card/card.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-product',
  imports: [CardComponent, NgxPaginationModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  pageSize = signal<number>(0);
  cp = signal<number>(1);
  total = signal<number>(10);
  productList = signal<Product[]>([]);
  ngOnInit(): void {
    this.getProducteData();
  }
  getProducteData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
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
