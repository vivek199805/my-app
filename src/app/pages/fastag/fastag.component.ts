import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { Select2OptionData } from 'ng-select2';
import { LoaderService } from 'src/app/_helpers/common/loader.service';
import Swal from 'sweetalert2';
import { RiCustomMdlService } from 'src/app/_helpers/common/custome-modal/ri-custom-mdl/ri-custom-mdl.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-fastag',
  templateUrl: './fastag.component.html',
  styleUrls: ['./fastag.component.css']
})
export class FASTagComponent implements OnInit {
  fastagForm!: FormGroup;
  prepaidOperatorLisitng: Array<Select2OptionData> = [];
  amount: any;
  fetchDetails: any = [];
  btnng: boolean = false;
  longitute: any;
  latitute: any;
  HLRinfo: any = { operator: "", circle: "" };
  public value: any;
  mdlId: any = 'FASTagRecipt';
  invoiceObj: any = [];
  constructor(private fb: FormBuilder, private auth: ApiService, private loader: LoaderService, private _RiCustomMdlService: RiCustomMdlService, private route: Router) {
    this.fastagForm = this.fb.group({
      operator: ['', [Validators.required]],
      canumber: ['', [Validators.required]],
      amount: []
    })
  }

  ngOnInit(): void {
    this.getLocation();
    this.fetchopertor();

  }

  getLocation() {
    this.auth.getLocationService().then(resp => {
      this.longitute = resp.lng;
      this.latitute = resp.lat;
    })
  }


  fetchopertor() {
    this.loader.loaderEvent.emit(true)
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.auth.postdata(formdata, config.fastTag.fetchOperator).subscribe((res: any) => {
      if (res.status) {
        this.loader.loaderEvent.emit(false)
      //console.log(res.data)
        let arr = [];
        for (var v of res.data) {
          arr.push({ id: v.id, text: v.name });
        }
        for (var o of arr) {
          if (o.text == this.HLRinfo.operator) {
            this.value = [o.id];
          }
        }
        this.prepaidOperatorLisitng = arr;
      }
      else{
        Swal.fire({
          title: res.message,
          icon: 'error'
        })
      }
    })
  }

  fetchDeatils() {
    this.loader.loaderEvent.emit(true)
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('operator', this.fastagForm.controls.operator.value);
    formdata.append('canumber', this.fastagForm.controls.canumber.value);
    this.auth.postdata(formdata, config.fastTag.fetchDetail).subscribe((res: any) => {
      this.loader.loaderEvent.emit(false)
      if (res.status && res.data) {
        this.amount = res.data.amount;
        this.fetchDetails.push(res.data);
        this.fastagForm.patchValue({
          amount: res.data.amount
        })
        this.fastagForm.controls["amount"].setValidators(Validators.required);
        this.fastagForm.controls["amount"].updateValueAndValidity();
        this.btnng = true;
      }else{
        Swal.fire({
          title: res.message,
          icon: 'error'
        })
      }
    })
  }

  submit(item:any) {
    this.loader.loaderEvent.emit(true)
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('operator', this.fastagForm.controls.operator.value);
    formdata.append('canumber', this.fastagForm.controls.canumber.value);
    formdata.append('amount', item[0].amount);
    formdata.append('latitude', this.latitute);
    formdata.append('longitude', this.longitute);
    formdata.append('bill_fetch', '1');
    this.auth.postdata(formdata, config.fastTag.payFastTag).subscribe((res: any) => {
      if (res.status) {
        this.loader.loaderEvent.emit(false);
      //console.log(res)
        this.fastagForm.reset();
        Swal.fire({
          title: res.message,
          icon: 'success'
        }).then((result) => {
          this.invoiceObj = res.data;
          this._RiCustomMdlService.open(this.mdlId);
        });
      }else{
        Swal.fire({
          title: res.message,
          icon: 'error'
        })
      }
    })
  }

  get p() { return this.fastagForm.controls; }

  slipClose() {
    const url = this.route.url;
    this._RiCustomMdlService.close(this.mdlId);
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([url]);
    });
  }

}
