import { NgModule } from '@angular/core';

import { RouterModule, Route } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuard } from '../auth/auth.guard';


const routes: Route[] = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    LoginComponent,
    HomeComponent,
    NavbarComponent
  ], providers: [

  ], exports: [
    NavbarComponent
  ]
})
export class LayoutModule { }
