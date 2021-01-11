import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'login-app',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Input() rut: string;
  registrarUsuario(f) {
    console.log('click',f);
  }
}
