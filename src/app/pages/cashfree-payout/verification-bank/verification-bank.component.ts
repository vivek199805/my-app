import { Component, OnInit } from '@angular/core';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/service/api.service';
@Component({
  selector: 'app-verification-bank',
  templateUrl: './verification-bank.component.html',
  styleUrls: ['./verification-bank.component.css']
})
export class VerificationBankComponent implements OnInit {
  acclist: any;
  constructor(private auth: ApiService) { }

  ngOnInit(): void {
    this.getAccountList();
  }

  getAccountList() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    // formdata.append('merchantid', this.merchantCode);
    this.auth.postdata(formdata, config.payout.accountlist).subscribe((res: any) => {
      if (res.statuscode == 200) {
        // Swal.fire({
        //   title: res.message,
        //   icon: 'success'
        // });
        this.acclist = res.data;
      } else {
        Swal.fire({
          title: res.message,
          icon: 'error'
        });
      }
    });
  }

  getbeneidud(list: any, value: any) {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('id', list.id);
    formdata.append('status', list.status);
    formdata.append('a_status', value);
    this.auth.postdata(formdata, config.payout.verification).subscribe((res: any) => {
      if (res.status) {
        Swal.fire({
          title: res.message,
          icon: 'success'
        }).then((result) => {
          if (result.isConfirmed) {
            this.getAccountList();
          }
        })
      }
    })
  }


}
