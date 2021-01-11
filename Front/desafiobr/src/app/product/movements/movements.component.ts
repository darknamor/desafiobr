import { Component, OnInit, EventEmitter,Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'movements-app',
  templateUrl: 'movements.component.html',
  styleUrls: ['./movements.component.css'],
})
export class MovementsComponent implements OnInit {
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
