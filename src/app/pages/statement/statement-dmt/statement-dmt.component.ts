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
  selector: 'app-statement-dmt',
  templateUrl: './statement-dmt.component.html',
  styleUrls: ['./statement-dmt.component.css']
})
export class StatementDmtComponent implements OnInit {
  @ViewChild(DataTableToolsComponent) dt!: DataTableToolsComponent;
  @ViewChild('modal', { read: ElementRef }) modal!: ElementRef;
  search: any = { startdate: "", enddate: "" };
  maxDate!: Date;
  refundid: any;
  url: string = config.statement.dmt;
  exceldownurl: string = config.downloadstatement.dmt;
  form: any = FormGroup;
  @ViewChild('rangePicker') rangePicker: any;
  downloadexl: any;
  refund: any = FormGroup;
  columns:any;
  sliptype:any ='dmt';
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
  claim: any = FormGroup;
  refid: any
  constructor(private api: ApiService) {
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);
    this.userType = data.usertype
    this.form = new FormGroup({
      selectdate: new FormControl([new Date(), new Date()], [Validators.required]),
    })
    this.refund = new FormGroup({
      authcode: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
    });

    this.claim = new FormGroup({
      otp: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
    });
  }

  ngOnInit(): void {
    const date = new Date();
    this.minDate = new Date(1950, 1, 1);
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if(this.userType ==='0'){
      this.columns = [
        // {
        //   title: "Sno",
        //   data: 'sno',
        // },  
        {
          title: 'Ref ID',
          data: 'refid'
        },
        // {
        //   title: 'TXN ID',
        //   data: 'txnid'
        // },
        {
          title: 'Username',
          data: 'username'
        },
        {
          title: "ACCOUNT NUMBER",
          data: 'acno'
        }, 
        {
          title: "MOBILE NUMBER",
          data: 'mobile'
        }, 
        {
          title: 'opening BAL',
          data: 'cd_opening'
        },
        {
          title: 'closing BAL',
          data: 'cd_closing'
        },
        {
          title: "Amount",
          data: 'amount',
          pipe: "currency"
        },
        {
          title: "Bene Name",
          data: 'benename'
        },
        {
          title: 'Bank name',
          data: 'bankname'
        },
        {
          title: "IFSC Code",
          data: 'ifsccode'
        }, 
        {
          title: 'Charge',
          data: 'customercharge',
          pipe: "currency"
        },
        {
          title: "SUP COM",
          data: 'sdcomm',
          pipe: "currency"
        },
        {
          title: "PAR COM",
          data: 'pcomm',
          pipe: "currency"
        },
        {
          title: "DIS COM",
          data: 'dcomm',
          pipe: "currency"
        },
        {
          title: 'RET COM',
          data: 'comm',
          pipe: "currency"
        },
        {
          title: "GST",
          data: 'gst',
          pipe: "currency"
        },
        {
          title: "Discount",
          data: 'discount',
          pipe: "currency"
        },           
        {
          title: "TDS",
          data: 'tds',
          pipe: "currency"
        },
        {
          title: "Net Comm.S",
          data: 'netcommission',
          pipe: "currency"
        },
        {
          title: "utr",
          data: 'utr'
        },
        {
          title: "Status",
          data: 'status'
        },
        {
          title: "Remarks",
          data: 'remarks'
        },
        {
          title: "MODE",
          data: 'transfertype'
        },
        {
          title: "Date & Time",
          data: 'dateadded',
          pipe: "datetime"
        },
        // {
        //   title: "API Type",
        //   data: 'apitype', 
        // },
        {
          title: "Refunded",
          data: 'refunded', 
        }, 
        {
          title: "Action",
          data: 'id',
          pipe: function (obj: any) {
            let btnStr: any = '';
            let is_query = "<a   routerLink='/statement/query/" + obj.id + "' target='_blank'  class='btn btn-warning btn-sm ml-2 mb-1'>Query</a>";
            let is_process = "<a  routerLink='/statement/process/" + obj.id + "'  target='_blank' class='btn btn-success btn-sm ml-2  mb-1'>Process</a>";
            let is_refund = "<a (click)='showRefundModel' #modal data-toggle='modal' data-target='#transactionStatus'  class='btn btn-primary btn-sm ml-2  mb-1'>Refund</a>";
    
            if (obj.is_query == 1) {
              btnStr += is_query;
            }
            if (obj.is_process == 1) {
              btnStr += is_process;
            }
            if (obj.is_refund == 1) {
              btnStr += is_refund;
            }
            // console.log(btnStr);
    
            return (obj.is_query == 0 && obj.is_process == 0 && obj.is_refund == 0) ? 'No Action Found' : btnStr;
          }
        },
        {
          title: "Print",
          pipe:function(obj:any){
            let is_print = "<a (click)='Print' class='btn btn-success btn-sm'>Print </a>";
            return  is_print;
          },
        }
      ];
    }
    if(this.userType ==='2'){
      this.columns = [
        {
          title: "Sno",
          data: 'sno',
        },  
        {
          title: 'Ref ID',
          data: 'refid'
        },
        {
          title: 'TXN ID',
          data: 'txnid'
        },
        // {
        //   title: "A/C no",
        //   data: 'acno'
        // }, 
        {
          title: 'Username',
          data: 'username'
        },
        // {
        //   title: "Mobile",
        //   data: 'mobile'
        // }, 
        // {
        //   title: 'opening BAL',
        //   data: 'cd_opening'
        // },
        // {
        //   title: 'closing BAL',
        //   data: 'cd_closing'
        // },
        {
          title: "Amount",
          data: 'amount',
          pipe: "currency"
        },
        // {
        //   title: "Bene Name",
        //   data: 'benename'
        // },
        // {
        //   title: 'Bank name',
        //   data: 'bankname'
        // },
        // {
        //   title: "IFSC Code",
        //   data: 'ifsccode'
        // }, 
        // {
        //   title: 'Charge',
        //   data: 'customercharge',
        //   pipe: "currency"
        // },
        {
          title: "SUP COM",
          data: 'sdcomm',
          pipe: "currency"
        },
        {
          title: 'PAR COM',
          data: 'pcomm',
          pipe: "currency"
        },  
        {
          title: 'DIS COM',
          data: 'dcomm',
          pipe: "currency"
        },
        {
          title: 'RET COM',
          data: 'comm',
          pipe: "currency"
        },
        // {
        //   title: "GST",
        //   data: 'gst',
        //   pipe: "currency"
        // },
        // {
        //   title: "Discount",
        //   data: 'discount',
        //   pipe: "currency"
        // },           
        // {
        //   title: "TDS",
        //   data: 'tds',
        //   pipe: "currency"
        // },
        // {
        //   title: "Net Comm.S",
        //   data: 'netcommission',
        //   pipe: "currency"
        // },
        {
          title: "utr",
          data: 'utr'
        },
        {
          title: "MODE",
          data: 'transfertype'
        },
        {
          title: "Date & time",
          data: 'dateadded',
          pipe: "datetime"
        },
        {
          title: "Remarks",
          data: 'remarks'
        },
        {
          title: "Status",
          data: 'status'
        },
        // {
        //   title: "API Type",
        //   data: 'apitype', 
        // },
        // {
        //   title: "Refunded",
        //   data: 'refunded', 
        // }, 
        {
          title: "Print",
          pipe:function(obj:any){
            let is_print = "<a (click)='Print' class='btn btn-success btn-sm'>Print </a>";
            return  is_print;
          }, }
      ];
    }
    if(this.userType ==='3'){
      this.columns = [
        {
          title: "Sno",
          data: 'sno',
        },  
        {
          title: 'Ref ID',
          data: 'refid'
        },
        {
          title: 'TXN ID',
          data: 'txnid'
        },
        // {
        //   title: "A/C no",
        //   data: 'acno'
        // }, 
        {
          title: 'Username',
          data: 'username'
        },
        // {
        //   title: "Mobile",
        //   data: 'mobile'
        // }, 
        // {
        //   title: 'opening BAL',
        //   data: 'cd_opening'
        // },
        // {
        //   title: 'closing BAL',
        //   data: 'cd_closing'
        // },
        {
          title: "Amount",
          data: 'amount',
          pipe: "currency"
        },
        // {
        //   title: "Bene Name",
        //   data: 'benename'
        // },
        // {
        //   title: 'Bank name',
        //   data: 'bankname'
        // },
        // {
        //   title: "IFSC Code",
        //   data: 'ifsccode'
        // }, 
        // {
        //   title: 'Charge',
        //   data: 'customercharge',
        //   pipe: "currency"
        // },
        {
          title: "PAR COM",
          data: 'pcomm',
          pipe: "currency"
        },
        {
          title: 'DIS COM',
          data: 'dcomm',
          pipe: "currency"
        },
        {
          title: 'RET COM',
          data: 'comm',
          pipe: "currency"
        },
        // {
        //   title: "GST",
        //   data: 'gst',
        //   pipe: "currency"
        // },
        // {
        //   title: "Discount",
        //   data: 'discount',
        //   pipe: "currency"
        // },           
        // {
        //   title: "TDS",
        //   data: 'tds',
        //   pipe: "currency"
        // },
        // {
        //   title: "Net Comm.S",
        //   data: 'netcommission',
        //   pipe: "currency"
        // },
        {
          title: "utr",
          data: 'utr'
        },
        {
          title: "MODE",
          data: 'transfertype'
        },
        {
          title: "Date & time",
          data: 'dateadded',
          pipe: "datetime"
        },
        {
          title: "Status",
          data: 'status'
        },
        {
          title: "Remarks",
          data: 'remarks'
        },
        // {
        //   title: "API Type",
        //   data: 'apitype', 
        // },
        // {
        //   title: "Refunded",
        //   data: 'refunded', 
        // }, 
        {
          title: "Print",
          pipe:function(obj:any){
            let is_print = "<a (click)='Print' class='btn btn-success btn-sm'>Print </a>";
            return  is_print;
          }, }
      ];
    }
    if(this.userType ==='4'){
      this.columns = [
        {
          title: "Sno",
          data: 'sno',
        },  
        {
          title: 'Ref ID',
          data: 'refid'
        },
        {
          title: 'TXN ID',
          data: 'txnid'
        },
        // {
        //   title: "A/C no",
        //   data: 'acno'
        // }, 
        {
          title: 'Username',
          data: 'username'
        },
        // {
        //   title: "Mobile",
        //   data: 'mobile'
        // }, 
        // {
        //   title: 'opening BAL',
        //   data: 'cd_opening'
        // },
        // {
        //   title: 'closing BAL',
        //   data: 'cd_closing'
        // },
        {
          title: "Amount",
          data: 'amount',
          pipe: "currency"
        },
        // {
        //   title: "Bene Name",
        //   data: 'benename'
        // },
        // {
        //   title: 'Bank name',
        //   data: 'bankname'
        // },
        // {
        //   title: "IFSC Code",
        //   data: 'ifsccode'
        // }, 
        // {
        //   title: 'Charge',
        //   data: 'customercharge',
        //   pipe: "currency"
        // },
        {
          title: "DIS COM",
          data: 'dcomm',
          pipe: "currency"
        },
        {
          title: 'RET COM',
          data: 'comm',
          pipe: "currency"
        },
        // {
        //   title: "GST",
        //   data: 'gst',
        //   pipe: "currency"
        // },
        // {
        //   title: "Discount",
        //   data: 'discount',
        //   pipe: "currency"
        // },           
        // {
        //   title: "TDS",
        //   data: 'tds',
        //   pipe: "currency"
        // },
        // {
        //   title: "Net Comm.S",
        //   data: 'netcommission',
        //   pipe: "currency"
        // },
        {
          title: "utr",
          data: 'utr'
        },
        {
          title: "MODE",
          data: 'transfertype'
        },
        {
          title: "Date & time",
          data: 'dateadded',
          pipe: "datetime"
        },
        {
          title: "Status",
          data: 'status'
        },
        {
          title: "Remarks",
          data: 'remarks'
        },
        // {
        //   title: "API Type",
        //   data: 'apitype', 
        // },
        // {
        //   title: "Refunded",
        //   data: 'refunded', 
        // }, 
        {
          title: "Print",
          pipe:function(obj:any){
            let is_print = "<a (click)='Print' class='btn btn-success btn-sm'>Print </a>";
            return  is_print;
          }, }
      ];
    }
    if(this.userType ==='5'){
      this.columns = [
        {
          title: "Sno",
          data: 'sno',
        },  
        {
          title: "MOBILE NUMBER",
          data: 'mobile'
        },
        {
          title: "ACCOUNT NUMBER",
          data: 'acno'
        },
         {
          title: 'TXN ID',
          data: 'txnid'
        },
        {
          title: "Amount",
          data: 'amount',
          pipe: "currency"
        },
        {
          title: "UTR",
          data: 'utr'
        },
        {
          title: "MODE",
          data: 'transfertype'
        },
        {
          title: "Date & Time",
          data: 'dateadded',
          pipe: "datetime"
        },
        {
          title: "Remarks",
          data: 'remarks'
        },
        {
          title: "Status",
          data: 'status'
        },
        // {
        //   title: 'Ref ID',
        //   data: 'refid'
        // },
        // {
        //   title: 'Username',
        //   data: 'username'
        // },
        // {
        //   title: "Bene Name",
        //   data: 'benename'
        // }, 
        // {
        //   title: 'Bank name',
        //   data: 'bankname'
        // },
        // {
        //   title: 'Charge',
        //   data: 'customercharge',
        //   pipe: "currency"
        // },
        // {
        //   title: "Refunded",
        //   data: 'refunded', 
        // },
        // {
        //   title: "Mobile",
        //   data: 'mobile'
        // }, 
        // {
        //   title: 'opening BAL',
        //   data: 'cd_opening'
        // },
        // {
        //   title: 'closing BAL',
        //   data: 'cd_closing'
        // },

        // {
        //   title: "IFSC Code",
        //   data: 'ifsccode'
        // }, 

        {
          title: "RET COM",
          data: 'comm',
          pipe: "currency"
        },
        // {
        //   title: "GST",
        //   data: 'gst',
        //   pipe: "currency"
        // },
        // {
        //   title: "Discount",
        //   data: 'discount',
        //   pipe: "currency"
        // },           
        // {
        //   title: "TDS",
        //   data: 'tds',
        //   pipe: "currency"
        // },
        // {
        //   title: "Net Comm.S",
        //   data: 'netcommission',
        //   pipe: "currency"
        // },
  
        // {
        //   title: "API Type",
        //   data: 'apitype', 
        // },
        {
          title: "Claim",
          data: 'id',
          pipe: function (obj: any) {
            let btnStr: any = '';
            let is_claim = "<a (click)='claim' class='btn btn-success btn-sm'>Claim </a>";

  
            if (obj.is_claim == 1) {
              btnStr += is_claim;
            }
            // console.log(btnStr);
    
            return ( obj.is_claim == 0) ? 'No Action Found' : btnStr;
          }
        }, 
        {
          title: "Print",
          pipe:function(obj:any){
            let is_print = "<a (click)='Print' class='btn btn-success btn-sm'>Print </a>";
            return  is_print;
          }, }
      ];
    }
    if(this.userType ==='6'){
      this.columns = [
        {
          title: "Sno",
          data: 'sno',
        },  
        {
          title: 'Ref ID',
          data: 'refid'
        },
        {
          title: 'TXN ID',
          data: 'txnid'
        },
        {
          title: "A/C no",
          data: 'acno'
        }, 
        {
          title: 'Username',
          data: 'username'
        },
        {
          title: "Mobile",
          data: 'mobile'
        }, 
        {
          title: 'opening BAL',
          data: 'cd_opening'
        },
        {
          title: 'closing BAL',
          data: 'cd_closing'
        },
        {
          title: "Amount",
          data: 'amount',
          pipe: "currency"
        },
        {
          title: "Bene Name",
          data: 'benename'
        },
        {
          title: 'Bank name',
          data: 'bankname'
        },
        {
          title: "IFSC Code",
          data: 'ifsccode'
        }, 
        {
          title: 'Charge',
          data: 'customercharge',
          pipe: "currency"
        },
        {
          title: "SUP COM",
          data: 'sdcomm',
          pipe: "currency"
        },
        {
          title: "PAR COM",
          data: 'pcomm',
          pipe: "currency"
        },
        {
          title: "DIS COM",
          data: 'dcomm',
          pipe: "currency"
        },
        {
          title: "RET COM",
          data: 'comm',
          pipe: "currency"
        },
        {
          title: "GST",
          data: 'gst',
          pipe: "currency"
        },
        {
          title: "Discount",
          data: 'discount',
          pipe: "currency"
        },           
        {
          title: "TDS",
          data: 'tds',
          pipe: "currency"
        },
        {
          title: "Net Comm.S",
          data: 'netcommission',
          pipe: "currency"
        },
        {
          title: "utr",
          data: 'utr'
        },
        {
          title: "Status",
          data: 'status'
        },
        {
          title: "Remarks",
          data: 'remarks'
        },
        {
          title: "TRANSFER TYPE",
          data: 'transfertype'
        },
        {
          title: "Date & time",
          data: 'dateadded',
          pipe: "datetime"
        },
        // {
        //   title: "API Type",
        //   data: 'apitype', 
        // },
        {
          title: "Refunded",
          data: 'refunded', 
        }, 
        {
          title: "Print",
          pipe:function(obj:any){
            let is_print = "<a (click)='Print' class='btn btn-success btn-sm'>Print </a>";
            return  is_print;
          }, }
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
    this.refundid = obj.value.id;
    this.refid = obj.value.refid;
    //  console.log(value.refid);
    switch (key) {
      case "claim":
        const formdata = new FormData();
        formdata.append('token', config.tokenauth);
        formdata.append('referenceid', value.id);
        this.api.postdata(formdata, config.statement.claim).subscribe((res: any) => {
          if (res.statuscode == 200) {
            $("#transaction").modal('show');
          }
          Swal.fire({
            icon: 'error',
            title: res.message
          })
        })
        break;
        case "Print":
          const formdata1 = new FormData();
          formdata1.append('token', config.tokenauth);
          formdata1.append('refid', value.refid);
          this.api.postdata(formdata1, config.statement.getreceipt).subscribe((res: any) => {     
            if (res.statuscode == 200) {
              this.dt.printSlip(res.data)
            }
          });
 
      }  
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

  download($event: any) {
    let startdate = this.dt.transform(this.form.get('selectdate')?.value[0]);
    let enddate = this.dt.transform(this.form.get('selectdate')?.value[1]);
    let formdata: any = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('startdate', (startdate === null ? '' : startdate));
    formdata.append('enddate', (startdate === null ? '' : enddate));
    this.api.postdata(formdata, this.exceldownurl).subscribe((res: any) => {
      if (res.statuscode == 200) {
        const fileName = 'Dmt-Statement.xlsx';
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(res['data']);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Dmt-Statement');
        XLSX.writeFile(wb, fileName);
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        })
      }
    });
  }

  GetChildData(data: any) {
    this.downloadexl = data;
  }
  closeModal() {
  //console.log('');
    $("#transactionStatus").modal('hide');
    $("#transaction").modal('hide');
  }

  request_refund() {
    let formdata: any = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('id', this.refundid);
    formdata.append('authcode', this.refund.get('authcode')?.value);
    this.api.postdata(formdata, config.statement.refund).subscribe((res: any) => {
      if (res.statuscode == 200) {
        this.closeModal();
        this.filter();
        Swal.fire({
          title: res.message,
          icon: 'success'
        });
        this.refund.reset();
      } else {
        this.refund.reset();
        Swal.fire({
          icon: 'error',
          title: res.message
        })
      }
    })
  }

  request_claim() {
    let formdata: any = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('referenceid', this.refundid);
    formdata.append('otp', this.claim.get('otp')?.value);
    this.api.postdata(formdata, config.statement.claimrefund).subscribe((res: any) => {
      if (res.statuscode == 200) {
        this.closeModal();
        this.filter();
        Swal.fire({
          title: res.message,
          icon: 'success'
        });
        this.claim.reset();
      } else {
        this.claim.reset();
        Swal.fire({
          icon: 'error',
          title: res.message
        })
      }
    })
  }

  get r() {
    return this.refund.controls
  }
  get c() {
    return this.claim.controls
  }
}