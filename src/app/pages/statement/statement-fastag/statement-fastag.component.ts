import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { CustConfg } from 'src/app/_helpers/common/custom-datepicker/ngx-datePicker-CustConfg';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
declare var $: any;
@Component({
  selector: 'app-statement-fastag',
  templateUrl: './statement-fastag.component.html',
  styleUrls: ['./statement-fastag.component.css']
})
export class StatementFastagComponent implements OnInit {
  listtype ='statement'
  @ViewChild(DataTableToolsComponent) dt!: DataTableToolsComponent;
  search: any = { startdate: "", enddate: "" };
  maxDate!: Date;
  url: string = config.fastTag.statementlist;
  bsCustConfg = CustConfg;
  form: any = FormGroup;
  @ViewChild('rangePicker') rangePicker: any;
  minDate!: Date;
  downloadexl: any;
  QueryDetils:any ={};
  showModal:boolean = false;
  columns: any = [
    {
      title: 'TxnId',
      data: 'txnid'
    },
    {
      title: 'User Name',
      data: 'retailer_username'
    }, 
    {
      title:'Card Number',
      data:'canumber'
    },
    {
      title:'Operator Name',
      data:'operatorname'
    },
    {
      title:'Amount',
      data:'amount'
    },
    {
      title: 'Profit',
      data: 'profit'
    }, 
    {
      title:'Tds',
      data:'tds'
    },
    // {
    //   title: "API Type",
    //   data: 'apitype', 
    // },
    {
      title:'Status',
      data:'status'
    },
    {
      title: "Date",
      data: 'addeddate',
      pipe: "date"
    },
    {
      title: "Action",
      data: 'id',
      pipe: function (obj: any) {
        let btnStr: any = ''; 
        // let is_query = "<a   routerLink='/statement/icicidepositquery/" + obj.id + "' target='_blank'  class='btn btn-warning btn-sm ml-2 mb-1'>Query</a>";
        // let is_process = "<a  routerLink='/statement/rechargeprocess/" + obj.id + "'  target='_blank' class='btn btn-success btn-sm ml-2  mb-1'>Process</a>";
        let is_refund = "<a (click)='showRefundModel' #modal data-toggle='modal' data-target='#transactionStatus'  class='btn btn-warning btn-sm ml-2  mb-1'>Query</a>";

        // if (obj.is_query == 1) {
        //   btnStr += is_query;
        // } 
        if (obj.is_query == 1) {
          btnStr += is_refund;
        }
         //console.log(btnStr); 
         return   (obj.is_query == 0) ? 'No Action Found' : btnStr
      },    
    },
  ];

  objectIDs: any = {
    superdistributorId: '',
    distributorId: '',
    partnerId: '',
    retilerId: '',
  }

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


  download($event: any) {
    let startdate = this.dt.transform(this.form.get('selectdate')?.value[0]);
    let enddate = this.dt.transform(this.form.get('selectdate')?.value[1]);
    let formdata: any = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('startdate', (startdate === null ? '' : startdate));
    formdata.append('enddate', (startdate === null ? '' : enddate));
    this.api.postdata(formdata, config.fastTag.statementDoenload).subscribe((res: any) => {
      if (res.statuscode == 200) {
        const fileName = 'Fastag-Statement.xlsx';
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(res['data']);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Pan-Statement');
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
  onDateRangePickerShow() {
    // This is a workaround to show previous month
    var prevMonth = new Date();
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    this.rangePicker._datepicker.instance.monthSelectHandler({ date: prevMonth });
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


  

funObj(obj: any) {
  var key = obj.key;
  var value = obj.value;
  // this.refundid = obj.value.id;
  //console.log(value);
  switch (key)
{
    case "showRefundModel":
      let formdata: any = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('id', obj.value.id);
      this.api.postdata(formdata, config.fastTag.requery).subscribe((res: any) => {
        if (res.statuscode == 200) {
      //console.log(res.data);
        this.showModal = true;
        this.QueryDetils =  res.data;
        }else{
          Swal.fire({
            icon: 'error',
            title: res.message 
          }) 
          this.closeModal();
        }
      })
      break;
    }

}

closeModal(){
  this.showModal = false;
  $("#transactionStatus").modal('hide');
}

}
