import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {
  form: any = FormGroup;

  userAutoComData: any;
  userKeyword = 'userdetail';
  prevVal: any;
  permissionData: any = null;
  formArr: FormArray = this.fb.array([]);
  selectedUser: any;


  constructor(
    private auth: ApiService,
    private fb: FormBuilder,
    private route: Router
  ) {
    this.form = this.fb.group({
      secondForm: this.formArr
    });
  }
  getServerResponse(val: any) {
    if (val && val != this.prevVal) {
      this.prevVal = val;
      // fetch remote data from here
      // And reassign the 'data' which is binded to 'data' property.
      let formdata: any = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('username', val);
      this.auth.postdata(formdata, config.userTypeList).subscribe((res: any) => {
        if (res['statuscode'] == 200) {
          this.userAutoComData = res['data'];
        } else {
          this.userAutoComData = [];
        }
      });
    }

  }

  selectEvent(item: any) {
    // do something with selected item
    this.prevVal = item.id

    let formdata: any = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('id', this.prevVal);
    this.auth.postdata(formdata, config.getSinglePermission).subscribe((res: any) => {
      if (res['statuscode'] == 200) {
        this.selectedUser = res['name'];
        this.prevVal = res['id'];
        this.formArr = new FormArray([]);
        this.form = this.fb.group({
          secondForm: this.formArr,
        });
        this.permissionData = res.permission;
        for (const key in this.permissionData) {
          const element = this.permissionData[key];
          var controlValue: any = false;
          controlValue = element == '0' ? false : element == '1' ? true : '';
          let newGroup: FormGroup = this.fb.group({
            name: this.fb.control(key),
            value: this.fb.control(controlValue),
          })
          this.getSecondForm.push(newGroup);
        }
      }
    });
  }

  get getSecondForm() {
    return this.form.get('secondForm') as FormArray;
  }



  searchCleared() {
    this.prevVal = null;
  }

  ngOnInit(): void {
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);  
   //console.log(data)  
    // if(data.usertype == 5 || data.usertype == 3) {
      if(data.usertype !=0) {
      this.route.navigate(['dashboard']);
      // localStorage.removeItem('LoginDetails');
    }
  }
  //-----Get ASM list-----


  onSubmit() {
    let obj = {};
    let newObje = this.getSecondForm.value.map((val: any) => {
      obj = { ...obj, [val.name]: val.value === false ? 0 : val.value === true ? 1 : '' };

      // return { [val.name]: val.value === false ? 0 : val.value === true ? 1 : '' };
    })
    // console.log(this.prevVal);


    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('id', this.prevVal);
    formdata.append('permission', JSON.stringify(obj));

    this.auth.postdata(formdata, config.updateSinglePermission).subscribe((res: any) => {
      if (res.statuscode == 200) {
        this.form.markAsPristine();
        Swal.fire({
          title: res.message,
          icon: 'success'
        });
      } else {
        Swal.fire({
          title: res.message,
          icon: 'error'
        });
      }
    });

  }

  get f() { return this.form.controls; }



}
