import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EncodeDecode } from '../_helpers/encode-decode';

@Injectable({
  providedIn: 'root'
})
export class UserLoginDtlService {
  seterUserLoginDtl = new BehaviorSubject(null);
  geterUserLoginDtl = this.seterUserLoginDtl.asObservable();
  constructor() { }

  setUserLoginDtl_Fn(loginDtl: any) {

    this.seterUserLoginDtl.next(loginDtl);

    //Remove LoginDetails from localStorage
    localStorage.removeItem('LoginDetails')

    //Encode loginDtl object
    let decode: any = EncodeDecode(JSON.stringify(loginDtl), 'n');

    //Set LoginDetails to localStorage
    localStorage.setItem('LoginDetails', decode);

  }

  updateLocalStorage(obj: any) {

    const encode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let loginDtl: any = JSON.parse(encode);
    let userDtl: any = loginDtl;

    if (obj.constructor === Array) {
      obj.forEach(element => {
        if (userDtl[element.keyname]) {
          userDtl[element.keyname] = element.value;
        }
      });
    } else {
      if (userDtl[obj.keyname]) {
        userDtl[obj.keyname] = obj.value;
      }
    }

    this.setUserLoginDtl_Fn(userDtl);

  }


}
