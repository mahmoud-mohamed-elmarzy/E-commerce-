import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly httpClient = inject(HttpClient);

  getallsearch(
    sort: string = '',
    brand: string = '',
    category: string = '',
    keyword: string = '',
    page: number = 1,
  ): Observable<any> {
    let url = `${environment.baseUrl}/api/v1/products`;
    const params = [];

    if (sort) params.push(`sort=${sort}`);
    if (brand) params.push(`brand=${brand}`);
    if (category) params.push(`category=${category}`);
    if (keyword) params.push(`keyword=${keyword}`);
    if (page) params.push(`page=${page}`);

    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }
    return this.httpClient.get(url);
  }
}
