import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-asm',
  templateUrl: './create-asm.component.html',
  styleUrls: ['./create-asm.component.css']
})
export class CreateAsmComponent implements OnInit {
  form: any = FormGroup;
  isEdit: boolean = false;
  editID: any = null;
  maxDate!: Date;
  showRemark:any;
  usertype:any;
  constructor(
    private auth: ApiService,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private route: ActivatedRoute
  ) { 
    this.form = this.fb.group({
      name     : ['',[Validators.required,Validators.pattern('[a-zA-Z][a-zA-Z ]+')]], 
      email    : ['',[Validators.required,Validators.email]],
      phone   : ['',[Validators.required,Validators.pattern('[6789][0-9]{9}'),Validators.maxLength(10)]],
      status: ['', [Validators.required]],
      address: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      pincode: ['', [Validators.required,Validators.maxLength(6)]],
      pannumber: ['', [Validators.required, Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
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
  this.getAsmValue();
    }

 
    // const date = new Date();
    // this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 7);

    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);    
    this.usertype = data.usertype;
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

  getAsmValue(){
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('userid', this.editID);
    this.auth.postdata(formdata, config.account.asm.get).subscribe((res: any) => {
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
      email: res.email,
      phone: res.phone,
      status: res.status,
      city: res.city,
      address: res.address,
      pannumber: res.pannumber,
      state: res.state,
      pincode: res.pincode,
      dob: dob,
      gender: res.gender,
      // remarks: res.remarks
    });
    this.showRemark = res.remarks;
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
      formdata.append('email', this.form.get('email').value);
      formdata.append('phone', this.form.get('phone').value);
      formdata.append('pannumber', this.form.get('pannumber').value);
      formdata.append('status', this.form.get('status').value);
      formdata.append('city', this.form.get('city').value);
      formdata.append('address', this.form.get('address').value);
      formdata.append('state', this.form.get('state').value);
      formdata.append('pincode', this.form.get('pincode').value);
      formdata.append('dob', dob);
      formdata.append('gender', this.form.get('gender').value);
      if(this.isEdit == true){
        formdata.append('remarks', this.form.get('remarks').value);
        formdata.append('userid', this.editID);
        url = config.account.asm.update;
      }else{
        url = config.account.asm.create;
      }
      this.auth.postdata(formdata, url).subscribe((res: any) => {
        if (res.statuscode == 200) {
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
          // this.getAsmValue();
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
