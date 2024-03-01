import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.css']
})
export class RefundComponent implements OnInit {
  form: any = FormGroup;
  formdata: any;
  dmttxnInfo: any;

  account:any;
  ackno:any;
  amount:any;
  customercharge:any;
  daterefunded:any;
  discount:any;
  gst:any;
  message:any;
  netcommission:any;
  referenceid:any;
  refundtxnid:any;
  tds:any;
  utr:any;

  constructor(
    private _auth: ApiService,
    private fb: FormBuilder,
    private route: Router
  ) {
    this.form = this.fb.group({
      referenceid: ['', [Validators.required]]
    });
  }
  get f() {
    return this.form.controls
  }

  ngOnInit(): void {
    if (typeof (localStorage.getItem('dmttxnInfo')) !== 'undefined' && localStorage.getItem('dmttxnInfo') !== '' && localStorage.getItem('dmttxnInfo') !== null) {
      let decode: any = EncodeDecode('n', localStorage.getItem('dmttxnInfo'));
      this.dmttxnInfo = JSON.parse(decode);  
    //console.log(this.dmttxnInfo);
      
      this.account = this.dmttxnInfo.data.account;
      this.ackno = this.dmttxnInfo.data.ackno;
      this.amount = this.dmttxnInfo.data.amount;
      this.customercharge = this.dmttxnInfo.data.customercharge;
      this.daterefunded = this.dmttxnInfo.data.daterefunded;
      this.discount = this.dmttxnInfo.data.discount;
      this.gst = this.dmttxnInfo.data.gst;
      this.message = this.dmttxnInfo.data.message;
      this.netcommission = this.dmttxnInfo.data.netcommission;
      this.referenceid = this.dmttxnInfo.data.referenceid;
      this.refundtxnid = this.dmttxnInfo.data.refundtxnid;
      this.tds = this.dmttxnInfo.data.tds;
      this.utr = this.dmttxnInfo.data.utr;
      
    } 
  }

  // onSubmit() {
  //   if (!this.form.valid) {
  //     return;
  //   } else {
  //     const formdata = new FormData();
  //     formdata.append('token', config.tokenauth);
  //     formdata.append('referenceid', this.form.get('referenceid').value);
  //     this._auth.postdata(formdata, config.dmt.txnstatus).subscribe((res: any) => {
  //       if (res.statuscode == 200) {
  //         Swal.fire({
  //           title: res.message,
  //           icon: 'success'
  //         });
  //         let encode: any = EncodeDecode(JSON.stringify(res), 'n');
  //         localStorage.setItem('dmttxnInfo', encode);
  //         // this.route.navigate(['dmt/dashboard']);
  //       } else {
  //         Swal.fire({
  //           icon: 'error',
  //           title: res.message
  //         });
  //       }
  //     })
  //   }
  // }


}
