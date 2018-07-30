import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE, OwlDateTimeIntl } from 'ng-pick-datetime';
import { LoaderService } from './loader.service';
import { NotifyService } from './notify.service';

import { BaseService } from './base.service';

export const MY_NATIVE_FORMATS = {
  fullPickerInput: { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }
};
export const DefaultIntl = {
  cancelBtnLabel: 'Κλείσιμο', setBtnLabel: 'Επιλογή'
};
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OwlNativeDateTimeModule,
    OwlDateTimeModule,
    HttpClientModule
  ],
  declarations: [

  ],
  providers: [
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS },
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'el' },
    { provide: OwlDateTimeIntl, useValue: DefaultIntl },
    NotifyService,
    LoaderService,
    BaseService
  ],
  exports: [
    OwlNativeDateTimeModule,
    OwlDateTimeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class SharedModule { }
