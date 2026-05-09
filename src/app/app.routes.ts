import { BarndspecificComponent } from './features/brands/component/barndspecific/barndspecific.component';
import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth-guard';
import path from 'node:path';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'home page',
  },
  {
    path: 'brands',
    loadComponent: () =>
      import('./features/brands/brands.component').then((m) => m.BrandsComponent),
    title: 'brands page',
  },
  {
    path: 'brandspecific/:id',
    loadComponent: () =>
      import('./features/brands/component/barndspecific/barndspecific.component').then(
        (m) => m.BarndspecificComponent,
      ),
    title: 'brands page',
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart.component').then((m) => m.CartComponent),
    title: 'cart page',
    canActivate: [authGuard],
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./features/categories/categories.component').then((m) => m.CategoriesComponent),
    title: 'categories page',
  },
  {
    path: 'checkout/:id',
    loadComponent: () =>
      import('./features/checkout/checkout.component').then((m) => m.CheckoutComponent),
    title: 'checkout page',
    canActivate: [authGuard],
  },
  {
    path: 'detials/:id/:slug',
    loadComponent: () =>
      import('./features/detials/detials.component').then((m) => m.DetialsComponent),
    title: 'detials page',
  },
  {
    path: 'forgot',
    loadComponent: () =>
      import('./features/forgot/forgot.component').then((m) => m.ForgotComponent),
    title: 'forgot page',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then((m) => m.LoginComponent),
    title: 'login page',
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./shared/ui/search/search.component').then((m) => m.SearchComponent),
    title: 'search page',
    canActivate: [authGuard],
  },
  {
    path: 'allorders',
    loadComponent: () =>
      import('./features/orders/orders.component').then((m) => m.OrdersComponent),
    title: 'orders page',
    canActivate: [authGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/register/register.component').then((m) => m.RegisterComponent),
    title: 'register page',
  },
  {
    path: 'shop',
    loadComponent: () => import('./features/shop/shop.component').then((m) => m.ShopComponent),
    title: 'shop page',
  },
  {
    path: 'productSubCatgory/:id',
    loadComponent: () =>
      import('./features/shop/components/product-sub-catgory/product-sub-catgory.component').then(
        (m) => m.ProductSubCatgoryComponent,
      ),
    title: 'productSubCatgory page',
  },
  {
    path: 'project/:id',
    loadComponent: () =>
      import('./features/shop/components/project/project.component').then(
        (m) => m.ProjectComponent,
      ),
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./features/wishlist/wishlist.component').then((m) => m.WishlistComponent),
    title: 'wishlist page',
    canActivate: [authGuard],
  },
  {
    path: 'categorydeitales/:id/:slug',
    loadComponent: () =>
      import('./features/home/components/category-home/component/categorydeitals/categorydeitals.component').then(
        (m) => m.CategorydeitalsComponent,
      ),
    title: 'categories page',
  },
  {
    path: 'support',
    loadComponent: () =>
      import('./features/support/support.component').then((m) => m.SupportComponent),
    title: 'Support page',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/notfound/notfound.component').then((m) => m.NotfoundComponent),
    title: 'notfound page',
  },
];
