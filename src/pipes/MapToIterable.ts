import {Pipe} from 'angular2/core';

@Pipe({
  name: 'mapToIterable'
})
export class MapToIterable {
  transform(dict: Object): {key: string, val: string}[] {
    var a: {key: string, val: string}[] = [];
    for (var key in dict) {
      if (dict.hasOwnProperty(key)) {
        a.push({key: <string>key, val: (<any>dict)[key]});
      }
    }
    return a;
  }
}
