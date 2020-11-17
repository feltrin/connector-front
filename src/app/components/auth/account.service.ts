import { Account, AccountAPI } from './account.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  //TOKEN
  .set('Authorization', 'Bearer ')

  baseUrl = "http://localhost:8080/connector/api/v2/accounts";
  //baseUrl =  "http://localhost:3001/authData";

  constructor(private http: HttpClient) { }

  errorHandler(e: any): Observable<any>{
    console.log("OCORREU UM ERRO!")
    console.log(e)
    return EMPTY;
  }

  create(account: Account): Observable<Account>{
    return this.http.post<Account>(this.baseUrl, account, {headers: this.headers}).pipe(
      map(obj => obj),
      catchError(e=> this.errorHandler(e))
    );
  }

  read():Observable<AccountAPI> {
    return this.http.get<AccountAPI>(this.baseUrl, {headers: this.headers});
  }

  readByComponentIdAndType(componentId: string, types: string[]):Observable<AccountAPI> {
    return this.http.get<AccountAPI>(this.baseUrl, 
      {params: {authType: types[0], componentId: componentId}, headers: this.headers
    });
  }

  update(account: Account): Observable<Account> {
    const url = `${this.baseUrl}/${account.id}`
    return this.http.put<Account>(url, account, {headers: this.headers}).pipe(
      map(obj => obj),
      catchError(e=> this.errorHandler(e))
    );
  }

  delete(id: String): Observable<Account> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Account>(url, {headers: this.headers});
  }

  activate(account: Account): Observable<Account> {
    const url = `${this.baseUrl}/${account.id}`;
    let patches = 
      [
        {
          "op": "replace",
          "path": "/active",
          "value": account.active
        }
      ];
    
    return this.http.patch<Account>(url, patches, {headers: this.headers});
  }

}
