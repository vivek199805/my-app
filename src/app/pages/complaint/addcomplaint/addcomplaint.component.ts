import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addcomplaint',
  templateUrl: './addcomplaint.component.html',
  styleUrls: ['./addcomplaint.component.css'],
})
export class AddcomplaintComponent implements OnInit {
  form: any = FormGroup;
  isEdit: boolean = false;
  editID: any = null;
  uploadfile: any;
  constructor(
    private auth: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')],
      ],
      transaction_id: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    /* this.route.params.subscribe((params: any) => {
      if (typeof params['id'] != 'undefined') {
        this.editID = params['id'];
        this.isEdit = true;
        const formdata = new FormData();
        formdata.append('token', config.tokenauth);
        formdata.append('userid', this.editID);
        this.auth.postdata(formdata, config.account.admin.get).subscribe((res: any) => {
          if (res.statuscode == 200) { 
              this.form.patchValue({
                name:res.data.name,
                username:res.data.username,
                firmname:res.data.firmname,
                email:res.data.email,
                phone:res.data.phone,
                status:res.data.status,
              });
              this.form.controls['username'].disable();
          }else{
            Swal.fire({
              title: res.message,
              icon: 'error'
            });
          }
        });
      }
    });  */
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      this.uploadfile = event.target.files[0];
    }
  }

  onSubmit() {
  //console.log(this.form.valid);
    if (!this.form.valid) {
      return;
    } else {
      let url;
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('user_from_id', '20176790');
      formdata.append('sender_name', this.form.get('name').value);
      formdata.append('transaction_id', this.form.get('transaction_id').value);
      formdata.append('type', this.form.get('type').value);
      formdata.append('file', this.uploadfile);
    //console.log(formdata);
      url = config.complaint.add;
      this.auth.postdata1(formdata, url).subscribe((res: any) => {
        if (res.statuscode == 200) {
          Swal.fire({
            title: res.message,
            icon: 'success',
          });
          this.router.navigate(['complaint']);
        } else {
          Swal.fire({
            title: res.message,
            icon: 'error',
          });
        }
      });
    }
  }
  get f() {
    return this.form.controls;
  }
}
