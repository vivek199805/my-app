import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';

import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { threadId } from 'worker_threads';
import { RiCustomMdlService } from 'src/app/_helpers/common/custome-modal/ri-custom-mdl/ri-custom-mdl.service';
import { LoaderService } from 'src/app/_helpers/common/loader.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bbps-partner',
  templateUrl: './bbps-partner.component.html',
  styleUrls: ['./bbps-partner.component.css']
})
export class BbpsPartnerComponent implements OnInit {
  paynowbtn: boolean = false;
  operator: any;
  longitute: any;
  latitute: any;
  bbpsInformation: any;
  form: any = FormGroup;
  amount: any;
  public options: Options;
  // operators: Array<Select2OptionData> = [];
  operators: any;
  heading: string = "";
  isOperator: boolean = false
  viewbill: boolean = false
  fetchBill: any = null;
  subheading: any;
  subheading1: any;
  subheading2: any;
  subinputfeild: boolean = false;
  subinputfeild1: boolean = false;
  subinputfeild2: boolean = false;
  invoiceObj: any = false;
  amountInput : boolean = false;
  mdlId: any = 'testRecipt';
  maxDate!: Date;
  field:any;
  constructor(private auth: ApiService,
    private fb: FormBuilder,
    private route: Router,
    private loader: LoaderService,
    private _RiCustomMdlService: RiCustomMdlService,
    public datepipe: DatePipe) {
    this.options = {
      width: '100%',
      templateSelection: (object: any) => {

          this.valueChange(object)
          return object && object.text;
       
     
      }
      /* ,templateResult: (object: any) => {
        return object && object.name;
      } */
    };
    this.form = this.fb.group({
      operator: ['', [Validators.required]],
      code: ['', [Validators.required]],
      subcode: [''],
      subcode1: [''],
      subcode2: [''],
      amount:['']
    });
  }


  ngOnInit(): void {
    if (typeof (localStorage.getItem('bbpsInformation')) !== 'undefined' && localStorage.getItem('bbpsInformation') !== '' && localStorage.getItem('bbpsInformation') !== null) {
      let decode: any = EncodeDecode('n', localStorage.getItem('bbpsInformation'));
      this.bbpsInformation = JSON.parse(decode);
  this.amountInput = true;

      // this.operators = [
      //   {
      //     "id": "16",
      //     "text": "Airtel",
      //     "regex": "^[1-9]{1}[0-9]{9}$",
      //     "displayname": "Mobile Number (+91)",
      //     "viewbill": "1",
      //     "ad1_name": null,
      //     "ad1_d_name": null,
      //     "ad1_regex": null
      //   },
      //   {
      //     "id": "73",
      //     "text": "BSNL",
      //     "regex": "^[6789][0-9]{9}$",
      //     "displayname": "Mobile Number (+91)",
      //     "viewbill": "1",
      //     "ad1_name": null,
      //     "ad1_d_name": null,
      //     "ad1_regex": null
      //   },
      //   {
      //     "id": "189",
      //     "text": "Idea",
      //     "regex": "^[6789][0-9]{9}$",
      //     "displayname": "Mobile Number (+91)",
      //     "viewbill": "0",
      //     "ad1_name": null,
      //     "ad1_d_name": null,
      //     "ad1_regex": null
      //   },
      //   {
      //     "id": "536",
      //     "text": "Jio",
      //     "regex": "^[6789][0-9]{9}$",
      //     "displayname": "Mobile Number (+91)",
      //     "viewbill": "0",
      //     "ad1_name": null,
      //     "ad1_d_name": null,
      //     "ad1_regex": null
      //   },
      //   {
      //     "id": "228",
      //     "text": "Jio",
      //     "regex": "^[6789][0-9]{9}$",
      //     "displayname": "Mobile Number (+91)",
      //     "viewbill": "0",
      //     "ad1_name": null,
      //     "ad1_d_name": null,
      //     "ad1_regex": null
      //   },
      //   {
      //     "id": "417",
      //     "text": "Tata Docomo CDMA Postpaid",
      //     "regex": "^[1-9]{1}[0-9]{9}$",
      //     "displayname": "Mobile Number (+91)",
      //     "viewbill": "0",
      //     "ad1_name": null,
      //     "ad1_d_name": null,
      //     "ad1_regex": null
      //   },
      //   {
      //     "id": "461",
      //     "text": "Vodafone",
      //     "regex": "^[6789][0-9]{9}$",
      //     "displayname": "Mobile Number (+91)",
      //     "viewbill": "0",
      //     "ad1_name": null,
      //     "ad1_d_name": null,
      //     "ad1_regex": null
      //   }
      // ]

      this.fetch_bbps_dropdown().then((res: any) => {
        this.operators = res.data;
      }).catch((error) => {
        Swal.fire({
          icon: 'error',
          title: error.message
        });
      });
    } else {
      this.route.navigate(['bbps']);
    }

    this.auth.getLocationService().then(resp => {
      this.longitute = resp.lng;
      this.latitute = resp.lat;
    })

    const date = new Date();
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  fetch_bbps_dropdown() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('category', this.bbpsInformation.name);
    return this.auth.postdata(formdata, config.bbps.operator).toPromise();
  }

