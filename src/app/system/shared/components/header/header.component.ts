import {Component, OnInit} from '@angular/core';
import {User} from '../../../../shared/models/user.model';
import {AuthService} from '../../../../shared/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'redlo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  date: Date = new Date();
  user: User;

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
    if (!this.user) {
      this.user = {'email': '', 'password': '', 'name': 'Гость'};
    }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
