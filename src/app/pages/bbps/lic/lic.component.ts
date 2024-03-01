import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { RiCustomMdlService } from 'src/app/_helpers/common/custome-modal/ri-custom-mdl/ri-custom-mdl.service';
import { LoaderService } from 'src/app/_helpers/common/loader.service';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lic',
  templateUrl: './lic.component.html',
  styleUrls: ['./lic.component.css']
})
export class LicComponent implements OnInit {
  longitute: any;
  latitute: any;
  bbpsInformation: any;
  form: any = FormGroup;
  viewbill: boolean = true
  fetchBill: any = null;
  invoiceObj: any = [];

  mdlId: any = 'testRecipt';
  constructor(private auth: ApiService,
    private fb: FormBuilder,
    private route: Router,
    private loader: LoaderService,
    private _RiCustomMdlService: RiCustomMdlService) {
    this.form = this.fb.group({
      ad1: ['', [Validators.required]],
      canumber: ['', [Validators.required]],
    });
  }


  ngOnInit(): void {
    if (typeof (localStorage.getItem('bbpsInformation')) !== 'undefined' && localStorage.getItem('bbpsInformation') !== '' && localStorage.getItem('bbpsInformation') !== null) {
      let decode: any = EncodeDecode('n', localStorage.getItem('bbpsInformation'));
      this.bbpsInformation = JSON.parse(decode);
    } else {
      this.route.navigate(['bbps']);
    }

    this.auth.getLocationService().then(resp => {
      this.longitute = resp.lng;
      this.latitute = resp.lat;
    })
  }

  goBack() {
    localStorage.removeItem('bbpsInformation');
    this.route.navigate(['bbps']);
  }

  onSubmit() {
    this.loader.loaderEvent.emit(true)
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('canumber', this.form.get('canumber').value);
    formdata.append('ad1', this.form.get('ad1').value);

    formdata.append('amount', this.fetchBill.data.amount);
    formdata.append('ad2', this.fetchBill.ad2);
    formdata.append('ad3', this.fetchBill.ad3);
    formdata.append('referenceno', this.fetchBill.referenceno);

    formdata.append('longitude', this.longitute);
    formdata.append('latitude', this.latitute);

    formdata.append('maxBillAmount', this.fetchBill.data.bill_fetch.maxBillAmount);
    formdata.append('billAmount', this.fetchBill.data.bill_fetch.billAmount);
    formdata.append('billnetamount', this.fetchBill.data.bill_fetch.billnetamount);
    formdata.append('billdate', this.fetchBill.data.billdate ?? this.fetchBill.data.bill_fetch.billdate ?? '');
    formdata.append('dueDate', this.fetchBill.data.bill_fetch.dueDate);
    formdata.append('acceptPayment', this.fetchBill.data.bill_fetch.acceptPayment);
    formdata.append('acceptPartPay', this.fetchBill.data.bill_fetch.acceptPartPay);
    formdata.append('cellNumber', this.fetchBill.data.bill_fetch.cellNumber);
    formdata.append('userName', this.fetchBill.data.bill_fetch.userName);
    formdata.append('name', this.fetchBill.data);

    this.auth.postdata(formdata, config.bbps.paylicbill).subscribe((res: any) => {
      this.loader.loaderEvent.emit(false)
      Swal.fire({
        icon: 'success',
        title: res.message,
      })
        .then((result) => {
          this.invoiceObj = res.data;
          this._RiCustomMdlService.open(this.mdlId);
        });
    });
  }
  viewBill() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('ad1', this.form.get('ad1').value);
    formdata.append('canumber', this.form.get('canumber').value);
    this.auth.postdata(formdata, config.bbps.fetchlicbill).subscribe((res: any) => {
      if (res.statuscode == 200) {
        this.fetchBill = res;
        this.viewbill = false;
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }

  get f() { return this.form.controls; }
  slipClose() {
    const url = this.route.url;
    this._RiCustomMdlService.close(this.mdlId);
    this.route.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.route.navigate([url]);
    });
  }
}
