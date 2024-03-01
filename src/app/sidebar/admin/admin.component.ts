import { Component, OnInit } from '@angular/core';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  permission: any = [];
  constructor() { }

  ngOnInit(): void {
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);  
    this.permission = data.permission;
    
  }

}
