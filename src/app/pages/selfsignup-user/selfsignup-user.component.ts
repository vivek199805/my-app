import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-selfsignup-user',
  templateUrl: './selfsignup-user.component.html',
  styleUrls: ['./selfsignup-user.component.css']
})
export class SelfsignupUserComponent implements OnInit {
  @ViewChild(DataTableToolsComponent) dt!: DataTableToolsComponent;
  selfform: any = FormGroup;
  url: string = config.sighnupList;
  usertype: any;
  user_id: any;
  selfusertype : any
  asmLisitng: Array<Select2OptionData> = [];
  partnerLisitng: Array<Select2OptionData> = [];
  supdistributorLisitng: Array<Select2OptionData> = [];
  distributorLisitng: Array<Select2OptionData> = [];
  changest: boolean = false;
  public options: Options;
  columns: any = [
    {
      title: 'S.No',
      data: 'sno'
    },
    {
      title: 'User Id',
      data: 'username'
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
      title: 'User Type',
      data: 'usertypename'
    },
    {
      title: 'Address',
      data: 'address'
    },
    {
      title: "Date",
      data: 'addeddate',
    },
    {
      title: "Action",
      data: 'id',
      pipe: function (obj: any) {
          return "<a (click)='showStatusModel' class='btn btn-primary'>Action</a>";
      }
    }
  ];


  constructor(private auth: ApiService, private fb: FormBuilder,) {

    this.selfform = this.fb.group({

      partner_id: [''],
      asm: ['',],
      supdistributor: [''],
      distributor: [''],
    });
    this.options = {
      width: '100%'
    };
   }

  ngOnInit(): void {

    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);
    this.usertype = data.usertype;

    // For Superdistributer
      this.getAsmlist();
    // For Partner
      this.getSupdistributorlist();
   // For Distributer    
      this.getpartnerlist();
    // For Retailer
      this.getDistributorlist();   
  }

  listing() {
    let search: any = {};
    this.dt.filter(search)
  }

  getAsmlist() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.auth.postdata(formdata, config.userlist.asm).subscribe((res: any) => {
      if (res.statuscode == 200) {
        let arr = [];
        for (var v of res.data) {  
          arr.push({id:v.id,text:v.username}); 
        }
        this.asmLisitng = arr;
        // console.log(this.asmLisitng);
        
        
      }
    else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  } 

  getpartnerlist() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.auth.postdata(formdata, config.userlist.partner).subscribe((res: any) => {
      if (res.statuscode == 200) {
        let arr = [];
        for (var v of res.data) {
          arr.push({ id: v.id, text: v.username });
        }
        this.partnerLisitng = arr;
        // console.log(this.partnerLisitng );
       
      }
      else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }

  getSupdistributorlist() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth); 
    this.auth.postdata(formdata, config.userlist.superdistributor).subscribe((res: any) => { 
      if (res.statuscode == 200) {
				let arr = [];
				for (var v of res.data) {  
					arr.push({id:v.id,text:v.username}); 
				}
				this.supdistributorLisitng = arr;
        // console.log(this.supdistributorLisitng );
			}
    else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }

  getDistributorlist() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.auth.postdata(formdata, config.userlist.distributer).subscribe((res: any) => {
      if (res.statuscode == 200) {
        let arr = [];
        for (var v of res.data) {
          arr.push({ id: v.id, text: v.username });
        }
        this.distributorLisitng = arr;
        // console.log(this.distributorLisitng);
      }
      else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }




  funObj(obj: any) {
    var key = obj.key;
    var value = obj.value;
    switch (key) {
      case "showStatusModel":
        this.selfusertype = value.usertype;
        this.user_id = value.id
        $("#kycStatusModel").modal('show');
        break;
    }
  }



  selfSignupform() {
    if (!this.selfform.valid) {
      return;
    } 
      else{ 
          const formdata = new FormData();
          formdata.append('token', config.tokenauth);
          if(this.selfusertype == 3){
            formdata.append('userid', this.user_id);
            formdata.append('usertype', this.selfusertype);
            formdata.append('supdistributor', this.selfform.get('supdistributor').value)
          }else if(this.selfusertype == 2){
            formdata.append('userid', this.user_id);
            formdata.append('usertype', this.selfusertype);
            formdata.append('asm_id', this.selfform.get('asm').value)
          }
          else if(this.selfusertype == 4){
            formdata.append('userid', this.user_id);
            formdata.append('usertype', this.selfusertype);
            formdata.append('partner_id', this.selfform.get('partner_id').value)
          }
          else if(this.selfusertype == 5){
            formdata.append('userid', this.user_id);
            formdata.append('usertype', this.selfusertype);
            formdata.append('distributor', this.selfform.get('distributor').value)
            // console.log(this.selfform.get('distributor').value);
            
          }
          
          this.auth.postdata(formdata, config.sighnupStatus).subscribe((res: any) => {
            if (res.statuscode == 200) {
              Swal.fire({
                title: res.message,
                icon: 'success'
              })
              .then((result) => {
                if (result.isConfirmed) {

                  this.listing();
                }
              });
              $("#kycStatusModel").modal('hide');
              this.selfform.reset();
            } else {
              Swal.fire({
                title: res.message,
                icon: 'error'
              });
            }
          });
        }
        }



  stmodalClose() {
    this.changest = false;
  }


  get f() { return this.selfform.controls; }

}
