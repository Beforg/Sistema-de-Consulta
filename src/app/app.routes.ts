import { Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { AutenticacaoComponent } from './components/autenticacao/autenticacao.component';
import { HomeComponent } from './pages/home/home.component';
import { CadastrarClienteComponent } from './pages/cadastrar-cliente/cadastrar-cliente.component';
import { ConsultasComponent } from './pages/consultas/consultas.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
    { path: 'cadastro', component: CadastroComponent },
    { path: 'autenticacao', component: AutenticacaoComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'cadastro/cliente', component: CadastrarClienteComponent, canActivate: [AuthGuard] },
    { path: 'consultas', component: ConsultasComponent, canActivate: [AuthGuard] },
    {path: '', redirectTo: '/autenticacao', pathMatch: 'prefix' }
];


