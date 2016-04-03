import {Component} from 'angular2/core';
import {User} from '../../../models/user';
import {UserFormComponent} from '../../../forms/user-form/user-form';

@Component({
  selector: 'user-create',
  templateUrl: './user-create.html',
  //styleUrls: ['./app.css'],
  moduleId: module.id,
  directives: [UserFormComponent]
})
export class UserCreate {
  user:User;

}
