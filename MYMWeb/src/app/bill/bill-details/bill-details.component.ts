import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { BaseService } from '../../shared/base.service';
import { Category, Bill } from '../../model';
import { NotifyService } from '../../shared/notify.service';
@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.sass']
})
export class BillDetailsComponent implements OnInit {
  categories = new Array<Category>();
  bill: Bill;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private notify: NotifyService,
    private base: BaseService
  ) { }

  ngOnInit() {
    this.getCategories();
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
    this.base.getBill(id).subscribe(res => {
      this.bill = res;
    }, error => {
      this.router.navigate(['/home']);
      this.notify.error(error);
    });
  }

  insertOrUpate() {
    this.bill.id ? this.update() : this.insert();
  }

  getCategories() {
    this.base.getCategories().subscribe(res => {
      this.categories = res;
    }, error => this.notify.error(error));
  }

  delete() {
    this.base.deleteBill(this.bill.id).subscribe(res => {
      if (res) {
        this.router.navigate(['/bills']);
        this.notify.success('Ο λογαριασμός διαγράφτηκε');
      }
    }, error => this.notify.error(error));
  }

  update() {
    this.base.updateBill(this.bill).subscribe(res => {
      this.bill = res;
      this.notify.success('Επιτυχής συνναλαγή');
    });
  }

  insert() {
    if (!this.checkIfValid()) { return; }
    this.base.insertBill(this.bill).subscribe(res => {
      this.bill = res;
      this.notify.success('Επιτυχής συνναλαγή');
      this.router.navigate(['/bill', this.bill.id]);
    }, error => this.notify.error(error));
  }

  checkIfValid(): boolean {
    if (this.bill.categoryId && this.bill.amount > 0) {
      return true;
    } else {
      this.notify.warning('Επιλέξτε την κατηγορία και συμπληρώστε το ποσό');
      return false;
    }
  }
}
