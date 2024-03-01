import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from 'src/app/header/header.component';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fund-admin-approve',
  templateUrl: './fund-admin-approve.component.html',
  styleUrls: ['./fund-admin-approve.component.css']
})
export class FundAdminApproveComponent implements OnInit {
  form: any = FormGroup;
  appvlID: any;
  bankname: any = 'State Bank Of India';
  txnid: any;
  amount: any;
  requremark: any;
  requestid: any;
  creditor_name:any;
  credit:any;
  @ViewChild(HeaderComponent) ht!: HeaderComponent;
  constructor(
    private auth: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private routes: Router
  ) {
    this.form = this.fb.group({
      fundrequestStatus: ['', [Validators.required]],
      remarks: ['', [Validators.required]]

    });
   }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (typeof params['id'] != 'undefined') {
        this.appvlID = params['id'];
        this.getfundDetails();
      }
    });
  }

  getfundDetails() { 
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('id', this.appvlID);
    this.auth.postdata(formdata, config.fund.admin.details).subscribe((res: any) => {
      if (res.statuscode == 200) {
      //console.log(res);
        this.requestid = res.data.id
        this.bankname = res.data.bankname;
        this.txnid = res.data.referencenumber;
        this.amount = res.data.amount;
        this.requremark = res.data.requestremark;
        this.creditor_name = res.data.creditor_name;
        this.credit = res.data.credit
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    })
  }

  onSubmit() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to submit this fund request",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Confirm',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('id', this.requestid);
    formdata.append('status', this.form.get('fundrequestStatus').value);
    formdata.append('remarks', this.form.get('remarks').value);
    this.auth.postdata(formdata, config.fund.admin.approve).subscribe((res: any) => {
      if (res.statuscode == 200) {
        Swal.fire({
          title: res.message,
          icon: 'success'
        });
        this.ht.getwalletbalance();
        this.routes.navigate(['fund/admin']);
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    })
  } else if ( 
    result.dismiss === Swal.DismissReason.cancel
  ) {
    Swal.fire(
      'Cancelled',
      'Transaction Cancelled',
      'error'
    )
  }
  })


  }
  get f() { return this.form.controls; }
}
