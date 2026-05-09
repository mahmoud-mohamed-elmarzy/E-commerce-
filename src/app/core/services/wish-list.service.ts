import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  private readonly httpClient = inject(HttpClient);
  heartCount = signal<number>(0);
  wishlistIds = signal<string[]>([]);

  addProuductWishList(productId: string): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/api/v1/wishlist`, { productId: productId });
  }

  removeProuductWishList(dataId: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `/api/v1/wishlist/${dataId}`);
  }

  getallWishList(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/wishlist`);
  }
}
