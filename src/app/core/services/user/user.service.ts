import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IinputUser } from '../../interfaces/Iinput-user.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public create(data: IinputUser) {
      return this.http.post(`${environment.url}/enroll`, data)
  }
}
