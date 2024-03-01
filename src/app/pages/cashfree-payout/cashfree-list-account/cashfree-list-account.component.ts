import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { LoaderService } from 'src/app/_helpers/common/loader.service';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import { DatePipe } from '@angular/common';
import { CustConfg } from 'src/app/_helpers/common/custom-datepicker/ngx-datePicker-CustConfg';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-cashfree-list-account',
  templateUrl: './cashfree-list-account.component.html',
  styleUrls: ['./cashfree-list-account.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class CashfreeListAccountComponent implements OnInit {
  @ViewChild(DataTableToolsComponent) dt!: DataTableToolsComponent;
  @ViewChild('rangePicker') rangePicker: any;
  url: string = config.cashfree_payout.accountlist;
  bsCustConfg = CustConfg;
  VerificationData: any;
  public showModal: boolean = false;
  merchantCode: any;
  acclist: any;
  pancard: boolean = false;
  aadharcard: boolean = false;
  drivinglicence: boolean = false;
  form: any = FormGroup;
  EditDetailsform: any = FormGroup;
  dotransaction: any = FormGroup;
  internalTransaction: any = FormGroup;
  bene_ID: any;
  panImage: any;
  passbookimg: any;
  beneInfoModel: any = null;
  dlfrontImage: any;
  dlbackImage: any;
  adharimgf: any;
  adharimgb: any;
  formbtn: boolean = false;

  bankList: any;
  addform: any = FormGroup;
  bank: any = '';
  bankLisitng: Array<Select2OptionData> = [];
  isEdit: boolean = false;
  editID: any = null;
  editDeilsId: any;
  status: any = '';
  search: any = '';
  startdate: any = '';
  enddate: any = ''
  maxDate!: Date;
  public options: Options;
  constructor(
    private auth: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loader: LoaderService,
    private datePipe: DatePipe
  ) {
    this.form = this.fb.group({
      doctype: ['', [Validators.required]],
      pancard: [''],
      drivinglicef: [''],
      drivingliceb: [''],
      aadharfront: [''],
      aadharback: [''],
      passbook: ['']
    });
    this.dotransaction = this.fb.group({
      amount: ['', [Validators.required]],
      mode: ['IMPS', [Validators.required]],
    });
    this.internalTransaction = this.fb.group({
      amount: ['', [Validators.required]],
    });
    this.EditDetailsform = this.fb.group({
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.addform = this.fb.group({
      bankName: ['', [Validators.required]],
      accno: ['', [Validators.required]],
      ifsc: ['', [Validators.required]],
      name: ['', [Validators.required]],
      accounttype: ['', [Validators.required]],
    });

    this.options = {
      width: '100%',
      templateSelection: (object: any) => {
        this.setIFSC(object)
        return object && object.bankname;
      },
      templateResult: (object: any) => {
        return object && object.bankname;
      }
    };
  }

  ngOnInit(): void {
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);
    //console.log(data);
    this.merchantCode = data.permission.merchant_id;
    this.getAccountList();
    this.filter();
    this.getbank();
  }

  columns: any = [
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
      title: "Email",
      data: 'email'
    },
    {
      title: "Phone",
      data: 'phone'
    },
    {
      title: "Account Type",
      data: 'account_type'
    },
    {
      title: "Status",
      data: 'acc_status'
    },
    {
      title: "Date",
      data: 'dateadded'
    },
    {
      title: "Remarks",
      data: 'bank_remarks'
    },
    {
      title: "Verification",
      data: 'id',
      pipe: function (obj: any) {
        return "<a (click)='VerifyBankAccount' class='btn btn-warning btn-sm ' id='verifybutton'>Verify Bank </a>";
      }
    },
    {
      title: "Action",
      data: 'id',
      pipe: function (obj: any) {
        let btnStr: any = '';
        let dotrnx = "<a  (click)='getbeneidud'   class='btn btn-success btn-sm actionBtn mt-2 mb-2'  data-toggle='modal' data-target=' #dotransaction'>Payout Now </a>";

        let upload = "<a  (click)='getbeneidud'   class='btn btn-danger btn-sm actionBtn mt-2 mb-2' data-toggle='modal' data-target=' #uploaddocument'>Upload Document</a>";

        // let pending = "<a  class='btn btn-info btn-sm actionBtn'>Pending</a>";

        let editDetails = "<a  (click)='editdetails'   class='btn btn-danger btn-sm actionBtn mt-2 mb-2' data-toggle='modal' data-target=' #EditDetails'>EditDetails</a>"
        let isdeleted = "<a  (click)='settlementbankDelete' class='btn btn-info btn-sm actionBtn' >Delete</a>"


        // btnStr = dotrnx + upload + pending + isdeleted + editDetails
        if (obj.payout_account_status == '1' && obj.a_status == '2') {
          btnStr += upload;
        }
        if (obj.payout_account_status == '1' && obj.a_status == '1') {
          btnStr += dotrnx;
        }
        if (obj.is_deleted == '0') {
          btnStr += isdeleted;
        }

        return btnStr + editDetails
      }
    }
  ];

  getAccountList() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    // formdata.append('merchantid', this.merchantCode);
    this.auth.postdata(formdata, config.cashfree_payout.accountlist).subscribe((res: any) => {
      if (res.statuscode == 200) {
        // Swal.fire({
        //   title: res.message,
        //   icon: 'success'
        // });
        this.acclist = res.data;
      } else if (res.statuscode == 2001) {
        this.acclist = [];
      } else {

        Swal.fire({
          title: res.message,
          icon: 'error'
        });
      }
    });
  }

  // getbeneidud(beneInfo: any) {
  //   this.bene_ID = beneInfo.id;
  //   // this.bene_ID = beneInfo.ps_bene_id;

  //   this.beneInfoModel = beneInfo;
  // //console.log(this.beneInfoModel);
  // }

  handleFiledpass(event: any) {
    if (event.target.files.length > 0) {
      // const file = event.target.files[0];
      // this.passbookimg = file;
      const file = event.target.files[0];
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('name', file);
      this.auth.postdata(formdata, config.uploadimage).subscribe((data: any) => {
        //console.log(data);
        if (data.statuscode == 200) {
          this.passbookimg = data.file;
        } else
          console.error("your image is not uploaded")

      })
    }
  }

  handleFileInput1(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('name', file);
      this.auth.postdata(formdata, config.uploadimage).subscribe((data: any) => {
        //console.log(data);
        if (data.statuscode == 200) {
          this.panImage = data.file;
        } else
          console.error("your image is not uploaded")

      })
    }
  }
  handleFiledlf(dl: any) {
    if (dl.target.files.length > 0) {
      const file = dl.target.files[0];
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('name', file);
      this.auth.postdata(formdata, config.uploadimage).subscribe((data: any) => {
        //console.log(data);
        if (data.statuscode == 200) {
          this.dlfrontImage = data.file;
        } else
          console.error("your image is not uploaded")

      })
    }
  }
  handleFiledlb(dl: any) {
    if (dl.target.files.length > 0) {
      const file = dl.target.files[0];
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('name', file);
      this.auth.postdata(formdata, config.uploadimage).subscribe((data: any) => {
        //console.log(data);
        if (data.statuscode == 200) {
          this.dlbackImage = data.file;
        } else
          console.error("your image is not uploaded")

      })
    }
  }

  handleFileaadharf(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('name', file);
      this.auth.postdata(formdata, config.uploadimage).subscribe((data: any) => {
        //console.log(data);
        if (data.statuscode == 200) {
          this.adharimgf = data.file;
        } else
          console.error("your image is not uploaded")

      })
    }
  }

  handleFileaadharb(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('name', file);
      this.auth.postdata(formdata, config.uploadimage).subscribe((data: any) => {
        //console.log(data);
        if (data.statuscode == 200) {
          this.adharimgb = data.file;
        } else
          console.error("your image is not uploaded")

      })
    }
  }
  onSubmit() {
    if (!this.form.valid) {
      return;
    } else {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('doctype', this.form.get('doctype').value);
      formdata.append('passbook', this.passbookimg);
      formdata.append('bene_id', this.bene_ID);
      if (this.form.get('doctype').value == "PAN") {
        formdata.append('panimage', this.panImage);
      }
      if (this.form.get('doctype').value == "DL") {
        formdata.append('front_image', this.dlfrontImage);
        formdata.append('back_image', this.dlbackImage);
      }
      if (this.form.get('doctype').value == "AADHAAR") {
        formdata.append('front_image', this.adharimgf);
        formdata.append('back_image', this.adharimgb);
      }

      this.auth.postdata(formdata, config.cashfree_payout.uploaddoc).subscribe((res: any) => {
        if (res.statuscode == 200) {
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
          this.form.reset();
          $("#uploaddocument").modal("hide");
          // this.getAccountList();
          this.filter();
        } else {
          Swal.fire({
            title: res.message,
            icon: 'error'
          });
        }
      });
    }
  }
  get f() { return this.form.controls; }

  get j() { return this.EditDetailsform.controls; }

  doTransaction() {
    if (!this.dotransaction.valid) {
      return;
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to add fund in e-wallet",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Confirm',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.loader.loaderEvent.emit(true)
          const formdata = new FormData();
          formdata.append('token', config.tokenauth);
          formdata.append('bene_id', this.bene_ID);
          formdata.append('amount', this.dotransaction.get('amount').value);
          formdata.append('mode', this.dotransaction.get('mode').value);
          formdata.append('txn_type', '1');
          this.auth.postdata(formdata, config.cashfree_payout.dotxn).subscribe((res: any) => {
            if (res.statuscode == 200) {
              this.loader.loaderEvent.emit(false)
              Swal.fire({
                title: res.message,
                icon: 'success'
              });
              this.closedotransaction();
            } else {
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

    }
  }
  get g() { return this.dotransaction.controls; }

  doInternalTransaction() {
    this.loader.loaderEvent.emit(true)
    if (!this.internalTransaction.valid) {
      return;
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to add fund in e-wallet",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Confirm',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          const formdata = new FormData();
          formdata.append('token', config.tokenauth);
          formdata.append('amount', this.internalTransaction.get('amount').value);
          formdata.append('txn_type', '2');
          this.auth.postdata(formdata, config.cashfree_payout.dotxn).subscribe((res: any) => {
            if (res.statuscode == 200) {
              this.loader.loaderEvent.emit(false)
              Swal.fire({
                title: res.message,
                icon: 'success'
              });
              this.closemodal();
            } else {
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
    }
  }
  get i() { return this.internalTransaction.controls; }
  get a() { return this.addform.controls; }


  checktype(type: any) {
    let doctype = type.target.value;
    if (doctype == "PAN") {
      this.pancard = true;
      this.aadharcard = false;
      this.drivinglicence = false;
    }
    if (doctype == "AADHAAR") {
      this.pancard = false;
      this.aadharcard = true;
      this.drivinglicence = false;
    }
    if (doctype == "DL") {
      this.pancard = false;
      this.aadharcard = false;
      this.drivinglicence = true;
    }
  }
  closemodal() {
    $("#internalTransfer").modal("hide");
  }

  closedotransaction() {
    $("#dotransaction").modal("hide");
  }


  setIFSC(object: any) {
    if (object.selected == true) {
      this.form.get('ifsccode').setValue(object.ifsc)
    }
  }
  //----Get banklist----
  getbank() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.auth.postdata(formdata, config.payout.banklist).subscribe((res: any) => {
      if (res.statuscode == 200) {
        let arr = [];
        for (var v of res.data) {
          arr.push({ id: v.id, text: v.bankname });
        }
        this.bankLisitng = arr;
      }
    });
  }

  // settlementbankDelete(type: any) {
  //   //console.log(type)
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to Delete this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       const formdata = new FormData();
  //       formdata.append('token', config.tokenauth);
  //       formdata.append('bene_id', type.id);
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

  // VerifyBankAccount(list: any) {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You have to pay 5 rupees for this transactions ! Are you want to proceed ?",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Proceed'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       const formdata = new FormData();
  //       formdata.append('token', config.tokenauth);
  //       formdata.append('bene_id', list.id);
  //       formdata.append('is_deleted', list.is_deleted);
  //       this.auth.postdata(formdata, config.cashfree_payout.verification).subscribe((res: any) => {
  //         if (res.statuscode == 200) {
  //           Swal.fire({
  //             title: res.message,
  //             icon: 'success'
  //           }).then((res1) => {
  //             this.showModal = true;
  //             this.VerificationData = res.data;
  //           });

  //         } else {
  //           Swal.fire({
  //             title: res.message,
  //             icon: 'error'
  //           });
  //         }
  //       });
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

  closeModal() {
    this.showModal = false;
  }

  // EditDetails(list: any) {
  //   this.editDeilsId = list.id;
  // }

  UpdatesDetails() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('bene_id', this.editDeilsId);
    formdata.append('email', this.EditDetailsform.get('email').value);
    formdata.append('phone', this.EditDetailsform.get('phone').value);
    this.auth.postdata(formdata, config.cashfree_payout.updateDetils).subscribe((res: any) => {
      if (res.statuscode == 200) {
        Swal.fire({
          title: res.message,
          icon: 'success'
        }).then((res1) => {
          // this.getAccountList();
          this.filter();
          $("#EditDetails").modal("hide");
        });

      } else {
        Swal.fire({
          title: res.message,
          icon: 'error'
        });
      }
    });
  }
  closemodal12() {
    $("#EditDetails").modal("hide");
  }

  funObj(obj: any) {
    var key = obj.key;
    var value = obj.value;
    switch (key) {
      case "VerifyBankAccount":
        Swal.fire({
          title: 'Are you sure?',
          text: "You have to pay 5 rupees for this transactions ! Are you want to proceed ?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Proceed'
        }).then((result) => {
          if (result.isConfirmed) {
            const formdata = new FormData();
            formdata.append('token', config.tokenauth);
            formdata.append('bene_id', value.id);
            formdata.append('is_deleted', value.is_deleted);
            this.auth.postdata(formdata, config.cashfree_payout.verification).subscribe((res: any) => {
              if (res.statuscode == 200) {
                this.filter();
                Swal.fire({
                  title: res.message,
                  icon: 'success'
                }).then((res1) => {
                  this.showModal = true;
                  this.VerificationData = res.data;
                });

              } else {
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
      case "settlementbankDelete":
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to Delete this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            const formdata = new FormData();
            formdata.append('token', config.tokenauth);
            formdata.append('bene_id', value.id);
            this.auth.postdata(formdata, config.cashfree_payout.DeleteAccount).subscribe((res: any) => {
              if (res.statuscode == 200) {
                // this.getAccountList();
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
      case "getbeneidud":
        this.bene_ID = value.id;
        // this.bene_ID = beneInfo.ps_bene_id;

        this.beneInfoModel = value;
        //console.log(this.beneInfoModel);
        break;
        case "EditDetails":
          this.editDeilsId = value.id;
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
    // search.status = this.status;
    console.log(search)
    this.dt.filter(search)
    // this.getAccountList();
  }
}
