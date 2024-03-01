import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-check-txn-status',
  templateUrl: './check-txn-status.component.html',
  styleUrls: ['./check-txn-status.component.css']
})
export class CheckTxnStatusComponent implements OnInit {
  form: any = FormGroup;
  formdata: any;
  dmttxnInfo: any;
  constructor(
    private _auth: ApiService,
    private fb: FormBuilder,
    private route: Router
  ) {
    this.form = this.fb.group({
      referenceid: ['', [Validators.required]]
    });
  }
  get f() {
    return this.form.controls
  }

  ngOnInit(): void {
    localStorage.removeItem('dmttxnInfo');
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    } else {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('referenceid', this.form.get('referenceid').value);
      this._auth.postdata(formdata, config.dmt.txnstatus).subscribe((res: any) => {
        if (res.statuscode == 200) {
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
          let encode: any = EncodeDecode(JSON.stringify(res), 'n');
          localStorage.setItem('dmttxnInfo', encode);
          this.route.navigate(['refund']);
        } else {
          Swal.fire({
            icon: 'error',
            title: res.message
          });
        }
      })
    }
  }


}
