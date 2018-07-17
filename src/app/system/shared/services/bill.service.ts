import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Bill} from '../../../shared/models/bill.model';
import {HttpClient} from '@angular/common/http';
import {Currency} from '../../../shared/models/currency.model';

@Injectable()
export class BillService {

  constructor(private http: HttpClient) {
  }

  defBillUrl = 'http://localhost:3000/';

  getBill(): Observable<Bill> {
    return this.http.get<Bill>(this.defBillUrl + 'bill');
  }

  getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.defBillUrl + 'currencies');
  }
}
