import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EncodeDecode } from '../_helpers/encode-decode';

@Injectable({
  providedIn: 'root'
})

export class UserResolverService implements Resolve<any> {
  usertype:any;
  constructor(private router: Router) {
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);  
    this.usertype = data.usertype;
  }
  resolve(route: ActivatedRouteSnapshot) {
  //console.log('Called Get Product in resolver...', route);
    if(this.usertype == '0'){
      return true
    }else{
      this.router.navigate(['/'])
      return false
    }
}
}
