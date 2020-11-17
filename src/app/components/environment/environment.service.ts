import { catchError, map } from 'rxjs/operators';
import { Environment, EnvironmentAPI, EnvironmentResponse } from './environment.model';

import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Authorization', 'Bearer ')

  baseUrl = "http://localhost:8080/connector/api/v2/environments";

  constructor(private http: HttpClient) { }

  read(componentId: string, type: string, custom: string):Observable<EnvironmentAPI> {
    return this.http.get<EnvironmentAPI>(this.baseUrl, {params: {componentId: componentId, type: type, custom: custom}, headers: this.headers});
  }

  create(environment: Environment): Observable<EnvironmentResponse>{
    return this.http.post<EnvironmentResponse>(this.baseUrl, environment, {headers: this.headers}).pipe(
      map(obj => obj),
      catchError(e=> this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any>{
    console.log("OCORREU UM ERRO!")
    console.log(e)
    return EMPTY;
  }
  
}
