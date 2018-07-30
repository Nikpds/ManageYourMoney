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
  date = new UserRequest();
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
    this.base.getBillsByMonth(this.date).subscribe(res => {
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
}
