import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { RiCustomMdlService } from 'src/app/_helpers/common/custome-modal/ri-custom-mdl/ri-custom-mdl.service';
import { LoaderService } from 'src/app/_helpers/common/loader.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-recharge-handler',
  templateUrl: './recharge-handler.component.html',
  styleUrls: ['./recharge-handler.component.css']
})
export class RechargeHandlerComponent implements OnInit {
  prepaid: any = FormGroup;
  dth: any = FormGroup;
  status: any = FormGroup;
  referenceID: any = { dth: "", prepaid: "" };
  statusData: any = null;
  HLRinfo: any = { operator: "", circle: "" };
  public value: any;
  browseplans: boolean = false;
  rechargePlan: any;
  dthbrowseplan:any;
  rechargeTOPUP: any;
  rechargeTitle: any;
  obj: any = {
    data: {
      "mobile": '9999628428',
      "utr": 'UTR8875222112',
      "acno": '11220001',
      "ifsccode": 'SBI10005',
      "bank": 'SBI',
      "amount": '1000',
      "status": 'success',
      "date": '20/10/2001',
    },
    message: 'Transaction is Complete.'
  }
  @ViewChild('modal', { read: ElementRef }) modal!: ElementRef;

  prepaidOperatorLisitng: Array<Select2OptionData> = [];
  dthOperatorLisitng: Array<Select2OptionData> = [];
  onPrepaidInvoiceObj: any = null;
  onDthInvoiceObj: any = null;

