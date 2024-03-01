import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { CustomModelComponent } from 'src/app/_helpers/custom-model/custom-model.component';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-send-otp',
  templateUrl: './send-otp.component.html',
  styleUrls: ['./send-otp.component.css']
})
export class SendOtpComponent implements OnInit {
  @ViewChild(CustomModelComponent) model!: CustomModelComponent;
  form: any = FormGroup;
  formdata: any;
  longitute: string = '';
  latitute: string = '';
  showModal: boolean = false;
  showname: boolean = false;
  merchanttxnid: any;
  txnreferenceno: any;
  onetimetoken: any;
  benename: any;
  constructor(
    private _auth: ApiService,
    private fb: FormBuilder,
    private route: Router
  ) {
    this.form = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern('[6789][0-9]{9}')]],
      accountnumber: ['', [Validators.required, Validators.pattern('[0-9]{9,18}')]],
      amount: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    });
   }

  ngOnInit(): void {
    this.getLocation();
    localStorage.removeItem('cashdeposit');
  }

  getLocation() {
    this._auth.getLocationService().then(resp => {
      this.longitute = resp.lng;
      this.latitute = resp.lat;
    })
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    } else {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('longitude', this.longitute);
      formdata.append('latitude', this.latitute);
      formdata.append('mobilenumber', this.form.get('mobile').value);
      formdata.append('accountnumber', this.form.get('accountnumber').value);
      formdata.append('submerchantid', 'VID1001');
      formdata.append('amount', this.form.get('amount').value);
      this._auth.postdata(formdata, config.CD.sendotp).subscribe((res: any) => {
    //console.log(res);
      
        if (res.statuscode == 200) {
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
          this.model.showModal = true;
          this.merchanttxnid = res.merchanttxnid;
          this.txnreferenceno = res.txnreferenceno;
          this.onetimetoken = res.onetimetoken;
        } else {
          Swal.fire({
            icon: 'error',
            title: res.message
          });
        }
      })
    }
  }

  verifyOTP() {
    const getotp = this.model.getOtp()
    if (getotp.length == 6) {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('otp', getotp);
      formdata.append('merchanttxnid', this.merchanttxnid);
      formdata.append('txnreferenceno', this.txnreferenceno);
      formdata.append('onetimetoken', this.onetimetoken);
      formdata.append('submerchantid', 'VID1001');

      this._auth.postdata(formdata, config.CD.verifyotp).subscribe((res: any) => {
        if (res.statuscode == 200) {
          this.model.showModal = false;
          this.showname = true;
          this.benename = res.beneficiaryName;
          this.txnreferenceno = res.txnreferenceno;
          this.onetimetoken = res.onetimetoken;
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: res.message
          });
          this.model.showModal = false;
          this.showname = false;
          localStorage.removeItem('cashdeposit');
        }
      });
    }
  }

  processed(){
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('merchanttxnid', this.merchanttxnid);
    formdata.append('txnreferenceno', this.txnreferenceno);
    formdata.append('onetimetoken', this.onetimetoken);
    this._auth.postdata(formdata, config.CD.transact).subscribe((res: any) => {
      if (res.statuscode == 200) {
        Swal.fire({
          title: res.message,
          icon: 'success'
        });
        this.model.showModal = false;
        this.showname = false;
         let encode: any = EncodeDecode(JSON.stringify(res), 'n');
          localStorage.setItem('cashdeposit', encode);
          this.route.navigate(['cash-deposit/transaction']);
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }

  get f() {
    return this.form.controls
  }

}
