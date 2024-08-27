import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class AwsS3Service {

  constructor(private http: HttpClient) {}

  public uploadFile(file: File) {
    const headers = new HttpHeaders({
      'authRequired': 'true'
    })

    return this.http.get<{url: string}>(`${environment.url}/aws/getpresignedurl/upload`, {
      headers,
      params: {
        objectKey: file.name
      }
    }).subscribe({
      next: (respose) => {
        const obj = respose
        fetch(obj.url, {
          method: 'PUT',
          body: file
        }).then(res => console.log(res)).catch(err => console.log(err))
      }
    })

  }
}
