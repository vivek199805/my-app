import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-recharge',
  templateUrl: './create-recharge.component.html',
  styleUrls: ['./create-recharge.component.css']
})
export class CreateRechargeComponent implements OnInit {
  data: any = null;
  filterDt: any = []
  Template_name: any='';
  constructor(private fb: FormBuilder, private _auth: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getadata();
  }

  getadata() {
    let formdata: any = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('type', '4');
    this._auth.postdata(formdata, config.template.getOperator).subscribe((res: any) => {
      if (res.statuscode === 200) {
        if (res.data) {
          this.data = res.data;
          this.filterDt = this.data;
          if (this.filterDt && this.filterDt.length > 0) {
            this.filterDt.forEach((i:any) => {
              i['comm_superdistributor'] = '0';
              i['comm_distributor'] = '0';
              i['comm_partner'] = '0';
              i['comm_retailer'] = '0';
              i['is_fixed'] = '0';
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'No record found, Please contact with tech team.',
          })
        }

      }
    });
  }

  onSubmit() {
    var newArray: any = [];
    for (let index = 0; index < this.filterDt.length; index++) {
      const element = this.filterDt[index];
      let item: any = {
        operatorName: element.name,
        operatorid: element.id,
        comm_superdistributor: element.comm_superdistributor,
        comm_partner: element.comm_partner,
        comm_distributor: element.comm_distributor,
        comm_retailer: element.comm_retailer,
        is_fixed: element.is_fixed
      };
      newArray.push(item);
    }
if (this.Template_name == '') {
  Swal.fire({
    icon: 'error',
    title: 'Template name is mandetory'
  });
} else {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('type', '4');
    formdata.append('name', this.Template_name);
    formdata.append('commission', JSON.stringify(newArray));
    this._auth.postdata(formdata, config.template.create).subscribe((res: any) => {
      if (res.statuscode == 200) {
        Swal.fire({
          icon: 'success',
          title: res.message
        }).then((s) => {
          this.router.navigate(['/commission/list-template/recharge-list'])
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 45 || charCode > 47)) {
      return false;
    }
    return true;

  }

}
