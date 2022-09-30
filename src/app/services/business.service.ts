import { Observable, throwError as observableThrowError } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BUSINESS_DATA_KEY } from '../constant/constants';
@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  businessUserData: any;

  constructor(private http: HttpClient) {}

  getBusinessDetails(user_id) {
    // const url = `http://127.0.0.1:8000/api/getuserbusiness/${user_id}`;
    const url = `${environment.baseUrl}/getuserbusiness/${user_id}`;
    return this.http.get(url).pipe(
      map((response) => {
        if (response['data']) {
          this.businessUserData = response['data'];
          localStorage.setItem(
            BUSINESS_DATA_KEY,
            JSON.stringify(this.businessUserData)
          );
        }
        return response['data'];
      }),

      catchError((error: HttpErrorResponse) => {
        console.error('Error:', error.message);
        return observableThrowError(error);
      })
    );
  }

  getModulesData(credentials): Observable<any> {
    const url = `${environment.baseUrl}/getmodulesdata`;
    // const url = 'http://127.0.0.1:8000/api/getmodulesdata';
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${credentials}`,
    });
    return this.http.get(url, { headers: headers }).pipe(
      map((response) => {
        return response["data"];
      }),
      catchError((error: HttpErrorResponse) => {
        console.error("Error: ", error.message);
        return observableThrowError(error);
      })
    );
  }

  getClientDetails(getmomoclientdata, credentials) {
    const url = `${environment.baseUrl}/getmomoclientdata`;
    const params = new HttpParams()
      .set('user_id', getmomoclientdata['user_id'])
      .set('module_id', getmomoclientdata['module_id'])
      .set('operator', getmomoclientdata['operator'])
      .set('phone_no', getmomoclientdata['phone_no'])
      .set('currency', getmomoclientdata['currency'])
      .set('country', getmomoclientdata['country'])
      .set('amount', getmomoclientdata['amount']);

    // const url = `http://127.0.0.1:8000/api/getmomoclientdata?phone_no=${getmomoclientdata}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${credentials}`,
      'Content-Type': 'application/json',
    });
    return this.http.get(url, { headers: headers, params: params }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error', error.message);
        if (error.status === 404) {
          return [{ status: false, message: error.error }];
        } else {
          return observableThrowError(error);
        }
      })
    );
  }

  createtransfer(data) {
    const url = `${environment.baseUrl}/createtransfer`;
    return this.http.post(url, data).pipe(
      map((response) => {
        return response;
      }),

      catchError((error: HttpErrorResponse) => {
        console.error('Error:', error.message);
        return observableThrowError(error);
      })
    );
  }

  verifyCollection(data, credentials) {
    const url = `${environment.baseUrl}/checkcollectionstatus`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${credentials}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(url, data, { headers: headers }).pipe(
      map((response) => {
        return response;
      }),

      catchError((error: HttpErrorResponse) => {
        console.error('Error:', error.message);
        return observableThrowError(error);
      })
    );
  }
}
