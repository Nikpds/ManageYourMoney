import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { NotifyService } from '../../shared/notify.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscriptions = new Array<Subscription>();
  username: string;
  password: string;
  constructor(
    private auth: AuthService,
    private notify: NotifyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.auth.loggedIn$.subscribe((login) => {
      if (login) {
        this.router.navigate(['/home']);
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  login() {
    this.auth.login(this.username, this.password).subscribe(res => {
      if (res) {
        this.router.navigate(['/home']);
      } else {
      }
    }, err => {
      this.notify.warning(err.error);
      console.log(err);
    });
  }

}
