import { Component, OnInit, ViewChild } from '@angular/core';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/service/api.service';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';
import { DatePipe } from '@angular/common';
import { CustConfg } from 'src/app/_helpers/common/custom-datepicker/ngx-datePicker-CustConfg';
declare var $: any;
@Component({
  selector: 'app-verification-bank',
  templateUrl: './verification-bank.component.html',
  styleUrls: ['./verification-bank.component.css']
})
export class VerificationBankComponent implements OnInit {
  @ViewChild(DataTableToolsComponent) dt!: DataTableToolsComponent;
  @ViewChild('rangePicker') rangePicker: any;
  url: string = config.cashfree_payout.accountlist;
  bsCustConfg = CustConfg;
  status: any = '';
  search: any = '';
  startdate: any = '';
  enddate: any = ''
  maxDate!: Date;
  public showModal: boolean = false;
  acclist: any;
  UploadDocs: any;
  stename: any;
  accdelete: any;
  capId:any;
  details: any = {};
  originalOrder = (): number => {
    return 0;
  }
  constructor(private auth: ApiService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    const date = new Date();
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    // this.getAccountList();
  }
  columns: any = [
    {
      title: 'Retailer Id',
      data: 'merchant'
    },
    {
      title: 'Bank Name',
      data: 'bankname'
    },
    {
      title: 'Account No.',
      data: 'account'
    },
    {
      title: "IFSC Code",
      data: 'ifsc'
    },
    {
      title: "Name",
      data: 'name'
    },
    {
      title: "Account Type",
      data: 'account_type'
    },
    {
      title: "PayOut Type",
      data: 'registered_at'
    },
    {
      title: "Date",
      data: 'dateadded'
    },
    {
      title: "Active / In-Active",
      data: 'id',
      pipe: function (obj: any) {
        if (obj.status == '1') {
          return "<a (click)='changeStatus' class='btn btn-success btn-sm'>Active </a>";
        } else {
          return "<a (click)='changeStatus' class='btn btn-primary'>In-Active</a>";
        }
      }
    },
    {
      title: "View Image",
      data: 'id',
      pipe: function (obj: any) {
        return "<a (click)='viewImage'>View Image </a>";
      }
    },
    {
      title: "Verification",
      data: 'id',
      pipe: function (obj: any) {
        let btnStr: any = '';
        const obj4 = "<a (click)='Approve' class='btn btn-success btn-sm'>Approve</a>";
      let Verified = "<p  class='text-primary font-weight-bold'>Verified</p>";
        if (obj.a_status == '2') {
          btnStr += obj4;
        }
        if (obj.a_status == '1') {
          btnStr += Verified;
        }

        return (obj.a_status == 0) ? 'Rejected Account' : btnStr

      }
    },
    {
      title: "Delete",
      data: 'id',
      pipe: function (obj: any) {
        if (obj.is_deleted == '0') {
          return "<a (click)='isDeleted' class='btn btn-success btn-sm'>Not Deleted By User </a>";
        } else {
          return "<a (click)='isDeleted' class='btn btn-primary'>Deleted By User</a>";
        }
      }
    },
    {
      title: "Action",
      data: 'id',
      pipe: function (obj: any) {
        return "<a (click)='debitBalance' data-toggle='modal' data-target='#exampleModal' class='btn btn-primary'>See Upper Network</a>";
      }
    }

  ];

  // getAccountList() {
  //   const formdata = new FormData();
  //   formdata.append('token', config.tokenauth);
  //   formdata.append('startdate', this.startdate==null?'':this.startdate);
  //   formdata.append('enddate', this.enddate==null?'':this.enddate);
  //   formdata.append('status', this.status);

  //   this.auth.postdata(formdata, config.cashfree_payout.accountlist).subscribe((res: any) => {
  //     if (res.statuscode == 200) {
  //       // Swal.fire({
  //       //   title: res.message,
  //       //   icon: 'success'
  //       // });
  //       this.acclist = res.data;
  //     } else {
  //       this.acclist = [];
  //       Swal.fire({
  //         title: res.message,
  //         icon: 'error'
  //       });
  //     }
  //   });
  // }



