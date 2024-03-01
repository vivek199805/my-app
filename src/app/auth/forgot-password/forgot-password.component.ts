import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { CustomModelComponent } from 'src/app/_helpers/custom-model/custom-model.component';
import Swal from 'sweetalert2';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild(CustomModelComponent) model!: CustomModelComponent;
  logocolor : string = '';
  forgotPass: any = FormGroup;
  longitute: string = '';
  latitute: string = '';
  submitted:boolean=false;
  constructor(
    private route: Router,
    private fb: FormBuilder,
    private _auth: ApiService,
  ) { 

    this.forgotPass = this.fb.group({
      username: ['', [Validators.required]],
    });
  }

 
  ngOnInit(): void {
    this.getLocation();
    this._auth.validDomian((domainSettings: any) => {
      this.logocolor = domainSettings.logocolor;       
    }); 
  }

  getLocation() {
    this._auth.getLocationService().then(resp => {
      this.longitute = resp.lng;
      this.latitute = resp.lat;
    })
  }

    forgotPasswordSentOtp() {
      this.submitted =true;
    if (this.latitute == "" && this.longitute == "") {
      Swal.fire({
        icon: 'error',
        title: 'Please allow the Location access! and You May Not Connected To Internet',
      })
    } else {
      //this.submitted = true; 
      const formdata = new FormData();
      formdata.append('username', this.forgotPass.get('username').value);
      formdata.append('token', config.tokenauth);
      formdata.append('latitude', this.latitute);
      formdata.append('longitude', this.longitute);
      //this.loading = true;
      this._auth.postdata(formdata, config.forgotpasswordSentOtp).subscribe((res: any) => {
        if (res.response == 200) {
          this.model.showModal = true;
        } else {
          Swal.fire({
            icon: 'error',
            title: res.message
          });
        }
      }
      )
    }

  }

  moveFocus() {
    const otpList = this.model.getOtp();
    if (otpList.length == 4) {
      const formdata = new FormData();
      formdata.append('username', this.forgotPass.get('username').value);
      formdata.append('token', config.tokenauth);
      formdata.append('latitude', this.latitute);
      formdata.append('longitude', this.longitute);
      formdata.append('otp', otpList);
      this._auth.postdata(formdata, config.forgotpasswordVerifyOtp).subscribe((res: any) => {
        if(res.response == 200) {
          let decode: any = EncodeDecode(JSON.stringify(res), 'n');
          localStorage.setItem('LoginDetails', decode);
          this.route.navigate(['change-password']);
        } else {
          Swal.fire(res.message)
        }
      })
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
      formdata.append('username', this.forgotPass.get('username').value);
      formdata.append('token', config.tokenauth);
      formdata.append('latitude', this.latitute);
      formdata.append('longitude', this.longitute);
      this._auth.postdata(formdata, config.resendotp).subscribe((res: any) => {
        if (res.response == 200) {
          Swal.fire({
            icon: 'error',
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

  get f() { return this.forgotPass.controls; }

}
