import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CadastroServiceService {

  private readonly API = 'http://localhost:8080/autenticacao/registrar';

  constructor(private httpClient: HttpClient) { }

  cadastarUsuario(nome: string, username: string, password: string): Observable<any> {
    console.log('Cadastrando usuário', nome, username, password);
    return this.httpClient.post(this.API, { nome, username, password }).pipe(
      tap(response => {
        console.log('Usuário registrado com sucesso', response);
      }),
      map(response => {
        return response;
      }),
      catchError(error => {
        console.error('Erro ao registrar usuário', error);
        return throwError(error);
      })
    );
  }
}