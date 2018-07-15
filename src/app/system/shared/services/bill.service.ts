import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Bill} from '../../../shared/models/bill.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class BillService {

  constructor(private http: HttpClient) {
  }

  defBillUrl = 'http://localhost:3000/';
  defCurrecyUrl = 'http://fixer.io/latest?base=USD';

  getBill(): Observable<Bill> {
    return this.http.get<Bill>(this.defBillUrl + 'bill');
  }

  getCurrency()
}
