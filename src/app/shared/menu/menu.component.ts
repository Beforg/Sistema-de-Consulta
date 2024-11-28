import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  imgCadastros: string = '/cadastros.png'
  imgConsultas: string = '/consulta.png'
  imgNovoCadastro: string = '/novo-cadastro.png'
  imgGerenciamento: string = '/gerenciamento.png'

}
