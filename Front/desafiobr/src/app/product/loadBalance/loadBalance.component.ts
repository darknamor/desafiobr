import { Component, OnInit, EventEmitter,Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'loadBalance-app',
  templateUrl: 'loadBalance.component.html',
  styleUrls: ['./loadBalance.component.css'],
})
export class LoadBalanceComponent implements OnInit {
  @Output() selectMenuIndex = new EventEmitter();
  backToMenu() {
    this.selectMenuIndex.emit();
  }
  constructor() {}
  addBalance(form: NgForm) {
    console.log('monto', form.value.amount);
  }
  ngOnInit() {}
}
