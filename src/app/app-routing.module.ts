import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { TemaDeleteComponent } from './delete/tema-delete/tema-delete.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { TemaComponent } from './tema/tema.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  //Rotas de Acesso
  {path: 'login', component: LoginComponent},
  {path: 'cadastro' , component: CadastrarComponent},
  // Rotas de Visualização
  {path: 'inicio', component: InicioComponent},
  {path: 'tema', component: TemaComponent},
  //Rotas de edição e delete
  {path: 'tema-edit/:id', component:TemaEditComponent},
  {path: 'tema-delete/:id', component: TemaDeleteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
