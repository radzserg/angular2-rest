import {ControlGroup} from 'angular2/common';

import {Model} from '../models/model';
import {Control} from 'angular2/common';


export class ControlGroupHelper {

  /**
   * Update control group from model
   * @param controlGroup
   * @param model
   */
  static updateControls(controlGroup: ControlGroup, model: Model) {
    model.attributeNames.forEach( (attributeName) => {
      if (!!controlGroup.controls[attributeName]) {
        (<Control>controlGroup.controls[attributeName]).updateValue(model[attributeName], true);
      }
    });
  }

  static setControlErrors(controlGroup: ControlGroup, field: string, errors: string[]) {
    if (!!controlGroup.controls[field]) {
      var errorsObject = {};
      // transform array to object in order to be compatible with angular2 control group errors type
      for (var i in errors) {
        (<any>errorsObject)[i] = field + ' ' + errors[i];
      }
      (<Control>controlGroup.controls[field]).setErrors(errorsObject, true);
    }
  }

}
