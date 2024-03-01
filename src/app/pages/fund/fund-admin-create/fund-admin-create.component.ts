import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';  


@Component({
  selector: 'app-fund-admin-create',
  templateUrl: './fund-admin-create.component.html',
  styleUrls: ['./fund-admin-create.component.css']
})
export class FundAdminCreateComponent implements OnInit {

  form: any = FormGroup;

  constructor(private auth: ApiService,
    private fb: FormBuilder,  
    private route: Router, private router: ActivatedRoute) {
    this.form = this.fb.group({ 
      amount: ['', [Validators.required, Validators.pattern('[0-9]+')]], 
    });
  }

  ngOnInit(): void {
  }
  onSubmit() {

    Swal.fire({
      title: 'Are you sure?',
      text: "You want to add fund in e-wallet",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Confirm',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        if (!this.form.valid) {
          return;
        } else {
          const formdata = new FormData();
          formdata.append('token', config.tokenauth);
          formdata.append('amount', this.form.get('amount')?.value); 
          this.auth.postdata(formdata, config.fund.admin.add).subscribe((res: any) => {
            if (res.statuscode == 200) {
              Swal.fire({
                title: res.message,
                icon: 'success'
              });
              this.route.navigate(['fund/admin']);
            } else {
              Swal.fire({
                icon: 'error',
                title: res.message
              });
            }
          });
        }
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
  get f() { return this.form.controls; }
}
