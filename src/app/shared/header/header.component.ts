import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  signOut: string = '/sign-out.png'
  logo: string = '/logo-icon.png';

  constructor(private auth: AuthService) {

  }

  sair(event: Event): void {
    event.preventDefault();
    this.auth.sair();
  }

}
