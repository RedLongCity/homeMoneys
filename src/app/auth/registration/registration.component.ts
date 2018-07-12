import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'redlo-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(private userService: UsersService,
              private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [
          Validators.required,
          Validators.email
        ],
        this.forbiddenEmails.bind(this)),
      'password': new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      'name': new FormControl(null, [
        Validators.required
      ]),
      'agree': new FormControl(false, [
        Validators.requiredTrue
      ])
    });
  }

  onSubmit() {
    const {email, password, name} = this.form.value;
    const user: User = new User(email, password, name);
    this.userService.createNewUser(user)
      .subscribe((newUser: User) => {
        this.router.navigate(['/login'], {
          queryParams: {
            nowCanLogin: true
          }
        });
      });
  }

  forbiddenEmails(control: FormGroup): Promise<any> {
    return new Promise((resolve) => {
      this.userService.getUserByEmail(control.value)
        .subscribe((user: User[]) => {
          if (user.length > 0) {
            resolve({forbiddenEmail: true});
            console.log(this.form);
          } else {
            resolve(null);
          }
        });
    });
  }

}
