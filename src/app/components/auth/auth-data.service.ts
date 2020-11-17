import { Observable } from 'rxjs';
import { Account } from './account.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {

  baseUrl = "http://localhost:3001/authData";

  constructor(private http: HttpClient) { }

  create(authData: Account): Observable<Account>{
    return this.http.post<Account>(this.baseUrl, authData)
  }

  read():Observable<Account[]> {
    return this.http.get<Account[]>(this.baseUrl)
  }

  readById(id: string):Observable<Account> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Account>(url)
  }

  readByComponentIdAndType(componentId: string, types: string[]):Observable<Account[]> {
    return this.http.get<Account[]>(this.baseUrl, {params: {authType: types[0], componentId: componentId}});
  }

  update(authData: Account):Observable<Account> {
    const url = `${this.baseUrl}/${authData.id}`
    return this.http.put<Account>(url, authData)
  }

  delete(id: String): Observable<Account> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Account>(url);
  }


}
