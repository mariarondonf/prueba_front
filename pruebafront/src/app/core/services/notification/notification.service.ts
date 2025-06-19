import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private messageSource = new BehaviorSubject<string | null>(null);
  message$ = this.messageSource.asObservable();

  show(message: string) {
    this.messageSource.next(message);
    setTimeout(() => this.clear(), 3000);  // Quita el mensaje después de 3 seg
  }

  clear() {
    this.messageSource.next(null);
  }
}
