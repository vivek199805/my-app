import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { config } from 'src/app/service/config'; 
import { CustConfg } from 'src/app/_helpers/common/custom-datepicker/ngx-datePicker-CustConfg';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';


@Component({
  selector: 'app-listcomplaint',
  templateUrl: './listcomplaint.component.html',
  styleUrls: ['./listcomplaint.component.css']
})
export class ListcomplaintComponent implements OnInit {
@ViewChild('rangePicker') rangePicker:any;
@ViewChild(DataTableToolsComponent) dt!:DataTableToolsComponent;
form:FormGroup;
search:any = {startdate:"",enddate:""};
maxDate!: Date;
minDate!: Date;
chooseOption:any;
bsCustConfg = CustConfg;
url: string = config.complaint.list; 
  
  columns: any = [ 
    {
      title: 'Ticket No',
      data: 'ticket_no'
    },
    {
      title: 'Sender Name',
      data: 'sender_name'
    },
    {
      title:'Type',
      data:'type'
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
      title: "Action",
      data: 'id',
      pipe: function (obj:any) {
        return "<a routerLink='/complaint/complaint-chat/"+obj.ticket_no+"' class='btn btn-primary'>View</a>";
      }
    }
  ];
  constructor(){
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
    search.status = this.chooseOption;
    this.dt.filter(search)
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
