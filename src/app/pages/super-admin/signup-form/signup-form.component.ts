import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  signup: any = FormGroup;
  maxDate!: Date;
  constructor(
    private auth: ApiService,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private route: Router
  ) {
    this.signup = this.fb.group({
      name: ['',[Validators.required,Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
      email: ['', [Validators.required, Validators.email]],
      phone   : ['',[Validators.required,Validators.pattern('[6789][0-9]{9}')]],
      address: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pincode: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      pannumber: ['', [Validators.required]],
      firmname: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      usertype: ['', [Validators.required]],
      termcondition: ['', [Validators.required]],
    });
   }

  ngOnInit(): void { 
  }

  onSubmit(){
    if(!this.signup.valid){
      return;
    }else{
      let dob: any = this.transform(this.signup.get('dob')?.value);
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('name', this.signup.get('name').value);
      formdata.append('firmname', this.signup.get('firmname').value);
      formdata.append('email', this.signup.get('email').value);
      formdata.append('phone', this.signup.get('phone').value);
      formdata.append('address', this.signup.get('address').value);
      formdata.append('state', this.signup.get('state').value);
      formdata.append('dob', dob);
      formdata.append('pannumber', this.signup.get('pannumber').value);
      formdata.append('pincode', this.signup.get('pincode').value);
      formdata.append('gender', this.signup.get('gender').value);
      formdata.append('usertype', this.signup.get('usertype').value);
      this.auth.postdata(formdata, config.sighnup).subscribe((res: any) => {
        if (res.statuscode == 200) {
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
          this.signup.reset();
          this.route.navigate(['/']);
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

  get f() { return this.signup.controls; }

}
