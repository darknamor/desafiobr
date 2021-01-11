import { Component, OnInit, EventEmitter,Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'withdrawBalance-app',
  templateUrl: 'withdrawBalance.component.html',
  styleUrls: ['./withdrawBalance.component.css'],
})
export class WithdrawBalanceComponent implements OnInit {
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
