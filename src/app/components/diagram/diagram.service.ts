import { Diagram } from './diagram.model';
import { catchError, map } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiagramService {

  baseUrl =  "http://localhost:3001/diagrams";

  constructor(private http: HttpClient) { }

  create(diagram: Diagram): Observable<Diagram>{
    return this.http.post<Diagram>(this.baseUrl, diagram).pipe(
      map(obj => obj),
      catchError(e=> this.errorHandler(e))
    );
  }

  read():Observable<Diagram[]> {
    return this.http.get<Diagram[]>(this.baseUrl);
  }

  readById(id: string):Observable<Diagram> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Diagram>(url);
  }

  update(diagram: Diagram): Observable<Account> {
    const url = `${this.baseUrl}/${diagram.id}`
    return this.http.put<Account>(url, diagram).pipe(
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
