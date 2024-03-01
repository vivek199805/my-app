import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { config } from 'src/app/service/config'; 
import Swal from 'sweetalert2';
import { LoaderService } from 'src/app/_helpers/common/loader.service';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css']
})
export class PaymentGatewayComponent implements OnInit {
  mode:any = 'DC';
  form: any = FormGroup;  
  fillCardDetails: boolean = true;
  private isPgDetail: boolean = true;
  private pageUrl:string = 'http://localhost:4200/#/redirect'
  is_active: boolean = true;
  constructor(
    private auth:ApiService,
		private fb: FormBuilder,
    private route: Router,
    private loader:LoaderService,
    ) { 
    this.form = this.fb.group({
			mode:   [''],
			amount: ['', [Validators.required, Validators.pattern('[0-9]+')]],
			mobile: ['', [Validators.required, Validators.pattern('[6789][0-9]{9}')]],
			email:  ['', [Validators.required, Validators.email]],  
      name:   ['',[Validators.required,Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
      card:   ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
		});
  }

  ngOnInit(): void {

  }

  onSubmit(){
    if(!this.form.valid){
      return;
    }else{
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('mode',this.mode);
      formdata.append('amount', this.form.get('amount').value);
      formdata.append('mobile', this.form.get('mobile').value);
      formdata.append('email', this.form.get('email').value);
      formdata.append('card', this.form.get('card').value);
      formdata.append('name', this.form.get('name').value);
      formdata.append('url', this.pageUrl);
      this.auth.postdata(formdata, config.pg.getpg).subscribe((res: any) => {
        if (res.statuscode == 200) {
          setTimeout(()=>{
            this.loader.loaderEvent.emit(true)
          },500)
          this.openWindow(res);
          /* Swal.fire({
            title: res.message,
            icon: 'success'
          });  */ 
        } else {
          Swal.fire({
            icon: 'error',
            title: res.message
          });
        }
      })
    }
  }

  openWindow(res:any){
    let form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", res.data.url);
    let element1:any = document.createElement("INPUT");
    element1.name="encdata"
    element1.value = res.data.encdata;
    element1.type = 'hidden'
    form.appendChild(element1);
    let newwindow:any = window.open('', 'name', 'width=800,height=600');
    function popitup() {
      newwindow.document.body.appendChild(form);
      newwindow.document.forms[0].submit();
      return false;
    }
    popitup();
    var timer = setInterval(()=> {
      if(this.isPgDetail){
        if(newwindow.closed) {
          this._clearInput();
          clearInterval(timer);
          this.loader.loaderEvent.emit(false)
        }
        this.getDetails();
      }else{
        newwindow.close();
        this._clearInput();
        clearInterval(timer);
        this.loader.loaderEvent.emit(false)
        this.route.navigate(['/pg-recepit']);
      }
    }, 1000);
  }

  getDetails(){
    if ("Gatewaypg" in localStorage) {
      this.isPgDetail = false;
    } else {
      this.isPgDetail = true;
    }
  }

  _clearInput(){
    this.form.patchValue({
      mode: '',
      amount: '',
      mobile :'',
      email :'',
      card :'',
      name: '',
    });
  }

  modeChange(value:any){
    this.mode = value;
    if(this.mode == 'DC' || this.mode == 'CC'){
      this.fillCardDetails = true;
      this.form.get('name').setValidators([Validators.required,Validators.minLength(1)]);
      this.form.get('name').updateValueAndValidity();

      this.form.get('card').setValidators([Validators.required,Validators.pattern('[0-9]{4}')]);
      this.form.get('card').updateValueAndValidity();
    }else{
      this.fillCardDetails = false;
      this.form.get("name").clearValidators();
      this.form.get('name').updateValueAndValidity();

      this.form.get("card").clearValidators(); 
      this.form.get('card').updateValueAndValidity();
    }
  }
  get f(){return this.form.controls;}
}
