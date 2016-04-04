import {Component, Input} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Router} from 'angular2/router';
import {ControlGroup, FormBuilder, Validators, NgClass, Control} from 'angular2/common';
import {User} from '../../models/user';
import {AppValidators} from '../../validators';
import {ControlGroupHelper} from '../ControlGroupHelper';
import {FieldErrors} from '../../pipes/FieldErrors';


@Component({
  selector: 'user-form',
  moduleId: module.id,
  styleUrls: ['./user-form.css'],
  templateUrl: './user-form.html',
  pipes: [FieldErrors],
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
      password: ['', Validators.compose([Validators.minLength(6)])]
    });
  }


  /**
   * Handle errors
   * @param response
   */
  handleError(response: Response) {
    if (response.status === 422) {
      let errors : Object = response.json();
      console.log(errors);
      for (var field in errors) {
        var fieldErrors: string[] = (<any>errors)[field];
        ControlGroupHelper.setControlErrors(this.userForm, field, fieldErrors);
      }
    }

    console.log(response);
  }

  @Input()
  set model (user: User) {
    if (user) {
      this.user = user;
      ControlGroupHelper.updateControls(this.userForm, this.user);
      console.log( (<Control>this.userForm.controls['first_name']).errors);
    }
  }

  onSubmit() {
    console.log(this.userForm);
    if (!this.userForm.valid) {
      return ;
    }

    this.user.attributes = this.userForm.value;

    console.log(this.user);

    if (this.user.id) {
      this.http.put('/users/' + this.user.id, JSON.stringify({user: this.user}))
        .map(res => res.json())
        .subscribe(
          (data) => {
            this.router.navigate(['UserList']);
          },
          (response: Response) => {
            this.handleError(response);
          }
        );
    } else {
      this.http.post('/users', JSON.stringify({user: this.user}))
        .map(res => res.json())
        .subscribe(
          (data) => {
            this.user.id = data.id;
            this.router.navigate(['UserList']);
          },
          (response: Response) => {
            this.handleError(response);
          }
        );
    }
  }

}
