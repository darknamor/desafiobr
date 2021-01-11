import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Movements } from 'src/app/models/movements.models';

import { MovementsService } from '../../models/movements.service';

@Component({
  selector: 'movements-app',
  templateUrl: 'movements.component.html',
  styleUrls: ['./movements.component.css'],
})
export class MovementsComponent implements OnInit {
  displayedColumns: string[] = ['fecha', 'monto', 'destino', 'tipo'];
  dataSource = new MatTableDataSource<Movements>();

  @Output() selectMenuIndex = new EventEmitter();
  backToMenu() {
    this.selectMenuIndex.emit();
  }
  constructor(private movementsService: MovementsService) {}
  addBalance(form: NgForm) {
    console.log('monto', form.value.amount);
  }
  ngOnInit() {
    console.log(this.movementsService.getMovements());
    this.dataSource.data = this.movementsService.getMovements();
  }
}
