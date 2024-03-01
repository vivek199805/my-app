import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; 
import { ApiService } from 'src/app/service/api.service';

import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css']
})
export class PaymentStatusComponent implements OnInit {

  form: any = FormGroup;
  fetchBill:any = null;
  constructor(private auth: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute) { 
      this.form = this.fb.group({
        ref: ['', [Validators.required]], 
      }); 
    }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
			this.form.controls['ref'].value = params['ref'];
      if(params['ref'] != null)
        this.onSubmit();
		}); 
  }

  onSubmit(){
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('referenceid', this.form.get('ref').value);
    this.auth.postdata(formdata, config.bbps.billstatus).subscribe((res: any) => {
      if (res.statuscode == 200) { 
        this.fetchBill = res.data;
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }
  
  get f() { return this.form.controls; }
}
