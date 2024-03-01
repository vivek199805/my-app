import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-fund',
  templateUrl: './add-fund.component.html',
  styleUrls: ['./add-fund.component.css']
})

export class AddFundComponent implements OnInit {
  form: any = FormGroup;
  userid: any;
  constructor(
    private auth: ApiService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      amount: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    });
   }

  ngOnInit(): void { 
  }

  onSubmit(){
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('amount', this.form.get('amount')?.value);
      this.auth.postdata(formdata, config.adminFundadd).subscribe((res: any) => {
        if (res.statuscode == 200) {
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
          this.form.reset();
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
