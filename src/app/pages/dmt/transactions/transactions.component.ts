import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { CustomModelComponent } from 'src/app/_helpers/custom-model/custom-model.component';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  @ViewChild(DataTableToolsComponent) dt!: DataTableToolsComponent;
  @ViewChild(CustomModelComponent) model!: CustomModelComponent;
  @ViewChild('modal', { read: ElementRef }) modal!: ElementRef;
  search: any = { startdate: "", enddate: "" };
  maxDate!: Date;
  modelObj:any = [];
  url: string = config.dmt.dmtTransaction;
  referenceid: any;
  acknumber: any;
  public showModal: boolean = false;
  statusModal: boolean = false;
  columns: any = [
    {
      title: 'TXN ID',
      data: 'txnid'
    },
    {
      title: 'User name',
      data: 'username'
    },
    {
      title: "A/C no",
      data: 'acno'
    },
    {
      title: "IFSC Code",
      data: 'ifsccode'
    },
    {
      title: "Transfer Type",
      data: 'transfertype'
    },
    {
      title: "ack No.",
      data: 'ackno'
    },
    {
      title: "Amount",
      data: 'amount',
      pipe: "currency"
    },
    {
      title: "Status",
      data: 'status'
    },
    {
      title: "Date",
      data: 'addeddate',
      pipe: "date"
    },
    {
      title: "Transaction Status",
      data: 'refid',
      pipe: function (obj: any) {
        return "<a (click)='showStatusModel' class='btn btn-primary'>Check Status</a>";
      }
    },
    {
      title: "Refund",
      data: 'refid',
      pipe: function (obj: any) {
        if(obj.dmt_status == '5' && obj.refunded == '0'){
          return "<a (click)='showRefundModel' data-toggle='modal' data-target='#transactionRefund' class='btn btn-primary'>Refund</a>";
        }else{
          return "-"
        }
        
      }
    }
  ];

  constructor(
    private datepipe: DatePipe,
    private auth: ApiService,
    private route: Router,
    ) {
  }

  ngOnInit(): void {
    const date = new Date();
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
  closeModal(){
  //console.log('');
    
    $("#transactionStatus").modal('hide'); 
  }
  filter() {
    let search: any = {};
    search.startdate = this.dt.transform(this.search.startdate);
    search.enddate = this.dt.transform(this.search.enddate);
    this.dt.filter(search)
  }
  funObj(obj: any) {
    var key = obj.key; 
    var value = obj.value; 
    switch (key) {
      case "showStatusModel": 
        const formdata = new FormData();
        this.modelObj = [];
        formdata.append('token', config.tokenauth);
        formdata.append('referenceid', value.refid);
        this.auth.postdata(formdata, config.dmt.txnStatus).subscribe((res: any) => {
          if (res.statuscode == 200) {
             //this.statusModal = true;
             this.modal.nativeElement.click();
             for(let i in res.data){
              this.modelObj.push({heading:i.replace('_',' '),value:res.data[i]});
             }  
          } else {
            Swal.fire({
              icon: 'error',
              title: res.message
            });
          }
        });
        break;
        case "showRefundModel":
          var values = obj.value; 
          this.referenceid = values.refid;
          this.acknumber = values.ackno;  
          
          
          Swal.fire({
            title: 'Are you sure?',
            text: "Are you sure you want to send OTP to your register mobile number!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Confirm',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
    
          const formdata = new FormData();
          formdata.append('token', config.tokenauth);
          formdata.append('referenceid', values.refid);
          formdata.append('ackno', values.ackno);
          this.auth.postdata(formdata, config.dmt.refundtxn).subscribe((res: any) => {
            if (res.statuscode == 200) {
              Swal.fire({
                title: res.message,
                icon: 'success'
              });
              this.model.showModal = true;
            }else{
              Swal.fire({
                title: res.message,
                icon: 'error'
              });
            }
          });
    
        } else if ( 
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire(
            'Cancelled',
            'Transaction Cancelled',
            'error'
          )
        }
        })


          break;
    }
  }


  moveFocus() {
    const otpList = this.model.getOtp();
    if (otpList.length == 4) {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('referenceid', this.referenceid);
      formdata.append('ackno', this.acknumber);
      formdata.append('otp', otpList);
      this.auth.postdata(formdata, config.dmt.refundOTP).subscribe((res: any) => {
        if (res.response == 200) {
          this.route.navigate(['dmt/transactions']);
        } else {
          Swal.fire(res.message)
        }
      })
    }
  }

  resend_otp() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('referenceid', this.referenceid);
    formdata.append('ackno', this.acknumber);
    this.auth.postdata(formdata, config.dmt.refundtxn).subscribe((res: any) => {
      if (res.statuscode == 200) {
        Swal.fire({
          title: res.message,
          icon: 'success'
        });
        this.model.showModal = true;
      }else{
        Swal.fire({
          title: res.message,
          icon: 'error'
        });
      }
    });
}
}
