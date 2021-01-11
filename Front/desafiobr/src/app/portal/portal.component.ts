import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-portal',
  templateUrl: 'portal.component.html',
  styleUrls: ['./portal.component.css'],
})
export class PortalComponent implements OnInit, OnDestroy {
  public href: string = '';
  public registerUrl: boolean;
  constructor(userServices: UsersService, private router: Router) {}
  agregarUsuario(f) {
    if (f.valid) {
      console.log('value', f.value);
    }
  }
  ngOnInit() {
    this.href = this.router.url;
    if (this.href === '/registro') {
      this.registerUrl = true;
    } else {
      this.registerUrl = false;
    }
    console.log('ruta', this.router.url);
  }
  ngOnDestroy() {}
}
