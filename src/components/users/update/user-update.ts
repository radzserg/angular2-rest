import {Component, OnInit} from 'angular2/core';
import {User} from '../../../models/user';
import {UserFormComponent} from '../../../forms/user-form/user-form';
import {RouteParams} from 'angular2/router';
import {Http} from 'angular2/http';


@Component({
  selector: 'user-create',
  templateUrl: './user-update.html',
  //styleUrls: ['./app.css'],
  moduleId: module.id,
  directives: [UserFormComponent]
})
export class UserUpdate implements OnInit {

  user: User;
  id: Number;

  constructor(private params: RouteParams, private http: Http) {
    this.id = parseInt(params.get('id'));
  }

  ngOnInit() {

    this.http.get('/users/' + this.id)
      .map(res => res.json())
      .subscribe(
        (userData) => {
          this.user = new User(userData);
          console.log(this.user);
        }
      );
  }

}
