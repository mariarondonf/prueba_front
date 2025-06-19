import { Injectable } from '@angular/core';
import { BaseApiService } from '../base-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseApiService {

  login(credentials: { username: string; password: string }) {
    return this.post<any>('Auth', credentials, false);
  }
}