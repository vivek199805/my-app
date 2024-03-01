import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-superadmin-dashboard',
  templateUrl: './superadmin-dashboard.component.html',
  styleUrls: ['./superadmin-dashboard.component.css']
})
export class SuperadminDashboardComponent implements OnInit {
  alltxn: any;
  mainBalance: any;
  cashBalance: any;
  usertype: any;
  headings: any;
  values: any;
  commission: any;
  datavalue: any;

  customOptions: OwlOptions = {
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    loop: true,
    pullDrag: false,
    dots: true,
    navSpeed: 400,
    navText: ['', ''],
    nav: false
  }

  slides: any = [];
  constructor(
    private auth: ApiService,
  ) {
    this.getMtd_lmtd();
  }

  ngOnInit(): void {
    this.getcurrenttxn('0', 'Today');
    const encode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    const _permissionlist: any = JSON.parse(encode);
    this.usertype = _permissionlist.usertype;
  }
  getMtd_lmtd() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.auth.postdata(formdata, config.mtd_lmtd).subscribe((res: any) => {
      if (res.statuscode == 200) {
        this.slides = res.data;
      //console.log(this.slides);

      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }
  getcurrenttxn(days: any, title: any) {
    this.datavalue = title;
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('days', days);
    this.auth.postdata(formdata, config.currenttxn).subscribe((res: any) => {
      if (res.statuscode == 200) {
        this.commission = res.commission;
        this.headings = res.data.heading;
        let obj: any = [];
        for (let i in res.data.service) {
          let child: any = [];
          for (let j of res.data.service[i]) {
            child.push(j);
          }
          obj.push({ heading: i.replace('_', ' '), children: child })
        }
        this.values = obj;
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }

}
