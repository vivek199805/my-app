import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-signup-user-list',
  templateUrl: './signup-user-list.component.html',
  styleUrls: ['./signup-user-list.component.css']
})
export class SignupUserListComponent implements OnInit {
  @ViewChild(DataTableToolsComponent) dt!: DataTableToolsComponent;
  search: any = { startdate: "", enddate: "" };
  maxDate!: Date;
  modelObj:any = [];
  url: string = config.sighnupList; 
  signupform: any = FormGroup;
  userid:any;
  usertype:any;
  partnerLisitng: Array<Select2OptionData> = [];
  asmLisitng: Array<Select2OptionData> = [];
  distributorLisitng: Array<Select2OptionData> = [];
  supdistributorLisitng: Array<Select2OptionData> = [];
  public options: Options;
  display='none';
  columns: any = [
    {
      title: 'ID',
      data: 'id'
    },
    {
      title: 'Name',
      data: 'name'
    },
    {
      title: "Firm Name",
      data: 'firmname'
    },
    {
      title: "Email ID",
      data: 'email'
    },
    {
      title: "Date Of Birth",
      data: 'dob',
      pipe: "date"
    },
    {
      title: "Phone No.",
      data: 'phone'
    },
    {
      title: "Pan Number",
      data: 'pannumber'
    },
    {
      title: 'usertype',
      data: 'usertypename'
    },
    {
      title: 'Status',
      data: 'status'
    },
    {
      title: 'Address',
      data: 'address'
    },
    {
      title: "Date",
      data: 'addeddate',
      pipe: "date"
    },
    {
      title: "Action",
      data: 'id',
      pipe: function (obj: any) {
        if(obj.status == 'Approved'){
          return "-";
        }else{
        return "<a (click)='showStatusModel' data-toggle='modal' data-target='#signupform' class='btn btn-primary'>Action</a>";
        }
      }
    }
  ];
  // static RetailerNotificationComponent: any[] | Type<any>;

