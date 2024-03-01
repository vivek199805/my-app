import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-fund-listing',
  templateUrl: './fund-listing.component.html',
  styleUrls: ['./fund-listing.component.css']
})
export class FundListingComponent implements OnInit {
  @ViewChild(DataTableToolsComponent) dt!: DataTableToolsComponent;
  search: any = { startdate: "", enddate: "" };
  maxDate!: Date;
  status: any = '';
  url: string = config.opration.fundlisting;
  usertype:any;
  otp: any = FormGroup;
  amount1:any;
  debitorid:any;
  phone:any;
  remark:any;
  isValue:boolean=true;
  count: any;
  isResendOTP: boolean = true;   
  columns: any = [ 
    {
      title: "User Name",
      data: "username"    
    },
    {
      title: "Name",
      data: "name"    
    },
    {
      title: "Balance",
      data: "cd_balance"    
    },
    {
      title: "Debit Balance",
      data: "amount",
      pipe: "currency"
    }, 
    {
      title: "Verification",
      data: 'id',
      pipe: function (obj: any) {
        let btnStr: any = '';
        let is_debit = "<a (click)='showRefundModel' #modal data-toggle='modal' data-target='#transactionStatus'  class='btn btn-primary btn-sm ml-2  mb-1'>Verify</a>";

        if (obj.is_debit == 1) {
          btnStr += is_debit;
        }
        return (obj.is_debit == 0) ? 'No Action Found' : btnStr;
      }
    },
  ];
  constructor(
    private api: ApiService,
    private fb: FormBuilder
    ) {
    this.otp = this.fb.group({
      remarks: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      otp: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    });
    // this.otp.patchValue({amount: this.amount1,remarks:this.remark})
  }

  ngOnInit(): void {
    const date = new Date();
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const encode:any = EncodeDecode('n',localStorage.getItem('LoginDetails'));
    const _permissionlist:any = JSON.parse(encode);
    this.usertype = _permissionlist.usertype;
  }

  filter() {
    let search: any = {};
    search.startdate = this.dt.transform(this.search.startdate);
    search.enddate = this.dt.transform(this.search.enddate);
    search.status = this.status;
    this.dt.filter(search)
  }

  funObj(obj: any) {
    var key = obj.key;
    var value = obj.value;
    this.amount1 = obj.value.amount;
    this.phone = obj.value.phone;
    this.debitorid = obj.value.debitorid;
    this.remark =obj.value.remarks;
    // console.log(value);
    switch(key) {
      case "showRefundModel":
        this.otp.patchValue({amount: this.amount1,remarks:this.remark})
        break;
    }
  }

  closeModal() {
    //console.log('');
      $("#transactionStatus").modal('hide');
    }

    verify_otp() {
      let formdata: any = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('amount', this.otp.get('amount')?.value);
      formdata.append('otp', this.otp.get('otp')?.value);
      formdata.append('remarks', this.otp.get('remarks')?.value);
      formdata.append('phone', this.phone);
      formdata.append('debitorid', this.debitorid);
      this.api.postdata(formdata, config.opration.verify_debit).subscribe((res: any) => {
        if (res.statuscode == 200) {
          this.closeModal();
          this.filter();
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
          this.otp.reset();
        } else {
          this.otp.reset();
          Swal.fire({
            icon: 'error',
            title: res.message
          })
        }
      })
    }

    resendOtp() {
      //console.log('resendOtp');
        const formdata = new FormData();
        formdata.append('token', config.tokenauth);
        formdata.append('phone', this.phone);
        this.api.postdata(formdata, config.opration.resendotp).subscribe((res: any) => {
          this.resendOtpFn()
          Swal.fire({
            title: res.message,
            icon: res.statuscode == 200 ? 'success' : 'error'
          });
        });
    
      }

      resendOtpFn() {
    
        let count: number = 30;
        let inter = setInterval(() => {
          count -= 1;
          this.count = count;
          if (count == 0) {
            clearInterval(inter);
            this.count = null;
            // if (this.isResendOTP) {
            //   count += 30;
            // }
          }
        }, 1000)
       
      }
    get r() {
      return this.otp.controls
    }
}
