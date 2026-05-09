import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoryService } from '../../../../core/services/category.service';
import { Category } from '../../../../core/models/product.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-category-home',
  imports: [RouterLink],
  templateUrl: './category-home.component.html',
  styleUrl: './category-home.component.css',
})
export class CategoryHomeComponent implements OnInit {
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
