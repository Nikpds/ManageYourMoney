import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from '../../../../node_modules/rxjs';

import { BaseService } from '../../shared/base.service';
import { UserInfo, UserRequest, Months, User } from '../../model';
import { NotifyService } from '../../shared/notify.service';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscriptions = new Array<Subscription>();
  request = new UserRequest();
  info = new UserInfo();
  user = new User();
  constructor(
    private service: BaseService,
    private notify: NotifyService,
    private auth: AuthService
  ) { }
  ngOnInit() {
    this.getInfo();
    this.subscriptions.push(this.auth.user$.subscribe((user) => {
      this.user = user;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  thisMonth() {
    this.request = new UserRequest();
    this.getInfo();
  }

  getInfo() {
    this.service.getInfo(this.request).subscribe(res => {
      // if (res.totalBills === 0) {
      //   this.notify.info('Δεν υπάρχουν λογαριασμοί για τον μήνα ' + Months[this.request.requestDate.getMonth()]);
      // }
      this.info = res;
    });
  }

  changeMonth(add: boolean) {
    const m = add ? 1 : -1;
    this.request.requestDate = new Date(this.request.requestDate.setMonth(this.request.requestDate.getMonth() + m));
    this.getInfo();
  }



}
