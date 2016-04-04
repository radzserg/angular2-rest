import {Pipe} from 'angular2/core';

@Pipe({
  name: 'fieldErrors'
})
export class FieldErrors {
  transform(dict: Object, fieldName?: string): string[] {
    var a: string[] = [];
    for (var key in dict) {
      if (dict.hasOwnProperty(key)) {
        var index = <any>key;
        if (!isNaN(index)) { // is numeric
          a.push((<any>dict)[key]);
        } else {
          a.push(this.translateKeyToMessage(key, fieldName)); // angular2 error {required: true}
        }
      }
    }
    return a;
  }


  private translateKeyToMessage(key: string, fieldName?: string) : string {
    switch (key) {
      case 'required':
          return fieldName + ' is required field';
      default:
            return '';
    }
  }

}
