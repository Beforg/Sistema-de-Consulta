import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Cliente {
  nome: string;
  cpf: string;
  rg: string;
  endereco: string;
  placaCarro: string;
  dataNascimento: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  listarClientes(): Observable<Cliente[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<Cliente[]>("http://localhost:8080/user/listar", {headers})
  }

  buscarPorFiltro(filtro: string, valor: string): Observable<Cliente> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Cliente>(`http://localhost:8080/user/consultar/${filtro}/${valor}`, { headers });
  }

  cadastrarCliente(nome: string, cpf: string, rg: string, endereco: string, placaCarro: string, dataNascimento: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post('http://localhost:8080/user/cadastrar', {
      nome: nome,
      cpf: cpf,
      rg: rg,
      endereco: endereco,
      placaCarro: placaCarro,
      dataNascimento: dataNascimento
    }, {headers}).pipe(
      tap(response => {
        console.log('Usuário registrado com sucesso', response);
      }),
      map(response => {
        return response;
      })
    );
}

  editar(cliente: Cliente): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put('http://localhost:8080/user/editar', cliente, { headers }).pipe(
      tap(response => {
        console.log('Usuário editado com sucesso', response);
      }),
      map(response => {
        return response;
      })
    );
  }

  excluir(cliente: Cliente): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`http://localhost:8080/user/excluir/${cliente.cpf}`, { headers }).pipe(
      tap(response => {
        console.log('Usuário excluído com sucesso', response);
      }),
      map(response => {
        return response;
      })
    );
  }
}

