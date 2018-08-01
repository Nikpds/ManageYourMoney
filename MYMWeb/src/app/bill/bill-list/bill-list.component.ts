import { Component, OnInit } from '@angular/core';

import { BaseService } from '../../shared/base.service';
import { NotifyService } from '../../shared/notify.service';
import { UserRequest, Bill } from '../../model';
@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.sass']
})
export class BillListComponent implements OnInit {
  request = new UserRequest();
  bills = new Array<Bill>();
  lastdate: number;
  constructor(
    private notify: NotifyService,
    private base: BaseService
  ) { }

  ngOnInit() {
    this.getBillsByMonth();
  }

  getBillsByMonth() {
    this.base.getBillsByMonth(this.request).subscribe(res => {
      this.bills = res;
    });
  }

  isNewDate(i: number) {
    if (i === 0) {
      this.lastdate = new Date(this.bills[i].paidDate).getDay();
      return true;
    } else {
      const d = new Date(this.bills[i].paidDate).getDay();
      return d === this.lastdate ? false : true;
    }
  }

  changeMonth(add: boolean) {
    const m = add ? 1 : -1;
    this.request.requestDate = new Date(this.request.requestDate.setMonth(this.request.requestDate.getMonth() + m));
    this.getBillsByMonth();
  }
}
