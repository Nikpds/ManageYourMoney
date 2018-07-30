import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { BillListComponent } from './bill-list/bill-list.component';
import { AuthGuard } from '../auth/auth.guard';
import { BillDetailsComponent } from './bill-details/bill-details.component';
import { CategoryComponent } from './category/category.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Route[] = [
  { path: 'bill/:id', component: BillDetailsComponent, canActivate: [AuthGuard] },
  { path: 'bill/new', component: BillDetailsComponent, canActivate: [AuthGuard] },
  { path: 'bills', component: BillListComponent, canActivate: [AuthGuard] },
  { path: 'category/:id', component: CategoryComponent, canActivate: [AuthGuard] },
  { path: 'category/new', component: CategoryComponent, canActivate: [AuthGuard] },
  { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    BillDetailsComponent,
    BillListComponent,
    CategoryComponent,
    CategoriesComponent
  ]
})
export class BillModule { }
