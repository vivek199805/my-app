import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { parse } from 'path';
import { Options } from 'select2';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { CustomModelComponent } from 'src/app/_helpers/custom-model/custom-model.component';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';
import * as $ from 'jquery';

@Component({
  selector: 'app-dmtdashoard',
  templateUrl: './dmtdashoard.component.html',
  styleUrls: ['./dmtdashoard.component.css']
})

export class DmtdashoardComponent implements OnInit {
  @ViewChild(CustomModelComponent) model!: CustomModelComponent;
  otp = {
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    input6: '',
  }
  mpin = {
    input1: '',
    input2: '',
    input3: '',
    input4: '',
  }

  oldpin = {
    input1: '',
    input2: '',
    input3: '',
    input4: '',
  }
  newpin = {
    input1: '',
    input2: '',
    input3: '',
    input4: '',
  }

  private deleteBeneInfo: any;
  openTab: string = 'loginwithpin';
  isVerified: string = "0";
  profressClass: boolean = false;
  profressWidth: string = '0%';
  verifyacc: any = 0;
  timeLeft: number = 60;
  showModal: boolean = false;

  formdata: any;
  result_obj: any;
  isLoggedin: boolean = true;
  impsbtn: boolean = false;

  public viewtable: boolean = false;
  // dtOptions: DataTables.Settings = {};
  form: any = FormGroup;
  dob: any = '';
  bank: any = '';
  bankLisitng: Array<Select2OptionData> = [];
  impsBank: any;
  graminBank: any;
  public options: Options;

  minDate!: Date;
  maxDate!: Date;
  mobile: string = "";
  dmtInfo: any = { fname: '', lname: '', limit: '', mobile: '' };
  //dmtINFO: any = {fname:'',lname:'',limit:'',mobile:''};
  dmtLoginInfo: any = null;
  depositorID: any;
  amtLimit: any;
  verifybtn: boolean = true;

