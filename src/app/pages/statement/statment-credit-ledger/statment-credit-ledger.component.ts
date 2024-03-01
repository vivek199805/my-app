import { CustConfg } from 'src/app/_helpers/common/custom-datepicker/ngx-datePicker-CustConfg';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { UserLoginDtlService } from 'src/app/service/user-login-dtl.service';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
@Component({
  selector: 'app-statment-credit-ledger',
  templateUrl: './statment-credit-ledger.component.html',
  styleUrls: ['./statment-credit-ledger.component.css']
})
export class StatmentCreditLedgerComponent implements OnInit {
  listtype ='statement'
  @ViewChild(DataTableToolsComponent) dt!: DataTableToolsComponent;
  search: any = { startdate: "", enddate: "" };
  maxDate!: Date;
  url: string = config.statement.creditLedger;

  columns: any = [];
  userType: any; 
  exceldownurl: string = config.downloadstatement.creditledger;
  downloadexl: any;
  minDate!: Date;
  form:any=FormGroup;
  bsCustConfg = CustConfg;

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
  // userType:any;
  @ViewChild('rangePicker') rangePicker: any;
  constructor(private _UserLoginDtlService: UserLoginDtlService, private api: ApiService) {
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);
    this.userType = data.usertype
    this.form = new FormGroup({
      selectdate: new FormControl([new Date(), new Date()], [Validators.required]),
    })
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


  ngOnInit(): void {
    const date = new Date(); 
    this.minDate = new Date(1950, 1, 1);
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this._UserLoginDtlService.geterUserLoginDtl.subscribe((val: any) => {

      if (val) {
        this.userType = val.usertype;
      }
    })

  //console.log(this.userType);
    
    this.setTblHeader();
  }

