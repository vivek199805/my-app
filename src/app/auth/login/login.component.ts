import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';
import { ConnectionService } from 'ng-connection-service';
import { CustomModelComponent } from 'src/app/_helpers/custom-model/custom-model.component';
import { UserLoginDtlService } from 'src/app/service/user-login-dtl.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild(CustomModelComponent) model!: CustomModelComponent;
  password:any; 
  show = false;
  heading: string = '';
  desc: string = '';
  logo: string = ''; 
  logocolor : string = '';
  login_image:string ='';
  timeLeft: number = 60;
  maxlength: any;
  totxt: any;
  mail : any;
  number : any ;
  alert: boolean = false;
  loading = true;
  error = '';
  message = '';
  submitted = false;
  logindata: any = FormBuilder;
  title = '';
  longitute: string = '';
  latitute: string = '';
  isSubmitted: boolean = false;
  checkPassword: any = {
    username: '',
    password: ''
  };
  loginbackground ='';
  loginscreen :any;
  status = 'ONLINE'; //initializing as online by default
  isConnected = true;
  site_name:any;
  constructor(
    private route: Router,
    private fb: FormBuilder,
    private _auth: ApiService,
    private connectionService: ConnectionService,
    private _UserLoginDtlService: UserLoginDtlService
  ) {
    this.logindata = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      isagreed: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
    this.password = 'password';
    this._auth.validDomian((domainSettings: any) => {
      this.heading = domainSettings.heading;
      this.title = domainSettings.heading;
      this.desc = domainSettings.desc;
      this.logo = domainSettings.logo;
      this.logocolor = domainSettings.logocolor; 
      this.loginscreen = domainSettings.logintheme;
      this.login_image = domainSettings.login_image;
      this.site_name = domainSettings.site_name
      this.number = domainSettings.mob_no2
      this.mail = domainSettings.email2
      this.loginbackground =domainSettings.loginbackground

      console.log(domainSettings);
      
    }); 


    this.getLocation(); 
    this._auth.isLoggedIn();
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        Swal.fire({
          title: 'You Are Online!!',
          icon: 'success'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Check Internet Connection! No Internet',
        })
      }
    });
  }

  login() {
  //console.log(this.logindata)
    if (!this.logindata.valid) {
      return;
    } else {
      // console.log([this.latitute,this.longitute]);
      if (this.latitute == "" && this.longitute == "") {
        Swal.fire({
          icon: 'error',
          title: 'Please allow the Location access! and You May Not Connected To Internet',
        })
      } else {
        //this.submitted = true; 
        const formdata = new FormData();
        formdata.append('username', this.logindata.get('username').value);
        formdata.append('password', this.logindata.get('password').value);
        formdata.append('token', config.tokenauth);
        formdata.append('latitude', this.latitute);
        formdata.append('longitude', this.longitute);
        //this.loading = true;
        this._auth.postdata(formdata, config.login).subscribe((res: any) => {
          if (res.response == 2001) {
            if (res.firstlogin == 0) {
              // let decode: any = EncodeDecode(JSON.stringify(res), 'n');
              // localStorage.setItem('LoginDetails', decode);
              this._UserLoginDtlService.setUserLoginDtl_Fn(res);
              this.route.navigate(['change-password']);
            }
            }else if(res.response == 2002){
                if (res.twostep == 1) {
                  this.model.showModal = true;
                  this.logindata.disable()
                } 
            }else if (res.response == 200) { 
              // let decode: any = EncodeDecode(JSON.stringify(res), 'n');
              // localStorage.setItem('LoginDetails', decode);
              this._UserLoginDtlService.setUserLoginDtl_Fn(res);
              this.route.navigate(['dashboard']);
            } else if (res.response == 404) {
              Swal.fire({
                icon: 'error',
                title: res.message
              })
            } 
        }
        )
      }
    }

  }
  getLocation() {
    this._auth.getLocationService().then(resp => {
      this.longitute = resp.lng;
      this.latitute = resp.lat;

    })
  }
  /* forgot_pwd() {
    this.route.navigate(['forgot-password']);
  } */
  moveFocus() {
    const otpList = this.model.getOtp();
    if (otpList.length == 4) {
      const formdata = new FormData();
      formdata.append('username', this.logindata.get('username').value);
      formdata.append('password', this.logindata.get('password').value);
      formdata.append('token', config.tokenauth);
      formdata.append('latitude', this.latitute);
      formdata.append('longitude', this.longitute);
      formdata.append('otp', otpList);
      this._auth.postdata(formdata, config.verify).subscribe((res: any) => {
        if (res.response == 200) {
          // let decode: any = EncodeDecode(JSON.stringify(res), 'n');
          // localStorage.setItem('LoginDetails', decode);
          this._UserLoginDtlService.setUserLoginDtl_Fn(res);
          this.route.navigate(['dashboard']);
        } else {
          Swal.fire(res.message)
        }
      })
    }
  }
  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
  resend_otp() {
    if (this.latitute == "" && this.longitute == "") {
      Swal.fire({
        title: 'Please allow the Location access!',
        icon: 'error'
      });
    } else {
      const formdata = new FormData();
      formdata.append('username', this.logindata.get('username').value);
      formdata.append('password', this.logindata.get('password').value);
      formdata.append('token', config.tokenauth);
      formdata.append('latitude', this.latitute);
      formdata.append('longitude', this.longitute);
      this._auth.postdata(formdata, config.resendotp).subscribe((res: any) => {
        if (res.response == 200) {
          Swal.fire({
            icon: 'success',
            title: res.message
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: res.message
          })
        }
      }
      )
    }
  }


  get f() { return this.logindata.controls; }

}
