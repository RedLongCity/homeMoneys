import {FormControl} from '@angular/forms';
import {BillService} from '../../system/shared/services/bill.service';
import {Bill} from '../models/bill.model';
import {Injectable} from '@angular/core';

@Injectable()
export class BillLimitValidator {

  constructor(private billService: BillService) {
  }

  public checkBillLimit = (control: FormControl): Promise<any> => {
    return new Promise<any>(resolve => {
      this.billService.getBill().subscribe((bill: Bill) => {
        if (control.value <= bill.value) {
          resolve(null);
        } else {
          resolve({
            'overLimit': true
          });
        }
      });
    });
  }
}