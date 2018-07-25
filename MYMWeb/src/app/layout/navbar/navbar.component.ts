import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  openmenu = false;
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {

  }

  logout() {
    this.auth.logout();
  }

}
