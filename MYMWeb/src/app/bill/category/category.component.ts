import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { BaseService } from '../../shared/base.service';
import { Category } from '../../model';
import { NotifyService } from '../../shared/notify.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.sass']
})
export class CategoryComponent implements OnInit {
  category: Category;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private notify: NotifyService,
    private base: BaseService
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe((param: Params) => {
      const id = param['id'];
      if (id !== 'new') {
        this.getCategory(id);
      } else {
        this.category = new Category();
      }
    });
  }

  getCategory(id: number) {
    this.base.getCategory(id).subscribe(res => {
      this.category = res;
      console.log(res);
    }, error => {
      this.router.navigate(['/home']);
      this.notify.error(error);
    });
  }

  insertOrUpate() {
    this.category.id ? this.update() : this.insert();
  }

  delete() {
    this.base.deleteCategory(this.category.id).subscribe(res => {
      if (res) {
        this.router.navigate(['/categories']);
        this.notify.success('Ο λογαριασμός διαγράφτηκε');
      }
    }, error => this.notify.error(error));
  }

  update() {
    this.base.updateCategory(this.category).subscribe(res => {
      this.category = res;
      this.notify.success('Επιτυχής συνναλαγή');
    });
  }

  insert() {
    if (!this.checkIfValid()) { return; }
    this.base.insertCategory(this.category).subscribe(res => {
      this.category = res;
      this.notify.success('Επιτυχής συνναλαγή');
      this.router.navigate(['/category', this.category.id]);
    }, error => this.notify.error(error));
  }

  checkIfValid(): boolean {
    if (this.category.description) {
      return true;
    } else {
      this.notify.warning('Συμπληρώστε τον Τίτλο της κατηγορίας');
      return false;
    }
  }

}
