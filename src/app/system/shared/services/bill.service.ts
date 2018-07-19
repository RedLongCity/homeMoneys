import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Bill} from '../../../shared/models/bill.model';
import {HttpClient} from '@angular/common/http';
import {Currency} from '../../../shared/models/currency.model';
import {BaseApi} from '../../../shared/core/base.api';

@Injectable()
export class BillService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getBill(): Observable<Bill> {
    return this.get('bill');
  }

  getCurrencies(): Observable<Currency[]> {
    return this.get('currencies');
  }
}
