import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { config } from 'src/app/service/config';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';
import { CustConfg } from 'src/app/_helpers/common/custom-datepicker/ngx-datePicker-CustConfg';

@Component({
  selector: 'app-fund-transfer-list',
  templateUrl: './fund-transfer-list.component.html',
  styleUrls: ['./fund-transfer-list.component.css']
})
export class FundTransferListComponent implements OnInit {

  @ViewChild(DataTableToolsComponent) dt!: DataTableToolsComponent;
  search: any = { startdate: "", enddate: "" };
  maxDate!: Date;
  status: any = null;
  url: string = config.fund.fundtransferlist;
  columns: any = [
    // {
    //   data: "username",
    //   title: "User Name"
    // },
    // {
    //   data: "name",
    //   title: "Name"
    // },
    {
      data: "bankname",
      title: "Bank Name"
    },
    {
      data: "amount",
      title: "Amount",
      pipe: "currency"
    },
    {
      data: "opening",
      title: "Opening Balance",
      pipe: "currency"
    }, 
    {
      data: "closing",
      title: "Closing Balance",
      pipe: "currency"
    },
    {
      data: "debitorname",
      title: "DebitorName"
    },
    {
      data: "creatername",
      title: "CreditorName"
    },
    {
      data: "approvalname",
      title: "ApproverName"
    },
    {
      data: "remarks",
      title: "Remarks"
    },
    {
      data: "status",
      title: "Status"
    },
    {
      data: "dateadded",
      title: "Date"
    } 
  ];
  minDate!: Date;
  form:any=FormGroup;
  bsCustConfg = CustConfg;
  @ViewChild('rangePicker') rangePicker: any;
  constructor() {
    this.form = new FormGroup({
      selectdate: new FormControl([new Date(), new Date()], [Validators.required]),
    })
   }

  ngOnInit(): void {
    const date = new Date(); 
    this.minDate = new Date(1950, 1, 1);
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  filter() {
    let search: any = {};
    search.startdate = this.dt.transform(this.form.get('selectdate')?.value[0]);
    search.enddate = this.dt.transform(this.form.get('selectdate')?.value[1]);
    // search.status = this.status;
    this.dt.filter(search)
  }
  onDateRangePickerShow() {
    // This is a workaround to show previous month
    var prevMonth = new Date();
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    this.rangePicker._datepicker.instance.monthSelectHandler({ date: prevMonth });
  }



}
