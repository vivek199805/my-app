import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service'; 
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  footer_copyright:any;
  year:any;
  hosturl:any;
  site_name:any;
  constructor( private _auth: ApiService,) { }

  ngOnInit(): void {
    this._auth.validDomian((domainSettings: any) => { 
      this.footer_copyright = domainSettings.footer_copyright;
       this.year =  new Date().getFullYear();
      this.hosturl = domainSettings.hosturl;
      this.site_name = domainSettings.site_name
      
    }); 
  }
 

}
