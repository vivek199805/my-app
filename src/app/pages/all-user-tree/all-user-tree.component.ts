import { Component, OnInit, ViewChild } from '@angular/core';
import { config } from '../../service/config';
import { ApiService } from '../../service/api.service';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustConfg } from 'src/app/_helpers/common/custom-datepicker/ngx-datePicker-CustConfg';
import { Router } from '@angular/router';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';
@Component({
  selector: 'app-all-user-tree',
  templateUrl: './all-user-tree.component.html',
  styleUrls: ['./all-user-tree.component.css']
})
export class AllUserTreeComponent implements OnInit {
  userid:any
  @ViewChild('rangePicker') rangePicker: any;
  @ViewChild(DataTableToolsComponent) dt!: DataTableToolsComponent;
  form: FormGroup;
  search: any = { startdate: "", enddate: "" };
  maxDate!: Date;
  minDate!: Date;
  chooseOption: any;
  bsCustConfg = CustConfg;
  data1:any;
  url: string = ''
  columns : any = [];

  constructor(private api: ApiService,private route:Router) {
    this.form = new FormGroup({
      selectdate: new FormControl([new Date(), new Date()], [Validators.required]),
    })
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);  
    if(data.usertype == '5'){
    this.route.navigate(['/'])
    }
  }

  ngOnInit(): void {
    const date = new Date();
    this.minDate = new Date(1950, 1, 1);
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    this.data1= JSON.parse(decode);
  //console.log(this.data1)
    if (this.data1.usertype == 4) {
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
        {
          title: 'Phone no',
          data: 'phone'
        },
        {
          title: 'Firm name',
          data: 'firmname'
        },
        {
          title: 'Pincode',
          data: 'pincode'
        },
        {
          title: 'Pan No.',
          data: 'pannumber'
        },
        {
          title: 'Main Balance',
          data: 'cd_balance'
        },
        // {
        //   title: 'Cash balance',
        //   data: 'balance'
        // },
        {
          title: "Date",
          data: 'addeddate',
          pipe:'date'
        },
      ];
      this.url = config.account.retailer.list
    }  else if(this.data1.usertype == 3){
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
        {
          title: 'Phone no',
          data: 'phone'
        },
        {
          title: 'Firm name',
          data: 'firmname'
        },
        {
          title: 'Pincode',
          data: 'pincode'
        },
        {
          title: 'Pan No.',
          data: 'pannumber'
        },
        {
          title: 'Main Balance',
          data: 'cd_balance'
        },
        {
          title: 'Cash balance',
          data: 'balance'
        },
        {
          title: "Date",
          data: 'addeddate',
          pipe:'date'
        },  
         {
          title: "Action",
          data: 'id',
          pipe: function (obj:any) {  
            return  "<a routerLink='/retilerlist/"+obj.id+"' class='btn btn-primary'>See Retailer</a>"; 
          }
        }
      ];
      this.url = config.tree.getDistributorList;
      this.userid= this.data1.userid
      // console.log(this.data1.userid)
     //console.log(this.userid)
      
    }
    else if(this.data1.usertype == 2){
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
        {
          title: 'Phone no',
          data: 'phone'
        },
        {
          title: 'Firm name',
          data: 'firmname'
        },
        {
          title: 'Pincode',
          data: 'pincode'
        },
        {
          title: 'Pan No.',
          data: 'pannumber'
        },
        {
          title: 'Balance',
          data: 'cd_balance'
        },
        {
          title: 'Cash balance',
          data: 'balance'
        },
        {
          title: "Date",
          data: 'addeddate',
          pipe:'date'
        },  
         {
          title: "Action",
          data: 'id',
          pipe: function (obj:any) {  
            // return  "<a routerLink='/retilerlist/"+obj.id+"' class='btn btn-primary'>See Retailer</a>"; 
            return  "<a routerLink='/Distributorlist/"+obj.id+"' class='btn btn-primary'>See Distribotor</a>";  
          }
        }
      ];
      // this.url = config.tree.getDistributorList;
       this.url = config.tree.getPartnerList;
      this.userid= this.data1.userid
      // console.log(this.data1.userid)
     //console.log(this.userid)
      
    }
    else if(this.data1.usertype == 0 || this.data1.usertype == 1 || this.data1.usertype == 6){
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
        {
          title: 'Phone no',
          data: 'phone'
        },
        {
          title: 'Firm name',
          data: 'firmname'
        },
        {
          title: 'Pincode',
          data: 'pincode'
        },
        {
          title: 'Pan No.',
          data: 'pannumber'
        },
        {
          title: 'Main Balance',
          data: 'cd_balance'
        },
        {
          title: 'Cash balance',
          data: 'balance'
        },
        {
          title: "Date",
          data: 'addeddate',
          pipe:'date'
        },     {
          title: "Action",
          data: 'id',
          pipe: function (obj:any) {  
            return  "<a routerLink='/Partnerlist/"+obj.id+"' class='btn btn-primary'>See partner</a>";  
          }
        }
      ];
      this.url = config.tree.getSuperDistributorList;
      this.userid= this.data1.userid
      // console.log(this.data1.userid)
      
    }

  }

  filter() {
    let search: any = {};
    search.startdate = this.dt.transform(this.form.get('selectdate')?.value[0]);
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




}