  setTblHeader() {
    let heading: any;
    switch (+this.userType) {
      case 0:

        heading = [
          {
            data: "username",
            "table_column": "username",
            title: "RETAILER ",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "txnid",
            "table_column": 't.txnid',
            title: "txnid",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "opening",
            "table_column": "opening",
            title: "Opening BAL",
            "is_show": 1,
            "issort": 1, 
          },
          {
            data: "closing",
            "table_column": "tc.closing",
            title: "Closing BAL",
            "is_show": 1,
            "issort": 1 
          },
          {
            data: "amount",
            "table_column": 't.amount',
            title: "amount",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "sdcomm",
            "table_column": 't.sdcomm',
            title: "SUP COM",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "dcomm",
            "table_column": 't.dcomm',
            title: "DIS COM",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "pcomm",
            "table_column": 't.pcomm',
            title: "PAR COM",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "comm",
            "table_column": 't.comm',
            title: "RET COM",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "gst",
            "table_column": 't.gst',
            title: "gst",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "tds",
            "table_column": 't.tds',
            title: "tds",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "stype",
            "table_column": 't.stype',
            title: "Utype",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "narration",
            "table_column": 't.narration',
            title: "narration",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "ttype",
            "table_column": 't.ttype',
            title: "ttype",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "dateadded",
            "table_column": 't.dateadded',
            title: "Date",
            "is_show": 1,
            "issort": 1
          },
          // {
          //   data: "dateadded",
          //   "table_column": "tc.dateadded",
          //   title: "Transaction Date",
          //   "is_show": 1,
          //   "issort": 1,
          //   pipe: "date"
          // },
          // {
          //   data: "remarks",
          //   "table_column": 't.remarks',
          //   title: "remarks",
          //   "is_show": 1,
          //   "issort": 1
          // },
        ]
        break;

      case 1:
        heading = [
          {
            data: "username",
            "table_column": "username",
            title: "RETAILER ",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "txnid",
            "table_column": 't.txnid',
            title: "txnid",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "amount",
            "table_column": 't.amount',
            title: "amount",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "opening",
            "table_column": "opening",
            title: "Opening BAL",
            "is_show": 1,
            "issort": 1, 
          },
          {
            data: "closing",
            "table_column": "tc.closing",
            title: "Closing BAL",
            "is_show": 1,
            "issort": 1 
          },
          {
            data: "sdcomm",
            "table_column": 't.sdcomm',
            title: "SUP COM",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "pcomm",
            "table_column": 't.pcomm',
            title: "PAR COM",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "dcomm",
            "table_column": 't.dcomm',
            title: "DIS COM",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "comm",
            "table_column": 't.comm',
            title: "RET COM",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "gst",
            "table_column": 't.gst',
            title: "gst",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "tds",
            "table_column": 't.tds',
            title: "tds",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "stype",
            "table_column": 't.stype',
            title: "Utype",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "narration",
            "table_column": 't.narration',
            title: "narration",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "ttype",
            "table_column": 't.ttype',
            title: "ttype",
            "is_show": 1,
            "issort": 1
          },
          // {
          //   data: "remarks",
          //   "table_column": 't.remarks',
          //   title: "remarks",
          //   "is_show": 1,
          //   "issort": 1
          // },
          {
            data: 'dateadded',
            "table_column": "tc.dateadded",
            title: "Date",
            "is_show": 1,
            "issort": 1,
            pipe: "date"
          },
        ]
        break;

      case 2:
        heading = [
          {
            data: "username",
            "table_column": "username",
            title: "RETAILER ",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "txnid",
            "table_column": 't.txnid',
            title: "txnid",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "amount",
            "table_column": 't.amount',
            title: "amount",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "opening",
            "table_column": "opening",
            title: "Opening BAL",
            "is_show": 1,
            "issort": 1, 
          },
          {
            data: "closing",
            "table_column": "tc.closing",
            title: "Closing BAL",
            "is_show": 1,
            "issort": 1 
          },
          {
            data: "sdcomm",
            "table_column": 't.sdcomm',
            title: "SUP COM",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "pcomm",
            "table_column": 't.pcomm',
            title: "PAR COM",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "dcomm",
            "table_column": 't.dcomm',
            title: "DIS COM",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "comm",
            "table_column": 't.comm',
            title: "RET COM",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "gst",
            "table_column": 't.gst',
            title: "gst",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "tds",
            "table_column": 't.tds',
            title: "tds",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "stype",
            "table_column": 't.stype',
            title: "Utype",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "narration",
            "table_column": 't.narration',
            title: "narration",
            "is_show": 1,
            "issort": 1
          },
          // {
          //   data: "remarks",
          //   "table_column": 't.remarks',
          //   title: "remarks",
          //   "is_show": 1,
          //   "issort": 1
          // },
          {
            data: "ttype",
            "table_column": 't.ttype',
            title: "ttype",
            "is_show": 1,
            "issort": 1
          },
          {
            data: 'dateadded',
            "table_column": "tc.dateadded",
            title: "Date",
            "is_show": 1,
            "issort": 1,
            pipe: "date"
          },
        ]
        break;

      case 3:
        heading = [
          {
            data: "username",
            "table_column": "username",
            title: "RETAILER ",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "txnid",
            "table_column": 'txnid',
            title: "txnid",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "amount",
            "table_column": 't.amount',
            title: "amount",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "opening",
            "table_column": "opening",
            title: "Opening BAL",
            "is_show": 1,
            "issort": 1, 
          },
          {
            data: "closing",
            "table_column": "tc.closing",
            title: "Closing BAL",
            "is_show": 1,
            "issort": 1 
          },
          // {
          //   data: "sdcomm",
          //   "table_column": 't.sdcomm',
          //   title: "SUP COM",
          //   "is_show": 1,
          //   "issort": 1
          // },
          {
            data: "pcomm",
            "table_column": 't.pcomm',
            title: "PAR COM",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "dcomm",
            "table_column": 't.dcomm',
            title: "DIS COM",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "comm",
            "table_column": 't.comm',
            title: "RET COM",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "gst",
            "table_column": 't.gst',
            title: "gst",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "tds",
            "table_column": 't.tds',
            title: "tds",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "stype",
            "table_column": 't.stype',
            title: "Utype",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "narration",
            "table_column": 't.narration',
            title: "narration",
            "is_show": 1,
            "issort": 1
          },
          // {
          //   data: "remarks",
          //   "table_column": 't.remarks',
          //   title: "remarks",
          //   "is_show": 1,
          //   "issort": 1
          // },
          {
            data: "ttype",
            "table_column": 't.ttype',
            title: "ttype",
            "is_show": 1,
            "issort": 1
          },
          {
            data: 'dateadded',
            "table_column": "tc.dateadded",
            title: "Date",
            "is_show": 1,
            "issort": 1,
            pipe: "date"
          },
        ]
        break;

      case 4:
        heading = [
          {
            data: "username",
            "table_column": "username",
            title: "RETAILER ",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "txnid",
            "table_column": 'txnid',
            title: "txnid",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "amount",
            "table_column": 't.amount',
            title: "amount",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "opening",
            "table_column": "opening",
            title: "Opening BAL",
            "is_show": 1,
            "issort": 1, 
          },
          {
            data: "closing",
            "table_column": "tc.closing",
            title: "Closing BAL",
            "is_show": 1,
            "issort": 1 
          },
          // {
          //   data: "sdcomm",
          //   "table_column": 't.sdcomm',
          //   title: "SUP COM",
          //   "is_show": 1,
          //   "issort": 1
          // },
          // {
          //   data: "pcomm",
          //   "table_column": 't.pcomm',
          //   title: "PAR COM",
          //   "is_show": 1,
          //   "issort": 1
          // },
          {
            data: "dcomm",
            "table_column": 't.dcomm',
            title: "DIS COM",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "comm",
            "table_column": 't.comm',
            title: "RET COM",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "gst",
            "table_column": 't.gst',
            title: "gst",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "tds",
            "table_column": 't.tds',
            title: "tds",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "stype",
            "table_column": 't.stype',
            title: "Utype",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "narration",
            "table_column": 't.narration',
            title: "narration",
            "is_show": 1,
            "issort": 1
          },
          // {
          //   data: "remarks",
          //   "table_column": 't.remarks',
          //   title: "remarks",
          //   "is_show": 1,
          //   "issort": 1
          // },
          {
            data: "ttype",
            "table_column": 't.ttype',
            title: "ttype",
            "is_show": 1,
            "issort": 1
          },
          {
            data: 'dateadded',
            "table_column": "tc.dateadded",
            title: "Date",
            "is_show": 1,
            "issort": 1,
            pipe: "date"
          },
        ]
        break;

      case 5:
        heading = [
          {
            data: "username",
            "table_column": "username",
            title: "RETAILER ",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "txnid",
            "table_column": 'txnid',
            title: "txnid",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "amount",
            "table_column": 't.amount',
            title: "amount",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "opening",
            "table_column": "opening",
            title: "Opening BAL",
            "is_show": 1,
            "issort": 1, 
          },
          {
            data: "closing",
            "table_column": "tc.closing",
            title: "Closing BAL",
            "is_show": 1,
            "issort": 1 
          },
          // {
          //   data: "sdcomm",
          //   "table_column": 't.sdcomm',
          //   title: "SUP COM",
          //   "is_show": 1,
          //   "issort": 1
          // },
          // {
          //   data: "pcomm",
          //   "table_column": 't.pcomm',
          //   title: "PAR COM",
          //   "is_show": 1,
          //   "issort": 1
          // },
          // {
          //   data: "dcomm",
          //   "table_column": 't.dcomm',
          //   title: "DIS COM",
          //   "is_show": 1,
          //   "issort": 1
          // },
          {
            data: "comm",
            "table_column": 't.comm',
            title: "RET COM",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "gst",
            "table_column": 't.gst',
            title: "gst",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "tds",
            "table_column": 't.tds',
            title: "tds",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "utype",
            "table_column": 't.utype',
            title: "Utype",
            "is_show": 1,
            "issort": 1
          },
          {
            data: "narration",
            "table_column": 't.narration',
            title: "narration",
            "is_show": 1,
            "issort": 1
          },

          {
            data: "ttype",
            "table_column": 't.ttype',
            title: "ttype",
            "is_show": 1,
            "issort": 1
          },
          {
            data: 'dateadded',
            "table_column": "tc.dateadded",
            title: "Date",
            "is_show": 1,
            "issort": 1,
            pipe: "datetime"
          },
        ]
        break;

        case 6:

          heading = [
            {
              data: "username",
              "table_column": "username",
              title: "User Name",
              "is_show": 1,
              "issort": 1
            },
            {
              data: "txnid",
              "table_column": 't.txnid',
              title: "txnid",
              "is_show": 1,
              "issort": 1
            },
            {
              data: "amount",
              "table_column": 't.amount',
              title: "amount",
              "is_show": 1,
              "issort": 1
            },
            {
              data: "opening",
              "table_column": "opening",
              title: "Opening BAL",
              "is_show": 1,
              "issort": 1, 
            },
            {
              data: "closing",
              "table_column": "tc.closing",
              title: "Closing BAL",
              "is_show": 1,
              "issort": 1 
            },
            {
              data: "sdcomm",
              "table_column": 't.sdcomm',
              title: "SUP COM",
              "is_show": 1,
              "issort": 1
            },
            {
              data: "pcomm",
              "table_column": 't.pcomm',
              title: "PAR COM",
              "is_show": 1,
              "issort": 1
            },
            {
              data: "dcomm",
              "table_column": 't.dcomm',
              title: "DIS COM",
              "is_show": 1,
              "issort": 1
            },
            {
              data: "comm",
              "table_column": 't.comm',
              title: "RET COM",
              "is_show": 1,
              "issort": 1
            },
            {
              data: "gst",
              "table_column": 't.gst',
              title: "gst",
              "is_show": 1,
              "issort": 1
            },
            {
              data: "tds",
              "table_column": 't.tds',
              title: "tds",
              "is_show": 1,
              "issort": 1
            },
            {
              data: "stype",
              "table_column": 't.stype',
              title: "Utype",
              "is_show": 1,
              "issort": 1
            },
            {
              data: "narration",
              "table_column": 't.narration',
              title: "narration",
              "is_show": 1,
              "issort": 1
            },
            // {
            //   data: "remarks",
            //   "table_column": 't.remarks',
            //   title: "remarks",
            //   "is_show": 1,
            //   "issort": 1
            // },
            {
              data: "ttype",
              "table_column": 't.ttype',
              title: "ttype",
              "is_show": 1,
              "issort": 1
            },
            // {
            //   data: "dateadded",
            //   "table_column": 't.dateadded',
            //   title: "dateadded",
            //   "is_show": 1,
            //   "issort": 1
            // },
            {
              data: "dateadded",
              "table_column": "tc.dateadded",
              title: "Date",
              "is_show": 1,
              "issort": 1,
              pipe: "date"
            }
          ]
          break;
      default:
        break;
    }


    this.columns = heading;

  }

  // filter() {
  //   let search: any = {};
  //   search.startdate = this.dt.transform(this.search.startdate);
  //   search.enddate = this.dt.transform(this.search.enddate);
  //   this.dt.filter(search)
  // }


  
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
    let startdate = this.dt.transform(this.search.startdate);
    let enddate = this.dt.transform(this.search.enddate);
    let formdata: any = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('startdate', (startdate === null ? '' : startdate));
    formdata.append('enddate', (startdate === null ? '' : enddate));
    this.api.postdata(formdata, this.exceldownurl).subscribe((res: any) => {
      if (res.statuscode == 200) {
        const fileName = 'Credit-Ledger.xlsx';
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(res['data']);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Credit-Ledger');
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
  //console.log(data);

  }
}
