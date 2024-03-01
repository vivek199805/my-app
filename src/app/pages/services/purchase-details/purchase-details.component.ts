import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.css']
})
export class PurchaseDetailsComponent implements OnInit {
  details: any = [];
  constructor(private _auth: ApiService,) { }

  ngOnInit(): void {
    const formdata = new FormData(); 
    formdata.append('token', config.tokenauth); 
    this._auth.postdata(formdata, config.product1.requestlist).subscribe((res: any) => { 
      if (res.statuscode == '200') { 
         this.details = res.data
       //console.log(res.data);
         
      } else {
        Swal.fire({
          title: 'Hurray!!',
          text: 'there no Product list here!',
          icon: 'error'
        });
      }
    }) 
  }

}
