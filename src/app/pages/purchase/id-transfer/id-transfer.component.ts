import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-id-transfer',
  templateUrl: './id-transfer.component.html',
  styleUrls: ['./id-transfer.component.css']
})
export class IdTransferComponent implements OnInit {
  userLisitng: Array<Select2OptionData> = [];
  public options: Options;
  form: any = FormGroup;
  constructor(
    private auth: ApiService,
    private fb: FormBuilder
  ) { 
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      purchaseid: ['', [Validators.required]]
    });
    this.options = {
      width: '100%',
    };
  } 

  ngOnInit(): void {
    this.getUsers();
  }
    //-----Get ASM list-----
    getUsers() {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('usertype', '6');
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
      if(!this.form.valid){
        return;
      }else{
  
  
        Swal.fire({
          title: 'Are you sure?',
          text: "You want to transfer retailer id",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, Confirm',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
  
        const formdata = new FormData();
        formdata.append('token', config.tokenauth);
        formdata.append('userid', this.form.get('username').value);
        formdata.append('id_count', this.form.get('purchaseid').value);
        this.auth.postdata(formdata, config.purchase.transfer).subscribe((res: any) => {
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
  
      } else if ( 
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelled',
          'Transaction Cancelled',
          'error'
        )
      }
      })
  
      }
    }

    get f() { return this.form.controls; }  

}
