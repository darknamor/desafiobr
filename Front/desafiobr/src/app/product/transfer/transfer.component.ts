import { Component, OnInit, EventEmitter,Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'transfer-app',
  templateUrl: 'transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent implements OnInit {
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
