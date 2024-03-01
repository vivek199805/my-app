import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { LoaderService } from 'src/app/_helpers/common/loader.service';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {
  permission: any = [];
  data:any
  constructor( private loader:LoaderService,private api:ApiService) { }

  ngOnInit(): void {
       let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
       this.data = JSON.parse(decode);  
    this.permission = this._changeDetail(this.data.permission);  
    // console.log(this.permission)
    this.getuserdata();
  }
  _changeDetail(obj: any) {
    const res: any = {}
    for (const key in obj) {
      const parsed = parseInt(obj[key], 10);
      res[key] = isNaN(parsed) ? obj[key] : parsed;
    }
    return res;
  }
  getuserdata(){ 
    this.loader.loaderEvent.emit(true)
    const formdata = new FormData();
    formdata.append('token', config.tokenauth); 
    this.api.postdata(formdata, config.getsingleuser).subscribe((res: any) => {  
      this.permission = res.data;  
      
    })
  }

}
