import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {
  @ViewChild(DataTableToolsComponent) dt!: DataTableToolsComponent;
  search: any = { startdate: "", enddate: "" };
  maxDate!: Date;
  modelObj:any = [];
  url: string = config.purchase.purchaseHistory;

  columns: any = [
    {
      title: 'Reference ID',
      data: 'refid'
    },
    {
      title: 'No. of ID',
      data: 'no_of_ids'
    },
    {
      title: "Id Rate",
      data: 'id_rate'
    },
    {
      title: "User Opening balance",
      data: 'uopening',
      pipe: "currency"
    },
    {
      title: "User Closing balance",
      data: 'uclosing',
      pipe: "currency"
    },
    {
      title: "Amount",
      data: 'amount',
      pipe: "currency"
    },
    {
      title: "Added Date",
      data: 'dateadded',
      pipe: "date"
    },

  ];

  constructor(private datepipe: DatePipe,private auth: ApiService) {
  }

  ngOnInit(): void {
    const date = new Date();
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  filter() {
    let search: any = {};
    search.startdate = this.dt.transform(this.search.startdate);
    search.enddate = this.dt.transform(this.search.enddate);
    this.dt.filter(search)
  }


}
