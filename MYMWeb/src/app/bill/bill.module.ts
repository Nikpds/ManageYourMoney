import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { BillDetailsComponent } from './bill-details/bill-details.component';
import { BillListComponent } from './bill-list/bill-list.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Route[] = [
  { path: 'bill/:id', component: BillDetailsComponent, canActivate: [AuthGuard] },
  { path: 'bill/new', component: BillDetailsComponent, canActivate: [AuthGuard] },
  { path: 'bills', component: BillListComponent, canActivate: [AuthGuard] }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    BillDetailsComponent,
    BillListComponent
  ]
})
export class BillModule { }
