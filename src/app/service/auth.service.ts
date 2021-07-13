import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
// "https://backendthiagofaccipieri.herokuapp.com/usuario/logar"
export class AuthService {

  constructor(private http:HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization',environment.token)
  }

  entrar(userLogin: UserLogin):Observable<UserLogin> {
    return this.http.post<UserLogin>("https://bggustavonovaes.herokuapp.com/usuario/logar", userLogin)
  }

  cadastrar(user: Usuario):Observable<Usuario> {
    return this.http.post<Usuario>("https://bggustavonovaes.herokuapp.com/usuario/cadastrar", user)
  }

  atualizar(user: Usuario):Observable<Usuario> {
    return this.http.put<Usuario>("https://bggustavonovaes.herokuapp.com/usuario/alterar", user, this.token)
  }

  getByIdUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`https://bggustavonovaes.herokuapp.com/usuario/${id}`, this.token)
  }

  logado() {
    let ok: boolean = false;

    if(environment.token != '') {
      ok = true;
    } else {
      ok = false;
    }

    return ok;
  }

  adm() {
    let ok: boolean = false;

    if(environment.tipo == 'adm') {
      ok = true;
    }

    return ok;
  }
}
