import { Component, OnInit } from '@angular/core';

import { BaseService } from '../../shared/base.service';
import { NotifyService } from '../../shared/notify.service';
import { Category } from '../../model';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit {
  categories = new Array<Category>();
  constructor(
    private notify: NotifyService,
    private base: BaseService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.base.getCategories().subscribe(res => {
      this.categories = res;
    });
  }

}
