import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'register-app',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @Input() rut: string;
  registrarUsuario(f) {
    console.log('click', f);
  }
}
