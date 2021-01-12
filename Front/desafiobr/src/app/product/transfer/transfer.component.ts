import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TransferService } from '../../models/transfer.service';

@Component({
  selector: 'transfer-app',
  templateUrl: 'transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent implements OnInit {
  fechaPublicacion: string;
  rutActual: string = '17946099-8';
  tipo: string = 'Transferencia';
  checkUser: boolean = true;
  transferSubscription = new Subscription();
  @Output() selectMenuIndex = new EventEmitter();
  backToMenu() {
    this.selectMenuIndex.emit();
  }

  constructor(private transferService: TransferService) {}
  transferToUser(form: NgForm) {
    if (form.valid) {
      const transferRequest = {
        rut: this.rutActual,
        monto: form.value.amount,
        fecha: new Date(),
        destino: form.value.rut,
        tipo: this.tipo,
      };
      this.transferService.makeTranfer(transferRequest);
      this.transferSubscription = this.transferService
        .makeTranferListener()
        .subscribe(() => {
          console.log('Transferencia existosa');
        });
    }
  }
  ngOnInit() {}
  ngOnDestroy() {
    this.transferSubscription.unsubscribe();
  }
}
