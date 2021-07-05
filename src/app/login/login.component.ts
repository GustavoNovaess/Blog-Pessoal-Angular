import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(environment)
    window.scroll(0,0);
    /* Fix do bug em que as componentes do inicio aparecem ao voltar para o login pelo navegador */
    /*if(environment.token != '') {
      alert("Sessão expirada")
      this.auth.logado()
    }*/
  }
  /*4

Basic Z3VzdGF2by5saW1hQGhvdG1haWwuY29tOnNlbmhh
Basic Z3VzdGF2by5saW1hQGhvdG1haWwuY29tOnNlbmhh

Gustavo Novaes*/
  entrar() {
    this.auth.entrar(this.userLogin).subscribe((resp: UserLogin) => {
      this.userLogin = resp

      environment.id = this.userLogin.id;
      environment.token = this.userLogin.token;
      environment.nome = this.userLogin.nome;
      environment.foto = this.userLogin.foto;

      console.log(environment.id)
      console.log(environment.token)
      console.log(environment.nome)
      console.log(environment.foto)

      this.router.navigate(['/inicio'])
    }, erro => {
      if(erro.status == 500) {
        alert("Usuário ou senha estão incorretos")
      } 
    })
  }

}
