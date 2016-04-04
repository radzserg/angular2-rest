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

}
