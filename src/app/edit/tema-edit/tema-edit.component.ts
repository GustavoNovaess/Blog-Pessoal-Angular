import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  tema: Tema = new Tema()

  constructor(
    private router: Router,
    private temaService: TemaService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {

    if(environment.token == '') {
      alert('Sua sessão expirou, faça o login novamente')
      this.router.navigate(['/login'])
    } else {
      this.temaService.token = {
        headers: new HttpHeaders().set('Authorization',environment.token)
      }
    }
    let id = this.route.snapshot.params['id']
    this.findByIdTema(id)
    /* Pega o id do caminho URL let id = this.route.snapshot.params['parametro na rota'] */

  }

  findByIdTema(id:number) {
    this.temaService.getByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  atualizar() {
    this.temaService.putTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp
      alert("Tema atualizado com sucesso")
      this.router.navigate(['/tema'])
    })
  }

}
