import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { CustConfg } from 'src/app/_helpers/common/custom-datepicker/ngx-datePicker-CustConfg';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-pan-statement',
  templateUrl: './pan-statement.component.html',
  styleUrls: ['./pan-statement.component.css']
})
export class PanStatementComponent implements OnInit {
  @ViewChild(DataTableToolsComponent) dt!:DataTableToolsComponent;
  search:any = {startdate:"",enddate:""};
  maxDate!: Date;
  url:string = config.pan.panstatement;
  bsCustConfg = CustConfg;
  exceldownurl:string = config.pan.panstatementdownload;
  form: any =FormGroup;
  @ViewChild('rangePicker') rangePicker:any;
  minDate!: Date;
  downloadexl:any;
  columns: any = [
    {
      title: 'TxnId',
      data: 'txnid'
    },
    {
      title: 'User Name',
      data: 'username'
    }, 
    {
      title:'Status',
      data:'status'
    },
    {
      title:'Tds',
      data:'tds'
    },
    {
      title:'Trans Amt',
      data:'transAmt'
    },
    {
      title:'U.Comm',
      data:'ucomm'
    },
    {
      title: "Date & time",
      data: 'dateadded',
      pipe: "datetime"
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

  download($event: any){
    let startdate =this.dt.transform(this.form.get('selectdate')?.value[0]);
    let enddate = this.dt.transform(this.form.get('selectdate')?.value[1]);
    let formdata: any = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('startdate', (startdate === null ? '' : startdate));
    formdata.append('enddate', (startdate === null ? '' : enddate)); 
    this.api.postdata(formdata, config.pan.panstatement).subscribe((res: any) => {
      if (res.statuscode == 200) {
        const fileName = 'pan-Statement.xlsx';
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(res['data']);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Pan-Statement');
        XLSX.writeFile(wb, fileName);
      }else{
        Swal.fire({
          icon: 'error',
          title: res.message 
        }) 
      }
    });
  }

  GetChildData(data:any){  
    this.downloadexl =data;  
  //console.log(data);
    
 } 
 onDateRangePickerShow() {
  // This is a workaround to show previous month
  var prevMonth = new Date();
  prevMonth.setMonth(prevMonth.getMonth() - 1);
  this.rangePicker._datepicker.instance.monthSelectHandler({ date: prevMonth });
}

filter() {
  let search:any = {};
  search.startdate =this.dt.transform(this.form.get('selectdate')?.value[0]);
  search.enddate = this.dt.transform(this.form.get('selectdate')?.value[1]);
  this.dt.filter(search)
}

}
