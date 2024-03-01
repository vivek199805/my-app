import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { LoaderServiceService } from 'src/app/service/loader-service.service';

@Component({
  selector: 'app-bbpsquery',
  templateUrl: './bbpsquery.component.html',
  styleUrls: ['./bbpsquery.component.css']
})
export class BbpsqueryComponent implements OnInit {
  sno: any;
  myTextarea:any;
  queryList:any;
  constructor(private route: ActivatedRoute,  private _auth: ApiService,private loader: LoaderServiceService) {   
     
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (typeof params['id'] != 'undefined') {
        this.sno = params['id'];
        // console.log(params['id']); 
    }
  })
 
  var that = this;
  const formdata = new FormData();
  formdata.append('token', config.tokenauth);
  formdata.append('id',this.sno);
  this._auth.postdata(formdata,config.statement.billpaymentquery).subscribe((res: any) => {   
    this.queryList = res.data; 
    this.myTextarea = JSON.stringify(res.bank_response, undefined, 4); 
  }); 
  }

}
