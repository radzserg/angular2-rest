export abstract class Model {

  attributeNames: string[] = [];

  [k: string]: any;

  constructor(attributes: {} = null) {
    this.attributes = attributes;
  }

  set attributes(attributes: {}) {
    for (var k in attributes) {
      this[k] =  (<any>attributes)[k];
    }
  }

  get attributes(): {} {
    var attributes : any = {};
    this.attributeNames.forEach( (attributeName) => {
      attributes[attributeName] = this[attributeName];
    });
    return attributes;
  }


}
