import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';
import { Select2OptionData } from 'ng-select2';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';

@Component({
  selector: 'app-fund-transfer-to-retailer',
  templateUrl: './fund-transfer-to-retailer.component.html',
  styleUrls: ['./fund-transfer-to-retailer.component.css']
})
export class FundTransferToRetailerComponent implements OnInit {
  form: any = FormGroup;
  userType:any;
  loginUserID:any;
  userLisitng: Array<Select2OptionData> = [];
  constructor(private auth: ApiService,
    private fb: FormBuilder, 
    private datepipe: DatePipe,
    private route: Router) { 
      this.form = this.fb.group({
        userid: ['', [Validators.required]],
        amount: ['', [Validators.required, Validators.pattern('[0-9]+')]], 
      });

    }

  ngOnInit(): void {
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode); 
    this.userType = data.usertype;
    this.loginUserID = data.userid;
    this.getUserList();
  }
  getUserList() {
    let url = 'user/dropdown/userlist/getretailer';
    const formdata = new FormData();
    // formdata.append('token', config.tokenauth);
    // if(this.userType == '3'){
    // formdata.append('partner_id', this.loginUserID);
    // url = config.userlist.distributer;
    // }
    // if(this.userType == '4'){
    // formdata.append('distributor', this.loginUserID);
    // url = config.userlist.retailer;
    // }
    // if(this.userType == '2'){
    //   formdata.append('superdistributer', this.loginUserID);
    //   url = config.userlist.partner;
    //   }
    formdata.append('token', config.tokenauth);
    // formdata.append('userid', this.loginUserID);
    this.auth.postdata(formdata, config.userlist.UserListByUser).subscribe((res: any) => {
      if (res.statuscode == 200) {
				let arr = [];
				for (var v of res.data) {  
					arr.push({id:v.id,text:v.username}); 
				}
				this.userLisitng = arr;
			}
    else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }

  onSubmit(){

    if (!this.form.valid) {
      return;
    } else {
      Swal.fire({
        title: 'Are you sure you would like to transfer this amount?',
        showCancelButton: true,
        icon: 'info',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('userid', this.form.get('userid')?.value);
      formdata.append('amount', this.form.get('amount')?.value); 
      this.auth.postdata(formdata, config.fund.transfer).subscribe((res: any) => {
        if (res.statuscode == 200) {
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
          this.route.navigate(['fund/transfer']);
        } else {
          Swal.fire({
            icon: 'error',
            title: res.message
          });
        }
      });
    }
  })
 }
}
  get f() { return this.form.controls; }
}
