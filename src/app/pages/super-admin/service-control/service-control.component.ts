import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-control',
  templateUrl: './service-control.component.html',
  styleUrls: ['./service-control.component.css']
})
export class ServiceControlComponent implements OnInit {
  allservices: any;
  servicelength: any
  radioSelected: any = {};
  constructor(
    private auth: ApiService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.getServices();
  }
  getServices() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.auth.postdata(formdata, config.allservicelist).subscribe((res: any) => {
      if (res.statuscode == 200) {
        this.allservices = res.data;
        this.servicelength = res.data.length;
        for (let p of res.data) {
          if (p.value == "1") {
            this.radioSelected[p.id] = "1";
          } else {
            this.radioSelected[p.id] = "0";
          }
        }

      } else {
        Swal.fire({
          title: res.message,
          icon: 'error'
        });
      }
    });
  }
  updateService(id: any, value: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do You Want To Save This Changes.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Confirm',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        let radiobtn = value.target.value;
        const formdata = new FormData();
        formdata.append('token', config.tokenauth);
        formdata.append('id', id);
        formdata.append('value', radiobtn);
        this.auth.postdata(formdata, config.updateService).subscribe((res: any) => {
          if (res.statuscode == 200) {
            Swal.fire({
              title: res.message,
              icon: 'success'
            });
          } else {
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
          'Changes Cancelled',
          'error'
        )
        .then((result) => {
          if (result.isConfirmed) {
            this.getServices();
          }
        })
      }
    })
  }


  change(value: any) {
    return value.replace('_', ' ');
  }



}
