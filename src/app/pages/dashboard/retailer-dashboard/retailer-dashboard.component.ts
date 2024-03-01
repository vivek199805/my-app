import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-retailer-dashboard',
  templateUrl: './retailer-dashboard.component.html',
  styleUrls: ['./retailer-dashboard.component.css']
})
export class RetailerDashboardComponent implements OnInit {
  headings: any;
  values: any;
  aeps_txn: any;
  bbs_txn: any;
  dmt_txn: any;
  matm_txn: any;
  mainBalance: any;
  cashBalance: any;
  usertype: any;
  alltxnst:any;
  content:any;
  constructor(
    private fb: FormBuilder,
    private auth: ApiService,
    private route: Router,
  ) { }


  ngOnInit(): void {
    // this.getcurrenttxn();
    // this.getwalletbalance();
    // this.getNnotification();
      this.getuserdata();
  }

  getNnotification() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('status', '1');
    this.auth.postdata(formdata, config.notification.active).subscribe((res: any) => {
      if (res.statuscode == 200) {
        this.content = res.data.content;
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }

  getcurrenttxn() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('days', "210");
    this.auth.postdata(formdata, config.currenttxn).subscribe((res: any) => {
      if (res.statuscode == 200) { 
        
        this.headings = res.data.heading;
        let obj:any = [];
        for(let i in res.data.service){
          let child:any = [];  
          for(let j of res.data.service[i]){
            child.push(j);
          }
          obj.push({heading:i.replace('_',' '),children:child})
        }
        this.values = obj;
      //console.log(this.values);
        
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }

  getwalletbalance() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.auth.postdata(formdata, config.walletbalance).subscribe((res: any) => {
      if (res.statuscode == 200) {
        this.mainBalance = res.data.mainBalance;
        this.cashBalance = res.data.cd_balance;
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }
  getuserdata(){ 
    const formdata = new FormData();
    formdata.append('token', config.tokenauth); 
    this.auth.postdata(formdata, config.getsingleuser).subscribe((res: any) => {  
      if(res.data.is_kyc == 0){
        this.route.navigate(['kyc-upload-documents']); 
      } 
    })
  }
}
