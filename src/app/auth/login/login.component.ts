import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'redlo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private usersService: UsersService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [
          Validators.email,
          Validators.required
        ]
      ),
      'password': new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  onSubmit() {
    const formData = this.form.value;
    this.usersService.getUserByEmail(formData.email)
      .subscribe((users: User[]) => {
        const user = users.length > 0 ? users[0] : undefined;
        if (user.password === formData.password) {
          window.localStorage.setItem('user', JSON.stringify(user));
          this.authService.login();
        }
      });

  }

}
