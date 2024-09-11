import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProjectCategory } from '../../interfaces/Iproject-category';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  private headers: HttpHeaders = new HttpHeaders({
    'authRequired': 'true'
  })

  public getAll(): Observable<Array<IProjectCategory>> {
    return this.http.get<Array<IProjectCategory>>(`${environment.url}/category`, {headers: this.headers})
  }
}
