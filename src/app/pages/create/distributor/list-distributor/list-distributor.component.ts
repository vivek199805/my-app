import { Component, OnInit } from '@angular/core';
import { config } from 'src/app/service/config';
import { UserLoginDtlService } from 'src/app/service/user-login-dtl.service';

@Component({
  selector: 'app-list-distributor',
  templateUrl: './list-distributor.component.html',
  styleUrls: ['./list-distributor.component.css']
})
export class ListDistributorComponent implements OnInit {
  url: string = config.account.distributor.list; 
  usertype:any;
  columns: any = [];
  capId:any;
  details:any={}
  originalOrder = (): number => {
    return 0;
  }
  constructor(private localsession:UserLoginDtlService) { }

  ngOnInit(): void { 
    this.localsession.geterUserLoginDtl.subscribe((val: any) => { 
      this.usertype=val.usertype;
    this.columns= [ 
      {
        title: 'Username',
        data: 'username'
      },
      {
        title: 'Name',
        data: 'name'
      },
      {
        title: 'Email',
        data: 'email'
      },
      {
        title: 'Pan',
        data: 'pannumber'
      },
      {
        title: 'Balance',
        data: 'cd_balance'
      },
      {
        title: 'PIN Code ',
        data: 'pincode'
      },
      {
        title: 'Phone no',
        data: 'phone'
      },
      {
        title: 'Firm name',
        data: 'firmname'
      },
      // {
      //   title: "id_rate",
      //   data: 'id_rate',
      //   pipe:'currency'
      // },
      {
        title: "Date",
        data: 'addeddate',
        pipe:'date'
      },
      {
        title: "Status",
        data: 'status', 
      },
      {
        title: "Action",
        data: 'id',
        pipe: function (obj:any) {

          let btnStr: any = '';  
          let retailer = "<a routerLink='/account/distributor/update/"+obj.id+"' class='btn btn-primary'>Edit</a>"; 
        
          
          if(val.usertype == '0'){
            // || val.usertype == '2'|| val.usertype == '3'
            btnStr += retailer;  
          }
          return (btnStr =='')?'No Action Found':btnStr;
           
        }
      },
      {
        title: "Action",
        data: 'id',
        pipe: function (obj: any) {
          return "<a (click)='debitBalance' data-toggle='modal' data-target='#exampleModal' class='btn btn-primary'>See Upper Network</a>";
        }
      }
    ];
  }) 
  }


  funObj(obj: any) {
    var key = obj.key;
    var value = obj.value;
    // this.capId = value.id;
    switch (key) {
        case "debitBalance":
          this.capId = value.id;
        //console.log(value)
          // this.details["Distributor_Name"] = [value.distributorname+"    ("+value.distributorusername+")"],
          this.details["ASM_Name"] = [value.asmname+"   ("+value.asmusername+")"]
          this.details["SD_Name"] = [value.supername+"   ("+value.superusername+")"],
          this.details["Partner_Name"] = [value.partnername +"   ("+value.partnerusername+")"]

          break;
    }
  }

  change(value: any) {
    return value.replaceAll('_', ' ');
  }
}
