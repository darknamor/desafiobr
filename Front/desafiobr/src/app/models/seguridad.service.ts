import { Usuario } from './usuario.model';
import { LoginData } from './login-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class SeguridadService {
  seguridadCambio = new Subject<boolean>();
  private usuario: Usuario;

  constructor(private router: Router) {}

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
  login(loginData: LoginData) {
    this.usuario = {
      rut: loginData.rut,
      password: loginData.password,
      nombre: '',
      email: '',
    };
    this.seguridadCambio.next(true);
  }
  logout() {
    this.usuario = null;
    this.seguridadCambio.next(false);
    this.router.navigate(['/home']);
  }
  getUser() {
    return { ...this.usuario };
  }
}
