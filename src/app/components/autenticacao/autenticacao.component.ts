import { Component } from '@angular/core';
import { TextfieldComponent } from "../../shared/textfield/textfield.component";
import { ButtonComponent } from "../../shared/button/button.component";
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';

interface LoginForm {
  username: FormControl;
  password: FormControl;
}

@Component({
  selector: 'app-autenticacao',
  standalone: true,
  imports: [TextfieldComponent, ButtonComponent, RouterLink, RouterModule, ReactiveFormsModule],
  providers: [LoginService],
  templateUrl: './autenticacao.component.html',
  styleUrl: './autenticacao.component.css'
})
export class AutenticacaoComponent {
    logo: string = '/Logo.png';
    formularioDeLogin!: FormGroup<LoginForm>

    constructor(private toastr: ToastrService, private loginService: LoginService, private router: Router) {
      this.formularioDeLogin = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
      })
    }

     logar() : void {
      this.loginService.login(this.formularioDeLogin.value.username, this.formularioDeLogin.value.password).subscribe({
        next: () => {
          this.toastr.success('Login efetuado com sucesso'),
          setTimeout(() => {
            this.router.navigate(['/home'])
          }, 2500)
          
        },
        error: () => this.toastr.error('Erro ao efetuar login')
      })

    }
}
