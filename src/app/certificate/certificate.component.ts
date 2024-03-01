import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EncodeDecode } from '../_helpers/encode-decode';
import { DatePipe } from '@angular/common';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {
  usertype:any;
  username:any;
  name:any;
  firmname:any;
  CurrentTime: any;
  currentDate : any;
  logocolor : string = '';
  constructor(private route:Router,public datepipe: DatePipe,    private _auth: ApiService,) {
    this.currentDate = this.datepipe.transform((new Date), 'dd MMMM YYYY');
    
  }

  ngOnInit(): void {
    this._auth.validDomian((domainSettings: any) => {

      this.logocolor = domainSettings.logocolor; 

      
    }); 
    if (typeof (localStorage.getItem('LoginDetails')) !== 'undefined' && localStorage.getItem('LoginDetails') !== '') {
      let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
      let data: any = JSON.parse(decode);
    //console.log(data); 
      this.usertype = data.usertype;   
      this.username = data.username;   
      this.name =data.name;
      this.firmname =data.firmname;
    } else {
      this.route.navigate(['login']);
    }   
   
  }

  

}
