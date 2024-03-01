import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { CustConfg } from '../_helpers/common/custom-datepicker/ngx-datePicker-CustConfg';
import { DataTableToolsComponent } from '../_helpers/data-table-tools/data-table-tools.component';
import { EncodeDecode } from '../_helpers/encode-decode';
@Component({
  selector: 'app-retailerlist-of-distributor',
  templateUrl: './retailerlist-of-distributor.component.html',
  styleUrls: ['./retailerlist-of-distributor.component.css']
})
export class RetailerlistOfDistributorComponent implements OnInit {
  distributorId: any;
  data1: any;
  userid: any;
  @ViewChild('rangePicker') rangePicker: any;
  @ViewChild(DataTableToolsComponent) dt!: DataTableToolsComponent;
  search: any = { startdate: "", enddate: "" };
  maxDate!: Date;
  minDate!: Date;
  chooseOption: any;
  bsCustConfg = CustConfg;
  url: string = ''
  columns: any = [];
  listtype:any;

  constructor(private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.params.subscribe(parameter => {
      this.distributorId = parameter.id;
    })
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    this.data1 = JSON.parse(decode);
  //console.log(this.data1)
  }

  ngOnInit(): void {
    // if (this.data1.usertype == 2 || this.data1.usertype == 0 || this.data1.usertype == 1) {
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
          pipe: 'date'
        },
      ];
      this.listtype='retailer'
      this.userid = this.distributorId;
    //console.log(this.userid)
      this.url = config.tree.getRetailerList;
    // }
  }

}
