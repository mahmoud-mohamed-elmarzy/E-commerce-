import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly httpClient = inject(HttpClient);
  getAllProducts(page: number = 1, categoryId: string | null = null): Observable<any> {
    let url = `${environment.baseUrl}/api/v1/products?page=${page}`;

    if (categoryId) {
      url += `&category[in]=${categoryId}`;
    }

    return this.httpClient.get(url);
  }
  getSpecificProduct(productId: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/products/${productId}`);
  }
  getProductsByBrand(brandId: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/products?brand=${brandId}`);
  }

  getProductsByCategory(id: string): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/api/v1/products?category[in]=${id}`,
    );
  }


}
