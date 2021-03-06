import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  tituloPost: string

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  user: Usuario = new Usuario()
  idUser = environment.id

  key =  'date'
  reverse = true

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    public authService: AuthService,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    console.log(environment)
    window.scroll(0,0)
    if(environment.token == '') {
      this.router.navigate(['/login'])
      this.alertas.showAlertInfo('Sua sessão expirou, faça o login novamente')
    } else {

      this.postagemService.token = {
        headers: new HttpHeaders().set('Authorization',environment.token)
      }

      this.temaService.token = {
        headers: new HttpHeaders().set('Authorization',environment.token)
      }

      this.authService.token = {
        headers: new HttpHeaders().set('Authorization',environment.token)
      }
    }

    this.getAllTemas()
    this.getAllPostagens()
  }

  getAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema)=> {
      this.tema = resp
    })
  }
  
  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  findByTituloPostagem() {

    if(this.tituloPost == '') {
      this.getAllPostagens
    } else {
      this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[]) => {
        this.listaPostagens = resp
      })
    }

  }

  findByIdUsuario() {
    this.authService.getByIdUsuario(this.idUser).subscribe((resp: Usuario) => {
      this.user = resp
    })
  }

  publicar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user
    console.log(this.postagem)
    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem realizada com sucesso!')

      this.postagem = new Postagem()
      this.getAllTemas()
      this.getAllPostagens()
    })
  }
}
