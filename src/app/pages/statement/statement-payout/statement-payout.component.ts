import { config } from './../../../service/config';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustConfg } from 'src/app/_helpers/common/custom-datepicker/ngx-datePicker-CustConfg';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
declare var $: any;
@Component({
  selector: 'app-statement-payout',
  templateUrl: './statement-payout.component.html',
  styleUrls: ['./statement-payout.component.css']
})
export class StatementPayoutComponent implements OnInit {
  listtype ='statement'
  @ViewChild(DataTableToolsComponent) dt!: DataTableToolsComponent;
  @ViewChild('modal', { read: ElementRef }) modal!: ElementRef;
  search: any = { startdate: "", enddate: "" };
  maxDate!: Date;
  modelObj: any = [];
  refundid: any;
  refund: any = FormGroup; 
  url: string = config.statement.payout;
  columns:any;
  
  public morefilter: boolean = false;
  userKeyword = 'userdetails';
  userAutoComData: any;
  superDistributorID: any;
  DistributorID: any;
  PartnerID: any
  retailerID: any;

  @ViewChild('rangePicker') rangePicker: any;
  bsCustConfg = CustConfg;
  minDate!: Date;
  form: any = FormGroup;

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
  constructor(private datepipe: DatePipe, private auth: ApiService) { 
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);
    this.userType = data.usertype
    this.form = new FormGroup({
      selectdate: new FormControl([new Date(), new Date()], [Validators.required]),
    })
    this.refund = new FormGroup({
      authcode: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
    });
  }

  ngOnInit(): void {
    const date = new Date();
    this.minDate = new Date(1950, 1, 1);
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if(this.userType === '0'){
      this.columns = [
        {
          title: 'TXN ID',
          data: 'txnid'
        },
        {
          title: 'REFID',
          data: 'refid'
        },{
          title: 'username',
          data: 'username' 
        },
        {
          title: 'opening BAL',
          data: 'opening'
        },
        {
          title: 'closing BAL',
          data: 'closing'
        },
        {
          title: 'Bank name',
          data: 'bankname'
        },
        {
          title: "A/C no",
          data: 'acno'
        },
        {
          title: "UTR No",
          data: 'utr'
        },
        {
          title: "IFSC Code",
          data: 'ifsccode'
        },
        {
          title: "Bene Name",
          data: 'benename'
        },
        {
          title: "Amount",
          data: 'amount',
          pipe: "currency"
        },
        {
          title:'Charges',
          data:'charges'
        },
         {
          title:'Mode',
          data:'mode'
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
          title: "Action",
          data: 'id',
          pipe: function (obj: any) {
            let btnStr: any = '';
            let is_query = "<a   routerLink='/statement/payoutquery/" + obj.id + "' target='_blank'  class='btn btn-warning btn-sm ml-2 mb-1'>Query</a>";
            let is_refund = "<a (click)='showRefundModel' #modal data-toggle='modal' data-target='#transactionStatus'  class='btn btn-primary btn-sm ml-2  mb-1'>Refund</a>";
    
            if (obj.is_query == 1) {
              btnStr += is_query;
            } 
            if (obj.is_refund == 1) {
              btnStr += is_refund;
            }
            // console.log(btnStr);
    
            return (obj.is_query == 0 && obj.is_refund == 0) ? 'No Action Found' : btnStr;
          }
        },
        {
          title: "Print",
          pipe: 'print'
        }
      ];
    }else{
      this.columns = [
        {
          title: 'TXN ID',
          data: 'txnid'
        },
        {
          title: 'REFID',
          data: 'refid'
        },{
          title: 'username',
          data: 'username' 
        },
        {
          title: 'opening BAL',
          data: 'opening'
        },
        {
          title: 'closing BAL',
          data: 'closing'
        },
        {
          title: 'Bank name',
          data: 'bankname'
        },
        {
          title: "A/C no",
          data: 'acno'
        },
        {
          title: "UTR No",
          data: 'utr'
        },
        {
          title: "IFSC Code",
          data: 'ifsccode'
        },
        {
          title: "Bene Name",
          data: 'benename'
        },
        {
          title: "Amount",
          data: 'amount',
          pipe: "currency"
        },
        {
          title:'Charges',
          data:'charges'
        },
        {
          title:'Mode',
          data:'mode'
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
      this.auth.postdata(formdata, config.userListDropDown.superdistributor).subscribe((res: any) => {
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
      this.auth.postdata(formdata, config.userListDropDown.distributor).subscribe((res: any) => {
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
      this.auth.postdata(formdata, config.userListDropDown.partner).subscribe((res: any) => {
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
      this.auth.postdata(formdata, config.userListDropDown.reatiler).subscribe((res: any) => {
        if (res.data == undefined) {
          this.retailerData = [];
        } else {
          this.retailerData = res.data;
        }
      });
    }
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
    this.refundid = obj.value.id;
    switch (key) {
      case "showStatusModel":
        const formdata = new FormData();
        this.modelObj = [];
        formdata.append('token', config.tokenauth);
        formdata.append('txnid', value.txnid);
        formdata.append('refid', value.refid);
        this.auth.postdata(formdata, config.statement.payout).subscribe((res: any) => {
          if (res.statuscode == 200) {
            this.modal.nativeElement.click();
            for (let i in res.data) {
              this.modelObj.push({ heading: i.replace('_', ' '), value: res.data[i] });
            }
          } else {
            Swal.fire({
              icon: 'error',
              title: res.message
            });
          }
        });
        break;
    }
  }
  closeModal() { 
    $("#transactionStatus").modal('hide');
  }
  request_refund() {
    let formdata: any = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('id', this.refundid);
    formdata.append('authcode', this.refund.get('authcode')?.value);
    this.auth.postdata(formdata, config.statement.payoutrefund).subscribe((res: any) => {
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
  get r() {
    return this.refund.controls
  }
}
