import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextfieldComponent } from "../../shared/textfield/textfield.component";
import { HeaderComponent } from "../../shared/header/header.component";
import { MenuComponent } from "../../shared/menu/menu.component";
import { ButtonComponent } from "../../shared/button/button.component";
import { ClienteService } from '../../services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';

interface CadastrarClienteForm {
  nome: FormControl;
  cpf: FormControl;
  rg: FormControl;
  endereco: FormControl;
  placaCarro: FormControl;
  dataNascimento: FormControl;
}

@Component({
  selector: 'app-cadastrar-cliente',
  standalone: true,
  imports: [TextfieldComponent, HeaderComponent, MenuComponent, ButtonComponent, 
    ReactiveFormsModule, CommonModule],
  providers: [ClienteService],
  templateUrl: './cadastrar-cliente.component.html',
  styleUrl: './cadastrar-cliente.component.css'
})
export class CadastrarClienteComponent {
  formularioDeCadastro! : FormGroup<CadastrarClienteForm>;

  constructor(private http: ClienteService, private toastr: ToastrService) {
    this.formularioDeCadastro = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      cpf: new FormControl('', [Validators.required, Validators.minLength(11), Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]),
      rg: new FormControl('', [Validators.required, Validators.minLength(9), Validators.pattern(/^\d{2}\.\d{3}\.\d{3}-\d{2}$/)]),
      endereco: new FormControl('', [Validators.required, Validators.minLength(3)]),
      placaCarro: new FormControl('', [Validators.required, Validators.minLength(7)]),
      dataNascimento: new FormControl('', [Validators.required])
    });
  }


  cadastrarCliente() : void {
    if (this.formularioDeCadastro.invalid) {
      this.toastr.error('Preencha todos os campos corretamente');
      return;
    } else {
      this.http.cadastrarCliente(
        this.formularioDeCadastro.get('nome')?.value,
        this.formularioDeCadastro.get('cpf')?.value,
        this.formularioDeCadastro.get('rg')?.value,
        this.formularioDeCadastro.get('endereco')?.value,
        this.formularioDeCadastro.get('placaCarro')?.value,
        this.formularioDeCadastro.get('dataNascimento')?.value
      ).subscribe(response => {
        this.toastr.success('Cliente cadastrado com sucesso');
        this.formularioDeCadastro.reset();
      });
    }
  }
}