  prepaidCircleLisitng: Array<Select2OptionData> = [];
  mdlId: any = 'testRecipt';
  invoiceObj: any = [];
  constructor(private auth: ApiService, private fb: FormBuilder, private route: Router,
    private _RiCustomMdlService: RiCustomMdlService, private loader: LoaderService) {

    this.prepaid = this.fb.group({
      operator: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern('[6789][0-9]{9}')]],
      amount: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      circle: [''],
    });

    this.dth = this.fb.group({
      operator: ['', [Validators.required]],
      canumber: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      amount: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    });

    this.status = this.fb.group({
      ref: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    });

  }

  ngOnInit(): void {
    this.getPrepaidOperator();
    this.getPrepaidCircle();
    this.disclaimer();
    // this.dth.get("canumber").valueChanges.subscribe((x: any) => {
    //   if (this.dth.get('canumber').value.length >= 10) {
    //   //console.log(this.dth.get('canumber').value);
    //     const formdata = new FormData();
    //     formdata.append('token', config.tokenauth);
    //     formdata.append('canumber', this.dth.get('canumber').value);
    //     formdata.append('op', this.dth.get('operator').value);
    //     this.auth.postdata(formdata, config.recharge.dth.dthinfo).subscribe((res: any) => {
    //       if (res.statuscode == 200) {
    //       //console.log(res);

    //       } else {

    //       }
    //     });

    //   }
    // })
 
  }

  getHLRInfo(info: any) {
    let mobile = info.target.value;
    if (mobile.length == 10) {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('number', this.prepaid.get('operator').value);
      formdata.append('type', 'mobile');
      this.auth.postdata(formdata, config.recharge.prepaid.hlrcheck).subscribe((res: any) => {
        if (res.statuscode == 200) {
          this.HLRinfo.operator = res.data.operator;
          this.HLRinfo.circle = res.data.circle;
          this.getPrepaidOperator();
          // this.browseplans = true; 
        } else {
          Swal.fire({
            icon: 'error',
            title: res.message
          });
        }
      });
    }
  }

  getHLRIDTHnfo(info: any) {
    let dth = info.target.value;
    if (dth.length == 10) {
      this.browseplans = true; 
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('op', this.dth.get('operator').value); 
      formdata.append('canumber', this.dth.get('canumber').value); 
      this.auth.postdata(formdata, config.recharge.dth.dthinfo).subscribe((res: any) => {
        if (res.statuscode == 200) {
        //console.log(res);
          
          // this.HLRinfo.operator = res.data.operator;
          // this.HLRinfo.circle = res.data.circle;
          // this.getPrepaidOperator();
          // this.browseplans = true; 
        } else {
          Swal.fire({
            icon: 'error',
            title: res.message
          });
        }
      });
    }else{
      this.browseplans = false; 
    }
  }
  browseplan() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('op', this.HLRinfo.operator);
    formdata.append('circle', this.HLRinfo.circle);
    this.auth.postdata(formdata, config.recharge.prepaid.browseplan).subscribe((res: any) => {
      if (res.statuscode == 200) {
        let rechargePlans = [];
        for (let i in res.data) {
          if (res.data[i] !== null) {
            rechargePlans.push({ heading: i, child: res.data[i] });
          }

        }
        this.rechargePlan = rechargePlans;
        this.modal.nativeElement.click();
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }

  browseplan1() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('op', this.prepaid.get('operator').value);
    formdata.append('circle', this.prepaid.get('circle').value);
    this.auth.postdata(formdata, config.recharge.prepaid.newbrowseplan).subscribe((res: any) => {
      if (res.statuscode == 200) {
        let rechargePlans = [];
        for (let i in res.data) {
          if (res.data[i] !== null) {
            rechargePlans.push({ heading: i, child: res.data[i] });
          }

        }
        this.rechargePlan = rechargePlans;
        this.modal.nativeElement.click();
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }

  dthBrowsePlan() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('op', this.dth.get('operator').value);
    this.auth.postdata(formdata, config.recharge.dth.dthplan).subscribe((res: any) => {
      if (res.statuscode == 200) {
        // this.dthbrowseplan = res.data.Plan;
        $("#dthbrowseplans").modal('show');
        let arr = [];
        for (let i in res.data) {
          if (res.data[i] !== null) {
            arr.push({ heading: i, child: res.data[i] });
          }

        }
       this.dthbrowseplan = arr;
        console.log(this.dthbrowseplan);
        // $("#dthbrowseplans").modal('show');
        // this.modal.nativeElement.click();
      }else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }


  disclaimer() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.auth.postdata(formdata, config.recharge.prepaid.disclaimer).subscribe((res: any) => {
      if (res.statuscode == 200) {
        this.rechargeTitle = res.data.english;
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }

  setAmount(amt: any) {
    this.prepaid.controls["amount"].setValue(amt);
    $("#browseplans").modal('hide');
  }

  onPrepaidSubmit() {
    this.loader.loaderEvent.emit(true)
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('operator', this.prepaid.get('operator').value);
    formdata.append('mobile', this.prepaid.get('mobile').value);
    formdata.append('amount', this.prepaid.get('amount').value);
    formdata.append('referenceid', this.referenceID.prepaid);
    this.auth.postdata(formdata, config.recharge.prepaid.dorecharge).subscribe((res: any) => {
      if (res.statuscode == 200) {
        this.loader.loaderEvent.emit(false)
        this.prepaid.reset();
        // this.showRechargeStatus(this.referenceID.prepaid);
        Swal.fire({
          title: res.message,
          icon: 'success'
        }).then((result) => {
          this.invoiceObj = res.data;
          this._RiCustomMdlService.open(this.mdlId);
        });
      } else {
        Swal.fire({
          title: res.message,
          icon: 'error'
        });
      }
    });
  }

  onDthSubmit() {
    this.loader.loaderEvent.emit(true)
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('operator', this.dth.get('operator').value);
    formdata.append('canumber', this.dth.get('canumber').value);
    formdata.append('amount', this.dth.get('amount').value);
    formdata.append('referenceid', this.referenceID.dth);
    this.auth.postdata(formdata, config.recharge.dth.dorecharge).subscribe((res: any) => {
      if (res.statuscode == 200) {
        this.loader.loaderEvent.emit(false)
        this.dth.reset();
        // this.showRechargeStatus(this.referenceID.dth);
        Swal.fire({
          title: res.message,
          icon: 'success'
        }).then((result) => {
          this.invoiceObj = res.data;
          this._RiCustomMdlService.open(this.mdlId);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }

  checkStatus() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('referenceid', this.status.get('ref').value);
    this.auth.postdata(formdata, config.recharge.status).subscribe((res: any) => {
      if (res.statuscode == 200) {
        this.status.reset();
        this.statusData = res.data;
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }

  getPrepaidOperator() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.auth.postdata(formdata, config.recharge.prepaid.operator).subscribe((res: any) => {
      if (res.statuscode == 200) {
        this.referenceID.prepaid = res.referenceid;
        let arr = [];
        for (var v of res.operator) {
          arr.push({ id: v.id, text: v.name });
        }
        for (var o of arr) {
        //console.log(o.text.toUpperCase());
        //console.log(this.HLRinfo.operator.toUpperCase());
          
          
          if (o.text.toUpperCase() == this.HLRinfo.operator.toUpperCase()) {
            this.value = [o.id];
            console.log(this.value)
          }
        }
        this.prepaidOperatorLisitng = arr;
        
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }


  getPrepaidCircle() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.auth.postdata(formdata, config.recharge.prepaid.circle).subscribe((res: any) => {
      if (res.statuscode == 200) {
        let arr = [];
        for (var v of res.circle) {
          arr.push(v.name );
        } 
        this.prepaidCircleLisitng = arr;
        // this.browseplans= true;       
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }

  getDthOperator() {
    if (this.dthOperatorLisitng.length > 0) {
      return;
    }
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.auth.postdata(formdata, config.recharge.dth.operator).subscribe((res: any) => {
      if (res.statuscode == 200) { 
        this.referenceID.dth = res.referenceid;
        let arr = [];
        for (var v of res.operator) {
          arr.push({ id: v.id, text: v.name });
        }
        this.dthOperatorLisitng = arr;
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }

  showRechargeStatus(refid: any) {
    this.status.controls['ref'].setValue(refid);
    this.checkStatus();
    let obj: any = jQuery('#status-tab');
    obj.tab('show');
  }

  slipClose() {
    const url = this.route.url;
    this._RiCustomMdlService.close(this.mdlId);
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([url]);
    });
  }

  get p() { return this.prepaid.controls; }
  get d() { return this.dth.controls; }
  get s() { return this.status.controls; }

}
