import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { LoaderServiceService } from 'src/app/service/loader-service.service';

@Component({
  selector: 'app-icici-cashdeposite-query',
  templateUrl: './icici-cashdeposite-query.component.html',
  styleUrls: ['./icici-cashdeposite-query.component.css']
})
export class IciciCashdepositeQueryComponent implements OnInit {

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
  this._auth.postdata(formdata,config.statement.rechargequery).subscribe((res: any) => {   
    this.queryList = res.data; 
    this.myTextarea = JSON.stringify(res.bank_response, undefined, 4); 
  }); 
  }

}
