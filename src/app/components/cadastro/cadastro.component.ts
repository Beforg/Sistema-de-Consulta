import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextfieldComponent } from '../../shared/textfield/textfield.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { CadastroServiceService } from '../../services/cadastro-service.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { passwordMatchValidator } from '../../../validators/passwordValidator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [TextfieldComponent, ButtonComponent, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './cadastro.component.html',
  providers: [CadastroServiceService],
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  formularioDeCadastro: FormGroup;
  logo: string = "/Logo.png";

  constructor(private router: Router, private fb: FormBuilder,
     private cadastroService: CadastroServiceService, private toastr: ToastrService) {
    this.formularioDeCadastro = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {validators: passwordMatchValidator});
  }

  cadastrar(): void {
    if (this.formularioDeCadastro.valid) {
      const nome = this.formularioDeCadastro.get('nome')?.value;
      const username = this.formularioDeCadastro.get('username')?.value;
      const password = this.formularioDeCadastro.get('password')?.value;
      console.log('Form is valid', { nome, username, password });
      this.cadastroService.cadastarUsuario(nome, username, password).subscribe({
        next: (response) => {
          this.toastr.success('Usuário cadastrado com sucesso!');
          setTimeout(() => {
            this.router.navigate(['/autenticacao']);
          }, 2000)
        },
        error: (error) => {
          this.toastr.error('Erro ao cadastrar usuário');
        }
      });
    } else {
      this.toastr.error('Preencha todos os campos corretamente');
    }
  }

  ngOnInit(): void {
  }
}