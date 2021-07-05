import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema: Tema = new Tema();
  idTema: number

  constructor(
    private router: Router,
    private temaService: TemaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){

    if(environment.token == '') {
      alert('Sua sessão expirou, faça o login novamente')
      this.router.navigate(['/login'])
    } else {
      this.temaService.token = {
        headers: new HttpHeaders().set('Authorization',environment.token)
      }
    }

    this.idTema = this.route.snapshot.params['id']
    this.findByIdTema(this.idTema)
  }


  findByIdTema(id: number) {
    this.temaService.getByIdTema(this.idTema).subscribe((resp : Tema) => {
      this.tema = resp
    })
  }


  apagar() {
    this.temaService.deleteTema(this.idTema).subscribe(() => {
      alert("O tema '" + this.tema.descricao +"' foi deletado com sucesso")
      this.router.navigate(['/tema'])
    })
  }

}
