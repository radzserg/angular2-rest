export class User {
  id:number;
  first_name:string;
  last_name:string;
  email:string;
  password:string;
  [k: string]: any;

  constructor(attributes: {} = null) {
    this.attributes = attributes;
  }

  set attributes(attributes: {}) {
    for (var k in attributes) {
      //let v: any = attributes[k];
      this[k] =  (<any>attributes)[k];
    }
  }

  get attributes(): {} {
    return {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      password: this.password
    };
  }


}
