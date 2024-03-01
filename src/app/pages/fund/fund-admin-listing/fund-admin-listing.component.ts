import { Component, OnInit, ViewChild } from '@angular/core';
import { config } from 'src/app/service/config';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';

@Component({
  selector: 'app-fund-admin-listing',
  templateUrl: './fund-admin-listing.component.html',
  styleUrls: ['./fund-admin-listing.component.css']
})
export class FundAdminListingComponent implements OnInit {
  @ViewChild(DataTableToolsComponent) dt!: DataTableToolsComponent;
  search: any = { startdate: "", enddate: "" };
  maxDate!: Date;
  status: any = null;
  url: string = config.fund.admin.listing;
  columns: any = [
    {
      data: "requesttype",
      title: "Request Type",
      pipe:function(obj:any){
        let array = ['Cash Deposit','NEFT','RTGS/IMPS','Bank Transfer','Cash Pickup','Exceptional Request','Funding'];
        return array[obj.requesttype];
      }
    }, 
    {
      data: "amount",
      title: "Amount",
      pipe: "currency"
    },
    {
      data: "txnid",
      title: "Txn Id"
    }, 
    {
      data: "bankname",
      title: "Deposited branch"
    },
    {
      data: "userdetail",
      title: "Username/Name/Firmname"
    },
    {
      data: "image",
      title: "Action",
      pipe: function(obj:any){ 
        if(obj.image){
        return  "<a href='"+obj.image+"' target='_blank' class='btn btn-primary'>View image</a>";
       }else{
         return '';
       }
      }
    },
    {
      data: "phone",
      title: "Phone Number"
    },
    {
      data: "requestremark",
      title: "Remark"
    },
    {
      data: "comment",
      title: "Comment"
    },
    {
      data: "depositeddate",
      title: "Deposited date",
      pipe: "date"
    },
    {
      data: "status",
      title: "Status",
      pipe: function(obj:any){
        let array = ['Rejected','Approved','Pending','Authorization Pending','Hold'];
        return array[obj.status];
      }
    },
    {
      data: "id",
      title: "Action",
      pipe: function(obj:any){ 
        return  "<a routerLink='/fund/admin/approve/"+obj.id+"' class='btn btn-primary'>View Details</a>";;
      }
    }
  ];
  constructor() { }

  ngOnInit(): void {
    const date = new Date();
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  filter() {
    let search: any = {};
    search.startdate = this.dt.transform(this.search.startdate);
    search.enddate = this.dt.transform(this.search.enddate);
    search.status = this.status;
    this.dt.filter(search)
  }

}
