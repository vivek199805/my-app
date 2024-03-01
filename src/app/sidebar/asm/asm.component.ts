import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { LoaderService } from 'src/app/_helpers/common/loader.service';

@Component({
  selector: 'app-asm',
  templateUrl: './asm.component.html',
  styleUrls: ['./asm.component.css']
})
export class AsmComponent implements OnInit {

  permission: any = [];
  constructor( private loader:LoaderService,private api:ApiService) { }

  ngOnInit(): void {
    this.getuserdata();
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
