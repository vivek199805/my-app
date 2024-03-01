import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { ScannersService } from 'src/app/_helpers/common/scanner-settings/scanners.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-company-bank',
  templateUrl: './add-company-bank.component.html',
  styleUrls: ['./add-company-bank.component.css']
})
export class AddCompanyBankComponent implements OnInit {
	bankList: any;
	form: any = FormGroup;
	bank: any = '';
	bankLisitng: Array<Select2OptionData> = [];
  isEdit: boolean = false;
  editID: any = null;
  constructor(
    private auth: ApiService,
		private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.form = this.fb.group({
      bankName:            ['', [Validators.required]],
      accno:               ['', [Validators.required]],
      ifsc:                ['', [Validators.required]],
      branch:              ['', [Validators.required]],
      balance:             ['', [Validators.required]],
      status:              ['', [Validators.required]],
      is_slip:             [''],
      is_transfer_allowed: [''],
    });

   }

  ngOnInit(): void {
    this.getbank(); 
    this.route.params.subscribe((params: any) => {
      if (typeof params['id'] != 'undefined') {
        this.editID = params['id'];
        this.isEdit = true;
        const formdata = new FormData();
        formdata.append('token', config.tokenauth);
        formdata.append('bankid', this.editID);
        this.auth.postdata(formdata, config.companybank.get).subscribe((res: any) => {
          if (res.statuscode == 200) { 
              this.form.patchValue({
                bankName:res.data.name,
                accno:res.data.accno,
                ifsc:res.data.ifsc,
                branch:res.data.branch,
                balance:res.data.balance,
                status:res.data.status,
                is_slip:res.data.is_slip,
                is_transfer_allowed:res.data.is_transfer_allowed,
              });
          }else{
            Swal.fire({
              title: res.message,
              icon: 'error'
            });
          }
        });
      }
    });
  }
    	//----Get banklist----
	getbank() {
		const formdata = new FormData();
		formdata.append('token', config.tokenauth);
		this.auth.postdata(formdata, config.aeps.banklist).subscribe((res: any) => {
			if (res.statuscode == 200) {
				let arr = [];
				for (var v of res.data) {  
					arr.push({id:v.iinno,text:v.bankName}); 
				}
				this.bankLisitng = arr;
			}
		});
	}
	//-------------

  onSubmit(){
    if(!this.form.valid){
      return;
    }else{
      let url;
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('accno', this.form.get('accno').value);
      formdata.append('name', this.form.get('bankName').value);
      formdata.append('balance', this.form.get('balance').value);
      formdata.append('ifsc', this.form.get('ifsc').value);
      formdata.append('branch', this.form.get('branch').value);
      formdata.append('status', this.form.get('status').value);
      formdata.append('is_slip', this.form.get('is_slip').value);
      formdata.append('is_transfer_allowed', this.form.get('is_transfer_allowed').value);
      if(this.isEdit == true){
        formdata.append('bankid', this.editID);
        url = config.companybank.update;
      }else{
        url = config.companybank.create;
      }
      this.auth.postdata(formdata, url).subscribe((res: any) => {
        if (res.statuscode == 200) {
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
          this.form.reset();
          this.router.navigate(['/list-company-bank']);
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
