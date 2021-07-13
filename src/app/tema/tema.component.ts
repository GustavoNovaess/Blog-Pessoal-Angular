import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema();
  listaTemas: Tema[];

  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    console.log(environment)
    if(environment.token == '') {
      this.alertas.showAlertInfo('Sua sessão expirou, faça o login novamente')
      this.router.navigate(['/login'])
    } else {
      this.temaService.token = {
        headers: new HttpHeaders().set('Authorization',environment.token)
      }
    }

    if(environment.tipo != 'adm') {
      this.alertas.showAlertDanger("Permitido apenas para administradores")
      this.router.navigate(['/inicio'])
    }
    this.findAllTema()
  }

  findAllTema() {
    console.log(environment.token)
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas = resp
    })
  }

  cadastrarTema() {
    this.temaService.postTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp
      this.alertas.showAlertSuccess("O Tema foi criado com sucesso!")
      this.findAllTema()
      this.tema = new Tema()
    })
  }

}
