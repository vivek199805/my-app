import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';
import { Select2OptionData } from 'ng-select2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-fund-request',
  templateUrl: './create-fund-request.component.html',
  styleUrls: ['./create-fund-request.component.css']
})
export class CreateFundRequestComponent implements OnInit {
  cashDeposite:any = FormGroup;
  form: any = FormGroup;
  formexceptional:any = FormGroup;
  minDate!: Date;
  maxDate!: Date;
  depositeddate: any = '';
  slipImage: any;
  bankLisitng: Array<Select2OptionData> = [];
  requestList: Array<Select2OptionData> = [
    { text: 'Cash Deposit', id: '0' },
    { text: 'Cash/CDM Deposit', id: '1' },
    { text: 'RTGS/IMPS', id: '2' },
    { text: 'Bank Transfer', id: '3' },
    { text: 'Cash Pickup', id: '4' },
    { text: 'Exceptional Request', id: '5' },
  ];

  constructor(private auth: ApiService,
    private fb: FormBuilder, 
    private datepipe: DatePipe,
    private route: Router, private router: Router) {
      this.form = this.fb.group({
        requesttype: ['', [Validators.required]],
        amount: ['', [Validators.required, Validators.pattern('[0-9]+')]],
        txnid: ['', [Validators.required]],
        depositeddate: ['', [Validators.required]],
        bankid: ['', [Validators.required]],
        depositedbranch: ['', [Validators.required]],
        slipImage: ['',[Validators.required]]
      });

    this.cashDeposite = this.fb.group({
      requesttype: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      txnid: ['', [Validators.required]],
      depositeddate: ['', [Validators.required]],
      bankid: ['', [Validators.required]],
      depositedbranch: ['', [Validators.required]],
      slipImage: ['', [Validators.required]]
    });
    this.formexceptional = this.fb.group({
      remarks: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      slipImage: ['',[Validators.required]]
    });
  }


  ngOnInit(): void {
    
    const DateValue = new Date();
    this.minDate = new Date(1950, 1, 1);
    this.maxDate = new Date(DateValue.getFullYear(), DateValue.getMonth(), DateValue.getDate());
    this.getbank();
  }

  getbank() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.auth.postdata(formdata, config.companybank.list).subscribe((res: any) => {
      if (res.statuscode == 200) {
        let arr = [];
        for (var v of res.data) {
          arr.push({ id: v.id, text: v.name });
        }
        this.bankLisitng = arr;
      }
    });
  }

  handleFileInput1(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.slipImage = file;
    }
  }

  CDeposite(){
    if (!this.cashDeposite.valid) {
      return;
    } else {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('requesttype', this.cashDeposite.get('requesttype')?.value);
      formdata.append('amount', this.cashDeposite.get('amount')?.value);
      formdata.append('txnid', this.cashDeposite.get('txnid')?.value);
      formdata.append('bankid', this.cashDeposite.get('bankid')?.value);
      formdata.append('depositedbranch', this.cashDeposite.get('depositedbranch')?.value);
      let depositeddate: any = this.transform(this.cashDeposite.get('depositeddate')?.value);
      formdata.append('depositeddate', depositeddate);
      formdata.append('image', this.slipImage);
      this.auth.postdata(formdata, config.fund.request).subscribe((res: any) => {
        if (res.statuscode == 200) {
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
          this.route.navigate(['fund/list']);
        } else {
          Swal.fire({
            icon: 'error',
            title: res.message
          });
        }
      });
    }
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    } else {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('requesttype', this.form.get('requesttype')?.value);
      formdata.append('amount', this.form.get('amount')?.value);
      formdata.append('txnid', this.form.get('txnid')?.value);
      formdata.append('bankid', this.form.get('bankid')?.value);
      formdata.append('depositedbranch', this.form.get('depositedbranch')?.value);
      let depositeddate: any = this.transform(this.form.get('depositeddate')?.value);
      formdata.append('depositeddate', depositeddate);
      formdata.append('image', this.slipImage);
      this.auth.postdata(formdata, config.fund.request).subscribe((res: any) => {
        if (res.statuscode == 200) {
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
          this.route.navigate(['fund/list']);
        } else {
          Swal.fire({
            icon: 'error',
            title: res.message
          });
        }
      });
    }
  }
  formexceptionalreq(){
    if (!this.formexceptional.valid) {
      return;
    } else {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('requesttype', '5');
      formdata.append('amount', this.formexceptional.get('amount')?.value);
      formdata.append('image', this.slipImage);
      this.auth.postdata(formdata, config.fund.request).subscribe((res: any) => {
        if (res.statuscode == 200) {
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
          this.route.navigate(['fund/list']);
        } else {
          Swal.fire({
            icon: 'error',
            title: res.message
          });
        }
      });
    }
  }
  
  transform(date: any) {
    return this.datepipe.transform(date, 'yyyy-MM-dd');
  }
  get c() { return this.cashDeposite.controls; }
  get f() { return this.form.controls; }
  get e() { return this.formexceptional.controls; }
}
