import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions = new Array<Subscription>();
  loggedIn = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.authService.loggedIn$.subscribe((login) => {
      this.loggedIn = login;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
