import {Component, Input} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Router} from 'angular2/router';
import {User} from '../../models/user';
import {ControlGroup, FormBuilder, Validators, NgClass, Control} from 'angular2/common';
import {AppValidators} from '../../validators';


// https://github.com/Paldom/angular2-rest/blob/master/angular2-rest.ts
// https://auth0.com/blog/2015/10/15/angular-2-series-part-3-using-http/
// http://blog.thoughtram.io/angular/2015/05/18/dependency-injection-in-angular-2.html

@Component({
  selector: 'user-form',
  moduleId: module.id,
  styleUrls: ['./user-form.css'],
  templateUrl: './user-form.html',
  directives: [NgClass]
})
export class UserFormComponent {

  user: User = new User();
  userForm: ControlGroup;

  constructor(protected http: Http, protected router: Router, builder:FormBuilder) {
    this.userForm = builder.group({
      first_name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      last_name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      email: ['', Validators.compose([Validators.required, AppValidators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }


  /**
   * Handle errors
   * @param response
   */
  handleError(response: Response) {
    if (response.status === 422) {
      var errors = response.json();
      console.log(errors);
    }

    console.log(response);
  }

  @Input()
  set model (user: User) {
    if (user) {
      this.user = user;
      (<Control>this.userForm.controls['first_name']).updateValue(this.user.first_name, true);
      (<Control>this.userForm.controls['last_name']).updateValue(this.user.last_name, true);
      (<Control>this.userForm.controls['email']).updateValue(this.user.email, true);
      (<Control>this.userForm.controls['password']).updateValue(this.user.password, true);
    }
  }

  onSubmit() {
    console.log(this.userForm);
    if (!this.userForm.valid) {
      return ;
    }

    if (this.user.id) {
      this.http.put('/users/' + this.user.id, JSON.stringify({user: this.user.attributes}))
        .map(res => res.json())
        .subscribe(
          (data) => {
            this.router.navigate(['UserList']);
          },
          this.handleError
        );
    } else {
      this.http.post('/users', JSON.stringify({user: this.user.attributes}))
        .map(res => res.json())
        .subscribe(
          (data) => {
            this.user.id = data.id;
            this.router.navigate(['UserList']);
          }
        );
    }
  }

}
