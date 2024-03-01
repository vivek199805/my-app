import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { LoaderService } from 'src/app/service/loader.service';
import { AadharValidationService } from 'src/app/_helpers/common/aadhar-validation.service';
import { ScannersService } from 'src/app/_helpers/common/scanner-settings/scanners.service';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';

@Component({ 
  selector: 'app-cash-withdrawl',
  templateUrl: './cash-withdrawl.component.html',
  styleUrls: ['./cash-withdrawl.component.css']
})
export class CashWithdrawlComponent implements OnInit {
	@Input() bankList: any;
	cashwithdrawl: any = FormGroup;
	bank: any = '';
	bankLisitng: Array<Select2OptionData> = [];
	longitute: string = '';
	latitute: string = ''; 
	captureData: any;
	aadharError: boolean = true;
	checkScanbtn: boolean = false; 
	merchantCode:any;
	referenceno:any;
	site_name:any;
	device_name_list: any;
	defaultDevice:any;
	// device_name_list: any[] = [
	// 	{ name: 'Mantra', image: './assets/images/device/MANTRA-MFS-100.jpg', download: 'https://docs.paysprint.in/rd-service/mantra/mantraRd.zip' },
	// 	{ name: 'Morpho', image: './assets/images/device/MORPHO-E3.jpg', download: 'https://docs.paysprint.in/rd-service/Morpho/MorphoRd.zip' },
	// 	{ name: 'Secugen', image: './assets/images/device/secugen.jpg', download: 'https://docs.paysprint.in/rd-service/secugen/SecuGenAll.zip' },
	// 	{ name: 'Precision', image: './assets/images/device/PB510.jpg', download: 'https://docs.paysprint.in/rd-service/precision/precisonrd.zip' },
	// 	{ name: 'Startek', image: './assets/images/device/STARTEK-BIOMETRIC.jpg', download: 'https://docs.paysprint.in/rd-service/startek/Startekrdall.zip' },
	// 	{ name: 'NEXT', image: './assets/images/device/NEXT-BIOMETRIC.jpg', download: 'https://docs.paysprint.in/rd-service/next-rd-services/Nextrd.zip' },
	// 	// { name: 'Mantra IRIS', image: './assets/images/device/MANTRA-IRIS-SCANNER.jpg', download: 'https://docs.paysprint.in/rd-service/mantra-iris/MantraRDiris.zip' },
	// ];
	constructor(
		private _auth: ApiService,
        private scanner: ScannersService,
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private aadharValidation: AadharValidationService,
		private routes: Router,
		private loader: LoaderService, 
	) {
		this._auth.validDomian((domainSettings: any) => {
			this.site_name = domainSettings.site_name
			
		  }); 
		this.cashwithdrawl = this.fb.group({
			mobileNumber:   ['', [Validators.required, Validators.pattern('[6789][0-9]{9}'), Validators.maxLength(10)]], 
			aadharNumber:   ['', [Validators.required, Validators.pattern('[2-9]{1}[0-9]{11}'), Validators.maxLength(12)]],
			bankName:       ['', [Validators.required]],
			deviceid:       ['', [Validators.required]],
			amount:         ['', [Validators.required, Validators.pattern('[0-9]+')]],
			requestremarks: [''],
			checkbox:       ['', [Validators.required]]
		});
	}

