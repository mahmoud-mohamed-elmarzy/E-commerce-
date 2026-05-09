import { Component, inject, OnInit, signal } from '@angular/core';
import { BrandService } from '../../core/services/brand.service';
import { Brand } from './brand.interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  private readonly brandService = inject(BrandService);
  private readonly router = inject(Router);

  barndList = signal<Brand[]>([]);
  ngOnInit(): void {
    this.getAllBrandData();
  }

  goToDetails(id: string): void {
      console.log("ID:", id);
    this.router.navigate(['/brandspecific', id]);
  }
  getAllBrandData(): void {
    this.brandService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res);
        this.barndList.set(res.data);
      },
    });
  }
}
