import { Usuario } from './usuario.model';
import { LoginData } from './login-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { Seguridad } from '../seguridad/seguridad.model';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  private token: string;
  baseUrl = environment.baseUrl;
  seguridadCambio = new Subject<boolean>();
  private usuario: Usuario;

  cargarUsuario(): void {
    const tokenBrowser = localStorage.getItem('token');
    if (!tokenBrowser) {
      return;
    }
    this.token = tokenBrowser;
    this.seguridadCambio.next(true);
  }

  obtenerToken(): string {
    return this.token;
  }
  constructor(private router: Router, private http: HttpClient) {}

  regitrarUsuario(usr: Usuario) {
    this.usuario = {
      email: usr.email,
      password: usr.password,
      nombre: usr.nombre,
      rut: usr.rut,
    };
    this.seguridadCambio.next(true);
    this.router.navigate(['/home']);
  }
  login(loginData: LoginData): void {
    this.http
      .post<Seguridad>(this.baseUrl + 'api/user/login', loginData)
      .subscribe((response) => {
        this.token = response.token;
        this.usuario = {
          nombre: '',
          rut: response.rut,
          email: '',
          password: '',
        };
        localStorage.setItem('token', response.token);
        this.seguridadCambio.next(true);
      });
  }
  logout() {
    this.usuario = null;
    this.seguridadCambio.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }
  getUser() {
    return { ...this.usuario };
  }
}
