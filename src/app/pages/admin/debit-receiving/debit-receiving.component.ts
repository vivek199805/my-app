import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-debit-receiving',
  templateUrl: './debit-receiving.component.html',
  styleUrls: ['./debit-receiving.component.css']
})
export class DebitReceivingComponent implements OnInit {
  userAutoComData: any;
  userKeyword = 'userdetail';
  prevVal: any;
  selectedUser: any;

  cd_balance:any;
  name:any;
  showBalance:boolean = false;
  debitbalance:any = FormGroup;
  receivingbalance:any = FormGroup;
  userID:any;
  constructor(
    private auth: ApiService,
    private fb: FormBuilder
  ) {
    this.debitbalance = this.fb.group({
      remarks: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    });
    this.receivingbalance = this.fb.group({
      remarks: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    });
  }
  getServerResponse(val: any) {
    if (val && val != this.prevVal) {
      this.prevVal = val;
      // fetch remote data from here
      // And reassign the 'data' which is binded to 'data' property.
      let formdata: any = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('username', val);
      this.auth.postdata(formdata, config.userTypeList).subscribe((res: any) => {        
        if (res['statuscode'] == 200) {
          this.userAutoComData = res['data'];
        } else {
          this.userAutoComData = [];
        }
      });
    }

  }

  selectEvent(item: any) {

    this.cd_balance = item.cd_balance;
    this.name = item.name;
    this.userID = item.id;
    this.showBalance = true;
  }

  debit(){
    Swal.fire({
      title: 'Are you sure you would like to this transaction?',
      showCancelButton: true,
      icon: 'info',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
    if (!this.debitbalance.valid) {
      return;
    } else {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('debitorid', this.userID);
      formdata.append('amount', this.debitbalance.get('amount')?.value);
      formdata.append('remarks', this.debitbalance.get('remarks')?.value);
      this.auth.postdata(formdata, config.opration.debit).subscribe((res: any) => {
        if (res.statuscode == 200) {
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
          this.debitbalance.reset();
          $("#debit").modal('hide'); 
          // this.route.navigate(['fund/list']);
        } else {
          Swal.fire({
            icon: 'error',
            title: res.message
          });
          $("#debit").modal('hide'); 
        }
      });
    }
  }
})
  }

  receiving(){
    Swal.fire({
      title: 'Are you sure you would like to this transaction?',
      showCancelButton: true,
      icon: 'info',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
    if (!this.receivingbalance.valid) {
      return;
    } else {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('userid', this.userID);
      formdata.append('amount', this.receivingbalance.get('amount')?.value);
      formdata.append('remarks', this.receivingbalance.get('remarks')?.value);
      this.auth.postdata(formdata, config.opration.receiving).subscribe((res: any) => {
        if (res.statuscode == 200) {
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
          this.receivingbalance.reset();
          $("#receiving").modal('hide'); 
          // this.route.navigate(['fund/list']);
        } else {
          Swal.fire({
            icon: 'error',
            title: res.message
          });
          $("#receiving").modal('hide'); 
        }
      });
    }
  }
})
  }

  searchCleared() {
    this.prevVal = null;
  }

  ngOnInit(): void { }
  //-----Get ASM list-----


  get e() { return this.debitbalance.controls; }
  get d() { return this.receivingbalance.controls; }

}
