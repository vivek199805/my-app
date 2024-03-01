import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { config } from 'src/app/service/config';
import { CustomValidators } from 'src/app/_helpers/common/custom-validator/commission-validator';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-payout',
  templateUrl: './edit-payout.component.html',
  styleUrls: ['./edit-payout.component.css']
})
export class EditPayoutComponent implements OnInit {

  DMTForm: FormGroup;
  formArr = new FormArray([]);
  data: any;
  maxAmount: number = 20000
  minAmount: number = 100
  templateId: any;
  ngOnInit(): void {
    this.getData();
  }
  constructor(private fb: FormBuilder, private auth: ApiService, private _activeroute: ActivatedRoute, private router: Router) {
    this._activeroute.params.subscribe((res: any) => {
      this.templateId = res['id'];
    })
    this.DMTForm = this.fb.group({
      templateName: ['', [Validators.required]],
      quantities: this.formArr,
    });

    // this.createForm(this.data)
  }
  quantities(): FormArray {
    return this.DMTForm.get("quantities") as FormArray

  }

  get mainStart() {
    return (((this.DMTForm as FormGroup).controls['quantities'] as FormArray));
  }


  getData() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('tepid', this.templateId);
    this.auth.postdata(formdata, config.template.getData).subscribe((res: any) => {
      if (res.statuscode == 200) {
      //console.log(res.data);
        this.DMTForm.patchValue({
          templateName: res.data.name,
        })
        this.data = { "quantities": JSON.parse(res.data.commission) }
        this.createForm(this.data)
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }


  isAddBtnDisabled(arr: any, i: any) {
    let leng: number = arr.controls['arr'].controls.length;
    let val: number = +((arr.controls['arr'] as FormArray)?.controls[leng - 1] as FormGroup)?.controls['slab_max']?.value;

    if (val >= 200000) {
      return true;
    }
    return null;
  }

  createForm(data: any) {
    for (const key in data) {
      let innerFormArr = new FormArray([], { validators: [CustomValidators.compairRecordValidator(), CustomValidators.firstRowMin(this.minAmount), CustomValidators.lastRowMax(this.maxAmount)] });
      this.data = data[key].forEach((element: any) => {
        innerFormArr.push(new FormGroup({
          'slab_min': new FormControl(element.slab_min, [Validators.required]),
          'slab_max': new FormControl(element.slab_max, [Validators.required]),
          // 'commission_superdistributor': new FormControl(element.commission_superdistributor, [Validators.required, Validators.min(0)]),
          // 'commission_distributor': new FormControl(element.commission_distributor, [Validators.required, Validators.min(0)]),
          // 'commission_partner': new FormControl(element.commission_partner, [Validators.required, Validators.min(0)]),
          'charges_retailer': new FormControl(element.charges_retailer, [Validators.required, Validators.min(0)]),
          'charges_type': new FormControl(element.charges_type, [Validators.required]),
          // 'is_fixed': new FormControl(element.is_fixed === '0' ? false : true, [Validators.required,]),
        }, { validators: [CustomValidators.validateMinAndMax('slab_min', 'slab_max'), CustomValidators.is_fixedValue()] }));
      });
      this.formArr.push(new FormGroup({
        id: new FormControl(key, [Validators.required]),
        validCheck: new FormControl(false, [Validators.required]),
        arr: innerFormArr
      }));
    }
  }

  getArr(arr: any, i: any): any {
    return (<FormArray>arr.controls['arr'])
  }

  add(arr: any, i: any) {
    let leng: number = arr.controls['arr'].controls.length;
    let val: number = +((arr.controls['arr'] as FormArray)?.controls[leng - 1] as FormGroup)?.controls['slab_max']?.value;
    let newUsergroup: FormGroup = this.fb.group({
      slab_min: [val + 1, [Validators.required]],
      slab_max: [null, [Validators.required]],
      charges_type: [1, Validators.required],
      // commission_superdistributor: [0, Validators.required],
      // commission_distributor: [0, Validators.required],
      // commission_partner: [0, Validators.required],
      charges_retailer: [0, Validators.required],
    }, { validators: [CustomValidators.validateMinAndMax('slab_min', 'slab_max')] });
    this.getArr(arr, i).push(newUsergroup);
  }

  remove(pm: any, i: any, j: any) {
    this.getArr(pm, i).removeAt(j);
  }

  onSubmit() {
    let value = this.formArr.value;
    let obj: any = {};
  //console.log(value);
    var rv: any = {};
    let mapped = value.map((m: any) => {
      rv[m.id] = m.arr
    });
    for (const key in rv) {
      const element = rv[key];
      rv = element;
    }
  //console.log(rv)
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('tepid', this.templateId);
    formdata.append('type', '14');
    formdata.append('name', this.DMTForm.controls.templateName.value);
    formdata.append('commission', JSON.stringify(rv));
    this.auth.postdata(formdata, config.template.update).subscribe((res: any) => {
      if (res.statuscode == 200) {
        Swal.fire({
          icon: 'success',
          title: res.message
        }).then((s) => {
          this.router.navigate(['/commission/list-template/payout-list'])
        });;
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }

}
