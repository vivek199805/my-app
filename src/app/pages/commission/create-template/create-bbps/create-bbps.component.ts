import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-bbps',
  templateUrl: './create-bbps.component.html',
  styleUrls: ['./create-bbps.component.css']
})
export class CreateBbpsComponent implements OnInit {
  objectKeys = Object.keys;
  data: any = null;
  filterDt: any = []
  Template_name: any = '';
  constructor(private fb: FormBuilder, private _auth: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getadata();
  }

  getadata() {
    let formdata: any = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('type', '1');
    this._auth.postdata(formdata, config.template.bbpsoperator).subscribe((res: any) => {
      if (res.statuscode === 200) {
        if (res.data) {
          this.data = res.data;
          // console.log(this.data);
          if (this.data && this.data.length > 0) {
            var output: any = [];
            this.data.forEach(function (item: any) {
              var existing = output.filter(function (v: any, i: any) {
                return v.op_id == item.op_id;
              });
            //console.log(existing)
              if (existing.length) {
                var existingIndex = output.indexOf(existing[0]);
                output[existingIndex].mode = output[existingIndex].mode.concat(item.mode);
              } else {
                if (typeof item.value == 'string')
                  item.mode = [item.mode];
                output.push(item);
              }
            });
            this.filterDt = output;
            // console.log(this.filterDt);

            this.filterDt.forEach((i: any) => {
              i.online = {};
              i.offline = {};
              if (i.mode == 'online') {
                var object = {
                  'comm_superdistributor': '0',
                  'comm_distributor': '0',
                  'comm_partner': '0',
                  'comm_retailer': '0',
                  'is_fixed': '0',
                }
                i.online = object;
              }else if(i.mode == 'offline'){
                var object = {
                  'comm_superdistributor': '0',
                  'comm_distributor': '0',
                  'comm_partner': '0',
                  'comm_retailer': '0',
                  'is_fixed': '0',
                }
                i.offline = object;
              } else {
                var object = {
                  'comm_superdistributor': '0',
                  'comm_distributor': '0',
                  'comm_partner': '0',
                  'comm_retailer': '0',
                  'is_fixed': '0',
                }
                var object1 = {
                  'comm_superdistributor': '0',
                  'comm_distributor': '0',
                  'comm_partner': '0',
                  'comm_retailer': '0',
                  'is_fixed': '0',
                }
                i.online = object;
                i.offline = object1;
              }
            });
          }
          // console.log(this.filterDt)
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
      // console.log(element)
      var object = {}
      if (this.objectKeys(element.offline).length > 0 && this.objectKeys(element.online).length > 0) {
        object = {
          operatorName: element.name,
          operatorid: element.id,
          online: element.online,
          offline: element.offline,
        }
      } else if (this.objectKeys(element.offline).length == 0 && this.objectKeys(element.online).length > 0) {
        object = {
          operatorName: element.name,
          operatorid: element.id,
          online: element.online,
        }
      }else if (this.objectKeys(element.offline).length > 0 && this.objectKeys(element.online).length == 0) {
        object = {
          operatorName: element.name,
          operatorid: element.id,
          offline: element.offline,
        }
      }
      newArray.push(object);
    }
    // console.log(newArray)
    if (this.Template_name == '') {
      Swal.fire({
        icon: 'error',
        title: 'Template name is mandetory'
      });
    } else {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('type', '1');
      formdata.append('name', this.Template_name);
      formdata.append('commission', JSON.stringify(newArray));
      this._auth.postdata(formdata, config.template.create).subscribe((res: any) => {
        if (res.statuscode == 200) {
          Swal.fire({
            icon: 'success',
            title: res.message
          }).then((s) => {
            this.router.navigate(['/commission/list-template/list-bbps'])
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
