import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { 

  }

  login(username: string, password: string): Observable<any>  {
    return this.http.post<LoginResponse>('http://localhost:8080/autenticacao/login', { username, password }).pipe(
      tap((value) => {
        localStorage.setItem('token', value.token);
      })
    )
  }
}