  constructor(
    private datepipe: DatePipe,
    private auth: ApiService,
    private fb: FormBuilder,
    private route: Router
    ) {
    this.signupform = this.fb.group({ 
      name: [{value: '', disabled: true}, Validators.required],
      email: [{value: '', disabled: true}, Validators.required],
      phone: [{value: '', disabled: true}, Validators.required],
      address: [{value: '', disabled: true}, Validators.required],
      state: [{value: '', disabled: true}, Validators.required],
      pincode: [{value: '', disabled: true}, Validators.required],
      dob: [{value: '', disabled: true}, Validators.required],
      pannumber: [{value: '', disabled: true}, Validators.required],
      firmname: [{value: '', disabled: true}, Validators.required],
      gender: [{value: '', disabled: true}, Validators.required],
      usertype: [{value: '', disabled: true}, Validators.required],
      partner_id: [''],
      supdistributor: [''],
      distributor: [''],
      asm: [''],

      remarks: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
    this.options = {
      width: '100%'
    };
  }

  ngOnInit(): void {
    const date = new Date();
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.getPartnerlist();
    this.getASMlist();
    this.getDistributerlist();
    this.getSupdistributorlist();
  }
  //-----Get Partner List------
  getPartnerlist() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.auth.postdata(formdata, config.userlist.partner).subscribe((res: any) => {
      if (res.statuscode == 200) {
				let arr = [];
				for (var v of res.data) {  
					arr.push({id:v.id,text:v.name}); 
				}
				this.partnerLisitng = arr;
			}
    else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }
    //-----Get ASM list-----
    getASMlist() {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      this.auth.postdata(formdata, config.userlist.asm).subscribe((res: any) => {
        if (res.statuscode == 200) {
          let arr = [];
          for (var v of res.data) {  
            arr.push({id:v.id,text:v.name}); 
          }
          this.asmLisitng = arr;
        }
      else {
          Swal.fire({
            icon: 'error',
            title: res.message
          });
        }
      });
    }
    //-----Get distributor list-----
    getDistributerlist() {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      this.auth.postdata(formdata, config.userlist.distributer).subscribe((res: any) => {
        if (res.statuscode == 200) {
          let arr = [];
          for (var v of res.data) {  
            arr.push({id:v.id,text:v.name}); 
          }
          this.distributorLisitng = arr;
        }
      else {
          Swal.fire({
            icon: 'error',
            title: res.message
          });
        }
      });
    }
      //-----Get Supdistributor list-----
      getSupdistributorlist() {
        const formdata = new FormData();
        formdata.append('token', config.tokenauth);
        this.auth.postdata(formdata, config.userlist.superdistributor).subscribe((res: any) => {
          if (res.statuscode == 200) {
            let arr = [];
            for (var v of res.data) {  
              arr.push({id:v.id,text:v.name}); 
            }
            this.supdistributorLisitng = arr;
          }
        else {
            Swal.fire({
              icon: 'error',
              title: res.message
            });
          }
        });
      }

  filter() {
    let search: any = {};
    search.startdate = this.dt.transform(this.search.startdate);
    search.enddate = this.dt.transform(this.search.enddate);
    search.status = this.search.status;
    this.dt.filter(search)
  }
  signuplist() {
    let search: any = {};
    this.dt.filter(search)
  }
  funObj(obj: any) {
    var key = obj.key;
    var value = obj.value; 
    switch (key) {
      case "showStatusModel":
        this.usertype = value.usertype;
        let dob = new Date(value.dob); 
        this.signupform.patchValue({
          name:value.name,
          username:value.username,
          firmname:value.firmname,
          email:value.email,
          phone:value.phone,
          address:value.address,
          state:value.state,
          pincode:value.pincode,
          dob:dob,
          pannumber:value.pannumber,
          usertype:value.usertype,
          gender:value.gender,

        });
        this.getASMlist();
        this.getDistributerlist();
        this.getSupdistributorlist();
        
      this.userid = value.id;
        break;
    }
  }

  signupForm() {
    if (!this.signupform.valid) {
      return;
    } else {
      let sta = '';
      if(this.signupform.get('status').value == '1'){
        sta = 'Approved';
      }
      if(this.signupform.get('status').value == '2'){
        sta = 'Rejected';
      }
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to "+sta+" this user!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Confirm',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          let dob: any = this.transform(this.signupform.get('dob')?.value);
          const formdata = new FormData();
          formdata.append('token', config.tokenauth);
          formdata.append('userid', this.userid);
          formdata.append('name', this.signupform.get('name').value);
          formdata.append('firmname', this.signupform.get('firmname').value);
          formdata.append('email', this.signupform.get('email').value);
          formdata.append('phone', this.signupform.get('phone').value);
          formdata.append('address', this.signupform.get('address').value);
          formdata.append('state', this.signupform.get('state').value);
          formdata.append('dob', dob);
          formdata.append('pannumber', this.signupform.get('pannumber').value);
          formdata.append('pincode', this.signupform.get('pincode').value);
          formdata.append('gender', this.signupform.get('gender').value);
          formdata.append('partner_id', this.signupform.get('partner_id').value);
          formdata.append('asm', this.signupform.get('asm').value);
          formdata.append('supdistributor', this.signupform.get('supdistributor').value);
          formdata.append('distributor', this.signupform.get('distributor').value);
          formdata.append('status', this.signupform.get('status').value);
          formdata.append('remarks', this.signupform.get('remarks').value);
          formdata.append('usertype', this.signupform.get('usertype').value);
          this.auth.postdata(formdata, config.sighnupStatus).subscribe((res: any) => {
            if (res.statuscode == 200) {
              Swal.fire({
                title: res.message,
                icon: 'success'
              });
              $("#signupform").modal('hide'); 
              this.signupform.reset();
              this.signuplist();
            } else {
              Swal.fire({
                title: res.message,
                icon: 'error'
              });
            }
          });
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
  }
  transform(date: any) {
    return this.datepipe.transform(date, 'yyyy-MM-dd');
  }
  get f() { return this.signupform.controls; }

}
