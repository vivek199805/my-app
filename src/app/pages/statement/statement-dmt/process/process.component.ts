import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {
  sno: any;
  myTextarea:any;
  queryList:any;
  message:any;
  status:boolean=false;
  constructor(private route: ActivatedRoute,  private _auth: ApiService,private loader: LoaderService) {
    this.route.params.subscribe((params: any) => {
      if (typeof params['id'] != 'undefined') {
        this.sno = params['id'];
        // console.log(params['id']); 
    }
   })
  }

   

  ngOnInit(): void {
    var that = this;
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('id',this.sno);
    this._auth.postdata(formdata,config.statement.process).subscribe((res: any) => {  
      this.queryList = res.data; 
       this.message = res.message;
       this.status=res.status;
      this.myTextarea = JSON.stringify(res.bank, undefined, 4);
      // this.loader.loaderEvent.emit(false); 
    }); 
    
  }

}
