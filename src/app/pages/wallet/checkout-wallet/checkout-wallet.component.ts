import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { RiCustomMdlService } from 'src/app/_helpers/common/custome-modal/ri-custom-mdl/ri-custom-mdl.service';
import { LoaderService } from 'src/app/_helpers/common/loader.service';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout-wallet',
  templateUrl: './checkout-wallet.component.html',
  styleUrls: ['./checkout-wallet.component.css']
})
export class CheckoutWalletComponent implements OnInit {
  form: any = FormGroup;
  formdata: any;
  walletInfo: any;
  mobile: any = '';
  amount: any = 200;
  referenceid: any;
  txntoken: any;
  reqMappingId: any;
  mdlId: any = 'testRecipt';
  invoiceObj: any = [];
  constructor(
    private _auth: ApiService,
    private fb: FormBuilder,
    private route: Router,
    private loader:LoaderService,
    private _RiCustomMdlService: RiCustomMdlService
  ) { 
    this.form = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern('[6789][0-9]{9}')]],
      amount: ['', [Validators.required]],
      benename: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (typeof (localStorage.getItem('paytminfo')) !== 'undefined' && localStorage.getItem('paytminfo') !== '' && localStorage.getItem('paytminfo') !== null) {
      let decode: any = EncodeDecode('n', localStorage.getItem('paytminfo'));
      this.walletInfo = JSON.parse(decode);  
      this.txntoken = this.walletInfo.txntoken;
      this.referenceid = this.walletInfo.referenceid;
      this.reqMappingId = this.walletInfo.reqMappingId;
      // console.log(this.walletInfo);
    }

    if(typeof(localStorage.getItem('paytmDet'))){
      let encodesesson :any = localStorage.getItem('paytmDet');
      let userD :any = JSON.parse(encodesesson);
      this.mobile =userD.mobile;
      this.amount=userD.amount;
      // console.log(this.amount);
      
    }

  }

  onSubmit(){
    this.loader.loaderEvent.emit(true)
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('mobile', this.mobile);
    formdata.append('amount', this.amount);
    formdata.append('benename',this.form.get('benename').value);
    formdata.append('reqMappingId', this.reqMappingId);
    formdata.append('referenceid', this.referenceid);
    formdata.append('txntoken', this.txntoken);
    this._auth.postdata(formdata, config.paytm.checkout).subscribe((res: any) => {
      if (res.statuscode == 200) {
        this.loader.loaderEvent.emit(false)
        Swal.fire({
          title: res.message,
          icon: 'success'
        }).then((result) => {
          localStorage.removeItem('paytmDet');
          localStorage.removeItem('paytminfo');
          this.invoiceObj = res.data;  
          this._RiCustomMdlService.open(this.mdlId); 
        }); 
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    })
  }
  slipClose() {
    const url = this.route.url;
    this._RiCustomMdlService.close(this.mdlId);
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate(['/paytm-wallet']);
    });
  }
  get f() { return this.form.controls }
}