  valueChange(obj: any) {

  //console.log(this.subinputfeild);
  console.log(obj.ad1_d_name)
  console.log(obj.ad1_name)
  this.field = obj.ad1_name;

    if (obj.selected) {
      this.heading = obj.displayname;
      this.isOperator = true
      if (obj.regex != null) {
        this.form.controls["code"].setValidators([Validators.required, Validators.pattern(obj.regex)]);
      }
      if (obj.viewbill == '1') {
        this.viewbill = true
        this.amountInput = false
      } else {
        this.viewbill = false
        this.paynowbtn = false
        this.amountInput = true
      }
    }
    if (obj.ad1_name != null) {
      this.subheading = obj.ad1_d_name;
      if (obj.ad1_d_name == 'amount') {
        this.form.patchValue({
          subcode: '0'
        })
      }
      if (obj.ad1_name != 'null') {
        this.subinputfeild = true;
      }
      // this.subinputfeild = false;
      if (obj.ad1_regex != null) {
        this.form.controls["subcode"].setValidators([Validators.required, Validators.pattern(obj.ad1_regex)]);
      }
    }else{
      this.subinputfeild = false;
    }
    if (obj.ad2_name != null) {
      this.subheading1 = obj.ad2_d_name;
      if (obj.ad2_d_name == 'amount') {
        this.form.patchValue({
          subcode1: '0'
        })
      }
      if (obj.ad2_name != null) {
        this.subinputfeild1 = true;
      }
      // this.subinputfeild1 = false;
      if (obj.ad2_regex != null) {
        this.form.controls["subcode1"].setValidators([Validators.required, Validators.pattern(obj.ad2_regex)]);
      }
    }else{
      this.subinputfeild1 = false;
    }
    if (obj.ad3_name != null) {
      this.subheading2 = obj.ad3_d_name;
      if (obj.ad3_d_name == 'amount') {
        this.form.patchValue({
          subcode2: '0'
        })
      }
      if (obj.ad3_name != 'null') {
        this.subinputfeild2 = true;
      }
      // this.subinputfeild2 = false;
      if (obj.ad3_regex != null) {
        this.form.controls["subcode2"].setValidators([Validators.required, Validators.pattern(obj.ad3_regex)]);
      }
    }else{
      this.subinputfeild2 = false;
    }
  }

  onSubmit() {
    this.loader.loaderEvent.emit(true)
    const formdata = new FormData();
    // if(this.field == 'dateofBirth'){
    //   var dob: any = this.transform(this.form.get('subcode').value);
    // }else{
    //   var dob: any = this.form.get('subcode').value;
    // }

    if (this.viewbill) {
      formdata.append('token', config.tokenauth);
      formdata.append('operator', this.form.get('operator').value);
      formdata.append('canumber', this.form.get('code').value)
      formdata.append('amount', this.fetchBill.amount);
      formdata.append('referenceid', this.form.get('code').value);
      formdata.append('latitude', this.latitute);
      formdata.append('longitude', this.longitute);
      formdata.append('bill_fetch', JSON.stringify(this.fetchBill));
      formdata.append('ad1', this.form.get('subcode').value);
      // formdata.append('ad1', dob);
      formdata.append('ad2', this.form.get('subcode1').value);
      formdata.append('ad3', this.form.get('subcode2').value);
    } else {
      formdata.append('token', config.tokenauth);
      formdata.append('operator', this.form.get('operator').value);
      formdata.append('canumber', this.form.get('code').value);
      formdata.append('amount', this.form.get('amount').value);
      formdata.append('referenceid', this.form.get('code').value);
      formdata.append('ad1', this.form.get('subcode').value);
      // formdata.append('ad1', dob);
      formdata.append('ad2', this.form.get('subcode1').value);
      formdata.append('ad3', this.form.get('subcode2').value);
      formdata.append('latitude', this.latitute);
      formdata.append('longitude', this.longitute);
    }

    this.auth.postdata(formdata, config.bbps.paybill).subscribe((res: any) => {

      if (res.statuscode == 200) {
        this.loader.loaderEvent.emit(false)
        Swal.fire({
          icon: 'success',
          title: res.message,
        })
          .then((result) => {
            this.invoiceObj = res.data;
            this._RiCustomMdlService.open(this.mdlId);
          });
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        }).then((result) => {
          this.invoiceObj = res.data;
          this._RiCustomMdlService.open(this.mdlId);
        });;
      }
    });
  }
  viewBill() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('operator', this.form.get('operator').value);
    formdata.append('canumber', this.form.get('code').value);
    formdata.append('ad1', this.form.get('subcode').value);
    formdata.append('ad2', this.form.get('subcode1').value);
    formdata.append('ad3', this.form.get('subcode2').value);
    this.auth.postdata(formdata, config.bbps.fetchbill).subscribe((res: any) => {
      if (res.statuscode == 200) {
        this.fetchBill = res.data;
      //console.log(res.data);
      //console.log(this.fetchBill);
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

  goBack() {
    localStorage.removeItem('bbpsInformation');
    this.route.navigate(['bbps']);
  }

  slipClose() {
    const url = this.route.url;
    this._RiCustomMdlService.close(this.mdlId);
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([url]);
    });
  }

  validatePayButton() {
    if (this.form.valid && +this.fetchBill.amount >= 0) {

      this.paynowbtn = false;
    } else {
      this.paynowbtn = true
    }
  }



  transform(date: any) {
    return this.datepipe.transform(date, 'dd-MM-yyyy');
  }


}
