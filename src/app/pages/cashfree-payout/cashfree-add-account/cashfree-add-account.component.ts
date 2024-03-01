import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cashfree-add-account',
  templateUrl: './cashfree-add-account.component.html',
  styleUrls: ['./cashfree-add-account.component.css']
})
export class CashfreeAddAccountComponent implements OnInit {
	bankList: any;
	form: any = FormGroup;
	bank: any = '';
	bankLisitng: Array<Select2OptionData> = [];
  isEdit: boolean = false;
  editID: any = null;
  merchantCode: any;
  public options: Options;
  fillCardDetails: boolean = true;
  mode:any = 'self';
  accounTtt:any="PRIMARY";
  constructor(
    private auth: ApiService,
		private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.form = this.fb.group({
      bankName:     ['', [Validators.required]],
      accno:        ['', [Validators.required]],
      ifsc:         ['', [Validators.required]],
      accounttype: [''],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
      phone: ['', [Validators.required, Validators.pattern('[6789][0-9]{9}'), Validators.maxLength(10)]],
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
      this.merchantCode = data.merchantCode;

    this.getbank(); 
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
		this.auth.postdata(formdata, config.cashfree_payout.banklist).subscribe((res: any) => {
			if (res.statuscode == 200) {
				let arr = [];
				for (var v of res.data) {  
					arr.push({id:v.id,text:v.bankname}); 
				}
				this.bankLisitng = arr;
			}
		});
	}
	//-------------

  modeChange(value:any){
    this.mode = value;
    if(this.mode == 'self'){
      this.fillCardDetails = true; 
      this.accounTtt ='PRIMARY';
    }else{
      this.fillCardDetails = false; 
      this.accounTtt ='RELATIVE';
    }
  }

  onSubmit(){
    if(!this.form.valid){
      return;
    }else{
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      // formdata.append('merchant_code', this.merchantCode);
      formdata.append('bankid', this.form.get('bankName').value);
      formdata.append('account', this.form.get('accno').value);
      formdata.append('ifsc', this.form.get('ifsc').value);
      formdata.append('name', this.form.get('name').value);
      formdata.append('email', this.form.get('email').value);
      formdata.append('phone', this.form.get('phone').value);
      formdata.append('account_type', this.accounTtt);
      this.auth.postdata(formdata, config.cashfree_payout.addaccount).subscribe((res: any) => {
        if (res.statuscode == 200) {
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
          this.form.reset();
          this.router.navigate(['/razorpay-payout']);
        }else{
          Swal.fire({
            title: res.message,
            icon: 'error'
          });
        }
      });
    }
  }
  get f() { return this.form.controls; }


}
