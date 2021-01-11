import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login-app',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
  logearUsuario(f) {
    console.log('click', f);
  }
}
