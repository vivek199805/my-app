import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { LoaderService } from 'src/app/_helpers/common/loader.service';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.css']
})
export class ListAccountComponent implements OnInit {
  merchantCode: any;
  acclist: any;
  pancard: boolean = false;
  aadharcard: boolean = false;
  drivinglicence: boolean = false;
  form: any = FormGroup;
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
  public options: Options;
  constructor(
    private auth: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loader: LoaderService,
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

    this.getbank();
  }

  getAccountList() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    // formdata.append('merchantid', this.merchantCode);
    this.auth.postdata(formdata, config.payout.accountlist).subscribe((res: any) => {
      if (res.statuscode == 200) {
        // Swal.fire({
        //   title: res.message,
        //   icon: 'success'
        // });
        this.acclist = res.data;
      } else {
        Swal.fire({
          title: res.message,
          icon: 'error'
        });
      }
    });
  }

  getbeneidud(beneInfo: any) {
    this.bene_ID = beneInfo.id;
    // this.bene_ID = beneInfo.ps_bene_id;

    this.beneInfoModel = beneInfo;
  //console.log(this.beneInfoModel);
  }

  handleFiledpass(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.passbookimg = file;
    }
  }

  handleFileInput1(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.panImage = file;
    }
  }
  handleFiledlf(dl: any) {
    if (dl.target.files.length > 0) {
      const file = dl.target.files[0];
      this.dlfrontImage = file;
    }
  }
  handleFiledlb(dl: any) {
    if (dl.target.files.length > 0) {
      const file = dl.target.files[0];
      this.dlbackImage = file;
    }
  }

  handleFileaadharf(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.adharimgf = file;
    }
  }

  handleFileaadharb(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.adharimgb = file;
    }
  }
  onSubmit() {
    if (!this.form.valid) {
      return;
    } else {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('doctype', this.form.get('doctype').value);
      formdata.append('passbook', this.passbookimg, this.passbookimg.name);
      formdata.append('bene_id', this.bene_ID);
      if (this.form.get('doctype').value == "PAN") {
        formdata.append('panimage', this.panImage);
      }
      if (this.form.get('doctype').value == "DL") {
        formdata.append('front_image', this.dlfrontImage, this.dlfrontImage.name);
        formdata.append('back_image', this.dlbackImage, this.dlbackImage.name);
      }
      if (this.form.get('doctype').value == "AADHAAR") {
        formdata.append('front_image', this.adharimgf, this.adharimgf.name);
        formdata.append('back_image', this.adharimgb, this.adharimgb.name);
      }

      this.auth.postdata(formdata, config.payout.uploaddoc).subscribe((res: any) => {
        if (res.statuscode == 200) {
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
          this.form.reset();
          $("#uploaddocument").modal("hide");
          this.getAccountList();
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
          this.auth.postdata(formdata, config.payout.dotxn).subscribe((res: any) => {
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
          this.auth.postdata(formdata, config.payout.dotxn).subscribe((res: any) => {
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

  settlementbankDelete(type: any) {
  //console.log(type)
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
        formdata.append('id', type.id);
        this.auth.postdata(formdata, config.payout.DeleteAccount).subscribe((res: any) => {
          if (res.statuscode == 200 && res.status) {
            Swal.fire(
              'Deleted!',
              res.message,
              'success'
            ).then((result)=>{
              this.getAccountList();
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
  }
}
