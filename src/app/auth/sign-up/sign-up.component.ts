import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { PasswordReg } from 'src/app/_helpers/common/custom-validator/password-reg';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  logocolor : string = '';
  signup: any = FormGroup;
  maxDate!: Date;

  stages: any = 0;
  userId: any;
  sendToMobile: any;

  constructor(
    private auth: ApiService,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private route: Router
  ) {
    this.signup = this.fb.group({
      firstStep: this.fb.group({
        email: ['', [Validators.required, PasswordReg.patternValidator(
          /^\S+@\S+\.\S+$/,
          {
            emailNotValid: true
          }
        ),]],
        mobile: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/(7|8|9)\d{9}/)]],
      }),
      secondStep: this.fb.group({
        name: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
        address: ['', [Validators.required]],
        state: ['', [Validators.required]],
        pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
        dob: ['', [Validators.required]],
        pannumber: ['', [Validators.required, Validators.pattern(/[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]],
        // gstin: ['', [Validators.pattern(/\d{2}[A-Za-z]{5}\d{4}[A-Za-z]{1}[A-Za-z\d]{1}[Zz]{1}[A-Za-z\d]{1}$/)]],
        gstin: ['', [Validators.pattern("[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}")]],

        firmname: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        usertype: ['', [Validators.required]],
        termcondition: [false, [Validators.required]],
      })

    });
  }

  ngOnInit(): void {
    this.auth.validDomian((domainSettings: any) => {
      this.logocolor = domainSettings.logocolor;     
    }); 

    const date = new Date();
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    this.maxDate = new Date(this.maxDate.getFullYear() - 18, date.getMonth(), date.getDate() );
  }

  checkit(val: any) {
  //console.log(val);

  }

  verifyNewUser() {
    this.sendToMobile = this.firstForm.get('mobile')?.value;
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('phone', this.firstForm.get('mobile')?.value);
    formdata.append('email', this.firstForm.get('email')?.value);

    this.auth.postdata(formdata, config.signup.verifyUser).subscribe((res: any) => {
      if (res.statuscode == 2000) {    // GO TO OTP
        this.userId = res.userid;
        this.stages = 1;
      } else if (res.statuscode == 2001) {   // GO TO Detail form

        Swal.fire({
          title: res.message ?? 'message',
          icon: 'success'
        });
        this.stages = 2;
        this.userId = res.userid;
      } else if (res.statuscode == 2002) {   // USER ID AND PASSWORD ALREADY GENERATED

        this.stages = 3;
        this.userId = res.userid;
      } else if (res.statuscode == 2003) {   //  Email error
        this.firstForm.get('email')?.setErrors({ 'emailexist': res.message });

      } else if (res.statuscode == 2004) {   //  Mobile error
        this.firstForm.get('mobile')?.setErrors({ 'mobileNoExist': res.message });
      } else {
        Swal.fire({
          title: res.message,
          icon: 'error'
        });
      }

    });
  }

  sendOtp(otp: any) {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('otp', otp);
    formdata.append('userid', this.userId);
    this.auth.postdata(formdata, config.signup.verifyOtp).subscribe((res: any) => {

      if (res.statuscode == 2000) {    // GO TO OTP
        Swal.fire({
          title: res.message,
          icon: 'success'
        });
        this.stages = 2;
      } else {
        Swal.fire({
          title: res.message,
          icon: 'error'
        });
      }

    });

  }

  resendOtp() {
  //console.log('resendOtp');
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('userid', this.userId);
    this.auth.postdata(formdata, config.signup.resendotp).subscribe((res: any) => {
      Swal.fire({
        title: res.message,
        icon: res.statuscode == 200 ? 'success' : 'error'
      });
    });

  }

  submitNewUsetDtl() {
  //console.log(this.secondForm.value);

    if (!this.signup.valid) {
      return;
    } else {
      let dob: any = this.transform(this.secondForm.get('dob')?.value);
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('name', this.secondForm.get('name')?.value);
      formdata.append('address', this.secondForm.get('address')?.value);
      formdata.append('state', this.secondForm.get('state')?.value);
      formdata.append('pincode', this.secondForm.get('pincode')?.value);
      formdata.append('dob', dob);
      formdata.append('pannumber', this.secondForm.get('pannumber')?.value);
      formdata.append('gstin', this.secondForm.get('gstin')?.value);
      formdata.append('firmname', this.secondForm.get('firmname')?.value);
      formdata.append('gender', this.secondForm.get('gender')?.value);
      formdata.append('usertype', this.secondForm.get('usertype')?.value);
      formdata.append('userid', this.userId);
      this.auth.postdata(formdata, config.signup.signcreate).subscribe((res: any) => {
        if (res.statuscode == 2002) {

          Swal.fire({
            title: res.message,
            icon: 'success'
          });

          this.signup.reset();
          this.route.navigate(['/']);

        } else {
          Swal.fire({
            title: res.message,
            icon: 'error'
          });
        }
      });
    }
  }
  sendSms() {
  //console.log('resendOtp');
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('userid', this.userId);
    this.auth.postdata(formdata, config.signup.resendsms).subscribe((res: any) => {
      Swal.fire({
        title: res.message,
        icon: res.statuscode == 200 ? 'success' : 'error'
      });
      this.route.navigate(['/']);
    });
  }
  transform(date: any) {
    return this.datepipe.transform(date, 'yyyy-MM-dd');
  }

  // get f() { return this.signup.controls; }
  get firstForm() {
    return this.signup.get('firstStep');
  }
  get secondForm() {
    return this.signup.get('secondStep');
  }

}
