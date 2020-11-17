import { Diagram, DiagramAPI, DiagramResponse } from './diagram.model';
import { EMPTY, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {
  headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Authorization', 'Bearer ')

  baseUrl = "http://localhost:8080/connector/api/v2/integrations";

  constructor(private http: HttpClient) { }

  createSketch(diagram: Diagram): Observable<DiagramResponse>{
    const url = `${this.baseUrl}/sketch`
    return this.http.post<DiagramResponse>(url, diagram, {headers: this.headers}).pipe(
      map(obj => obj),
      catchError(e=> this.errorHandler(e))
    );
  }

  read():Observable<DiagramAPI> {
    return this.http.get<DiagramAPI>(this.baseUrl, {params: {engine: "JSON", lastVersion: "true"}, headers: this.headers});
    //return this.http.get<DiagramAPI>(this.baseUrl, {params: {engine: "JSON"}, headers: this.headers});
  }

  readById(id: string):Observable<DiagramResponse> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<DiagramResponse>(url, {headers: this.headers});
  }

  updateSketch(diagram: Diagram): Observable<Diagram> {
    const url = `${this.baseUrl}/sketch/${diagram.id}`
    return this.http.post<Diagram>(url, diagram, {headers: this.headers}).pipe(
      map(obj => obj),
      catchError(e=> this.errorHandler(e))
    );
  }

  publishNewVersion(diagram: Diagram): Observable<Diagram> {
    const url = `${this.baseUrl}/publish/${diagram.id}`
    return this.http.post<Diagram>(url, diagram, {headers: this.headers}).pipe(
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
