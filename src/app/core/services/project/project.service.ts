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

  public registerProject(data: IprojectRegister): Observable<Iproject> {
    const headers = new HttpHeaders({
      'authRequired': 'true'
    })
    return this.http.post<Iproject>(environment.url + "/projects", data, {
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

  public getAllUserProjectsByCategory(id: number, category: string, page: number = 0, size: number = 10): Observable<IPageResponse<Iproject>> {
    const headers = new HttpHeaders({
      'authRequired': 'true'
    })

    const params = new HttpParams()
      .set('id', id)
      .set('category', category)
      .set('page', page)
      .set('size', size)

    return this.http.get<IPageResponse<Iproject>>(`${environment.url}/projects/search`,
      {
        headers,
        params
      },
    )
  }

  public editProject(project: Iproject): Observable<Iproject> {
    const headers = new HttpHeaders({
      'authRequired': 'true'
    })

    return this.http.patch<Iproject>(`${environment.url}/projects`, project,
      {
        headers
      },
    )
  }

  public deleteProject(id: number): Observable<void> {
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
