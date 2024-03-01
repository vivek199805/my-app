import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../service/api.service';
import { config } from '../service/config';
import { UserLoginDtlService } from '../service/user-login-dtl.service';
import { LoaderService } from '../_helpers/common/loader.service';
import { EncodeDecode } from '../_helpers/encode-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  list: any;
  loginDetails: any;
  public details: any;
  viewData: any;
  userData: any;
  mainBalance: any;
  cashBalance: any;
  pmainBalance: any;
  pcashBalance: any;
  heading: any;
  logocolor:any;
  logo:any;
  icon: any;
  cd_balance:any;
  firmname:any;
  constructor(
    private auth: ApiService,
    private route: Router,
    private _UserLoginDtlService: UserLoginDtlService,
    private loader: LoaderService
  ) {
    // this.getverifyDetails()
    const encode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    const _permissionlist: any = JSON.parse(encode);
    this._UserLoginDtlService.setUserLoginDtl_Fn(_permissionlist);
    this.list = _permissionlist['permission'];
    this.firmname = _permissionlist.firmname;
    
    // console.log(this.list)
    this.details = {
      username : _permissionlist.username,
      firmname: _permissionlist.firmname,
      balance: _permissionlist.balance,
      pannumber: _permissionlist.pannumber,
      usertype: _permissionlist.usertype,
      allowfundrequest: _permissionlist.allowfundrequest,
      is_superadmin:  _permissionlist['permission'].is_superadmin,
      is_admin: _permissionlist['permission'].is_admin,

    }
   
  }

  ngOnInit(): void {
    this.loginDetails = this.auth.Getsessiondata();
    this.auth.validDomian((domainSettings: any) => {
      this.heading = domainSettings.heading; 
      this.logo = domainSettings.logo;
      this.logocolor = domainSettings.sidelogo;  
       
      
    }); 
    // if(this.details.usertype == '5'){
      this.getwalletbalance();
      if(this.details.usertype == '0'){
        this.getpaysprintmainbalance();
        this.getpaysprintcashbalance();
        }
      this.loader.loaderEvent.subscribe((data: any) => {
        ////console.log('hello data enter');
        if (!data) {
          this.getwalletbalance();
          if(this.details.usertype == '0'){
            this.getpaysprintmainbalance();
            this.getpaysprintcashbalance();
            }
        }
      });
    // }
    if (typeof (localStorage.getItem('LoginDetails')) !== 'undefined' && localStorage.getItem('LoginDetails') !== '') {
      let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
      let data: any = JSON.parse(decode);
      this.viewData = data;
      this.cashBalance = data.balance;
      this.mainBalance = data.cd_balance;
      this.cd_balance = data.cd_balance;
    } else {
      this.route.navigate(['login']);
    }

  }

  logout(){

    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.auth.postdata(formdata, config.logout).subscribe((res: any) => {
      if (res.statuscode == 200) {
        this.auth.onLogout();
        this.route.navigate(['login']);
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });

    
  }


  getwalletbalance() {
    if(this.details.usertype == '0'){
      this.getpaysprintmainbalance();
      this.getpaysprintcashbalance();
      }
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.auth.postdata(formdata, config.walletbalance).subscribe((res: any) => {
      if (res.statuscode == 200) {
        if(this.details.usertype == 5){
          this.cashBalance = res.data.balance;
          this.mainBalance = res.data.cd_balance;
        }else{
          this.mainBalance = res.data.cd_balance;
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }

  getpaysprintmainbalance() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.auth.postdata(formdata, config.paysprintwalletbalance).subscribe((res: any) => {
    //console.log(res)
      if (res.statuscode == 200) {
        this.pmainBalance = res.main_balance;
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }

  getpaysprintcashbalance() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.auth.postdata(formdata, config.paysprintcashbalance).subscribe((res: any) => {
    //console.log(res)
      if (res.statuscode == 200) {
        this.pcashBalance = res.cash_balance;
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }

}
