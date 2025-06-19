import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/core/Models/Order/OrderModel';
import { OrdersService } from 'src/app/core/services/orders/orders.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orders: OrderModel[] = [];
  pagedOrders: OrderModel[] = [];
  loading = false;
  errorMessage = '';

  // Paginación
  currentPage = 1;
  pageSize = 5;
  totalPages = 0;
  pages: number[] = [];

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.loading = true;
    this.ordersService.listOrders().subscribe({
      next: (res) => {
        if (res.success) {
          this.orders = res.data;
          this.setupPagination();
        } else {
          this.errorMessage = 'No se pudieron obtener las órdenes.';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al listar órdenes:', err);
        this.errorMessage = 'Error al comunicarse con el servidor.';
        this.loading = false;
      }
    });
  }

  setupPagination(): void {
    this.totalPages = Math.ceil(this.orders.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.setPage(1);
  }

  setPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;

    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedOrders = this.orders.slice(startIndex, endIndex);
  }
}