  ViewUpload(list: any) {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('bene_id', list.id);
    // formdata.append('bene_id','8171476552');
    this.auth.postdata(formdata, config.cashfree_payout.viewUploadDoc).subscribe((res: any) => {
      if (res.status) {
        this.UploadDocs = res.data;
        this.showModal = true;
      }
    })
  }

  getbeneidud(list: any, value: any) {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('id', list.id);
    formdata.append('status', list.status);
    formdata.append('a_status', value);
    this.auth.postdata(formdata, config.payout.verification).subscribe((res: any) => {
      if (res.status) {
        Swal.fire({
          title: res.message,
          icon: 'success'
        }).then((result) => {
          if (result.isConfirmed) {
            // this.getAccountList();
          }
        })
      }
    })
  }

  closeModal() {
    this.showModal = false;
  }

  // isDeleted(value:any,type: any) {
  //   var t ='';
  //   if(value == '1'){
  //    t = 'In-Active'
  //   }else{
  //     t = 'Active'
  //   }
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to "+ t +" this Account",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, proceed it!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       const formdata = new FormData();
  //       formdata.append('token', config.tokenauth);
  //       formdata.append('bene_id', type.id);
  //       formdata.append('is_deleted', type.is_deleted);
  //       this.auth.postdata(formdata, config.cashfree_payout.DeleteAccount).subscribe((res: any) => {
  //         if (res.statuscode == 200) {
  //           // this.getAccountList();
  //           Swal.fire(
  //             'Deleted!',
  //             res.message,
  //             'success'
  //           ).then((result) => {
  //           })
  //         }
  //       })

  //     } else if (
  //       result.dismiss === Swal.DismissReason.cancel
  //     ) {
  //       Swal.fire(
  //         'Cancelled',
  //         'Transaction Cancelled',
  //         'error'
  //       )
  //     }
  //   })
  // }

  // changeStatus(value:any,type: any) {
  //   var t ='';
  //   if(value == '1'){
  //    t = 'Active'
  //   }else{
  //     t = 'Deactive'
  //   }
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "To "+ t +" this Account",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, proceed it!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       const formdata = new FormData();
  //       formdata.append('token', config.tokenauth);
  //       formdata.append('bene_id', type.id);
  //       formdata.append('status', type.status);
  //       this.auth.postdata(formdata, config.cashfree_payout.changeAccountStatus).subscribe((res: any) => {
  //         if (res.statuscode == 200) {
  //           // this.getAccountList();
  //           Swal.fire({
  //             title: res.message,
  //             icon: 'success'
  //            } )
  //         }
  //       })

  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //       Swal.fire(
  //         'Cancelled',
  //         'Transaction Cancelled',
  //         'error'
  //       )
  //     }
  //   })
  // }

