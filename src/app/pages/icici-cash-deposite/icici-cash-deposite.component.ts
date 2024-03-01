import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';
import { RiCustomMdlService } from 'src/app/_helpers/common/custome-modal/ri-custom-mdl/ri-custom-mdl.service';
import { LoaderService } from 'src/app/_helpers/common/loader.service';
@Component({
  selector: 'app-icici-cash-deposite',
  templateUrl: './icici-cash-deposite.component.html',
  styleUrls: ['./icici-cash-deposite.component.css']
})
export class IciciCashDepositeComponent implements OnInit {
  otp = {
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    input6: '',
  }
  mdlId: any = 'CashDepositeRecipt';
  invoiceObj: any = [];
  expression: boolean = false;
  form: any = FormGroup;
  formdata: any;
  private is_click: boolean = false;
  deatils: any;
  longitute: any;
  latitute: any;
  afterSendOtpDeatils: any;
  constructor(
    private _auth: ApiService,
    private fb: FormBuilder,
    private route: Router,
    private _RiCustomMdlService: RiCustomMdlService,
    private loader: LoaderService,
  ) {
    this.form = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern(/(6|7|8|9)\d{9}/), Validators.maxLength(10)]],
      account: ['', [Validators.required]],
      submerchantid: ['', [Validators.required]],
      amount: ['', [Validators.required]],
    });

  }
  get f() {
    return this.form.controls
  }


  ngOnInit(): void {
    this.getLocation();
    this.deatils = this._auth.Getsessiondata();
    this.form.patchValue({ submerchantid: this.deatils.permission.merchant_id })
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getLocation() {
    this._auth.getLocationService().then(resp => {
      this.longitute = resp.lng;
      this.latitute = resp.lat;
    })
  }

  onSubmit() {
 //console.log(this.longitute, this.latitute)
   if(this.longitute != undefined && this.latitute != undefined){
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('longitude', this.longitute);
    formdata.append('latitude', this.latitute);
    formdata.append('mobilenumber', this.form.get('mobile').value);
    formdata.append('accountnumber', this.form.get('account').value);
    formdata.append('submerchantid', this.form.get('submerchantid').value);
    formdata.append('amount', this.form.get('amount').value);
    this._auth.postdata(formdata, config.icicicashdeposit.sendotp).subscribe((res: any) => {
      if (res.status) {
        this.expression = true;
        this.afterSendOtpDeatils = res;
        Swal.fire({
          title: res.message,
          icon: 'success',
          timer:1000
        })
      } else {
        Swal.fire({
          title: res.message,
          icon: 'error'
        })
      }
    })
   }else{
    Swal.fire({
      title: 'Please allow the Location access!',
      icon: 'error'
    })
   }


  }

  moveFocus() {
    const otpList = this.otp.input1 + '' + this.otp.input2 + '' + this.otp.input3 + '' + this.otp.input4 + '' + this.otp.input5 + '' + this.otp.input6;
    if (otpList.length == 6) {
    //console.log(otpList)
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('otp', otpList);
      formdata.append('submerchantid', this.form.get('submerchantid').value);
      formdata.append('onetimetoken', this.afterSendOtpDeatils.onetimetoken);
      formdata.append('txnreferenceno', this.afterSendOtpDeatils.txnreferenceno);
      formdata.append('merchanttxnid', this.afterSendOtpDeatils.merchanttxnid);
      this._auth.postdata(formdata, config.icicicashdeposit.verifyOtp).subscribe((res: any) => {
        if (res.status) {
          const formdata = new FormData();
          formdata.append('token', config.tokenauth);
          formdata.append('onetimetoken', res.onetimetoken);
          formdata.append('txnreferenceno', res.txnreferenceno);
          formdata.append('merchanttxnid', this.afterSendOtpDeatils.merchanttxnid);
          this._auth.postdata(formdata, config.icicicashdeposit.doTransaction).subscribe((res: any) => {
            if (res.status) {
              this.loader.loaderEvent.emit(false);
            //console.log(res)
              this.form.reset();
              Swal.fire({
                title: res.message,
                icon: 'success'
              }).then((result) => {
                this.invoiceObj = res.data;
                this._RiCustomMdlService.open(this.mdlId);
              });
            } else {
              Swal.fire({
                title: res.message,
                icon: 'error'
              })
            }
          })
        } else {
          Swal.fire({
            title: res.message,
            icon: 'error'
          })
        }

      })
    }
  }

  slipClose() {
    const url = this.route.url;
    this._RiCustomMdlService.close(this.mdlId);
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([url]);
    });
  }

}
