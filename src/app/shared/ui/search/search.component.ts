import {
  Component,
  ElementRef,
  inject,
  QueryList,
  signal,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Product, Category } from '../../../core/models/product.interface';
import { ProductsService } from '../../../core/services/products.service';
import { CategoryService } from '../../../core/services/category.service';
import { CardComponent } from '../card/card.component';
import { BrandService } from '../../../core/services/brand.service';
import { Brand } from '../../../features/brands/brand.interface';
import { SearchService } from '../../../core/services/search.service';

import { Router, ActivatedRoute } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-search',
  imports: [CardComponent, NgxPaginationModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly searchService = inject(SearchService);
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoryService);
  private readonly brandService = inject(BrandService);
  productList = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  brands = signal<Brand[]>([]);
  isChecked = signal<boolean>(false);
  changes = signal<'grid' | 'list'>('list');
  @ViewChildren('brandCheck') brandInputs!: QueryList<ElementRef>;
  @ViewChildren('catCheck') catInputs!: QueryList<ElementRef>;
  @ViewChild('elmentaside') elmentaside!: ElementRef;
  currentBrand = signal<string>('');
  currentCategory = signal<string>('');
  pageSize = signal<number>(0);
  cp = signal<number>(1);
  total = signal<number>(10);
  private updateUrl(brandId: string | null, catId: string | null): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        brand: brandId || null,
        category: catId || null,
      },
      queryParamsHandling: 'merge',
    });
  }

  onBrandChange(event: any, id: string) {
    this.isChecked.set(event.target.checked);
    this.updateUrl(this.isChecked() ? id : null, this.currentCategory());
  }

  onCategoryChange(event: any, id: string) {
    this.isChecked.set(event.target.checked);
    this.updateUrl(this.currentBrand(), this.isChecked() ? id : null);
  }

  ngOnInit(): void {
    this.getCategories();
    this.getbrands();

    this.route.queryParams.subscribe((params) => {
      const brand = params['brand'] || '';
      const category = params['category'] || '';
      const keyword = params['q'] || '';
      const page = params['page'] || 1;

      this.currentBrand.set(brand);
      this.currentCategory.set(category);
      this.cp.set(Number(page));

      this.loadProducts('', brand, category, keyword, page);
    });
  }

  loadProducts(
    sort: string = '',
    brand: string = '',
    category: string = '',
    keyword: string = '',
    page: number = 1,
  ) {
    this.searchService.getallsearch(sort, brand, category, keyword, page).subscribe({
      next: (res) => {
        this.productList.set(res.data);
        this.total.set(res.results);
        this.pageSize.set(res.metadata.limit);
      },
    });
  }
  clearAllFilters(): void {
    this.router.navigate([], {
      queryParams: { brand: null, category: null, q: null },
      queryParamsHandling: 'merge',
    });

    this.brandInputs?.forEach((input) => (input.nativeElement.checked = false));
    this.catInputs?.forEach((input) => (input.nativeElement.checked = false));
    this.isChecked.set(false);
    this.currentBrand.set('');
    this.currentCategory.set('');

    this.loadProducts();
  }
  getbrands(): void {
    this.brandService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res);
        this.brands.set(res.data);
        this.pageSize.set(res.metadata.limit);
        this.cp.set(res.metadata.currentpage);
        this.total.set(res.results);
      },
    });
  }
  getCategories() {
    this.categoriesService.getAllCatgories().subscribe((res) => {
      console.log(res);
      this.categories.set(res.data);
      this.pageSize.set(res.metadata.limit);
      this.cp.set(res.metadata.currentpage);
      this.total.set(res.results);
    });
  }
  changecolor(mode: 'grid' | 'list'): void {
    this.changes.set(mode);
  }

  pageChange(num: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: num },
      queryParamsHandling: 'merge',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
// داخل الـ Class بتاعك
isFilterOpen = signal<boolean>(false);

changefilter(): void {
  this.isFilterOpen.set(!this.isFilterOpen());
}
}
