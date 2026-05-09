import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../cart/modules/cart.interface';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit{
  private readonly categoryService = inject(CategoryService);
  catgoryList = signal<Category[]>([]);
    ngOnInit(): void {
    this.getcatogryData();
  }
  getcatogryData(): void {
    this.categoryService.getAllCatgories().subscribe({
      next: (res) => {
        this.catgoryList.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
