import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { PostagemService } from 'src/app/service/postagem.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: Postagem = new Postagem()
  idPost: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    ) { }

  ngOnInit(){
    window.scroll(0,0)
    
    if(environment.token == '') {

      this.router.navigate(['/login'])
      alert('Sua sessão expirou, faça o login novamente')

    } else {

      this.postagemService.token = {
        headers: new HttpHeaders().set('Authorization',environment.token)
      }

    }

    this.idPost = this.route.snapshot.params['id']
    this.findByIdPostagem(this.idPost)
  }

  findByIdPostagem(id: number) {
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }


  inicio() {
    this.router.navigate(['/inicio']);
  }

  apagar() {
    this.postagemService.deletePostagem(this.idPost).subscribe(() => {
      alert("Postagem apagada com sucesso")
      this.router.navigate(['/inicio'])
    })
  }

}
