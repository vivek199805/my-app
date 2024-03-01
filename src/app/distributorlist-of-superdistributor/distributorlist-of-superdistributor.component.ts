import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { config } from 'src/app/service/config';
import { CustConfg } from 'src/app/_helpers/common/custom-datepicker/ngx-datePicker-CustConfg';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
@Component({
  selector: 'app-distributorlist-of-superdistributor',
  templateUrl: './distributorlist-of-superdistributor.component.html',
  styleUrls: ['./distributorlist-of-superdistributor.component.css']
})
export class DistributorlistOfSuperdistributorComponent implements OnInit {
  @ViewChild('rangePicker') rangePicker: any;
  @ViewChild(DataTableToolsComponent) dt!: DataTableToolsComponent;
  form!: FormGroup;
  search: any = { startdate: "", enddate: "" };
  maxDate!: Date;
  minDate!: Date;
  chooseOption: any;
  bsCustConfg = CustConfg;
  userid: any;
  distributorId: any;
  data1: any;
  columns: any = [];
  url: any;
  listtype:any;
  constructor(private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.params.subscribe(parameter => {
      this.distributorId = parameter.id;
    })
    const date = new Date();
    this.minDate = new Date(1950, 1, 1);
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    this.data1 = JSON.parse(decode);
  //console.log(this.data1)
  }

  ngOnInit(): void {
    // if (this.data1.usertype == 0 || this.data1.usertype == 1) {
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
          pipe: 'date'
        }, {
          title: "Action",
          data: 'id',
          pipe: function (obj: any) {
            return "<a routerLink='/retilerlist/" + obj.id + "' class='btn btn-primary'>See Retailer</a>";
          }
        }
      ];
      this.listtype ='distributor'
      this.url = config.tree.getDistributorList;
      this.userid = this.distributorId;
    // }
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
