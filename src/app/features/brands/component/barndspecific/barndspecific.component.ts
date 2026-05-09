import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BrandService } from '../../../../core/services/brand.service';
import { ProductsService } from '../../../../core/services/products.service';
import { Brandpro } from './brandpro.interface';
import { Brand } from '../../brand.interface';
import { CardComponent } from '../../../../shared/ui/card/card.component';

@Component({
  imports: [RouterLink, CardComponent],
  selector: 'app-barndspecific',
  templateUrl: './barndspecific.component.html',
  styleUrl: './barndspecific.component.css',
})
export class BarndspecificComponent {
  private brandService = inject(BrandService);
  private productService = inject(ProductsService);
  private route = inject(ActivatedRoute);

  proudectBrand = signal<Brand>({} as Brand);
  products = signal<Brandpro[]>([]);

  ngOnInit(): void {
    const brandId = this.route.snapshot.paramMap.get('id');

    if (brandId) {
      this.getspecificBrands(brandId);
      this.getProductsByBrand(brandId);
    }
  }

  getspecificBrands(id: string) {
    this.brandService.getspecificBrand(id).subscribe({
      next: (res) => {
        this.proudectBrand.set(res.data);
      },
    });
  }

  getProductsByBrand(id: string) {
    this.productService.getProductsByBrand(id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.products.set(res.data);
      },
    });
  }
}
