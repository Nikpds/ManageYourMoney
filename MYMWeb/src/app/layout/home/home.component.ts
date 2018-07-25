import { Component, OnInit, NgZone, Renderer2, ViewChild, ElementRef } from '@angular/core';

import { BaseService } from '../../shared/base.service';
import { UserInfo } from '../../model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  today = new Date();
  info = new UserInfo();
  @ViewChild('time')
  public myCounter: ElementRef;

  constructor(
    private zone: NgZone,
    private renderer: Renderer2,
    private service: BaseService) {
    // this.zone.runOutsideAngular(() => {
    //   setInterval(() => {
    //     const d = new Date();
    //     this.renderer.setProperty(this.myCounter.nativeElement, 'textContent', `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`);

    //   }, 1);
    // });
  }
  ngOnInit() {
    this.getInfo();
  }

  getInfo() {
    this.service.getInfo().subscribe(res => {
      this.info = res;
    });
  }



}