  funObj(obj: any) {
    var key = obj.key;
    var value = obj.value;
    switch (key) {
      case "viewImage":
        const formdata = new FormData();
        formdata.append('token', config.tokenauth);
        formdata.append('bene_id', value.id);
        // formdata.append('bene_id','8171476552');
        this.auth.postdata(formdata, config.cashfree_payout.viewUploadDoc).subscribe((res: any) => {
          if (res.status) {
            this.UploadDocs = res.data;
            this.showModal = true;
          }
        })
        break;
      case "changeStatus":
        //console.log(value);  
        this.stename = (value.status == 0) ? 'Activate' : 'Deactivate';
        Swal.fire({
          title: 'Are you sure?',
          text: "To " + this.stename + " this Account",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: "Yes, " + this.stename + " it!"
        }).then((result) => {
          if (result.isConfirmed) {
            const formdata = new FormData();
            formdata.append('token', config.tokenauth);
            formdata.append('bene_id', value.id);
            formdata.append('status', value.status);
            this.auth.postdata(formdata, config.cashfree_payout.changeAccountStatus).subscribe((res: any) => {
              if (res.statuscode == 200) {
                this.filter();
                Swal.fire({
                  title: res.message,
                  icon: 'success'
                })
              }
            })

          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
              'Transaction Cancelled',
              'error'
            )
          }
        })
        break;
      case "isDeleted":
        this.accdelete = (value.is_deleted == 1) ? 'In-In-Active' : 'Active';
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to " + this.accdelete + " this Account",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, proceed it!'
        }).then((result) => {
          if (result.isConfirmed) {
            const formdata = new FormData();
            formdata.append('token', config.tokenauth);
            formdata.append('bene_id', value.id);
            formdata.append('is_deleted', value.is_deleted);
            this.auth.postdata(formdata, config.cashfree_payout.DeleteAccount).subscribe((res: any) => {
              if (res.statuscode == 200) {
                this.filter();
                Swal.fire(
                  'Deleted!',
                  res.message,
                  'success'
                ).then((result) => {
                })
              }
            })

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
      case "Approve":
        Swal.fire({
          title: 'Are you sure?',
          text: "Are you want to apporve this Account",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, proceed it!',
       
        }).then((result) => {
          if (result.isConfirmed) {
                  const formdata = new FormData();
                formdata.append('token', config.tokenauth);
                formdata.append('bene_id', value.id);
                // formdata.append('remarks', result.value);
                formdata.append('is_approved', '1');
                this.auth.postdata(formdata, config.cashfree_payout.ApproveReject).subscribe((res: any) => {
                  if (res.statuscode == 200) {
                    this.filter();
                    Swal.fire(
                      'Approve!',
                      res.message,
                      'success'
                    ).then((result) => {
                    })
                  }
                })
        
          }
            // const formdata = new FormData();
            //     formdata.append('token', config.tokenauth);
            //     formdata.append('bene_id', value.id);
            //     // formdata.append('remarks', result.value);
            //     formdata.append('is_approved', '0');
            //     this.auth.postdata(formdata, config.cashfree_payout.ApproveReject).subscribe((res: any) => {
            //       if (res.statuscode == 200) {
            //         this.filter();
            //         Swal.fire(
            //           'Rejected!',
            //           res.message,
            //           'success'
            //         ).then((result) => {
    
            //         })
            //       }
            //     })
        
            //   } 
              else if (
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
        case "debitBalance":
        this.capId = value.id;

            this.details["ASM Name"] = [value.asmusername+"   ("+value.asmphone+")"],
            this.details["SD Name"] = [value.superusername+"   ("+value.superphone+")"],
            this.details["Partner Name"] = [value.partnerusername +"   ("+value.partnerphone+")"],
            this.details["Distributor Name"] = [value.distusername+"    ("+value.distphone+")"];
            break;
      }  
  }
  onDateRangePickerShow() {
    var prevMonth = new Date();
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    this.rangePicker._datepicker.instance.monthSelectHandler({ date: prevMonth });
  }

  filter() {
    let search: any = {};
    // this.startdate = this.datePipe.transform(this.search[0], 'dd-MM-yyyy')
    // this.enddate = this.datePipe.transform(this.search[1], 'dd-MM-yyyy')

    search.startdate = this.datePipe.transform(this.search[0], 'yyyy-MM-dd')
    search.enddate = this.datePipe.transform(this.search[1], 'yyyy-MM-dd')
    // search.startdate = this.dt.transform(this.search[0]);
    // search.enddate = this.dt.transform(this.search[1]);
    // console.log(search.startdate)
    // console.log(search.enddate)
    search.status = this.status;
    console.log(search)
    this.dt.filter(search)
    // this.getAccountList();
  }


  change(value: any) {
    return value.replaceAll('_', ' ');
  }


}
