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
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {
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
  accounTtt='PRIMARY';
  fileImage: any;
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
      name:         ['', [Validators.required]],
      accounttype: [''],
      file: ['',[Validators.required]],
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
		this.auth.postdata(formdata, config.payout.banklist).subscribe((res: any) => {
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
      formdata.append('account_type', this.accounTtt);
      formdata.append('fileimage', this.fileImage);
      this.auth.postdata(formdata, config.payout.addaccount).subscribe((res: any) => {
        if (res.statuscode == 200) {
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
          this.form.reset();
          this.router.navigate(['/payout']);
        }else{
          Swal.fire({
            title: res.message,
            icon: 'error'
          });
        }
      });
    }
  }

  handleFileInput1(event: any) {
console.log(event)
var fileSize = event.target.files[0].size;
if (fileSize > 247819) {
  alert("File size is larze");
  }else{
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('name', file);
      this.auth.postdata(formdata, config.uploadimage).subscribe((data:any) => {
      //console.log(data);
        if (data.statuscode == 200) {
          this.fileImage = data.file;
        } else
          console.error("your image is not uploaded")

      })
    }
}
  }
  get f() { return this.form.controls; }


}
