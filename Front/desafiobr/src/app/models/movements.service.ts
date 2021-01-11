import { Movements } from './movements.models';

export class MovementsService {
  private movemetsLista: Movements[] = [
    {
      monto: '14566',
      destino: '17982131-6',
      fecha: '2021-01-10',
      tipo: 'Transferencia',
    },
    {
      monto: '254456',
      destino: '17946099-8',
      fecha: '2021-01-11',
      tipo: 'Retiro',
    },
    {
      monto: '3564546',
      destino: '17982131-6',
      fecha: '2021-01-11',
      tipo: 'Transferencia',
    },
  ];
  getMovements() {
    return this.movemetsLista.slice();
  }
}
