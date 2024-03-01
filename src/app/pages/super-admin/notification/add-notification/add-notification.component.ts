import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.css']
})
export class AddNotificationComponent implements OnInit {
  form: any = FormGroup;
  isEdit: boolean = false;
  editID: any = null;
  constructor(
    private auth: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router:Router
    ) {
    this.form = this.fb.group({
      content : ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (typeof params['id'] != 'undefined') {
        this.editID = params['id'];
        this.isEdit = true;
        const formdata = new FormData();
        formdata.append('token', config.tokenauth);
        formdata.append('id', this.editID);
        this.auth.postdata(formdata, config.notification.get).subscribe((res: any) => {
          if (res.statuscode == 200) { 
              this.form.patchValue({
                content:res.data[0].content,
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

  onSubmit(){
    if(!this.form.valid){
      return;
    }else{
      let url;
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('content', this.form.get('content').value);
      if(this.isEdit == true){
      formdata.append('id', this.editID);
        url = config.notification.update;
      }else{
        url = config.notification.create;
      }
      this.auth.postdata(formdata, url).subscribe((res: any) => {
        if (res.statuscode == 200) {
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
          if(this.isEdit == false){
          this.form.reset();
          // this.router.navigate(['account/admin/list']);
          }
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
