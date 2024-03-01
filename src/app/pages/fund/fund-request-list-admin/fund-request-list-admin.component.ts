import { Component, OnInit, ViewChild } from '@angular/core';
import { config } from 'src/app/service/config';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';

@Component({
  selector: 'app-fund-request-list-admin',
  templateUrl: './fund-request-list-admin.component.html',
  styleUrls: ['./fund-request-list-admin.component.css']
})
export class FundRequestListAdminComponent implements OnInit {
  @ViewChild(DataTableToolsComponent) dt!: DataTableToolsComponent;
  search: any = { startdate: "", enddate: "" };
  maxDate!: Date;
  status: any = null;
  url: string = config.fund.lisitngAdmin;
  usertype:any;
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
      data: "userdetail",
      title: "Retailer detail",
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
    }
  ];
  constructor() { }

  ngOnInit(): void {
    const date = new Date();
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const encode:any = EncodeDecode('n',localStorage.getItem('LoginDetails'));
    const _permissionlist:any = JSON.parse(encode);
    this.usertype = _permissionlist.usertype;
  }

  filter() {
    let search: any = {};
    search.startdate = this.dt.transform(this.search.startdate);
    search.enddate = this.dt.transform(this.search.enddate);
    search.status = this.status;
    this.dt.filter(search)
  }
}
