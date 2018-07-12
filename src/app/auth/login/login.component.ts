import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {AuthService} from '../../shared/auth.service';
import {Message} from '../../shared/models/message.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'redlo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  message: Message;

  constructor(private usersService: UsersService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.message = new Message('', '');
    this.route.queryParams
      .subscribe((params) => {
        if (params['nowCanLogin']) {
          this.showMessage('Пользователь зарегестрирован.', 'success');
        }
      });
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
        if (user) {
          if (user.password === formData.password) {
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            this.router.navigate(['/system', 'bill']);
          } else {
            this.showMessage('Пароль не верный!');
          }
        } else {
          this.showMessage('Пользователя не существует!');
        }
      });
  }

  private showMessage(text: string, type: string = 'danger') {
    this.message.type = type;
    this.message.text = text;
    setTimeout(() => {
      this.message.type = '';
      this.message.text = '';
    }, 3000);
  }

}
