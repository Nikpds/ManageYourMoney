import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Bill, Category } from '../../model';
import { BaseService } from '../../shared/base.service';
import { NotifyService } from '../../shared/notify.service';
@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.sass']
})
export class BillDetailsComponent implements OnInit {
  bill: Bill;
  categories = new Array<Category>();
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private service: BaseService,
    private notify: NotifyService
  ) { }

  ngOnInit() {
    this.getCategories();
    this.notify.success('asdfasfda');
    this.activeRoute.params.subscribe((param: Params) => {
      const id = param['id'];
      if (id !== 'new') {
        this.getBill(id);
      } else {
        this.bill = new Bill();
      }
    });
  }

  getBill(id: string) {
    this.service.getBill(id).subscribe(res => {
      this.bill = res;
    }, error => {
      this.router.navigate(['/home']);
    });
  }

  insertOrUpate() {
    this.bill.id ? this.update() : this.insert();
  }

  getCategories() {
    this.service.getCategories().subscribe(res => {
      this.categories = res;
    });
  }

  update() {
    this.service.updateBill(this.bill).subscribe(res => {
      this.bill = res;
    });
  }

  insert() {
    this.service.insertBill(this.bill).subscribe(res => {
      this.bill = res;
      this.router.navigate(['/bill', this.bill.id]);
    });
  }
}
