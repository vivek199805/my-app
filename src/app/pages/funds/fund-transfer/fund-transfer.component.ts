import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.css']
})
export class FundTransferComponent implements OnInit {
  form: any = FormGroup;
  fromBanklist: Array<Select2OptionData> = [];
  toBanklist: Array<Select2OptionData> = [];
  constructor(private auth: ApiService,
    private fb: FormBuilder, 
    private datepipe: DatePipe,
    private route: Router, 
    private router: Router
    ) {
    this.form = this.fb.group({
      frombank: ['', [Validators.required]],
      tobank: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      remarks: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { 
    this.getbank();
  }
  getbank() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.auth.postdata(formdata, config.fund.banklist).subscribe((res: any) => {
      if (res.statuscode == 200) {
        let arr1 = [];
        let arr2 = [];
        for (var v of res.data) {
     
           if(v.is_value_update == 0){
            arr1.push({ id: v.id, text: v.name });
           }else{
            arr2.push({ id: v.id, text: v.name }); 
           }
          
        }
        this.fromBanklist = arr1;
        this.toBanklist = arr2;
      }
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    } else { 
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('from_bank', this.form.get('frombank')?.value);
      formdata.append('to_bank', this.form.get('tobank')?.value);
      formdata.append('amount', this.form.get('amount')?.value);
      formdata.append('remarks', this.form.get('remarks')?.value);
      this.auth.postdata(formdata, config.fund.fundtransfer).subscribe((res: any) => {
        if (res.statuscode == 200) {
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
          this.route.navigate(['/']);
        } else {
          Swal.fire({
            icon: 'error',
            title: res.message
          });
        }
      });
    }
  }
  
  get f() { return this.form.controls; }

}
