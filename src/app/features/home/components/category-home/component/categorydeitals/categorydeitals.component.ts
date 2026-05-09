// categorydeitals.component.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryService } from '../../../../../../core/services/category.service';
import { Category } from '../../../../../../core/models/category.interface';

@Component({
  selector: 'app-categorydeitals',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categorydeitals.component.html',
  styleUrl: './categorydeitals.component.css',
})
export class CategorydeitalsComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _categoryService = inject(CategoryService);

  categoryData = signal<Category>({} as Category);
  subCategoryList = signal<any[]>([]);

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((param) => {
      const id = param.get('id');
      if (id) {
        this.getCategoryDetails(id);
        this.getSubCategories(id);
      }
    });
  }

  getCategoryDetails(id: string): void {
    this._categoryService.getCategoryById(id).subscribe({
      next: (res) => {
        console.log("detalis",res);
        this.categoryData.set(res.data);
      },
    });
  }

  getSubCategories(id: string): void {
    this._categoryService.getSubCategories(id).subscribe({
      next: (res) => {
        console.log('Subcategories:', res.data);
        this.subCategoryList.set(res.data);
      },
    });
  }
}
