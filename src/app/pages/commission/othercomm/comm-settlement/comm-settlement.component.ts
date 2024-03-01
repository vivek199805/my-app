import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comm-settlement',
  templateUrl: './comm-settlement.component.html',
  styleUrls: ['./comm-settlement.component.css']
})
export class CommSettlementComponent implements OnInit {
  data: any;
  val: any = '';
  userDetailsList: Array<Select2OptionData> = [];
  public options: Options;

  showData: boolean = false;
  userId: any;

  mainForm: FormGroup;

  constructor(private _auth: ApiService) {
    this.mainForm = new FormGroup({
      value: new FormControl(null, [Validators.required, Validators.min(0)])
    });
    
    this.options = {
      width: '100%',
      templateSelection: (object: any) => {
        if(object.selected == true){
        this.selectEvent(object.id);
        }
        return object && object.text;
      },
    };
  }
  get getVal() {
    return this.mainForm.controls['value'] as FormControl;
  }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    let formdata: any = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('search', this.val);
    this._auth.postdata(formdata, config.commission.userlist).subscribe((res: any) => {
			if (res.statuscode == 200) {
				let arr = [];
				for (var v of res.data) {  
          if(v.userdetails != null)
  					arr.push({id:v.id,text:v.userdetails}); 
				}
				this.userDetailsList = arr;
			}
    });
  }
  selectEvent(event: any) {
    this.showData = false;

    if (event !== undefined) {
      this.userId = event;
      let formdata: any = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('userid', this.userId);
      formdata.append('type', '11');
      this._auth.postdata(formdata, config.commission.getcommission).subscribe((res: any) => {
        if (res.statuscode === 2001 || res.statuscode === 0) {
          this.showData = true;
          if (res.data === undefined) {
            Swal.fire(
              'No Record Found?',
              res.message,
              'info'
            )
            this.createForm(false);
          } else {
            this.data = JSON.parse(res.data);

            this.createForm(true);
          }
        }else if(res.statuscode == 200){
          this.showData = true;
          this.data = JSON.parse(res.data);
          this.createForm(true);
        }else{
          Swal.fire({
            title: res.message,
            icon: 'error'
          });
        }
      });
    }
  }
  createForm(val: boolean) {

    if (val) {
      this.getVal.patchValue(this.data['value'])
    } else {
      this.getVal.patchValue('')
    }
  }
  onSubmit() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('type', '11');
    formdata.append('userid', this.userId);
    formdata.append('commission', JSON.stringify(this.mainForm.value));
    this._auth.postdata(formdata, config.commission.updatecommission).subscribe((res: any) => {
      if (res.statuscode === 200) {
        Swal.fire(
          'Commission Updated.',
          res.message,
          'success'
        )
      }
    });
  }
}
