import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IinputUser } from '../../interfaces/Iinput-user.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { IuserInfo } from '../../interfaces/IuserInfo.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public create(data: IinputUser) {
      return this.http.post(`${environment.url}/enroll`, data)
  }

  public getInfo(): Observable<IuserInfo> {
    const headers = new HttpHeaders({
      'authRequired': 'true'
    })
    return this.http.get<IuserInfo>(`${environment.url}/users`, {
      headers
    })
  }
}
