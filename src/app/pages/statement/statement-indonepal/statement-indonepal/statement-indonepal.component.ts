import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { CustConfg } from 'src/app/_helpers/common/custom-datepicker/ngx-datePicker-CustConfg';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';

@Component({
  selector: 'app-statement-indonepal',
  templateUrl: './statement-indonepal.component.html',
  styleUrls: ['./statement-indonepal.component.css']
})
export class StatementIndonepalComponent implements OnInit {
  @ViewChild(DataTableToolsComponent) dt!:DataTableToolsComponent;
  search:any = {startdate:"",enddate:""};
  maxDate!: Date;
  exceldownurl:string = config.downloadstatement.matm;
  url:string = config.statement.matm;
  bsCustConfg = CustConfg;
  downloadexl:any;
  form: any =FormGroup;
  @ViewChild('rangePicker') rangePicker:any;
  minDate!: Date;
  columns: any = [
    {
      title: 'User Id',
      data: 'userid'
    },
    {
      title: 'User Name',
      data: 'username'
    },
    {
      title: 'Amount',
      data: 'amount',
      pipe: "currency"
    },
    {
      title: 'Ackno',
      data: 'ackno'
    },
    {
      title: "UTR",
      data: 'utr'
    },
    {
      title: "Transfer Type",
      data: 'transfertype'
    },

    {
      title: "Card Type",
      data: 'cardtype'
    },
    {
      title: "Bank Name",
      data: 'bankName'
    },
    {
      title: "FP Transaction Id",
      data: 'fpTransactionId'
    },

    {
      title: "Status",
      data: 'status'
    },
    {
      title: "Date",
      data: 'addeddate',
      pipe: "date"
    },
  ];
  constructor(private api:ApiService) {
    this.form = new FormGroup({
      selectdate: new FormControl([new Date(),new Date()], [Validators.required]),
    })
   }

   ngOnInit(): void {
    const date = new Date();
    this.minDate = new Date(1950, 1, 1);
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
  filter() {
    let search:any = {};
    search.startdate =this.dt.transform(this.form.get('selectdate')?.value[0]);
    search.enddate = this.dt.transform(this.form.get('selectdate')?.value[1]);
    this.dt.filter(search)
  }
  // onDateRangePickerShow() {
  //   // This is a workaround to show previous month
  //   var prevMonth = new Date();
  //   prevMonth.setMonth(prevMonth.getMonth() - 1);
  //   this.rangePicker._datepicker.instance.monthSelectHandler({ date: prevMonth });
  // }
  GetChildData(data:any){
    this.downloadexl =data;
  }
}
