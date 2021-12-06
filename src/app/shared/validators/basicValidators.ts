import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class BasicValidators {
  constructor() {}

  static email(control: FormControl) {
    var regEx =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    var valid = control.value ? regEx.test(control.value.trim()) : null;
    return valid ? null : { email: true };
  }

  static phoneNo(control: FormControl) {
    // Bypass if empty
    if (control.value == '') return null;

    var regex = /(?:[0-9] ?){6,14}$/;

    let valid = regex.test(control.value);

    return valid ? null : { phoneNo: true };
  }
}
