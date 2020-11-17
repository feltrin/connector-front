import { ActionAPI, ActionResponse } from './action.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentActionService {
  headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Authorization', 'Bearer ')

  baseUrl = "http://localhost:8080/connector/api/v2/component-actions";

  constructor(private http: HttpClient) { }

  read(componentId: string):Observable<ActionAPI> {
    return this.http.get<ActionAPI>(this.baseUrl, {params: {componentId: componentId}, headers: this.headers});
  }

  readById(id: string):Observable<ActionResponse> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<ActionResponse>(url, {headers: this.headers});
  }

}
