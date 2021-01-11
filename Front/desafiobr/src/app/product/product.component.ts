import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'product-app',
  templateUrl: 'product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Output() selectBalance = new EventEmitter();
  @Output() logout = new EventEmitter();
  selectOption(f) {
    this.selectBalance.emit(f);
  }
  cerrarSesion() {
    this.logout.emit();
  }
}
