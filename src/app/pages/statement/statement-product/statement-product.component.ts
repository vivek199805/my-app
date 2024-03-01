import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnyRecord } from 'dns';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { CustConfg } from 'src/app/_helpers/common/custom-datepicker/ngx-datePicker-CustConfg';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
declare var $: any;

@Component({
  selector: 'app-statement-product',
  templateUrl: './statement-product.component.html',
  styleUrls: ['./statement-product.component.css']
})
export class StatementProductComponent implements OnInit {
  @ViewChild(DataTableToolsComponent) dt!: DataTableToolsComponent; 
  search: any = { startdate: "", enddate: "" };
  maxDate!: Date; 
  url: string = config.statement.productstmt; 
  form: any = FormGroup;
  @ViewChild('rangePicker') rangePicker: any;
  downloadexl: any; 
  columns:any;
  bsCustConfg = CustConfg;
  minDate!: Date;
  listtype ='statement'
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
  constructor(private api: ApiService) { 
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);
    this.userType = data.usertype
    this.form = new FormGroup({
      selectdate: new FormControl([new Date(), new Date()], [Validators.required]),
    })
  }

  ngOnInit(): void {
    const date = new Date();
    this.minDate = new Date(1950, 1, 1);
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if(this.userType ==='0'){
    this.columns = [
      {
        title: "Sno",
        data: 'id',
      }, 
      {
        title: 'TXN ID',
        data: 'txnid'
      },
      {
        title: 'Username',
        data: 'username'
      },
      {
        title: 'Retailer Name',
        data: 'retailer_name'
      },
      {
        title: 'Retailer Phone',
        data: 'phone'
      },
      {
        title: 'Retailer Email',
        data: 'email'
      },
      {
        title: "Product Name",
        data: 'product'
      },  
      {
        title: "Price",
        data: 'amount',
        pipe: "currency"
      },
      {
        title: "Discount Price",
        data: 'discount_amount',
        pipe: "currency"
      },
      {
        title: "Total Price",
        data: 'tamount',
        pipe: "currency"
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
      {
        title: "Print",
        pipe: 'print'
      }
    ];
  }else{
    this.columns = [
      {
        title: "Sno",
        data: 'id',
      }, 
      {
        title: 'TXN ID',
        data: 'txnid'
      }, 
      {
        title: "Product Name",
        data: 'product'
      },  
      {
        title: "Price",
        data: 'amount',
        pipe: "currency"
      },
      {
        title: "Discount Price",
        data: 'discount_amount',
        pipe: "currency"
      },
      
      {
        title: "Total Price",
        data: 'tamount',
        pipe: "currency"
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
      {
        title: "Print",
        pipe: 'print'
      }
    ];
  }
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
  funObj(obj: any) {
    var key = obj.key;
    var value = obj.value; 
    // console.log(value);

  }
  filter() {
    let search: any = {};
    search.startdate = this.dt.transform(this.form.get('selectdate')?.value[0]);
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
}
