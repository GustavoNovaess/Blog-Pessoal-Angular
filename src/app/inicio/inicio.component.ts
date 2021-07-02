import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(){
    console.log(environment)
    if(environment.token == '') {
      this.router.navigate(['/login'])
      alert('Sua sessão expirou, faça o login novamente')
    }
  }
  
}
