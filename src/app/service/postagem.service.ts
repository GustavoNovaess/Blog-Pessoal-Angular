import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization',environment.token)
  }
  //Métodos GET
  getAllPostagens(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>('https://bggustavonovaes.herokuapp.com/postagens',this.token)
  }

  getByIdPostagem(id: number): Observable<Postagem> {
    return this.http.get<Postagem>(`https://bggustavonovaes.herokuapp.com/postagens/${id}`, this.token)
  }

  getByTituloPostagem(titulo: string): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(`https://bggustavonovaes.herokuapp.com/postagens​/titulo​/${titulo}`,this.token)
  }
  //Métodos POST
  postPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.post<Postagem>('https://bggustavonovaes.herokuapp.com/postagens', postagem, this.token)
  }
  //Métodos PUT
  putPostagem(postagem:Postagem): Observable<Postagem> {
    return this.http.put<Postagem>('https://bggustavonovaes.herokuapp.com/postagens',postagem, this.token)
  }
  //Métodos DELETE 
  deletePostagem(id:number) {
    return this.http.delete(`https://bggustavonovaes.herokuapp.com/postagens/${id}`, this.token)
  }

}
