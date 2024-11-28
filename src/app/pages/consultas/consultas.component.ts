import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { MenuComponent } from "../../shared/menu/menu.component";
import { TextfieldComponent } from "../../shared/textfield/textfield.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../shared/button/button.component";
import { Cliente, ClienteService } from '../../services/cliente.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [HeaderComponent, MenuComponent, TextfieldComponent, CommonModule, ReactiveFormsModule, 
    ButtonComponent],
  providers: [ClienteService],
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.css'
})
export class ConsultasComponent {
  formularioDePesquisa: FormGroup;
  resultadoCliente?: Cliente;
  found: boolean = false;
  mascara: string = '';
  constructor(private fb: FormBuilder, private http: ClienteService, private toastr: ToastrService) {
    this.formularioDePesquisa = this.fb.group({
      filtro: [''],
      valor: ['']
    });
  }

  atualizaMascara() : void {
    const filtro = this.formularioDePesquisa.value.filtro;
    if (filtro === 'cpf') {
      this.formularioDePesquisa.get('valor')?.setValidators([Validators.required, Validators.minLength(11), Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]);
      this.mascara = '000.000.000-00';
    } else if (filtro === 'rg') {
      this.formularioDePesquisa.get('valor')?.setValidators([Validators.required, Validators.minLength(9), Validators.pattern(/^\d{2}\.\d{3}\.\d{3}-\d{2}$/)]);
      this.mascara = '00.000.000-00';
    } else {
      this.formularioDePesquisa.get('valor')?.setValidators([Validators.required]);
      this.mascara = '';
  }
  }
  buscarClientePorFiltro() : void {
    const filtro = this.formularioDePesquisa.value.filtro;
    const valor = this.formularioDePesquisa.value.valor;

    if (filtro && valor) {
      this.http.buscarPorFiltro(filtro, valor).subscribe({
        next: (data) => {
          this.resultadoCliente = data;
          this.found = true;
        },
        error: (error) => {
          this.toastr.error('Nenhum cliente encontrado');
          console.error('Erro ao buscar cliente:', error);
        }
      });
    } else {
      this.toastr.error('Preencha os campos corretamente');
    }
  }
}
