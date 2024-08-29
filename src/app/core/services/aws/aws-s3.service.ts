import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';
import { IloginResponse } from '../../interfaces/Ilogin-response.interface';
import { Observable } from 'rxjs';
import { IprojectRegister } from '../../interfaces/IprojectRegister';
import { IpreSignedUrl } from '../../interfaces/IpreSignedUrl';

@Injectable({
  providedIn: 'root'
})
export class AwsS3Service {

  constructor(private http: HttpClient) {}

  public getPresignedUrl(file: File, objectKey: string): Observable<IpreSignedUrl> {
    const headers = new HttpHeaders({
      'authRequired': 'true'
    })

    return this.http.get<IpreSignedUrl>(`${environment.url}/aws/getpresignedurl/upload`, {
      headers,
      params: {
        objectKey: objectKey
      }
    })
  }

  public uploadFile(url: string, file: File) {
    return this.http.put(url, file);
  }
}
