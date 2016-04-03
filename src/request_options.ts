import {Injectable} from 'angular2/core';
import {Headers, RequestOptions, RequestOptionsArgs} from 'angular2/http';
import {AppConfig} from './config';

@Injectable()
export class AppRequestOptions extends RequestOptions {

  headers:Headers = new Headers({
    'Content-Type': 'application/json'
  });


  merge(options?:RequestOptionsArgs):RequestOptions {
    let result = new AppRequestOptions(super.merge(options));

    result.url = AppConfig.API_BASE_URL + result.url;

    return result;
  }

}
