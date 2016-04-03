import {provide, enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS, RequestOptions, Http, XHRBackend, ConnectionBackend} from 'angular2/http';
import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';
import 'rxjs/Rx';

import {AppComponent} from './components/main/app';
import {AppRequestOptions} from './request_options';

if ('<%= ENV %>' === 'prod') { enableProdMode(); }


bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  provide(APP_BASE_HREF, { useValue: '/' }),
  provide(RequestOptions, {useClass: AppRequestOptions}) ,
  provide(Http, { useFactory:
    function(backend: ConnectionBackend = null, defaultOptions: RequestOptions) {
      return new Http(backend, defaultOptions); },
    deps: [XHRBackend, RequestOptions]})
])
  .catch(err => console.error(err));




// In order to start the Service Worker located at "./sw.js"
// uncomment this line. More about Service Workers here
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
// if ('serviceWorker' in navigator) {
//   (<any>navigator).serviceWorker.register('./sw.js').then(function(registration) {
//     console.log('ServiceWorker registration successful with scope: ',    registration.scope);
//   }).catch(function(err) {
//     console.log('ServiceWorker registration failed: ', err);
//   });
// }
