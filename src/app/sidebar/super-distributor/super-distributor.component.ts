import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { LoaderService } from 'src/app/_helpers/common/loader.service';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';

@Component({
  selector: 'app-super-distributor',
  templateUrl: './super-distributor.component.html',
  styleUrls: ['./super-distributor.component.css']
})
export class SuperDistributorComponent implements OnInit {
  permission: any ;
  constructor(private api:ApiService,private loader: LoaderService) { }

  ngOnInit(): void {
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);  
    this.permission = data.permission;
    console.log(this.permission)
    this.getuserdata();
  }

  getuserdata(){ 
    this.loader.loaderEvent.emit(true)
    const formdata = new FormData();
    formdata.append('token', config.tokenauth); 
    this.api.postdata(formdata, config.getsingleuser).subscribe((res: any) => {  
      this.permission = res.data; 
      if(this.permission.is_kyc == 1 ){
        this.loader.loaderEvent.emit(false)
      }  
      
    })
  }

}
