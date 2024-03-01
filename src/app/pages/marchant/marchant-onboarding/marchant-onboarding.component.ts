import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marchant-onboarding',
  templateUrl: './marchant-onboarding.component.html',
  styleUrls: ['./marchant-onboarding.component.css']
})
export class MarchantOnboardingComponent implements OnInit {
  form: any = FormGroup;
  is_onboard: any;
  merchantCode:any;
  firmname:any;
  phone:any;
  email:any;
  constructor(
    private auth: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router:Router
    ) {
    this.form = this.fb.group({
      firmname : ['', [Validators.required]],
      email    : ['', [Validators.required,Validators.email]],
      phone    : ['', [Validators.required,Validators.pattern('[6789][0-9]{9}')]]
    });
  }

  ngOnInit(): void {
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);    
    this.merchantCode = data.permission.merchant_id;
    this.firmname = data.firmname;
    this.phone = data.phone;
    this.email = data.email;
  }

  onSubmit(){
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('merchantcode', this.merchantCode);
      formdata.append('firm', this.firmname);
      formdata.append('email', this.email);
      formdata.append('mobile', this.phone);
      this.auth.postdata(formdata, config.merchant.add).subscribe((res: any) => {
        if (res.statuscode == 200 && res.is_onboard==0) {
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
          this.form.reset();
          window.open(res.redirecturl, "_blank");

        }else{
          Swal.fire({
            title: res.message,
            icon: 'error'
          });
        }
      }); 
  }
  get f() { return this.form.controls; }

}
