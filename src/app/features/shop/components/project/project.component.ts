import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../../../core/services/products.service';
import { CardComponent } from '../../../../shared/ui/card/card.component';

@Component({
  selector: 'app-project',
  imports: [CardComponent, RouterLink],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
 private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly platformId = inject(PLATFORM_ID);

  NamePage = signal<string>('');
  ImagePage = signal<string>('');
  id = signal<string | null>(null);
  productList = signal<any[]>([]);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id.set(params.get('id'));
        if (this.id()) {
          this.getCategoryProducts();
        }
      },
    });
  }

  getCategoryProducts(): void {
    const currentId = this.id();
    if (!currentId) return;

    this.productsService.getProductsByCategory(currentId).subscribe({
      next: (res) => {
        this.productList.set(res.data);

        if (res.data && res.data.length > 0) {
          this.NamePage.set(res.data[0].category.name);
          this.ImagePage.set(res.data[0].category.image);
        } else {
          this.NamePage.set('All Products');
          this.ImagePage.set('');
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
