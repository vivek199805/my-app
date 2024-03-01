import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';
import { Select2OptionData } from 'ng-select2';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
	gstStateList: Array<Select2OptionData> = [];
  form: any = FormGroup;
  dob: any = '';
  minDate!: Date;
  maxDate!: Date;
  mobile: string = "";
  dmtInfo: any = null;
  constructor(
    private fb: FormBuilder,
    private _auth: ApiService,
    private route: Router,
    private datepipe: DatePipe
  ) {
    this.form = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
      dob: ['', [Validators.required]],
      pincode: ['', [Validators.required,Validators.maxLength(6)]],
      address: ['', [Validators.required]],
      gst_state: ['', [Validators.required]],
      otp: ['', [Validators.required,Validators.maxLength(6)]]
    });


    const DateValue = new Date();
    this.minDate = new Date(1950, 1, 1);
    this.maxDate = new Date(DateValue.getFullYear(), DateValue.getMonth(), DateValue.getDate());

    // setting the min date and thus the max birth date allowing < 100 year old choosable birthdate
this.minDate.setDate( this.minDate.getDate() );
this.minDate.setFullYear( this.minDate.getFullYear() - 100 );

// setting the calendar's start date and youngest birth dates for > 18 years old
this.maxDate.setDate( this.maxDate.getDate() );
this.maxDate.setFullYear( this.maxDate.getFullYear() - 18 );
this.maxDate = this.maxDate;
  }

  ngOnInit(): void {
    if (typeof (localStorage.getItem('dmtInformation')) !== 'undefined' && localStorage.getItem('dmtInformation') !== '' && localStorage.getItem('dmtInformation') !== null) {
      let decode: any = EncodeDecode('n', localStorage.getItem('dmtInformation'));
      this.dmtInfo = JSON.parse(decode);
      this.mobile = this.dmtInfo.mobile;
    } else {
      // this.route.navigate(['dmt']);
    }
    this.gstState();
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    } else {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('mobile', this.dmtInfo.mobile);
      formdata.append('firstname', this.form.get('firstname')?.value);
      formdata.append('lastname', this.form.get('lastname')?.value);
      let dob: any = this.transform(this.form.get('dob')?.value);
      formdata.append('dob', dob);
      formdata.append('address', this.form.get('address')?.value);
      formdata.append('gst_state', this.form.get('gst_state')?.value);
      formdata.append('pincode', this.form.get('pincode')?.value);
      formdata.append('otp', this.form.get('otp')?.value);
      formdata.append('authcode', this.dmtInfo.authcode);
      formdata.append('stateresp', this.dmtInfo.stateresp);
      this._auth.postdata(formdata, config.dmt.register).subscribe((res: any) => {
        if (res.statuscode == 200) {         
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
          let decode: any = EncodeDecode(JSON.stringify(res), 'n');
          localStorage.setItem('dmtInformation', decode);
          this.route.navigate(['dmt/dashboard']);
        } else {
          Swal.fire({
            icon: 'error',
            title: res.message
          });
        }
      });
    }
  }

  resendOtp() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('mobile', this.mobile);
    this._auth.postdata(formdata, config.dmt.getRemmitance).subscribe((res: any) => { 
      if (res.statuscode == 205) {
        Swal.fire({
          title: res.message,
          icon: 'success'
        });
        let encode: any = EncodeDecode(JSON.stringify(res), 'n');
        localStorage.setItem('dmtInformation', encode); 
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    })
  }

  gstState() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this._auth.postdata(formdata, config.dmt.gststate).subscribe((res: any) => { 
      if (res.statuscode == 200) {
				let arr = [];
				for (var v of res.data) {  
					arr.push({id:v.stateId,text:v.statename}); 
				}
				this.gstStateList = arr;
      //console.log(arr);
        
			}else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    })
  }

  transform(date: any) {
    return this.datepipe.transform(date, 'yyyy-MM-dd');
  }
  get f() { return this.form.controls; }

}
