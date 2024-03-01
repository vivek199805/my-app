import { Component, ElementRef, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { CustomValidators } from 'src/app/_helpers/common/custom-validator/commission-validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comm-cashdeposit',
  templateUrl: './comm-cashdeposit.component.html',
  styleUrls: ['./comm-cashdeposit.component.css']
})
export class CommCashdepositComponent implements OnInit {
  keyword = 'userdetails';
  userDtLst: any;
  data: any;
  val: any = '';
  userDetailsList: Array<Select2OptionData> = [];
  public options: Options;

  public aepsData: FormGroup;
  formArr = new FormArray([]);
  // data: any;
  userId: any;

  constructor(private fb: FormBuilder, private _auth: ApiService, private elementRef: ElementRef) {
    this.aepsData = this.fb.group({
      mainGroup: this.formArr,
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

  get mainStart() {
    return (((this.aepsData as FormGroup).controls['mainGroup'] as FormArray));
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
    this.formArr = new FormArray([]);
    this.aepsData = this.fb.group({
      mainGroup: this.formArr,
    });

    if (event !== undefined) {
      this.userId = event;
      // //console.log(this.userId);
      let newArray: any = [];
      let formdata: any = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('userid', this.userId);
      formdata.append('type', '6');
      this._auth.postdata(formdata, config.commission.getcommission).subscribe((res: any) => {
        if (res.statuscode === 2001 || res.statuscode === 0) {
          if (res.data === undefined) {
            Swal.fire(
              'No Record Found?',
              res.message,
              'info'
            )

            const data = {
              "icici": [
                {
                  "slab_min": "100",
                  "slab_max": "",
                  "is_fixed": "0",
                  "value": "0"
                }
              ],
              "fino": [
                {
                  "slab_min": "100",
                  "slab_max": "",
                  "is_fixed": "0",
                  "value": "0"
                },
              ],
              "indus": [
                {
                  "slab_min": "100",
                  "slab_max": "",
                  "is_fixed": "0",
                  "value": "0"
                },
              ]
            };
            this.createForm(data);
          } else {
            this.data = JSON.parse(res.data);
            // //console.log(res.data);
            // //console.log(JSON.parse(res.data));


            this.createForm(this.data);
          }
        }else if(res.statuscode == 200){
          this.data = JSON.parse(res.data);
          this.createForm(this.data);
        }else{
          Swal.fire({
            title: res.message,
            icon: 'error'
          });
        }
        // //console.log(JSON.parse(res.data));
      });
    }
  }


  createForm(data: any) {

    for (const key in data) {
      let innerFormArr = new FormArray([], { validators: [CustomValidators.compairRecordValidator(), CustomValidators.firstRowMin(), CustomValidators.lastRowMax()] });
      this.data = data[key].forEach((element: any) => {
        innerFormArr.push(new FormGroup({
          'slab_min': new FormControl(element.slab_min, [Validators.required]),
          'slab_max': new FormControl(element.slab_max, [Validators.required]),
          'value': new FormControl(element.value, [Validators.required, Validators.min(0)]),
          'is_fixed': new FormControl(element.is_fixed === '0' ? false : true, [Validators.required]),
        }, { validators: [CustomValidators.validateMinAndMax('slab_min', 'slab_max'), CustomValidators.is_fixedValue()] }));
      });
      this.formArr.push(new FormGroup({
        id: new FormControl(key, [Validators.required]),
        validCheck: new FormControl(false, [Validators.required]),
        arr: innerFormArr
      }));
    }
  }

  onSubmit() {
    // //console.log(this.formArr.controls);
    let value = this.formArr.value;
    let obj: any = {};
    // //console.log(value);

    var rv: any = {};
    let mapped = value.map((m: any) => {
      rv[m.id] = m.arr
      // return { [m.id]: m.arr }
    });

    for (const key in rv) {
      const element = rv[key];
      // //console.log(element);
      for (const keys in element) {
        const ele = element[keys];
        if (typeof ele.is_fixed === 'boolean') {
          //console.log(ele.is_fixed);
          ele.is_fixed = ele.is_fixed === true ? '1' : '0';
        }
      }
    }
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('type', '6');
    formdata.append('userid', this.userId);
    formdata.append('commission', JSON.stringify(rv));
    this._auth.postdata(formdata, config.commission.updatecommission).subscribe((res: any) => {
      // //console.log(res.data);
      if (res.statuscode === 200) {
        Swal.fire(
          'Commission Updated.',
          res.message,
          'success'
        )
      }
    });
  }

  getArr(arr: any, i: any): any {
    return (<FormArray>arr.controls['arr'])
  }

  add(pm: any, i: any) {
    // //console.log(this.getArr(pm, i).value);
    let leng: number = pm.controls['arr'].controls.length;

    let val: number = +((pm.controls['arr'] as FormArray)?.controls[leng - 1] as FormGroup)?.controls['slab_max']?.value;
    //console.log(val);

    let newUsergroup: FormGroup = this.fb.group({
      slab_min: [val + 1, [Validators.required]],
      slab_max: [null, [Validators.required]],
      value: [0, Validators.required],
      is_fixed: [false, Validators.required]
    }, { validators: [CustomValidators.validateMinAndMax('slab_min', 'slab_max')] });
    this.getArr(pm, i).push(newUsergroup);
  }
  remove(pm: any, i: any, j: any) {
    this.getArr(pm, i).removeAt(j);
  }

  isAddBtnDisabled(arr: any, i: any) {
    let leng: number = arr.controls['arr'].controls.length;

    let val: number = +((arr.controls['arr'] as FormArray)?.controls[leng - 1] as FormGroup)?.controls['slab_max']?.value;

    if (val >= 10000) {
      return true;
    }
    return null;
  }
}