  ngOnInit(): void { 
	// this.scanner.getRdsServiceCheck();
	this.getDeviceList();
	
	let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);    
    if(data.is_onboard == 1){
		if(this.scanner.banklist.length==0){
			this.getbank();
		}else{
			this.bankLisitng = this.scanner.banklist;
		}
		this.getLocation();
		this.scanner.getvalue().subscribe((res: any) => {
			this.checkScanbtn = res;
		})
		this.getReferanceNo();
		this.merchantCode = data.permission.merchant_id;
		localStorage.removeItem('Aepsreceipt');
	} 
	this.defaultDevice = data.permission.default_biometric;
	// console.log(this.defaultDevice)
    if (this.defaultDevice !== null) {
      this.cashwithdrawl.controls["deviceid"].setValue(this.defaultDevice);
	  this.scanner.listClick(this.defaultDevice);

    }

  }

  	//----Get banklist----
	getbank() {
		const formdata = new FormData();
		formdata.append('token', config.tokenauth);
		this._auth.postdata(formdata, config.aeps.banklist).subscribe((res: any) => {
			if (res.statuscode == 200) {
				let arr = [];
				for (var v of res.data) {  
					arr.push({id:v.iinno,text:v.bankName}); 
				}
				this.bankLisitng = arr;
				this.scanner.banklist = this.bankLisitng;
			}
		});
	}
	//-------------
	getLocation() {
		this._auth.getLocationService().then(resp => {
			this.longitute = resp.lng;
			this.latitute = resp.lat;
		})
	}

	getDeviceList() {
		const formdata = new FormData();
		formdata.append('token', config.tokenauth);
		this._auth.postdata(formdata, config.deviceList).subscribe((res: any) => {
		  if (res.statuscode == 200) { 
			this.device_name_list = res .data;
		  }
		});
	  }

	  getDevice(data: any) {
		let device_name = data.target.value;
		this.scanner.listClick(device_name);
		this.updateDeviceList(device_name);
	}

	updateDeviceList(device_name:any) {
		const formdata = new FormData();
		formdata.append('token', config.tokenauth);
		formdata.append('device', device_name);
		this._auth.postdata(formdata, config.deviceList).subscribe((res: any) => {
		if (res.statuscode == 200) { 
		  let localStorageLoginDetails = localStorage.getItem('LoginDetails');
		  let LoginDetails: any = String(localStorageLoginDetails);
		  let LoginDetailsPars: any = JSON.parse(LoginDetails);
		  LoginDetailsPars.permission.default_biometric = device_name;
		  let decode: any = JSON.stringify(LoginDetailsPars);
		  localStorage.setItem('LoginDetails', decode);
		  let aaa: any = JSON.parse(decode); 
		  // console.log(aaa);
		}
		});
	  }

	validateAadhar(){
		if(this.aadharValidation.isValidUidaiNumber(this.cashwithdrawl.get('aadharNumber').value)){
			this.aadharError = true;
		}else{
			this.aadharError = false;
		}
	}

	getReferanceNo() {
		const formdata = new FormData();
		formdata.append('token', config.tokenauth);
		this._auth.postdata(formdata, config.getreferanceid).subscribe((res: any) => {
			if (res.statuscode == 200) {
				this.referenceno = res.referenceno
			} else {
				Swal.fire({
					icon: 'error',
					title: res.message
				});
			}
		});
	}

	getScannerData(){
		this.getReferanceNo();
		if (this.referenceno) {	
		this.captureData = this.scanner.capture((bioMetricData:any)=>{
			if(bioMetricData == ''){
				this.loader.isLoading.next(true); 
			}else{	
				this.loader.isLoading.next(false); 
		if (this.cashwithdrawl.valid) {			
			if (this.latitute == "" && this.longitute == "") {
			  Swal.fire({
				icon: 'error',
				title: 'Please allow the Location access! and You May Not Connected To Internet',
			  })
			} else {	
			// localStorage.setItem('deviceName', this.cashwithdrawl.get('deviceid').value);			
			  if(this.aadharError) {			  
				const formdata = new FormData();
				formdata.append('token', config.tokenauth);
				formdata.append('latitude', this.latitute);
				formdata.append('longitude', this.longitute);
				formdata.append('mobilenumber', this.cashwithdrawl.get('mobileNumber').value);
				formdata.append('adhaarnumber', this.cashwithdrawl.get('aadharNumber').value);
				formdata.append('accessmodetype', 'SITE');
				formdata.append('nationalbankidentification', this.cashwithdrawl.get('bankName').value);
				formdata.append('requestremarks', this.cashwithdrawl.get('requestremarks').value);
				formdata.append('data', bioMetricData);
				formdata.append('pipe', 'bank1');
				formdata.append('referenceno', this.referenceno);
				formdata.append('submerchantid', this.merchantCode);
				formdata.append('amount', this.cashwithdrawl.get('amount').value);
			// console.log(this.cashwithdrawl.value)
				this._auth.postdata(formdata, config.aeps.cashwithdraw).subscribe((res: any) => {
					if (res.statuscode == 200) {
						if(res.responsecode == 1){
							Swal.fire({
								title: res.message,
								icon: 'success'
							});

							let decode: any = EncodeDecode(JSON.stringify(res), 'n');
							localStorage.setItem('Aepsreceipt', decode);
							this.routes.navigate(['receipt/cash-withdrawal']);
						}else if(res.responsecode == 0){
							// this.cashwithdrawl.reset();
							this.cashwithdrawl.controls['aadharNumber'].reset();

							Swal.fire({
								icon: 'error',
								title: res.message
							});
						}else{
							// this.cashwithdrawl.reset();
							this.cashwithdrawl.controls['aadharNumber'].reset();

							Swal.fire({
								icon: 'error',
								title: res.message
							});
						}

					} else {
						// this.cashwithdrawl.reset();
						this.cashwithdrawl.controls['aadharNumber'].reset();

						Swal.fire({
							icon: 'error',
							title: res.message
						});
					}
	
				}, (err) => {
					// this.cashwithdrawl.reset();
					this.cashwithdrawl.controls['aadharNumber'].reset();

				  Swal.fire({
					icon: 'warning',
					title: err
				  });
				})
			  }
			}
		  }
		}
		});
	} else {
		// this.cashwithdrawl.reset();
		this.cashwithdrawl.controls['aadharNumber'].reset();

		Swal.fire({
			icon: 'error',
			title: 'Error occurred please try again'
		});
	}
	}

	get d() { return this.cashwithdrawl.controls; }

}
