import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-id-purchase',
  templateUrl: './id-purchase.component.html',
  styleUrls: ['./id-purchase.component.css']
})
export class IdPurchaseComponent implements OnInit {
  form: any = FormGroup;
  idrate: any;
  total:any;
  constructor(
    private auth: ApiService,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private route: ActivatedRoute
  ) { 
    this.form = this.fb.group({
      purchaseid: ['', [Validators.required]]
    });
  } 

  ngOnInit(): void {
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);  
    this.idrate = data.id_rate;
  }
    
  totalamt(num:any){
    let no = num.target.value;
    this.total = this.idrate*no;
  }
  onSubmit(){
    if(!this.form.valid){
      return;
    }else{


      Swal.fire({
        title: 'Are you sure?',
        text: "You want to purchase retailer id",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Confirm',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('id_count', this.form.get('purchaseid').value);
      this.auth.postdata(formdata, config.purchase.purchaseid).subscribe((res: any) => {
        if (res.statuscode == 200) {
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
          this.form.reset();
          this.total = 0;
        }else{
          Swal.fire({
            title: res.message,
            icon: 'error'
          });
        }
      });

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
  }

  get f() { return this.form.controls; }

}
