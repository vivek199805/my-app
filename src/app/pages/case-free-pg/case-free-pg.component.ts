import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';
import { LoaderService } from 'src/app/_helpers/common/loader.service';

@Component({
  selector: 'app-case-free-pg',
  templateUrl: './case-free-pg.component.html',
  styleUrls: ['./case-free-pg.component.css']
})
export class CaseFreePgComponent implements OnInit {
  objectKeys = Object.values;
  pgForm!: FormGroup;


  constructor(private auth: ApiService,
    private fb: FormBuilder,
    private route: Router,
    private loader: LoaderService,) {
    this.pgForm = this.fb.group({
      amount: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      mobile: ['', [Validators.required, Validators.pattern('[6789][0-9]{9}')]],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
      // card:   ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
    });

  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (!this.pgForm.valid) {
      return;
    } else {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('amount', this.pgForm.controls.amount.value);
      formdata.append('mobile', this.pgForm.controls.mobile.value);
      formdata.append('email', this.pgForm.controls.email.value);
      formdata.append('name', this.pgForm.controls.name.value);
      this.auth.postdata(formdata, config.pg.getpg).subscribe((res: any) => {
        if (res.statuscode == 200) {
          setTimeout(() => {
            this.loader.loaderEvent.emit(true)
          }, 500)
          this.openWindow(res);
        } else {
          Swal.fire({
            icon: 'error',
            title: res.message
          });
        }
      })
    }
  }



  openWindow(res: any) {
    let form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", res.data.url);
    let element1: any = document.createElement("INPUT");
    element1.name = "appId"
    element1.type = 'hidden'
    element1.value = res.data.postdata.appId;
    let element2: any = document.createElement("INPUT");
    element2.name = "customerEmail"
    element2.type = 'hidden'
    element2.value = res.data.postdata.customerEmail;
    let element3: any = document.createElement("INPUT");
    element3.name = "customerName"
    element3.type = 'hidden'
    element3.value = res.data.postdata.customerName;
    let element4: any = document.createElement("INPUT");
    element4.name = "customerPhone"
    element4.type = 'hidden'
    element4.value = res.data.postdata.customerPhone;
    let element5: any = document.createElement("INPUT");
    element5.name = "notifyUrl"
    element5.type = 'hidden'
    element5.value = res.data.postdata.notifyUrl;
    let element6: any = document.createElement("INPUT");
    element6.name = "orderAmount"
    element6.type = 'hidden'
    element6.value = res.data.postdata.orderAmount;
    let element7: any = document.createElement("INPUT");
    element7.name = "orderCurrency"
    element7.type = 'hidden'
    element7.value = res.data.postdata.orderCurrency;
    let element8: any = document.createElement("INPUT");
    element8.name = "orderId"
    element8.type = 'hidden'
    element8.value = res.data.postdata.orderId;
    let element9: any = document.createElement("INPUT");
    element9.name = "orderNote"
    element9.type = 'hidden'
    element9.value = res.data.postdata.orderNote;
    let element10: any = document.createElement("INPUT");
    element10.name = "returnUrl"
    element10.type = 'hidden'
    element10.value = res.data.postdata.returnUrl;
    let element11: any = document.createElement("INPUT");
    element11.name = "signature"
    element11.type = 'hidden'
    element11.value = res.data.postdata.signature;
    form.append(element1);
    form.append(element2);
    form.append(element3);
    form.append(element4);
    form.append(element5);
    form.append(element6);
    form.append(element7);
    form.append(element8);
    form.append(element9);
    form.append(element10);
    form.append(element11);
    let newwindow: any = window.open('', 'name', 'width=800,height=600');
    function popitup() {
      newwindow.document.body.append(form);
      newwindow.document.forms[0].submit();

      return false;
    }
    this.pgForm.reset();
    popitup();
  }
  get p() {
    return this.pgForm.controls;
  }
}
