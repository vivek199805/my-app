import { Component, OnInit } from '@angular/core';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { config } from 'src/app/service/config';
import { CommonService } from 'src/app/_helpers/common/common.service';
import { RiCustomMdlService } from 'src/app/_helpers/common/custome-modal/ri-custom-mdl/ri-custom-mdl.service';
import { LoaderService } from 'src/app/_helpers/common/loader.service';


@Component({
  selector: 'app-transaction-confirm',
  templateUrl: './transaction-confirm.component.html',
  styleUrls: ['./transaction-confirm.component.css']
})
export class TransactionConfirmComponent implements OnInit {


  mobile: string = "";
  dmtInfo: any = null;
  dmtLoginInfo: any = null;
  dmtTransaction: any = null;
  isLoggedin: boolean = true;
  form: any = FormGroup;
  transfer_type: string = 'IMPS';
  wallet: string = '';
  getResult: boolean = false;

  invoiceObj: any = [];
  mdlId: any = 'testRecipt';
  sliptype:any ='dmttrans';
  refid:any;
  constructor(
    private fb: FormBuilder,
    private common: CommonService,
    private auth: ApiService,
    private route: Router,
    private loader: LoaderService,
    private _RiCustomMdlService: RiCustomMdlService) {
    this.form = this.fb.group({
      transfer_type: ['', [Validators.required]],
      // wallet: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (typeof (localStorage.getItem('dmtInformation')) !== 'undefined' && localStorage.getItem('dmtInformation') !== '' && localStorage.getItem('dmtInformation') !== null) {
      let decode: any = EncodeDecode('n', localStorage.getItem('dmtInformation'));
      this.dmtInfo = JSON.parse(decode);
      this.mobile = this.dmtInfo.mobile;
      this.isLoggedin = true;
    } else {
      this.route.navigate(['dmt']);
      this.isLoggedin = false;
    }

    // if (typeof (localStorage.getItem('dmtLoginInfo')) !== 'undefined' && localStorage.getItem('dmtLoginInfo') !== '' && localStorage.getItem('dmtLoginInfo') !== null) {
    //   let decode: any = EncodeDecode('n', localStorage.getItem('dmtLoginInfo'));
    //   this.dmtLoginInfo = JSON.parse(decode);
    // } else {
    //   this.isLoggedin = false;
    // }

    if (typeof (localStorage.getItem('dmtTransaction')) !== 'undefined' && localStorage.getItem('dmtTransaction') !== '' && localStorage.getItem('dmtInformation') !== null) {
      let decode: any = EncodeDecode('n', localStorage.getItem('dmtTransaction'));
      this.dmtTransaction = JSON.parse(decode);
      this.dmtTransaction.amountInWords = this.common.convertNumberToWords(this.dmtTransaction.amount);
      this.wallet = this.dmtTransaction.wallet_type[0].key;
    } else {
      this.isLoggedin = false;
    }
    if (this.isLoggedin == false) {
      Swal.fire({
        icon: 'error',
        title: "Invalid User"
      });
      this.route.navigate(['dmt']);
    }
  }
  goBack() {
    localStorage.removeItem('dmtTransaction');
    this.route.navigate(['dmt/dashboard']);
  }
  onSubmit() {
    this.getResult = true;
    if (!this.form.valid) {
      return;
    } else {
      Swal.fire({
        title: 'Are you sure you would like to confirm this transaction?',
        showCancelButton: true,
        icon: 'info',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        this.loader.loaderEvent.emit(true)
        if (result.isConfirmed) {
          const formdata = new FormData();
          formdata.append('token', config.tokenauth);
          formdata.append('mobile', this.mobile);
          // formdata.append('pipe', 'bank1'); 
          // formdata.append('gst_state', '07'); 
          // formdata.append('pincode', '110096'); 
          formdata.append('amount', this.dmtTransaction.amount);
          formdata.append('bene_id', this.dmtTransaction.receiver.id);
          // formdata.append('referenceid', this.dmtTransaction.referenceid); 
          formdata.append('unicode', this.dmtTransaction.unicode);
          
          formdata.append('txntype', this.form.get('transfer_type')?.value);
          // formdata.append('wallet_type', this.form.get('wallet')?.value); 
         // debugger;
          this.auth.postdata(formdata, config.dmt.dmtTransactionConfirm).subscribe((res: any) => {
                this.refid = res.data.refid;
               console.log(this.refid);
            Swal.fire({
              icon: res.statuscode != 2001 ? 'success' : 'error',
              title: res.message,
              
            })
              .then((result) => {
                if (res.statuscode != 2001) {
                 // debugger;
                  this.loader.loaderEvent.emit(false)
                  // this.invoiceObj = res.data;
                  this.getReceipt();
                  // this._RiCustomMdlService.open(this.mdlId);
                }
              });

          });
        }
      })
    }
  }

  get f() { return this.form.controls; }

  getReceipt(){
    const formdata1 = new FormData();
    formdata1.append('token', config.tokenauth);
    formdata1.append('refid', this.refid);
    this.auth.postdata(formdata1, config.statement.getreceipt).subscribe((res: any) => {     
      if (res.statuscode == 200) {
        this.invoiceObj = res.data;
       // debugger;
        this._RiCustomMdlService.open(this.mdlId);
      }
    });
  }

  slipClose() {
    const url = this.route.url;
    this._RiCustomMdlService.close(this.mdlId);
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate(['/dmt']);
    });
  }
}
