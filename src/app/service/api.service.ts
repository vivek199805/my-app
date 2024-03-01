import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EncodeDecode } from '../_helpers/encode-decode';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private sesion_data: any = '';
  private onboarding_token: any = '';

  private whitelabel: boolean = false;
  private domainData: any = '';
  private ipAddress: any = '';
  constructor(private http: HttpClient, private router: Router) {

  }

  reloadTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  Getsessiondata() {
    let userType: any = [
      'Super Admin', 'Admin', 'Partner', 'Super Distributer', 'Distruibuter', 'Retailer', 'ASM'
    ];
    if (localStorage.getItem('LoginDetails')) {
      let encode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
      this.sesion_data = JSON.parse(encode);
      const jsondata = this.sesion_data;
      jsondata.usertypename = userType[jsondata.usertype];
      //console.log(jsondata)
      return jsondata;
    } else {
      return false;
    }
  }
  isLoggedIn() {
    if (localStorage.getItem('LoginDetails')) {
      let encode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
      this.sesion_data = JSON.parse(encode);
      const jsondata = this.sesion_data.loginsession;
      return jsondata;
    } else {
      return false;
    }
  }
  // isChangepass() {
  //   if (localStorage.getItem('Verifydetail') !== null) {
  //     let encode: any = EncodeDecode('n', localStorage.getItem('Verifydetail'));
  //     const tokenn = JSON.parse(encode);
  //     return tokenn.loginsession;
  //   } else {
  //     return false;
  //   }
  // }
  isToken() {
    const lstorage = localStorage.getItem('LoginDetails');
    if (lstorage == null || lstorage == "") {
      return "";
    } else {
      let encode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
      this.sesion_data = JSON.parse(encode);
      const jsondata = this.sesion_data.loginsession;
      return jsondata;
    }
  }

  OnboardingToken() {
    if (localStorage.getItem('onboarding') !== null) {
      let data = localStorage.getItem('onboarding');
      this.onboarding_token = data;
      return this.onboarding_token;
    } else {
      return false;
    }
  }

  postdata(payload: any, path: string): Observable<any> {
    return this.http.post<any>(environment.apiBaseUrl + path, payload)
      .pipe(
        retry(0),
        catchError(this.errorHandl)
      )
  }

  postdata1(payload: any, path: string): Observable<any> {
    let headers = new HttpHeaders()
    headers = headers.set("Content-Type", "multipart/form-data");
    return this.http.post<any>(environment.apiBaseUrl + path, payload, { headers })
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  getdata(path: string): Observable<any> {
    return this.http.get<any>(environment.apiBaseUrl + path)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  errorHandl(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
  //console.log(errorMessage);
    return throwError(errorMessage);
  }

  getLocationService(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude })
      })
    })
  }
  onLogout() {
    localStorage.removeItem('LoginDetails');
    localStorage.removeItem('cashdeposit');
    localStorage.clear();
  }

  setDomainColor() {
    let storage: any = localStorage.getItem('domainSettings');
    if (storage !== null) {
      let color: any = JSON.parse(storage).color;
      if (typeof color === 'object' && color !== null) {
        document.documentElement.style.setProperty('--theme-color', color.primary);
        document.documentElement.style.setProperty('--custom-secondary', color.secondary);
        document.documentElement.style.setProperty('--custom-tertiary', color.tertiary);
        document.documentElement.style.setProperty('--custom-sidebar-color', color.sidebarImage);
        document.documentElement.style.setProperty('--custom-data-table-color', color.dataTable);
      }
    }
  }

  validDomian(after: any) {
    // let storage = localStorage.getItem('domainSettings');
    // if (storage == null && storage != '') {
      const formdata = new FormData();
      formdata.append('domain', window.location.hostname);
      // formdata.append('domain', window.location.hostname +'/multipe/');
      formdata.append('ip', this.ipAddress);
      this.postdata(formdata, 'setting/Setting/get/').subscribe((res: any) => {
        if (res.statuscode == 200) {
          if (after && typeof after === 'function') {
            after(res.data);
          }
          this.whitelabel = true;
          localStorage.setItem('domainSettings', JSON.stringify(res.data));
          this.setDomainColor();
        } else {
          this.router.navigate(['/page-not-found']);
        }
      });
    // } else {
    //   if (after && typeof after === 'function') {
    //     after(JSON.parse(storage));
    //   }
    //   this.whitelabel = true;
    // }
    return this.whitelabel;
  }

  testing() {
    return 'okay';
  }


  pincodedata(payload:any){
    return this.http.post<any>('https://kyc.vsts.net.in/server/public/index.php/api/getPincodesData', payload)
    .pipe(
      retry(0),
      catchError(this.errorHandl)
    )
  }

  domainSettings(): any {
    let storage = localStorage.getItem('domainSettings');
    if (storage !== null) {
      return JSON.parse(storage);
    } else {
      return false;
    }
  }
}
