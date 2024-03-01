import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';

@Component({
  selector: 'app-retailer-notification',
  templateUrl: './retailer-notification.component.html',
  styleUrls: ['./retailer-notification.component.css']
})
export class RetailerNotificationComponent implements OnInit {
  url: string = config.notification.list;
  content:any;
  constructor(private auth:ApiService) { 
    
  }

  ngOnInit(): void {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.auth.postdata(formdata, config.notification.get).subscribe((res: any) => {
      if (res.statuscode == 200) { 
        var content1 = res.data;
        content1 = content1.filter((res: any) => res.status == '1');
        this.content = content1[0].content;
      } 
    });
  }

}
