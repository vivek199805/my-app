import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { RiCustomMdlService } from 'src/app/_helpers/common/custome-modal/ri-custom-mdl/ri-custom-mdl.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  loginDetails: any;
  icon: any;
  bankLst: any;



  constructor(
    private auth: ApiService
  ) {

  }

  ngOnInit(): void {
    this.loginDetails = this.auth.Getsessiondata();

    this.auth.validDomian((domainSettings: any) => {
      this.icon = domainSettings.icon;
    });

    let formdata: any = new FormData();
    formdata.append('token', config.tokenauth);
    this.auth.postdata(formdata, config.companybank.list).subscribe((res: any) => {
      if (res.statuscode == 200) {
      //console.log(res)
console.log(res.data)
        this.bankLst = res.data;
        this.bankLst = this.bankLst.filter((item: any, index: any) => {
          return item.status == "Active";
        })


      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        })
      }
    });


  }

}