  isPinBoxShwo: boolean = false;
  constructor(
    private fb: FormBuilder,
    private auth: ApiService,
    private route: Router,
  ) {
    this.options = {
      width: '100%',
      templateSelection: (object: any) => {
        if (object.selected == true) {
          this.setIFSC(object)
          return object && object.bankname;
        } else {
          return "Please select a beneficiary bank...";
        }
      },
      templateResult: (object: any) => {
        return object && object.bankname;
      }
    };
    this.form = this.fb.group({
      banktype: ['neft/imps', [Validators.required]],
      // verified: ['', [Validators.required]],
      benename: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
      bankname: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      accno: ['', [Validators.required, Validators.pattern('[0-9]{9,18}')]],
      confirmaccno: ['', [Validators.required, Validators.pattern('[0-9]{9,18}')]],
      ifsccode: ['', [Validators.required, Validators.pattern('^[A-Z]{4}0[A-Z0-9]{6}$')]],
      // amount: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    });
    this.setBankListing();
  }
  togglePinBox() {
    // $('#togglePinBox').toggle("slow");

    $(".myRotate").toggleClass('flip');
    $('#togglePinBox').slideToggle("slow");
  }
  ngOnInit(): void {
    if (typeof (localStorage.getItem('dmtInformation')) !== 'undefined' && localStorage.getItem('dmtInformation') !== '' && localStorage.getItem('dmtInformation') !== null) {
      let decode: any = EncodeDecode('n', localStorage.getItem('dmtInformation'));
      this.dmtInfo = JSON.parse(decode);
      this.mobile = this.dmtInfo.mobile;
      this.amtLimit = parseFloat(this.dmtInfo.limit);
      this.isLoggedin = true;
      this.depositorID = this.dmtInfo.depositorid;
      this.getBeneListing();
    } else {
      this.isLoggedin = false;
      this.route.navigate(['dmt']);
    }

    // if (typeof (localStorage.getItem('dmtLoginInfo')) !== 'undefined' && localStorage.getItem('dmtLoginInfo') !== '' && localStorage.getItem('dmtLoginInfo') !== null) {
    //   let decode: any = EncodeDecode('n', localStorage.getItem('dmtLoginInfo'));
    //   this.dmtLoginInfo = JSON.parse(decode);
    //   this.isLoggedin = true;
    //   this.depositorID = this.dmtLoginInfo.depositorid;
    //   this.getBeneListing();
    // } else {
    //   this.isLoggedin = false;
    // }

    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.auth.postdata(formdata, config.dmt.bankListing).subscribe((res: any) => {
      if (res.statuscode == 200) {
        this.bankLisitng = res.bank.gramin;
        this.impsBank = res.bank.gramin;
        this.graminBank = res.bank.imps_bank;
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }

  getBeneListing() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('mobile', this.mobile);
    this.auth.postdata(formdata, config.dmt.beneLisitng).subscribe((res: any) => {
      if (res.statuscode == 200) {
        this.result_obj = res.benedata;
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }

  setIFSC(object: any) {
    if (object.selected == true) {
      this.form.get('ifsccode').setValue(object.ifsc);
    }
  }

  verifyNow(bene_id: any, referenceid: any) {
    Swal.fire({
      title: 'Are you sure you would like to verify this account?',
      showCancelButton: true,
      icon: 'info',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        const formdata = new FormData();
        formdata.append('token', config.tokenauth);
        formdata.append('mobile', this.mobile);
        formdata.append('bene_id', bene_id);
        formdata.append('referenceid', referenceid);
        this.auth.postdata(formdata, config.dmt.beneVerify).subscribe((res: any) => {
          if (res.statuscode == 200) {
            Swal.fire({
              title: res.message,
              icon: 'success'
            });
            this.getBeneListing();
          } else {
            Swal.fire({
              icon: 'error',
              title: res.message
            });
          }
        });
      }
    })
  }

  payNow(obj: any, amount: any) {
    let depositorid = obj.depositorid;
    let a = parseFloat(amount.value);
  //console.log(a, this.amtLimit);
    if (isNaN(a) && a <= 0) {
      Swal.fire({
        icon: 'error',
        title: "Please Enter a valid Amount!"
      });
    } else if (a > this.amtLimit) {
      Swal.fire({
        icon: 'error',
        title: "Please Enter less Amount of your limit!"
      });
      return;
    } else if (a <= this.amtLimit) {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('mobile', this.mobile);
      formdata.append('amount', a.toString());
      formdata.append('bene_id', obj.id);
      formdata.append('dmrtype', 'listbene');
      formdata.append('depositorid', depositorid);
      formdata.append('directpay', 'listbene');
      this.auth.postdata(formdata, config.dmt.dmtTransactionInit).subscribe((res: any) => {
        if (res.statuscode == 200) {
          let decode: any = EncodeDecode(JSON.stringify(res.data), 'n');
          localStorage.setItem('dmtTransaction', decode);
          this.route.navigate(['dmt/transaction']);
        } else {
          Swal.fire({
            icon: 'error',
            title: res.message
          });
        }
      });
    }
  }

  deleteBene(beneInfo: any) {
    Swal.fire({
      title: 'Are you sure you would like to delete this?',
      showCancelButton: true,
      icon: 'info',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        const formdata = new FormData();
        formdata.append('token', config.tokenauth);
        formdata.append('mobile', this.mobile);
        formdata.append('bene_id', beneInfo.id);
        this.auth.postdata(formdata, config.dmt.deleteBeniInit).subscribe((res: any) => {
          if (res.statuscode == 200) {
            this.model.showModal = true;
            this.deleteBeneInfo = beneInfo
            // Swal.fire({
            //   title: res.message,
            //   icon: 'success'
            // });
          } else {
            Swal.fire({
              icon: 'error',
              title: res.message
            });
          }
        });
      }
    })
  }

  deleteBeneConfirm() {
    const dbene = this.model.getOtp()
    if (dbene.length == 6) {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('mobile', this.mobile);
      formdata.append('bene_id', this.deleteBeneInfo.id);
      formdata.append('otp', dbene);
      this.auth.postdata(formdata, config.dmt.deleteBeniConfirm).subscribe((res: any) => {
        if (res.statuscode == 200) {
          this.model.showModal = false;
          this.getBeneListing();
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: res.message
          });
        }
      });
    }
  }
  accountAdd() {
    if (!this.form.valid) {
      return;
    } else {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('mobile', this.mobile);
      formdata.append('benename', this.form.get('benename')?.value);
      formdata.append('bankname', this.form.get('bankname')?.value);
      formdata.append('accno', this.form.get('accno')?.value);
      formdata.append('confirmaccno', this.form.get('confirmaccno')?.value);
      formdata.append('verified', this.verifyacc);
      formdata.append('ifsccode', this.form.get('ifsccode')?.value);
      this.auth.postdata(formdata, config.dmt.beneregistration).subscribe((res: any) => {
        if (res.statuscode == 200) {
          this.form.reset();
          this.getBeneListing();
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: res.message
          });
        }
      });
    }
  }
  accountVerify() {
    Swal.fire({
      title: 'Are you sure you would like to verify this account?',
      showCancelButton: true,
      icon: 'info',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        const formdata = new FormData();
        formdata.append('token', config.tokenauth);
        formdata.append('mobile', this.mobile);
        formdata.append('benename', this.form.get('benename')?.value);
        formdata.append('banktype', this.form.get('banktype')?.value);
        formdata.append('bankname', this.form.get('bankname')?.value);
        formdata.append('accno', this.form.get('accno')?.value);
        formdata.append('ifsccode', this.form.get('ifsccode')?.value);
        this.auth.postdata(formdata, config.dmt.pannyDrop).subscribe((res: any) => {
          if (res.statuscode == 200) {
            this.verifyacc = 1;
            Swal.fire({
              title: res.message,
              icon: 'success'
            });
            if (res.benename !== '' || res.benename !== null && res.benename !== undefined) {
              this.form.get('benename').setValue(res.benename)
            }
            this.verifybtn = false;
          } else {
            Swal.fire({
              icon: 'error',
              title: res.message
            });
            this.verifybtn = true;
          }
        });
      }
    })
  }
  calcualteProgress() {
    let accno = this.form.get('accno')?.value;
    let caccno = this.form.get('confirmaccno')?.value;
    if (accno.length >= 9 && caccno.length > 0) {
      this.profressWidth = (caccno.length / accno.length) * 100 + '%';
      if (accno != caccno) {
        this.profressClass = false;
      } else {
        this.profressClass = true;
      }
    }
  }
  setBankListing() {
    let bankType = this.form.get('banktype')?.value;
    if (bankType == 'gramin') {
      this.impsbtn = false;
      this.bankLisitng = this.graminBank;
    } else {
      this.impsbtn = true;
      this.bankLisitng = this.impsBank;
    }

    if (bankType == 'neft/imps') {
      this.impsbtn = true;
      this.bankLisitng = this.impsBank;
    }

  }
  loginWithPin() {
    const mpin = this.mpin.input1 + '' + this.mpin.input2 + '' + this.mpin.input3 + '' + this.mpin.input4;
    if (mpin.length == 4) {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('mobile', this.mobile);
      formdata.append('authcode', mpin);
      this.auth.postdata(formdata, config.dmt.loginremitter).subscribe((res: any) => {
        if (res.statuscode == 200) {
          this.depositorID = res.data.depositorid;

          let decode: any = EncodeDecode(JSON.stringify(res.data), 'n');
          localStorage.setItem('dmtLoginInfo', decode);
          this.dmtLoginInfo = res.data;
          this.isLoggedin = true;
          this.getBeneListing();
        } else {
          Swal.fire({
            title: res.message,
            icon: 'error'
          });
        }
        this.mpin = {
          input1: '',
          input2: '',
          input3: '',
          input4: '',
        }
      })
    }
  }
  forgotMpin() {
    //resendPin
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('mobile', this.mobile);
    this.auth.postdata(formdata, config.dmt.resendPin).subscribe((res: any) => {
      if (res.statuscode == 200) {
        Swal.fire({
          title: res.message,
          icon: 'success'
        });
      } else {
        Swal.fire({
          title: res.message,
          icon: 'error'
        });
      }
      this.mpin = {
        input1: '',
        input2: '',
        input3: '',
        input4: '',
      }
    })
  }
  loginWithOtp() {
    const otpList = this.otp.input1 + '' + this.otp.input2 + '' + this.otp.input3 + '' + this.otp.input4 + '' + this.otp.input5 + '' + this.otp.input6;

    if (otpList.length == 6) {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('mobile', this.mobile);
      formdata.append('authcode', otpList);
      this.auth.postdata(formdata, config.dmt.loginremitter).subscribe((res: any) => {
        if (res.statuscode == 200) {
          let decode: any = EncodeDecode(JSON.stringify(res.data), 'n');
          localStorage.setItem('dmtLoginInfo', decode);
          this.dmtLoginInfo = res.data;
          this.isLoggedin = true;
          this.getBeneListing();
        } else {
          Swal.fire({
            title: res.message,
            icon: 'error'
          });
        }
        this.otp = {
          input1: '',
          input2: '',
          input3: '',
          input4: '',
          input5: '',
          input6: '',
        }
      })
    }
  }
  resend_otp() {
    this.sendOTP();
  }
  sendOTP() {
    const formdata = new FormData();
    formdata.append('mobile', this.mobile);
    formdata.append('token', config.tokenauth);

    this.otp = {
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: '',
    };

    this.auth.postdata(formdata, config.dmt.generateOTP).subscribe((res: any) => {
      if (res.statuscode == 200) {
        /* let decode: any = EncodeDecode(JSON.stringify(res), 'n');
        localStorage.setItem('loginDMT', decode); 
        this.showModal = true;*/
        Swal.fire({
          title: res.message,
          icon: 'success'
        });
      } else {
        Swal.fire({
          title: res.message,
          icon: 'error'
        });
      }
    });
  }
  changePin() {
    const oldpin = this.oldpin.input1 + '' + this.oldpin.input2 + '' + this.oldpin.input3 + '' + this.oldpin.input4;

    const newpin = this.newpin.input1 + '' + this.newpin.input2 + '' + this.newpin.input3 + '' + this.newpin.input4;

    if (oldpin.length == 4 && newpin.length == 0) {
      //focus to new pin
    } else if (oldpin.length == 4 && newpin.length == 4) {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('mobile', this.mobile);
      formdata.append('oldpin', oldpin);
      formdata.append('newpin', newpin);
      this.auth.postdata(formdata, config.dmt.changePin).subscribe((res: any) => {
        if (res.statuscode == 200) {
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
        } else {
          Swal.fire({
            title: res.message,
            icon: 'error'
          });
        }
        this.oldpin = {
          input1: '',
          input2: '',
          input3: '',
          input4: '',
        }
        this.newpin = {
          input1: '',
          input2: '',
          input3: '',
          input4: '',
        }
      })
    }

  }

  get f() { return this.form.controls; }

}
