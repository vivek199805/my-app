import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bbps-dashboard',
  templateUrl: './bbps-dashboard.component.html',
  styleUrls: ['./bbps-dashboard.component.css']
})
export class BbpsDashboardComponent implements OnInit {
  operators: any = [];
  constructor(
    private auth: ApiService,
    private fb: FormBuilder,
    private route: Router) { }

  ngOnInit(): void {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.auth.postdata(formdata, config.bbps.getcategory).subscribe((res: any) => {
      if (res.statuscode == 200) {
        this.operators = res.category; 
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }
  routeToNext(obj: any) {
    let encode: any = EncodeDecode(JSON.stringify(obj), 'n');
    localStorage.setItem('bbpsInformation', encode);
  //console.log(obj);
    
  } 
}
