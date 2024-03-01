import { ApiService } from 'src/app/service/api.service';
import { config } from './../../service/config';
import { Component, OnInit } from '@angular/core';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';

@Component({
  selector: 'app-distributer',
  templateUrl: './distributer.component.html',
  styleUrls: ['./distributer.component.css']
})
export class DistributerComponent implements OnInit {
  permission: any ;
  constructor(private auth:ApiService) { } 

  ngOnInit(): void {
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);  
    this.permission = data.permission;
    // console.log(this.permission)
    this.getuserdata();
  }

  getuserdata(){ 
    const formdata = new FormData();
    formdata.append('token', config.tokenauth); 
    this.auth.postdata(formdata, config.getsingleuser).subscribe((res: any) => {  
      this.permission = res.data;
    //console.log(this.permission['is_kyc']);
      
    })
  }
}
