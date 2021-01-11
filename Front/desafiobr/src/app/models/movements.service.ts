import { Injectable } from '@angular/core';
import { Movements } from './movements.models';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovementsService {
  baseUrl = environment.baseUrl;

  private movementsLista: Movements[] = [];
  private movementsSubject = new Subject<Movements[]>();

  constructor(private http: HttpClient) {}
  getMovements() {
    this.http
      .get<Movements[]>(
        this.baseUrl + 'api/movements/get-transfers/5ffb10188ad740420c7631fe'
      )
      .subscribe((data) => {
        this.movementsLista = data;
        console.log("movementsLista",this.movementsLista)
        this.movementsSubject.next([...this.movementsLista]);
      });
  }
  getActualListener() {
    return this.movementsSubject.asObservable();
  }
}
