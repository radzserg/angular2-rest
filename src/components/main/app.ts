import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

@Component({
  selector: 'sd-app',
  viewProviders: [],
  moduleId: module.id,
  styleUrls: ['./app.css'],
  templateUrl: './app.html',
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([

])
export class AppComponent {}
