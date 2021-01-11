import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Subscription } from 'rxjs';
import { SeguridadService } from '../models/seguridad.service';

@Component({
  selector: 'app-portal',
  templateUrl: 'portal.component.html',
  styleUrls: ['./portal.component.css'],
})
export class PortalComponent implements OnInit, OnDestroy {
  public href: string = '';
  public registerUrl: boolean;
  estadoUsuario: boolean;
  usuarioSubscription: Subscription;
  constructor(
    private seguridadServicio: SeguridadService,
    private router: Router
  ) {}
  agregarUsuario(f) {
    if (f.valid) {
      console.log('value', f.value);
    }
  }
  ngOnInit() {
    this.usuarioSubscription = this.seguridadServicio.seguridadCambio.subscribe(
      (status) => {
        this.estadoUsuario = status;
      }
    );
    this.href = this.router.url;
    if (this.href === '/registro') {
      this.registerUrl = true;
    } else {
      this.registerUrl = false;
    }
  }
  ngOnDestroy() {
    this.usuarioSubscription.unsubscribe();
  }
}
