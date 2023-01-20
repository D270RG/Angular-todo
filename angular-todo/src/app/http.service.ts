import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { todoPostForm } from './types';
import { catchError, throwError,retry } from 'rxjs';
@Injectable()
export class HttpService{
    constructor(private http: HttpClient){ }
    private handleError(error: HttpErrorResponse) {
      if (error.status === 0) {
        console.error('An error occurred:', error.error);
      } else {
        console.error(
          `Backend returned code ${error.status}, body was: `, error.error);
      }
      return throwError(() => new Error('Something bad happened; please try again later.'))
    }
    getData(url:string){
      return this.http.get(url)
    }
    postData(url:string,data:todoPostForm|string|undefined){
      return this.http.post(url,data).pipe(
        retry(3), 
        catchError(this.handleError)
      )
    }
}