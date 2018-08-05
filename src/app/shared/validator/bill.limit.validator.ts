import {AbstractControl} from '@angular/forms';
import {BillService} from '../../system/shared/services/bill.service';
import {Bill} from '../models/bill.model';
import {Injectable} from '@angular/core';

@Injectable()
export class BillLimitValidator {

  constructor(private billService: BillService) {
  }

  type: string;

  public checkBillLimit = (control: AbstractControl): Promise<any> => {
    return new Promise<any>(resolve => {
      this.billService.getBill().subscribe((bill: Bill) => {
        if (control.value <= bill.value && control.value > 0) {
          resolve(null);
        } else {
          if (control.value <= 0) {
            resolve({
              'underLimit': true
            });
          } else {
            resolve({
              'overLimit': true
            });
          }
        }
      });
    });
  }

  public checkBillLimitAndType = (control?: AbstractControl): Promise<any> => {
    return new Promise<any>(resolve => {
      console.log(this.type);
      if (this.type === 'income') {
        resolve(null);
      } else {
        this.billService.getBill().subscribe((bill: Bill) => {
          if (control.value <= bill.value && control.value > 0) {
            resolve(null);
          } else {
            if (control.value <= 0) {
              resolve({
                'underLimit': true
              });
            } else {
              resolve({
                'overLimit': true
              });
            }
          }
        });
      }
    });
  }
}
