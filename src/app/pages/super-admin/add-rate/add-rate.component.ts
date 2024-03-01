import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-rate',
  templateUrl: './add-rate.component.html',
  styleUrls: ['./add-rate.component.css']
})
export class AddRateComponent implements OnInit {
  userLisitng: Array<Select2OptionData> = [];
  options: Options;
  form: any = FormGroup;
  userid: any;
  constructor(
    private auth: ApiService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      usertype: ['', [Validators.required]],
      username: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    });
    this.options = {
      width: '100%',
      templateSelection: (object: any) => {
        if(object.selected == true){
        this.userid = object.id;
        }
        return object && object.text;
      },
    };
   }

  ngOnInit(): void { 
  }

  getUsers(data: any) {
    let usertype = data.target.value;
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('usertype', usertype);
    this.auth.postdata(formdata, config.userTypeList).subscribe((res: any) => {        
      if (res.statuscode == 200) {
        let arr = [];
        for (var v of res.data) {  
          arr.push({id:v.id,text:v.username+'/'+v.name}); 
        }
        this.userLisitng = arr;
      }
    else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }

  onSubmit(){
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('id_rate', this.form.get('amount')?.value);
      formdata.append('userid', this.userid);
      this.auth.postdata(formdata, config.setuserRate).subscribe((res: any) => {
        if (res.statuscode == 200) {
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
          this.form.reset();
        }else{
          Swal.fire({
            title: res.message,
            icon: 'error'
          });
        }
      });

  }

  get f() { return this.form.controls; } 

}
