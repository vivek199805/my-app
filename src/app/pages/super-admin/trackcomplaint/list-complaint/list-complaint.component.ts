import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { config } from 'src/app/service/config'; 
import { CustConfg } from 'src/app/_helpers/common/custom-datepicker/ngx-datePicker-CustConfg';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import {Router } from '@angular/router'

@Component({
  selector: 'app-list-complaint',
  templateUrl: './list-complaint.component.html',
  styleUrls: ['./list-complaint.component.css'] 
})
export class ListComplaintComponent implements OnInit {
@ViewChild('rangePicker') rangePicker:any;
@ViewChild(DataTableToolsComponent) dt!:DataTableToolsComponent;
form!:FormGroup;
search:any = {startdate:"",enddate:""};
maxDate!: Date;
minDate!: Date;
chooseOption:any;
bsCustConfg = CustConfg;
  url: string = config.complaint.adminlist;

  columns: any = [ 
    {
      title: 'Ticket No',
      data: 'ticket_no'
    },
    {
      title:'Transaction Id',
      data:'transaction_id'
    },
    {
      title:'Status',
      data:'status'
    },
    {
      title:'Time',
      data:'time'
    },
    {
      title: "Action",
      data: 'file_url',
      pipe: function (obj:any) {
        return "<a href='"+obj.file_url+"' download class='btn btn-primary'>File</a>";
      }
    },
    {
      title: "Action",
      data: 'id',
      pipe: function (obj:any) {
        return "<a routerLink='/complaint/complaint-chat/"+obj.ticket_no+"' class='btn btn-primary'>View</a>";
      }
    }
  ];
  constructor(private route:Router){
    this.form = new FormGroup({
      selectdate: new FormControl([new Date(),new Date()], [Validators.required]), 
    })

    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);
    data.usertype;
    if(data.usertype !='0'){
      // alert('55');
      this.route.navigate(['/'])
    }

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
    search.status = this.chooseOption;
    this.dt.filter(search)
  //console.log(search)
  }
  onDateRangePickerShow() {
    // This is a workaround to show previous month
    var prevMonth = new Date();
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    this.rangePicker._datepicker.instance.monthSelectHandler({ date: prevMonth });
  }

  getDevice(event:any){
    this.chooseOption = event.target.value;
  //console.log(event.target.value);
  }

}
