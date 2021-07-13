import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization',environment.token)
  }

  //Metodos Get
  getAllTema(): Observable<Tema[]>{
    console.log(this.token)
    return this.http.get<Tema[]>("https://bggustavonovaes.herokuapp.com/tema",this.token)
  }

  getByIdTema(id:number):Observable<Tema> {
    return this.http.get<Tema>(`https://bggustavonovaes.herokuapp.com/tema/${id}`,this.token)
  }

  getByNomeTema(nome: string): Observable<Tema[]> {
    return this.http.get<Tema[]>(`https://bggustavonovaes.herokuapp.com/tema/nome/${nome}`, this.token)
  }
  //Metodos Post
  postTema(tema: Tema):Observable<Tema> {
    return this.http.post<Tema>("https://bggustavonovaes.herokuapp.com/tema",tema,this.token)
  }

  //Metodos Put
  putTema(tema:Tema):Observable<Tema> {
    return this.http.put<Tema>("https://bggustavonovaes.herokuapp.com/tema",tema,this.token)
  }

  //Metodos Delete
  deleteTema(id: number) {
    // Sem Observable pois não é preciso verificar se é um Tema de fato
    // Crase é usada no lugar das aspas pois queremos passar um caminho no endereço URL(Template Literals)
    return this.http.delete(`https://bggustavonovaes.herokuapp.com/tema/${id}`, this.token)
  }

}
