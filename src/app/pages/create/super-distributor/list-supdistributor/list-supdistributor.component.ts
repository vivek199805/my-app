import { Component, OnInit } from '@angular/core';
import { config } from 'src/app/service/config';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';

@Component({
  selector: 'app-list-supdistributor',
  templateUrl: './list-supdistributor.component.html',
  styleUrls: ['./list-supdistributor.component.css']
})
export class ListSupdistributorComponent implements OnInit {
  url: string = config.account.supdistributor.list; 
  userType:any;
  columns:any;
  capId:any;
  details:any={}

  constructor() { }

  ngOnInit(): void {
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);
    this.userType = data.usertype
    if(this.userType == 6){
      this.columns=[ 
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
          data: 'credit_balance'
        },
        {
          title: 'Cash Balance',
          data: 'debit_balance'
        },
      
        {
          title: 'Phone no',
          data: 'phone'
        },
        {
          title: 'Firm name',
          data: 'firmname'
        }, 
        {
          title: "Date",
          data: 'addeddate',
          pipe:'date'
        },
        {
          title: "Status",
          data: 'status', 
        }, 
      ];
    }else{
      this.columns=[ 
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
        // {
        //   title: 'Creator Name ',
        //   data: 'pannumber'
        // },
        {
          title: ' Balance',
          data: 'credit_balance'
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
            return "<a routerLink='/account/super-distributor/update/"+obj.id+"' class='btn btn-primary'>Edit</a>";
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
    }
    
  }
 

  funObj(obj: any) {
    var key = obj.key;
    var value = obj.value;
    // this.capId = value.id;
    switch (key) {
        case "debitBalance":
          this.capId = value.id;
        //console.log(value)
          this.details["ASM_Name"] = [value.asmname+"   ("+value.asmusername+")"]
          // this.details["SD_Distributor_Name"] = [value.supername+"   ("+value.superusername+")"]
          // this.details["Partner_Name"] = [value.partnername +"   ("+value.partnerusername+")"],
           // this.details["Distributor_Name"] = [value.distributorname+"    ("+value.distributorusername+")"],
          break;
    }
  }

  change(value: any) {
    return value.replaceAll('_', ' ');
  }
}
