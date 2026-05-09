import { jwtDecode } from 'jwt-decode';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  islogged = signal<boolean>(false);
  userData = signal<any>(null);

  saveUserData(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      const token = localStorage.getItem('freshToken');
      if (token !== null) {
        try {
          this.userData.set(jwtDecode(token));
        } catch (error) {
          console.error('Invalid Token:', error);
        }
      }
    }
  }
  signOut(): void {
    localStorage.removeItem('freshToken');
    this.islogged.set(false);
    this.router.navigate(['/login']);
  }
  signUp(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/api/v1/auth/signup`, data);
  }
  signIp(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/api/v1/auth/signin`, data);
  }
  forgotPassword(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/api/v1/auth/forgotPasswords`, data);
  }
  verifyCode(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/api/v1/auth/verifyResetCode`, data);
  }
  resetPassword(data: object): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `/api/v1/auth/resetPassword`, data);
  }
}
