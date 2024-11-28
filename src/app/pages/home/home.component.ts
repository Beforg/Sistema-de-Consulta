import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { MenuComponent } from "../../shared/menu/menu.component";
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../services/cliente.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

interface FormularioEdicao {
  nome: FormControl;
  cpf: FormControl;
  rg: FormControl;
  endereco: FormControl;
  placaCarro: FormControl;
  dataNascimento: FormControl;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, MenuComponent, CommonModule, ReactiveFormsModule],
  providers: [ClienteService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  clientes: Cliente[] = [];
  icoEditar: string ='/editar.png';
  icoExcluir: string = '/excluir.png';
  formularioDeEdicao?: FormGroup<FormularioEdicao>;
  edicaoAberta: boolean = false;
  clienteSelecionado?: Cliente;

  constructor(private http: ClienteService, private toastr: ToastrService) {
    this.formularioDeEdicao = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      cpf: new FormControl('', [Validators.required, Validators.minLength(11), Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]),
      rg: new FormControl('', [Validators.required, Validators.minLength(9), Validators.pattern(/^\d{2}\.\d{3}\.\d{3}-\d{2}$/)]),
      endereco: new FormControl('', [Validators.required, Validators.minLength(3)]),
      placaCarro: new FormControl('', [Validators.required, Validators.minLength(7)]),
      dataNascimento: new FormControl('', [Validators.required])
    });
  }
  ngOnInit(): void {
    this.http.listarClientes().subscribe((data: Cliente[]) => {
      data.forEach(cliente => {
        cliente.dataNascimento = new Date(cliente.dataNascimento).toLocaleDateString('pt-BR');
      });
    this.clientes = data;
    })
  }

  excluirCliente(cliente: Cliente) : void {
    this.http.excluir(cliente).subscribe(() => {
      this.clientes = this.clientes.filter(c => c !== cliente);
    });
  }

}
