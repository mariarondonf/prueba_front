import { Injectable } from '@angular/core';
import { BaseApiService } from '../base-api.service';
import { OrderModel, SaveOrderModel } from '../../Models/Order/OrderModel';

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends BaseApiService {

  listOrders() {
    return this.get<{ success: boolean; data: OrderModel[] }>('ListOrders');
  }

  createOrder(order: SaveOrderModel) {
    return this.post<{ success: boolean; data: number }>('CreateOrder', order);
  }

  updateOrder(order: OrderModel) {
    return this.put<{ success: boolean; data: boolean }>('UpdateOrder', order);
  }
}
