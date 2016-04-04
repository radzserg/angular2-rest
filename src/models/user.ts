import {Model} from './model';

export class User extends Model {
  id:number;
  first_name:string;
  last_name:string;
  email:string;
  password:string;

  attributeNames: string[] = ['id', 'first_name', 'last_name', 'email', 'password'];

}
