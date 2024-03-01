import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { UserLoginDtlService } from 'src/app/service/user-login-dtl.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-retailer',
  templateUrl: './list-retailer.component.html',
  styleUrls: ['./list-retailer.component.css']
})
export class ListRetailerComponent implements OnInit {
  url: string = config.account.retailer.list; 
  userType:any;
  columns : any = [];
  user: any;
  asmname:any;
  partnername:any;
  supername:any;
  capId:any;
  details:any={}
  originalOrder = (): number => {
    return 0;
  }
  constructor(private localsession:UserLoginDtlService) { }

  ngOnInit(): void { 
    this.localsession.geterUserLoginDtl.subscribe((val: any) => {  
      this.userType = val.usertype;
        this.columns = [ 
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
          // {
          //   title: 'Pan',
          //   data: 'pannumber'
          // },
          {
            title: 'Balance',
            data: 'cd_balance'
          },
          // {
          //   title: 'Cash Balance',
          //   data: 'balance'
          // },
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
              let btnStr: any = '';  
              let retailer = "<a routerLink='/account/retailer/update/"+obj.id+"' class='btn btn-primary'>Edit</a>"; 
            
              
              if(val.usertype == '0'){
                // || val.usertype == '2' || val.usertype == '4'|| val.usertype == '3'
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
        if (this.userType == '1' || this.userType == '0') {
          this.columns.splice(4,0, {
            title: 'Cash Balance',
            data: 'balance'          
          })
        }
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
        this.details["ASM_Name"] = [value.asmname+"   ("+value.asmusername+")"],
        this.details["SD_Name"] = [value.supername+"   ("+value.superusername+")"],
        this.details["Partner_Name"] = [value.partnername +"   ("+value.partnerusername+")"],
        this.details["Distributor_Name"] = [value.distributorname+"    ("+value.distributorusername+")"]        

          break;
    }
  }

  change(value: any) {
    return value.replaceAll('_', ' ');
  }
}
