import { Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { config } from 'src/app/service/config';
import { CustConfg } from 'src/app/_helpers/common/custom-datepicker/ngx-datePicker-CustConfg';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';
import * as XLSX from 'xlsx';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
@Component({
  selector: 'app-statement-pg',
  templateUrl: './statement-pg.component.html',
  styleUrls: ['./statement-pg.component.css']
})
export class StatementPgComponent implements OnInit {
  listtype ='statement'
  @ViewChild(DataTableToolsComponent) dt!:DataTableToolsComponent;
  search:any = {startdate:"",enddate:""};
  maxDate!: Date;
  url:string = config.statement.pg;
  exceldownurl:string = config.downloadstatement.pg;
  form: any =FormGroup;
  @ViewChild('rangePicker') rangePicker:any;
  downloadexl:any;
  columns: any = [
    {
      title: 'User Id',
      data: 'userid'
    },
    {
      title: 'Referance Id',
      data: 'refid'
    },
    {
      title: 'Username',
      data: 'username'
    },
    {
      title: 'Amount',
      data: 'amount',
      pipe: "currency"
    },
    {
      title: 'Profit',
      data: 'profit',
      pipe: "currency"
    },
    {
      title: 'charge',
      data: 'charge'
    },
    {
      title: 'utr',
      data: 'utr'
    },
    {
      title: 'API',
      data: 'api'
    }, 
    {
      title: "Mobile No.",
      data: 'mobile'
    },
    {
      title: "Email Id",
      data: 'email'
    },

    {
      title: "PG Mode",
      data: 'mode_pg'
    },
    {
      title: "Status",
      data: 'status'
    }, 
    {
      title: "Date & time",
      data: 'dateadded',
      pipe: "datetime"
    },
  ];
  bsCustConfg = CustConfg;
  minDate!: Date;

  public morefilter: boolean = false;
  userKeyword = 'userdetails';
  userAutoComData: any;
  superDistributorID: any;
  DistributorID: any;
  PartnerID: any
  retailerID: any;

  SuperDistributorData:any;
  distributorData:any;
  partnerData:any;
  retailerData:any;

  objectIDs: any = {
    superdistributorId: '',
    distributorId: '',
    partnerId: '',
    retilerId: '',
  }
  userType:any;

  constructor(private api:ApiService) {
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);
    this.userType = data.usertype
    this.form = new FormGroup({
      selectdate: new FormControl([new Date(),new Date()], [Validators.required]), 
    })
   }

  ngOnInit(): void { 
    const date = new Date(); 
    this.minDate = new Date(1950, 1, 1);
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());      
  }  

  searchCleared() {
    this.superDistributorID = null;
    this.DistributorID = null;
    this.PartnerID = null;
    this.retailerID = null;
  }

  selectSuperDistributor(item: any) {
    this.superDistributorID = item.id
  }

  selectDistributor(item: any) {
    this.DistributorID = item.id
  }

  selectPartner(item: any) {   
    this.PartnerID = item.id
  }

  selectRetailer(item: any) {
    // do something with selected item
    //console.log(item);
    this.retailerID = item.id
  }

  forSuperDistributorData(val: any) {
    if (val != this.superDistributorID) {
      this.superDistributorID = val;
      let formdata: any = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('superdistributor', val);
      this.api.postdata(formdata, config.userListDropDown.superdistributor).subscribe((res: any) => {
      //console.log(res);
        
        if (res.data == undefined) {
          this.SuperDistributorData = [];
        } else {
          this.SuperDistributorData = res.data;
        }
      });
    }
  }

  forDistributorData(val: any) {
    if (val != this.DistributorID) {
      this.DistributorID = val;
      let formdata: any = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('superdisId',this.superDistributorID );
      formdata.append('partnerId', this.PartnerID);
      formdata.append('distributor', val);
      this.api.postdata(formdata, config.userListDropDown.distributor).subscribe((res: any) => {
        if (res.data == undefined) {
          this.distributorData = [];
        } else {
          this.distributorData = res.data;
        }
      });
    }
  }


  forPartnerData(val: any) {
    if (val != this.PartnerID) {
      this.PartnerID = val;
      let formdata: any = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('superdisId',this.superDistributorID );
      formdata.append('partner', val);
      this.api.postdata(formdata, config.userListDropDown.partner).subscribe((res: any) => {
        if (res.data == undefined) {
          this.partnerData = [];
        } else {
          this.partnerData = res.data;
        }
      });
    }
  }


  forRetailerData(val: any) {
    if (val != this.retailerID) {
      this.retailerID = val;
      let formdata: any = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('retailer', val);
      formdata.append('superdisId',this.superDistributorID );
      formdata.append('partnerId', this.PartnerID);
      formdata.append('distributorId', this.DistributorID);
      this.api.postdata(formdata, config.userListDropDown.reatiler).subscribe((res: any) => {
        if (res.data == undefined) {
          this.retailerData = [];
        } else {
          this.retailerData = res.data;
        }
      });
    }
  }


  filter() {
    let search:any = {};
    search.startdate =this.dt.transform(this.form.get('selectdate')?.value[0]);
    search.enddate = this.dt.transform(this.form.get('selectdate')?.value[1]);
    this.objectIDs.superdistributorId=this.superDistributorID === null ? '' : this.superDistributorID;
    this.objectIDs.distributorId=this.DistributorID === null ? '' : this.DistributorID;
    this.objectIDs.partnerId=this.PartnerID === null ? '' : this.PartnerID;
    this.objectIDs.retilerId=this.retailerID === null ? '' : this.retailerID;

    this.dt.filter(search)
  }

  onDateRangePickerShow() {
    // This is a workaround to show previous month
    var prevMonth = new Date();
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    this.rangePicker._datepicker.instance.monthSelectHandler({ date: prevMonth });
  }
  
  download($event: any){
    let startdate =this.dt.transform(this.form.get('selectdate')?.value[0]);
    let enddate = this.dt.transform(this.form.get('selectdate')?.value[1]);
    let formdata: any = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('startdate', (startdate === null ? '' : startdate));
    formdata.append('enddate', (startdate === null ? '' : enddate)); 
    this.api.postdata(formdata, this.exceldownurl).subscribe((res: any) => {
      if (res.statuscode == 200) {
        const fileName = 'Pg-Statement.xlsx';
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(res['data']);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Pg-Statement');
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
  } 
}
