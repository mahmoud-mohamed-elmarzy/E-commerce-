import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoryService } from '../../../../core/services/category.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardComponent } from '../../../../shared/ui/card/card.component';
import { SubProductCatogry } from '../../../../core/models/sub-product-catogry.interface';

@Component({
  selector: 'app-product-sub-catgory',
  imports: [RouterLink, CardComponent],
  templateUrl: './product-sub-catgory.component.html',
  styleUrl: './product-sub-catgory.component.css',
})
export class ProductSubCatgoryComponent implements OnInit {
  private readonly categoryService = inject(CategoryService);
  private readonly activatedRoute = inject(ActivatedRoute);

  productId = signal<string>('');
  productList = signal<SubProductCatogry[]>([]);
  NameAddress = signal<string>('');
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.productId.set(id);
      this.getsubproduct();
    }
  }

  getsubproduct(): void {
    this.categoryService.getSubCatogry(this.productId()).subscribe({
      next: (res) => {
        console.log('Subcategories Data:', res);
        this.productList.set(res.data);
        if (res.data && res.data.length > 0) {
          const firstProduct = res.data[0];
          if (firstProduct.subcategory && firstProduct.subcategory.length > 0) {
            this.NameAddress.set(firstProduct.subcategory[0].name);
          }
        }
      },
      error: (err) => {
        console.error('Error fetching subcategories:', err);
      },
    });
  }
}
