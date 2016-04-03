import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

import {UserList} from '../users/list/user-list';
import {UserCreate} from '../users/create/user-create';
import {UserUpdate} from '../users/update/user-update';

@Component({
  selector: 'sd-app',
  viewProviders: [],
  moduleId: module.id,
  styleUrls: ['./app.css'],
  templateUrl: './app.html',
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/users', component: UserList, name: 'UserList' },
  { path: '/users/create', component: UserCreate, name: 'UserCreate' },
  { path: '/users/:id/update', component: UserUpdate, name: 'UserUpdate' }
])
export class AppComponent {}
