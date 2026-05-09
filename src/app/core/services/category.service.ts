import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly httpClient = inject(HttpClient);
  getAllCatgories(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/categories`);
  }
  getCategoryById(id: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/categories/${id}`);
  }
  getSubCategories(id: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/categories/${id}/subcategories`);
  }
  getSubCatogry(id: string): Observable<any> {
    return this.httpClient.get(
      `https://ecommerce.routemisr.com/api/v1/products?subcategory=${id}`,
    );
  }
}
