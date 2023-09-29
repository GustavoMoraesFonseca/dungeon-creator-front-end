import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { ResponseModel } from '../model/ResponseModel';

export abstract class BaseService<Model> {
  protected http: HttpClient
  protected snackBar: MatSnackBar

  constructor(
    protected baseURL: string,
    protected injector: Injector,
  ) {
    this.http = injector.get(HttpClient);
    this.snackBar = injector.get(MatSnackBar);
  }

  protected headers = new HttpHeaders({"BaseURL": this.baseURL});

  post(body: Model): Observable<number> {
    return this.http.post<ResponseModel<number>>
    (
      this.baseURL,
      body,
      {
        headers: this.headers
      }
    ).pipe(
      catchError(this.handleError)
    );
  }

  getAll(): Observable<ResponseModel<Model[]>> {
    return this.http.get<ResponseModel<Model[]>>(
      this.baseURL,
      {
        headers: this.headers
      }
    ).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<ResponseModel<Model>> {
    return this.http.get<ResponseModel<Model>>
    (
      `${this.baseURL}/${id}`,
      {
        headers: this.headers
      }
    ).pipe(
      catchError(this.handleError)
    );
  }

  put(body: Model): Observable<ResponseModel<string>> {
    return this.http.put<ResponseModel<string>>
    (
      this.baseURL,
      body,
      {
        headers: this.headers
      }
    ).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<ResponseModel<string>> {
    return this.http.delete<ResponseModel<string>>
    (
      `${this.baseURL}/${id}`
    ).pipe(
      catchError(this.handleError)
    )
  }

  showSnackBar(msg: string, isError: boolean, duration?: number) {
    this.snackBar.open(msg, '', {
      duration: duration == undefined? 4000 : duration,
      panelClass: [isError? 'errorSnackBar' : 'successSnackBar']
    });
  }

  protected handleError(error: any): Observable<any> {
    const statusCode: string = error.status.toString();
    var retorno: Error;

    if (statusCode == '400')
      retorno = new Error(error.error.error);
    else if (statusCode == '404')
      retorno = new Error('Nenhum registro encontrado.');
    else if (statusCode == '409')
      retorno = new Error('Registro já cadastrado.');
    else if (statusCode.startsWith('4'))
      retorno = new Error('Erro do Cliente');
    else if (statusCode.startsWith('5'))
      retorno = new Error('Erro do Servidor');

    return throwError(() => retorno);
  }
}
