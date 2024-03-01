import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-distributor',
  templateUrl: './create-distributor.component.html',
  styleUrls: ['./create-distributor.component.css']
})

export class CreateDistributorComponent implements OnInit {
  form: any = FormGroup;
  isEdit: boolean = false;
  editID: any = null;
  maxDate!: Date;
  partnerLisitng: Array<Select2OptionData> = [];
  asmLisitng: Array<Select2OptionData> = [];
  supdistributorLisitng: Array<Select2OptionData> = [];
  showRemark:any;
  usertype:any;
  constructor(
    private auth: ApiService,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private route: ActivatedRoute
  ) { 
    this.form = this.fb.group({
      firmname: ['',[Validators.required]],
      name: ['',[Validators.required,Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
      email   : ['', [Validators.required, Validators.email]],
      phone   : ['', [Validators.required, Validators.pattern('[6789][0-9]{9}'), Validators.maxLength(10)]],
      status: ['', [Validators.required]],
      address: ['', [Validators.required]],
      state: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      city: ['', [Validators.required]],
      pincode: ['', [Validators.required,Validators.maxLength(6)]],
      partner_id: [''],
      pannumber: ['', [Validators.required, Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]],
      gstnumber: [''], 
      remarks: [''],
    }); 
  
  } 

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (typeof params['id'] != 'undefined') {
        this.editID = params['id'];
        this.isEdit = true;
      }
    });

    if(this.isEdit){
      this.getDistributorValue();
    }
    const date = new Date();
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.maxDate = new Date(this.maxDate.getFullYear() - 18, date.getMonth(), date.getDate() );
  
    // this.getPartnerlist(); 
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);    
    this.usertype = data.usertype;
    // console.log(data);
    // if(data.usertype == 0){ 
    //   this.form.controls["asm"].setValidators([Validators.required]);
    //   this.form.controls["supdistributor"].setValidators([Validators.required]); 
    // }
    if(data.usertype == 0 ||data.usertype == 2){
      this.getPartner();
    }
  }

  getdatathrowpincode() {
  //console.log(this.form.get('pincode').value)
    const formdata = new FormData();
    formdata.append('pincode', this.form.get('pincode').value);
    this.auth.pincodedata(formdata).subscribe((res: any) => {
      if (res.statuscode == 200 && res.result != '') {
        this.form.patchValue({
          "state": res.result.state,
          "city": res.result.city,
        });
      }
      else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }

   //-----Get Partner List------
   getPartner() {
    // console.log(userid.id);
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
     
  getDistributorValue() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('userid', this.editID);
    this.auth.postdata(formdata, config.account.distributor.get).subscribe((res: any) => {
      if (res.statuscode == 200) {        
      this.setFormValue(res.data);
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }

  setFormValue(res: any){
    let dob = new Date(res.dob); 
    this.form.patchValue({
      name: res.name,
      firmname: res.firmname,
      email: res.email,
      phone: res.phone,
      status: res.status,
      address: res.address,
      state: res.state,
      city: res.city,
      pincode: res.pincode,
      dob: dob,
      gender: res.gender,
      pannumber: res.pannumber,
      gstnumber: res.gstnumber,
      asm: res.asm,
      partner_id: res.partner_id,
      supdistributor: res.supdistributor,
      // remarks: res.remarks
    });
    this.showRemark =res.remarks;
    
     
  }

  onSubmit(){
    if(!this.form.valid){
      return;
    }else{
      let url;
      let dob: any = this.transform(this.form.get('dob')?.value);
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('name', this.form.get('name').value);
      formdata.append('firmname', this.form.get('firmname').value);
      formdata.append('email', this.form.get('email').value);
      formdata.append('phone', this.form.get('phone').value);
      formdata.append('status', this.form.get('status').value);
      formdata.append('address', this.form.get('address').value);
      formdata.append('state', this.form.get('state').value);
      formdata.append('city', this.form.get('city').value);
      formdata.append('pincode', this.form.get('pincode').value);
      formdata.append('dob', dob);
      formdata.append('gender', this.form.get('gender').value);
      formdata.append('pannumber', this.form.get('pannumber').value);
      formdata.append('gstnumber', this.form.get('gstnumber').value);
      formdata.append('partner_id', this.form.get('partner_id').value); 
      if(this.isEdit == true){
        formdata.append('remarks', this.form.get('remarks').value);
        formdata.append('userid', this.editID);
        url = config.account.distributor.update;
      }else{
        url = config.account.distributor.create;
      }
      this.auth.postdata(formdata, url).subscribe((res: any) => {
        if (res.statuscode == 200) {
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
          // this.getDistributorValue();
          if(this.isEdit == false){
          this.form.reset();
          }
        }else{
          Swal.fire({
            title: res.message,
            icon: 'error'
          });
        }
      });
    }
  }

  transform(date: any) {
    return this.datepipe.transform(date, 'yyyy-MM-dd');
  }
  get f() { return this.form.controls; }

}
