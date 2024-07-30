import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../../interfaces/login.interface';
import { environment } from 'src/environments/environment.dev';
import { IloginResponse } from '../../interfaces/Ilogin-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(data: Login): Observable<IloginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    
    return this.http.post<IloginResponse>(environment.url + "/login",
      data,
      {
        headers
      }
    )
  }
}
