import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Bill, Category, UserInfo } from '../model';
@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private billUrl = environment.api + '/bill';
  private catUrl = environment.api + '/category';
  private userUrl = environment.api + '/user';

  constructor(
    private http: HttpClient
  ) { }

  insertBill(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(`${this.billUrl}`, bill)
      .pipe(catchError(this.errorHandler));
  }
  updateBill(bill: Bill): Observable<Bill> {
    return this.http.put<Bill>(`${this.billUrl}`, bill)
      .pipe(catchError(this.errorHandler));
  }

  getBill(id: string): Observable<Bill> {
    return this.http.get<Bill>(`${this.billUrl}/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  getCategories(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(`${this.catUrl}/all`)
      .pipe(catchError(this.errorHandler));
  }

  deleteBill(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.billUrl}/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  getInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.userUrl}/info`)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.error || 'Server Error');
  }
}
