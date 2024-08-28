import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { IprojectRegister } from '../../interfaces/IprojectRegister';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  public registerProject(data: IprojectRegister): Observable<any> {
    const headers = new HttpHeaders({
      'authRequired': 'true'
    })
    return this.http.post(environment.url + "/projects", data, {
      headers
    })
  }

}
