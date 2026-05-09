import { Component, inject, OnInit, signal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/auth/serivces/auth.service';
import { CartItem, Iorders } from './iorders.interface';

@Component({
  selector: 'app-orders',
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly authService = inject(AuthService);
  cardId = signal<string>('');
  ordersList = signal<CartItem[]>([]);
  order = signal<Iorders[]>([]);
  ngOnInit(): void {
    this.authService.saveUserData();

    const id = this.authService.userData()?.id;

    if (id) {
      this.getuserOrders(id);
    }
  }

  getuserOrders(id: string): void {
    this.cartService.getUserOrders(id).subscribe({
      next: (res) => {
        console.log('Orders List:', res);
        this.order.set(res);
        this.ordersList.set(res);
        console.log(this.ordersList());
      },
    });
  }

  expandedOrders = signal<string[]>([]);

  toggleDetails(orderId: string): void {
    const currentExpanded = this.expandedOrders();
    if (currentExpanded.includes(orderId)) {
      this.expandedOrders.set(currentExpanded.filter(id => id !== orderId));
    } else {
      this.expandedOrders.set([...currentExpanded, orderId]);
    }
  }
}
