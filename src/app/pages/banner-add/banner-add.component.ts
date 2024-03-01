import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { config } from '../../service/config';
import { ApiService } from '../../service/api.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner-add',
  templateUrl: './banner-add.component.html',
  styleUrls: ['./banner-add.component.css']
})
export class BannerAddComponent implements OnInit {
  submitted: boolean = false;
  submitted1: boolean = false;
  BannerForm!: FormGroup
  text: any
  editor: any = ClassicEditor;
  data: any = `<p>Write .....</p>`;
  file: any;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.BannerForm = this.fb.group({
      banner: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }
  get e() { return this.BannerForm.controls; }

  public onChange({ editor }: ChangeEvent) {
    this.data = editor.getData();
  }

  UploadText() {
    var formData = new FormData();
    formData.append('token', config.tokenauth);
    formData.append('bdesc', this.data)
    this.api.postdata(formData, config.banner.addText).subscribe((res: any) => {
      if (res.status) {
        Swal.fire({
          icon: "success",
          title: res.message
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/show-banner'])
          }
        })
      }
    })
  }

  UploadImage() {
    var formData = new FormData();
    formData.append('token', config.tokenauth);
    formData.append('bname', this.file)
    this.api.postdata(formData, config.banner.addImage).subscribe((res: any) => {
      if (res.status) {
        Swal.fire({
          icon: "success",
          title: res.message
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/show-banner'])
          }
        })
      }
    })
  }

  setImage(event: any) {
    if (event.target.files[0].type == 'image/png' || event.target.files[0].type == 'image/jpeg') {
    //console.log(event.target.files)
      this.file = event.target.files[0]
    } else {
      Swal.fire({
        icon: 'error',
        title: 'File Type Is Not Correct , We Are Accepted Only PNG File ',
      })
    }
  }

}
