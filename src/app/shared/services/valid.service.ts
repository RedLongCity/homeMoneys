import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Injectable()
export class ValidService {

  isReqiredValid(form: FormGroup, field: string): boolean {
    return form.get(field)['errors'] && form.get(field)['errors']['required'];
  }

  isMinLength(form: FormGroup, field: string): boolean {
    return form.get(field)['errors'] && form.get(field)['errors']['minlength'];
  }

  isTouched(form: FormGroup, field: string) {
    return form.get(field) && form.get(field).touched;
  }

  isInvalid(form: FormGroup, field: string) {
    return form.get(field) && form.get(field).invalid;
  }

  isInvalidAndTouched(form: FormGroup, field: string) {
    return this.isInvalid(form, field) && this.isTouched(form, field);
  }

  isReqiredAndTouchedValid(form: FormGroup, field: string): boolean {
    return this.isReqiredValid(form, field) && this.isTouched(form, field);
  }

  isRequiredAndMinLength(form: FormGroup, field: string): boolean {
    return this.isMinLength(form, field) && this.isTouched(form, field);
  }

  isRequiredAndMinLengthAndTouched(form: FormGroup, field: string) {
    return this.isReqiredAndTouchedValid(form, field) && this.isMinLength(form, field);
  }
}
