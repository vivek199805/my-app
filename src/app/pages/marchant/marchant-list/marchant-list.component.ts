import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';
import Swal from 'sweetalert2';
import {KeyValue} from '@angular/common';

@Component({
  selector: 'app-marchant-list',
  templateUrl: './marchant-list.component.html',
  styleUrls: ['./marchant-list.component.css']
})
export class MarchantListComponent implements OnInit {
  //  onCompare(_left: KeyValue<any, any>, _right: KeyValue<any, any>): number {
  //   return -1;
  // }

  capId:any;
  details: any = {};
  originalOrder = (): number => {
    return 0;
  }
  @ViewChild(DataTableToolsComponent) dt!: DataTableToolsComponent;
  @ViewChild('modal', { read: ElementRef }) modal!: ElementRef;
  search: any = { startdate: "", enddate: "" , status:"0"};
  maxDate!: Date;
  modelObj:any = {};
  url: string = config.merchant.list; 
  marchantdetails:any;
  columns: any = [
    // {
    //   title: 'Txn ID',
    //   data: 'txnid'
    // },
    // {
    //   title: 'User ID',
    //   data: 'userid'
    // },
    {
      title: 'Merchant Code',
      data: 'username'
    },
    
    {
      title: 'Name',
      data: 'name'
    },
    {
      title: "Firm Name",
      data: 'firmname'
    },
    {
      title: "Email ID",
      data: 'email'
    },
    {
      title: "Pan Number",
      data: 'pannumber'
    },
    {
      title: "Pincode",
      data: 'pincode'
    },
    {
      title: "Mobile",
      data: 'phone'
    },
    {
      title: "Date Of Birth",
      data: 'dob',
      pipe: "date"
    },
    {
      title: "Status",
      data: 'status'
    },
    {
      title: "Date",
      data: 'addeddate',
      pipe: "datetime"
    },
    {
      title: "Details",
      data: 'id',
      pipe: function (obj: any) {
        return "<a (click)='showStatusModel' class='btn btn-primary'>View Details</a>";
      }
    },
    {
      title: "Action",
      data: 'id',
      pipe: function (obj: any) {
        return "<a (click)='viewNetwork' data-toggle='modal' data-target='#exampleModal' class='btn btn-primary'>See Upper Network</a>";
      }
    }
  ];
 
  constructor(
    private datepipe: DatePipe,
    private auth: ApiService,
    private fb: FormBuilder,
    private route: Router
    ) {
  }

  ngOnInit(): void {
    const date = new Date();
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  filter() {
    let search: any = {};
    search.startdate = this.dt.transform(this.search.startdate);
    search.enddate = this.dt.transform(this.search.enddate);
    search.onboarding_status = this.search.status;
    this.dt.filter(search)
  }
  listing(){
    let search: any = {};
    this.dt.filter(search)
  }
  funObj(obj: any) {
    var key = obj.key;
    var value = obj.value; 
    switch (key) {
      case "showStatusModel":
        const formdata = new FormData();
        // this.modelObj = [];
        formdata.append('token', config.tokenauth);
        formdata.append('id', value.userid);
        this.auth.postdata(formdata, config.merchant.details).subscribe((res: any) => {
          if (res.statuscode == 200) {
             this.modal.nativeElement.click();
             this.modelObj = res.data;
            //  for(let i in res.data){
            //   this.modelObj.push({heading:i.replace('_',' '),value:res.data[i]});
            //  }  
             console.log(this.modelObj)
          } else {
            Swal.fire({
              icon: 'error',
              title: res.message
            });
          }
        });
        break;
        case "viewNetwork":  
        this.capId = value.id;

        this.details["ASM Name"] = [value.asmusername+"   ("+value.asmphone+")"],
        this.details["SD Name"] = [value.superusername+"   ("+value.superphone+")"],
        this.details["Partner Name"] = [value.partnerusername +"   ("+value.partnerphone+")"],
        this.details["Distributor Name"] = [value.distusername+"    ("+value.distphone+")"];
        break;
    }
  }

}
