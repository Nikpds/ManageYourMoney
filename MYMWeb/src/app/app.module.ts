import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Route } from '@angular/router';

import { ToastrModule } from 'ngx-toastr';
import { LayoutModule } from './layout/layout.module';
import { BillModule } from './bill/bill.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { AppComponent } from './app.component';
const config = {
  autoDismiss: true,
  positionClass: 'toast-top-right',
  closeButton: true,
  preventDuplicates: true
};
const routes: Route[] = [];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BillModule,
    RouterModule.forRoot(routes),
    AuthModule,
    LayoutModule,
    SharedModule,
    ToastrModule.forRoot(config)

  ],
  providers: [

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
