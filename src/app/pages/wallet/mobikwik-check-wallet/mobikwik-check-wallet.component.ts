import { ApiService } from 'src/app/service/api.service';
import { CustomModelComponent } from 'src/app/_helpers/custom-model/custom-model.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';

@Component({
  selector: 'app-mobikwik-check-wallet',
  templateUrl: './mobikwik-check-wallet.component.html',
  styleUrls: ['./mobikwik-check-wallet.component.css']
})
export class MobikwikCheckWalletComponent implements OnInit {
  @ViewChild(CustomModelComponent) model!:CustomModelComponent;
  form: any = FormGroup;
  formdata: any;
  constructor(
    private _auth: ApiService,
    private fb: FormBuilder,
    private route: Router
  ) {
    this.form = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern('[6789][0-9]{9}')]],
      amount: ['', [Validators.required]]
    });
   }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    } else {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('mobile', this.form.get('mobile').value);
      formdata.append('amount', this.form.get('amount').value);
      this._auth.postdata(formdata, config.mobikwik.sendotp).subscribe((res: any) => {
        if (res.statuscode == 200) {
          // Swal.fire({
          //   title: res.message,
          //   icon: 'success'
          // });
          this.model.showModal = true;
        } else {
          Swal.fire({
            icon: 'error',
            title: res.message
          });
        }
      })
    }
  } 
  moveFocus() {
    const otpList = this.model.getOtp();
    if (otpList.length == 6) {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('mobile', this.form.get('mobile').value);
      formdata.append('amount', this.form.get('amount').value);
      formdata.append('otp', otpList);
      this._auth.postdata(formdata, config.mobikwik.verifyotp).subscribe((res: any) => {
        if (res.statuscode == 200) {
          Swal.fire({
            icon: 'success',
            title: res.message
          })
          let encode: any = EncodeDecode(JSON.stringify(res), 'n');
          let userD :any = {
            mobile:this.form.get('mobile').value,
            amount:this.form.get('amount').value
            }
          localStorage.setItem('mobikwikDet',JSON.stringify(userD)); 
          localStorage.setItem('mobikwikinfo', encode);
          this.route.navigate(['mobikwik-checkout']);
        } else { 
          this.model.clearField();
          Swal.fire({
            icon: 'error',
            title: res.message
          })
        }
      })
    }
  } 
  resend_otp() { 
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('mobile', this.form.get('mobile').value);
      formdata.append('amount', this.form.get('amount').value);
      this._auth.postdata(formdata, config.mobikwik.sendotp).subscribe((res: any) => {
        if (res.statuscode == 200) {
          Swal.fire({
            icon: 'success',
            title: res.message
          })
        } else {
          this.model.clearField();
          this.model.showModal = false;
          Swal.fire({
            icon: 'error',
            title: res.message
          })
        }
      })
  } 
  get f() { return this.form.controls }
}
