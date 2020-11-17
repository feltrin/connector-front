import { AuthModelAPI, AuthModel } from './authModel.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthModelService {

  headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  //add token
  .set('Authorization', 'Bearer ')
  
  //baseUrl =  "http://localhost:3001/authModel";
  baseUrl =  "http://localhost:8080/connector/api/v2/auth-models";

  constructor(private http: HttpClient) { }

  read():Observable<AuthModelAPI> {
    return this.http.get<AuthModelAPI>(this.baseUrl, {headers: this.headers});
  }

  readById(id: string):Observable<AuthModelAPI> {
    return this.http.get<AuthModelAPI>(this.baseUrl, {params: {"id": id}, headers: this.headers});
  }

  readByType(types: string[]):Observable<AuthModelAPI> {
    return this.http.get<AuthModelAPI>(this.baseUrl, {params: {"authType": types[0]}, headers: this.headers});
  }

}
