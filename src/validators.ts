import {Control} from '../node_modules/angular2/common.d';

export class AppValidators {

  static email(control:Control):{ [s: string]: boolean } {
    var r1 = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))/;
    var r2 = /@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var re = new RegExp(r1.source + r2.source);
    if (!re.test(control.value)) {
      return {invalidEmail: true};
    } else {
      return null;
    }
  }

}
