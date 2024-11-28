import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  sair(): void {
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']); 
  }

  isLogado(): boolean {
    return !!localStorage.getItem('token'); 
  }
}