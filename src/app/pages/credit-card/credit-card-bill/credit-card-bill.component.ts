import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api.service';
import * as cardValidator from "card-validator";
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import { RiCustomMdlService } from 'src/app/_helpers/common/custome-modal/ri-custom-mdl/ri-custom-mdl.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-credit-card-bill',
  templateUrl: './credit-card-bill.component.html',
  styleUrls: ['./credit-card-bill.component.css']
})
export class CreditCardBillComponent implements OnInit {
  OTPnumber: any = '';
  typeCrad: any;
  Paydata: any = [];
  refId: any;
  form!: FormGroup
  firstPage: boolean = true;
  getData: boolean = false;
  secondPage: boolean = false;
  thirdPage: boolean = false;
  ConfirmationFailed: any;
  creditCardNumber: any;
  data: any;

  mdlId: any = 'testRecipt';
  constructor(private fb: FormBuilder, private auth: ApiService,
    private route: Router,
    private _RiCustomMdlService: RiCustomMdlService) {
    this.form = this.fb.group({
      CreditCardNo: ['', [Validators.required]],
      Creditcardtype: [''],
      amount: [''],
      cmfCreditCardNo: [''],
      cardholdeName: [''],
      mobileNumber: [''],
    });

    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    this.data = JSON.parse(decode);
  }

  ngOnInit(): void {
    this.form.get('CreditCardNo')?.valueChanges.subscribe(x => {
      if (x.length === 16) {
        var validationRes = cardValidator.number(x);
        this.creditCardNumber = x;
        this.typeCrad = Object.values(validationRes)[0].type;
        this.form.get('Creditcardtype')?.setValue(this.typeCrad)
        this.getData = true;
        this.form.controls["Creditcardtype"].setValidators(Validators.required);
        this.form.controls["amount"].setValidators(Validators.required);
        this.form.controls["cmfCreditCardNo"].setValidators(Validators.required);
        this.form.controls["cardholdeName"].setValidators(Validators.required);
        this.form.controls["mobileNumber"].setValidators(Validators.required);
      } else {
        this.getData = false;
        this.form.controls['Creditcardtype'].clearValidators()
        this.form.controls['amount'].clearValidators()
        this.form.controls['cmfCreditCardNo'].clearValidators()
        this.form.controls['cardholdeName'].clearValidators()
        this.form.controls['mobileNumber'].clearValidators()
      }


    })
  }

  confirmCreditnumber() {
    if (this.creditCardNumber === this.form.controls.cmfCreditCardNo.value) {

      this.form.controls['cmfCreditCardNo'].clearValidators()
    } else {
      this.form.controls["cmfCreditCardNo"].setValidators(Validators.required);
    }
  }

  onSubmit() {
    if (this.form.controls.amount.value <= 50000) {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('name', this.form.controls.cardholdeName.value);
      formdata.append('mobile', this.form.controls.mobileNumber.value);
      formdata.append('card_number', this.form.controls.cmfCreditCardNo.value);
      formdata.append('amount', this.form.controls.amount.value);
      formdata.append('network', this.typeCrad);
      this.auth.postdata(formdata, config.creditCard.requestOtp).subscribe((res: any) => {
        if (res.statuscode == 200) {
          this.refId = res.refid;
          this.secondPage = true;
          this.firstPage = false;
          this.thirdPage = false;
          Swal.fire({
            icon: 'success',
            title: 'OTP send Successfully'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: res.message
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: "Amount should be less than & equal to 50000."
      });

    }
  }


  get f() { return this.form.controls; }

  paybill() {
    if (this.OTPnumber == '') {
      Swal.fire({
        icon: 'error',
        title: 'Please Enter OTP'
      });
    } else {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('refid', this.refId);
      formdata.append('name', this.form.controls.cardholdeName.value);
      formdata.append('mobile', this.form.controls.mobileNumber.value);
      formdata.append('card_number', this.form.controls.cmfCreditCardNo.value);
      formdata.append('amount', this.form.controls.amount.value);
      formdata.append('network', this.typeCrad);
      formdata.append('otp', this.OTPnumber);
      this.auth.postdata(formdata, config.creditCard.paybill).subscribe((res: any) => {
        if (res.statuscode == 200) {

          // this.printInvoice(res);
          this.thirdPage = true;
          this.firstPage = false;
          this.secondPage = false;

          Swal.fire({
            icon: 'success',
            title: res.message,
          })
            .then((result) => {
              this.Paydata = res.data;
              this._RiCustomMdlService.open(this.mdlId);
            });

        } else {
          Swal.fire({
            icon: 'error',
            title: res.message
          });
        }
      });

    }
  }

  slipClose() {
    const url = this.route.url;
    this._RiCustomMdlService.close(this.mdlId);
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([url]);
    });
  }
  printInvoice() {
    // const printContent: any = document.getElementById("testPrit");
    const WindowPrt: any = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    let html = `
    <html>
      <head>
        <title>Print tab</title>
        <style>
        table {
         width:100%;
        }
        table, th, td {
          border:1px solid black;
          text-align:left;
          padding: 10px;
        }
        </style>
      </head>
      <body onload="window.print();">
      <table class="table table-bordered mb-0">
      <tbody>

          `
    for (const key in this.Paydata) {
      const element = this.Paydata[key];
      html += `
        <tr>
              <th>${key.toUpperCase()}</th>
              <td>${element}</td>
          </tr>
          `
    }
    html += `
          
          <tr>
              <th>Status</th>
              <td class="succes">
                  <h4 class="succe">Success </h4> <svg xmlns="http://www.w3.org/2000/svg"
                      style="color: #34e434;" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round" class="feather feather-check-circle">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
              </td>
          </tr>
          <tr>
              <th>Message</th>
              <td>${this.Paydata.message}</td>
          </tr>
      </tbody>
  </table>
      </body>
    </html>`
    WindowPrt.document.write(html);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
  }

}
