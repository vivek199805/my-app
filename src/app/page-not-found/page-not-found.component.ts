import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  icon: any;
  constructor(private auth:ApiService) { }

  ngOnInit(): void {
    this.auth.validDomian((domainSettings:any)=>{ 
      this.icon = domainSettings.icon;
    });
  }

}
