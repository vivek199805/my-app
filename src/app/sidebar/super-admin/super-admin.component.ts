import { Component, OnInit } from '@angular/core';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {
  is_staff:any;
  usertype:any;
  constructor() { }

  ngOnInit(): void {
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);  
    this.is_staff = data.is_staff;
    this.usertype = data.usertype;
  }

}
