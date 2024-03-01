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
  selector: 'app-ministatement-txn',
  templateUrl: './ministatement-txn.component.html',
  styleUrls: ['./ministatement-txn.component.css']
})
export class MinistatementTxnComponent implements OnInit {
  @ViewChild(DataTableToolsComponent) dt!: DataTableToolsComponent;
  search: any = { startdate: "", enddate: "" };
  maxDate!: Date;
  refundid: any;
  exceldownurl: string = config.downloadstatement.ministatementtxndownload;
  url: string = config.downloadstatement.ministatementtxn;
  bsCustConfg = CustConfg;
  downloadexl: any;
  form: any = FormGroup;
  ministatementDetails: any;
  @ViewChild('rangePicker') rangePicker: any;
  minDate!: Date;
  columns: any;
  userType: any;
  constructor(private api: ApiService) {
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);
    this.userType = data.usertype;
    this.form = new FormGroup({
      selectdate: new FormControl([new Date(), new Date()], [Validators.required]),
    })
  }

  ngOnInit(): void {
    const date = new Date();
    this.minDate = new Date(1950, 1, 1);
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if (this.userType == 0 || this.userType == 6) {
      this.columns = [
        {
          title: 'SL NO',
          data: 's_no'
        },
        {
          title: 'TRN ID',
          data: 'txnid'
        },
        {
          title: 'User Name',
          data: 'username'
        },
        {
          title: 'Name',
          data: 'name'
        },
        {
          title: 'MOBILE NO',
          data: 'mobile'
        },
        {
          title: 'ACKNO',
          data: 'ackno'
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
          title: "UTR",
          data: 'utr'
        },
        {
          title:'TDS',
          data:'tds'
        },
        {
          title: "LASTAADHARNO",
          data: 'last_aadhar'
        },
        {
          title: "BANKNAME",
          data: 'bankName'
        },
        {
          title: "STATUS MESSAGE",
          data: 'errormsg'
        },
        {
          title: "STATUS",
          data: 'status'
        },
        {
          title: "DATE & TIME",
          data: 'dateadded',
          pipe: "datetime"
        }, 

        // {
        //   title: "transfertype",
        //   data: 'transfertype'
        // },
        // {
        //   title: "IS SETTELED",
        //   data: 'is_settled'
        // },
        // {
        //   title: "IS QUERY",
        //   data: 'is_query'
        // },
        // {
        //   title: "Action",
        //   data: 'id',
        //   pipe: function (obj: any) {
        //     let is_refund = "<a (click)='showRefundModel' #modal data-toggle='modal' data-target='#transactionStatus'  class='btn btn-primary btn-sm ml-2  mb-1'>Details</a>";
        //     return is_refund;
        //   }    
        // },
        {
          title: "Print",
          pipe: 'print'
        }
      ];
    }
    if (this.userType == 2) {
      this.columns = [
        {
          title: 'SL NO',
          data: 's_no'
        },
        {
          title: 'TRN ID',
          data: 'txnid'
        },
        {
          title: 'User Name',
          data: 'username'
        },
        {
          title: 'Name',
          data: 'name'
        },
        {
          title: 'MOBILE NO',
          data: 'mobile'
        },
        {
          title: 'ACKNO',
          data: 'ackno'
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
          title: "UTR",
          data: 'utr'
        },
        {
          title:'TDS',
          data:'tds'
        },
        {
          title: "LASTAADHARNO",
          data: 'last_aadhar'
        },
        {
          title: "BANKNAME",
          data: 'bankName'
        },
        {
          title: "STATUS MESSAGE",
          data: 'errormsg'
        },
        {
          title: "STATUS",
          data: 'status'
        },
        {
          title: "DATE & TIME",
          data: 'dateadded',
          pipe: "datetime"
        }, 
        // {
        //   title: "transfertype",
        //   data: 'transfertype'
        // },
        // {
        //   title: "IS SETTELED",
        //   data: 'is_settled'
        // },
        // {
        //   title: "IS QUERY",
        //   data: 'is_query'
        // },
        {
          title: "Print",
          pipe: 'print'
        }
      ];
    }
    if (this.userType == 3) {
      this.columns = [
        {
          title: 'SL NO',
          data: 's_no'
        },
        {
          title: 'TRN ID',
          data: 'txnid'
        },
        {
          title: 'User Name',
          data: 'username'
        },
        {
          title: 'Name',
          data: 'name'
        },
        {
          title: 'MOBILE NO',
          data: 'mobile'
        },
        {
          title: 'ACKNO',
          data: 'ackno'
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
          title: "UTR",
          data: 'utr'
        },
        {
          title:'TDS',
          data:'tds'
        },
        {
          title: "LASTAADHARNO",
          data: 'last_aadhar'
        },
        {
          title: "BANKNAME",
          data: 'bankName'
        },
        {
          title: "STATUS MESSAGE",
          data: 'errormsg'
        },
        {
          title: "STATUS",
          data: 'status'
        },
        {
          title: "DATE & TIME",
          data: 'dateadded',
          pipe: "datetime"
        }, 
        // {
        //   title: "transfertype",
        //   data: 'transfertype'
        // },
        // {
        //   title: "IS SETTELED",
        //   data: 'is_settled'
        // },
        // {
        //   title: "IS QUERY",
        //   data: 'is_query'
        // },
        {
          title: "Print",
          pipe: 'print'
        }
      ];
    }
    if (this.userType == 4) {
      this.columns = [
        {
          title: 'SL NO',
          data: 's_no'
        },
        {
          title: 'TRN ID',
          data: 'txnid'
        },
        {
          title: 'User Name',
          data: 'username'
        },
        {
          title: 'Name',
          data: 'name'
        },
        {
          title: 'MOBILE NO',
          data: 'mobile'
        },
        {
          title: 'ACKNO',
          data: 'ackno'
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
          title: "UTR",
          data: 'utr'
        },
        {
          title:'TDS',
          data:'tds'
        },
        {
          title: "LASTAADHARNO",
          data: 'last_aadhar'
        },
        {
          title: "BANKNAME",
          data: 'bankName'
        },
        {
          title: "STATUS MESSAGE",
          data: 'errormsg'
        },
        {
          title: "STATUS",
          data: 'status'
        },
        {
          title: "DATE & TIME",
          data: 'dateadded',
          pipe: "datetime"
        }, 
        // {
        //   title: "transfertype",
        //   data: 'transfertype'
        // },
        // {
        //   title: "IS SETTELED",
        //   data: 'is_settled'
        // },
        // {
        //   title: "IS QUERY",
        //   data: 'is_query'
        // },
        {
          title: "Print",
          pipe: 'print'
        }
      ];
    }
    if (this.userType == 5) {
      this.columns = [
        {
          title: 'SL NO',
          data: 's_no'
        },
        {
          title: 'TRN ID',
          data: 'txnid'
        },
        {
          title: 'MOBILE NO',
          data: 'mobile'
        },
        {
          title: 'ACKNO',
          data: 'ackno'
        },
        {
          title: "COMMISSION",
          data: 'comm', 
        },
        {
          title: "UTR",
          data: 'utr'
        },
        {
          title:'TDS',
          data:'tds'
        },
        {
          title: "LASTAADHARNO",
          data: 'last_aadhar'
        },
        {
          title: "BANKNAME",
          data: 'bankName'
        },
        {
          title: "STATUS MESSAGE",
          data: 'errormsg'
        },
        {
          title: "STATUS",
          data: 'status'
        },
        {
          title: "DATE & TIME",
          data: 'dateadded',
          pipe: "datetime"
        }, 
        // {
        //   title: 'User Name',
        //   data: 'username'
        // },
        // {
        //   title: 'Name',
        //   data: 'name'
        // },
        // {
        //   title: "transfertype",
        //   data: 'transfertype'
        // },
        // {
        //   title: "IS SETTELED",
        //   data: 'is_settled'
        // },
        // {
        //   title: "IS QUERY",
        //   data: 'is_query'
        // },
        {
          title: "Print",
          pipe: 'print'
        }
      ];
    }
  }

  closeModal() {
  //console.log('');
    $("#transactionStatus").modal('hide');
  }


  funObj(obj: any) {
    var key = obj.key;
    var value = obj.value;
    this.refundid = obj.value.id;
    let formdata: any = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('id', this.refundid);
    this.api.postdata(formdata, config.downloadstatement.ministatementtxndetails).subscribe((res: any) => {
      if (res.statuscode == 200) {
      //console.log(res.data);
        this.ministatementDetails = res.data;
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        })
      }
    })

  }

  filter() {
    let search: any = {};
    search.startdate = this.dt.transform(this.form.get('selectdate')?.value[0]);
    search.enddate = this.dt.transform(this.form.get('selectdate')?.value[1]);
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
        const fileName = 'Mini-Statement.xlsx';
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

}
