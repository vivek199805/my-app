import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-check-mobile',
  templateUrl: './check-mobile.component.html',
  styleUrls: ['./check-mobile.component.css']
})
export class CheckMobileComponent implements OnInit {
  form: any = FormGroup;
  formdata: any;
  private is_click: boolean = false;
  constructor(
    private _auth: ApiService,
    private fb: FormBuilder,
    private route: Router
  ) {
    this.form = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern(/(6|7|8|9)\d{9}/), Validators.maxLength(10)]]
    });
  }
  get f() {
    return this.form.controls
  }

  ngOnInit(): void {
    localStorage.removeItem('dmtLoginInfo');
    localStorage.removeItem('dmtInformation');
    localStorage.removeItem('dmtTransaction');
    localStorage.removeItem('dmtINFO');
    this.form.get('mobile').valueChanges.subscribe((val: any) => {
      if (val.length > 9) {
        this.onSubmit();
      }
    })
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onSubmit() {

    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('mobile', this.form.get('mobile').value);
    this._auth.postdata(formdata, config.dmt.getRemmitance).subscribe((res: any) => {
      if (res.statuscode == 205) {
        Swal.fire({
          title: res.message,
          icon: 'success'
        });
        let encode: any = EncodeDecode(JSON.stringify(res), 'n');
        localStorage.setItem('dmtInformation', encode);
        this.route.navigate(['dmt/registration']);
      } else if (res.statuscode == 200) {
        Swal.fire({
          title: res.message,
          icon: 'success'
        });
        let encode: any = EncodeDecode(JSON.stringify(res), 'n');
        localStorage.setItem('dmtInformation', encode);
        this.route.navigate(['dmt/dashboard']);
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    })

  }
}
