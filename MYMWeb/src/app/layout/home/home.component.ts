import { Component, OnInit, NgZone, Renderer2, ViewChild, ElementRef } from '@angular/core';

import { BaseService } from '../../shared/base.service';
import { UserInfo, UserRequest, Months } from '../../model';
import { NotifyService } from '../../shared/notify.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  request = new UserRequest();
  info = new UserInfo();
  @ViewChild('time')
  public myCounter: ElementRef;

  constructor(
    private zone: NgZone,
    private renderer: Renderer2,
    private service: BaseService,
    private notify: NotifyService
  ) {
    // this.zone.runOutsideAngular(() => {
    //   setInterval(() => {
    //     const d = new Date();
    //     this.renderer.setProperty(this.myCounter.nativeElement, 'textContent', `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`);

    //   }, 1);
    // });
  }
  ngOnInit() {
    this.getInfo();
  }

  getInfo() {
    this.service.getInfo(this.request).subscribe(res => {
      if (res.totalBills === 0) {
        this.notify.info('Δεν υπάρχουν λογαριασμοί για τον μήνα ' + Months[this.request.requestDate.getMonth()]);
        this.request = new UserRequest();
      } else {
        this.info = res;
      }
    });
  }

  changeMonth(add: boolean) {
    const m = add ? 1 : -1;
    this.request.requestDate.setMonth(this.request.requestDate.getMonth() + m);
    this.getInfo();
  }



}
