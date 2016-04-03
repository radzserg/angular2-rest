import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Http} from 'angular2/http';
import {User} from '../../../models/user';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.html',
  //styleUrls: ['./app.css'],
  moduleId: module.id,

  directives: [ROUTER_DIRECTIVES]
})
export class UserList implements OnInit {

  users: User[] = [];

  constructor(private http: Http) {}

  ngOnInit() {
    this.http.get('/users')
      .map(res => res.json())
      .subscribe(
        (users) => {
          users.forEach( (userData: Object) => {
            var user: User = new User(userData);
            this.users.push(user);
          });
          //console.log(this.users);
        }
      );
  }

  deleteModel(user: User) {
    if (confirm('Are you sure you want to delete user ' + user.email)) {
      this.http.delete('/users/' + user.id)
        .subscribe(
          (response) => {
            if (response.status === 204) {
              this.users.forEach((u: User, i: number) => {
                if (u.id === user.id) {
                  this.users.splice(i, 1);
                }
              });
              console.log(this.users);
            }
          }
        );
    }
  }


}
