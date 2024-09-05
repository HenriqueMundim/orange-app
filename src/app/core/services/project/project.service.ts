import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { IprojectRegister } from '../../interfaces/IprojectRegister';
import { Iproject } from '../../interfaces/Iproject';
import { IPageResponse } from '../../interfaces/IPageResponse';

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

  public getAllUserProjects(id: number, page: number = 0, size: number = 10): Observable<IPageResponse<Iproject>> {
    const headers = new HttpHeaders({
      'authRequired': 'true'
    })

    const params = new HttpParams()
      .set('id', id)
      .set('page', page)
      .set('size', size)

    return this.http.get<IPageResponse<Iproject>>(`${environment.url}/projects`,
      {
        headers,
        params
      },
    )
  }

  public deleteProject(id: number) {
    const headers = new HttpHeaders({
      'authRequired': 'true'
    })

    return this.http.delete<void>(`${environment.url}/projects/${id}`,
      {
        headers
      }
    )
  }
}
