import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ApiService } from './service/api.service';
import * as $ from 'jquery';
declare function mySideBarInitFn(): any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { 
  favIcon: any = document.querySelector('#favIcon'); 
  titledata: any = document.querySelector('#title');  
  
  checkLogin: any = false;
  title = 'BALAJI TRAVELS SERVICE'; 
  name = "";
  theme = '';
  favicondata: string ="";
  paramnew: any = '';
  showLoadeer: boolean = false;
  changeColor: any;
  constructor(
    private api: ApiService,
    private router: Router
  ) {
    let count = 0;
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] === '/login' ||
          event['url'] === '/forgot-password' ||
          event['url'] === '/change-password' ||
          event['url'] === '/gateway-pg-response' ||
          event['url'] === '/signup' ) {
          this.checkLogin = false;
          count = 0; 
        } else {
          this.checkLogin = true;
          if (count === 0) {
            setTimeout(() => {
              mySideBarInitFn();
            }, 1);
            count++;
          }
          //console.log(this.checkLogin);
        }

        if (event['url'] === '/certificate'){
          this.checkLogin = false;
          $('body').addClass('A4 landscape');
          // $('body').removeClass('themecolor2');
          
        }
      }
    })
  //  $('body').addClass('themecolor2');
  }
  ngOnInit() {
    let title_el = document.querySelector("title");  
    
    this.api.validDomian((domainSettings: any) => {
      this.favicondata = domainSettings.favicon;  
      this.theme = domainSettings.theme;  
      // $('body').removeAttr('class');
      $('body').addClass(this.theme);
      this.favIcon.href = this.favicondata;
      if(title_el)
       title_el.innerHTML = domainSettings.site_name;
    });
   
    let domainData: any = localStorage.getItem("domainSettings");
    if (typeof domainData === 'object' && domainData == null) {
      this.api.validDomian([]);
    }
    this.api.setDomainColor();

  }

  change(val: any) {
  //console.log(val);

    $('body').removeAttr('class');
    $('body').addClass(val);

  }
}
