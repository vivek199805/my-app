import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { config } from 'src/app/service/config';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';
import { CustConfg } from 'src/app/_helpers/common/custom-datepicker/ngx-datePicker-CustConfg';
import Swal from 'sweetalert2';
import { ApiService } from '../../service/api.service'
declare var $: any;


import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-banner-show',
  templateUrl: './banner-show.component.html',
  styleUrls: ['./banner-show.component.css']
})
export class BannerShowComponent implements OnInit {
  editor: any = ClassicEditor;
  data: any = `<p>Write .....</p>`;
  file: any;
  IGtypeof: any;
  formMarque!: FormGroup
  updateUserId: any;
  BannerForm!: FormGroup;
  submitted: boolean = false
  @ViewChild(DataTableToolsComponent) dt!: DataTableToolsComponent;
  search: any = { startdate: "", enddate: "" };
  maxDate!: Date;
  status: any = null;
  url: string = config.banner.list;
  columns: any = [
    {
      data: "id",
      title: "Id"
    },
    {
      // data: "banner_name",
      title: "Banner Name",
      data: 'id',
      pipe: function (obj: any) {
        // return "<img class='image' src="+obj.banner_name+">";
      
        if(obj.banner_name){
          return "<a href='"+obj.banner_name+"' target='_blank'>View</a>";
        }
          return "-";
       }
    },
    // {
    //   data: "banner_desc",
    //   title: "Marquee",
    // },
    {
      data: "status",
      title: "Status",
    }, {
      title: "Edit",
      data: 'id',
      pipe: function (obj: any) {
        return "<a (click)='showStatusModel' data-toggle='modal' data-target='#signupform' class='btn btn-primary'>Edit</a>";
      }
    }
    , {
      title: "Delete",
      data: 'id',
      pipe: function (obj: any) {
        return "<a (click)='Delete' class='btn btn-primary'>Delete</a>";
      }
    }
  ];
  minDate!: Date;
  form: any = FormGroup;
  bsCustConfg = CustConfg;
  @ViewChild('rangePicker') rangePicker: any;
  constructor(private api: ApiService, private fb: FormBuilder) {
    this.form = new FormGroup({
      selectdate: new FormControl([new Date(), new Date()], [Validators.required]),
    })
    this.BannerForm = this.fb.group({
      banner: ['', [Validators.required]]
    })
  }


  get e() { return this.BannerForm.controls; }

  ngOnInit(): void {
    const date = new Date();
    this.minDate = new Date(1950, 1, 1);
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  filter() {
    let search: any = {};
    search.startdate = this.dt.transform(this.form.get('selectdate')?.value[0]);
    search.enddate = this.dt.transform(this.form.get('selectdate')?.value[1]);
    // search.status = this.status;
    this.dt.filter(search)
  }
  onDateRangePickerShow() {
    // This is a workaround to show previous month
    var prevMonth = new Date();
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    this.rangePicker._datepicker.instance.monthSelectHandler({ date: prevMonth });
  }

  funObj(obj: any) {
    var key = obj.key;
    var value = obj.value;
    switch (key) {
      case "showStatusModel":
        for (let key in value) {
          if (value[key] == null) {
            this.IGtypeof = key;
            this.updateUserId = value.id
            this.data = value.banner_desc;
          }
        }
        break;
      case "Delete":
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            var formData = new FormData();
            formData.append('token', config.tokenauth);
            formData.append('Bannerid', value.id)
            this.api.postdata(formData, config.banner.Delete).subscribe((res: any) => {
              if (res.status) {
                this.listing();
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
              }
            })
          }
        })
        break;
    }
  }

  listing() {
    let search: any = {};
    this.dt.filter(search)
  }

  closeModal() {
    $("#signupform").modal('hide');
  }



  public onChange({ editor }: ChangeEvent) {
    this.data = editor.getData();
  }


  setImage(event: any) {
    if (event.target.files[0].type == 'image/png'  || event.target.files[0].type == 'image/jpeg') {
    //console.log(event.target.files)
      this.file = event.target.files[0]
    } else {
      Swal.fire({
        icon: 'error',
        title: 'File Type Is Not Correct , We Are Accepted Only PNG File ',
      })
    }
  }

  UpdateMarquee() {
  //console.log(this.updateUserId);
  //console.log(this.data)
    var formData = new FormData();
    formData.append('token', config.tokenauth);
    formData.append('id', this.updateUserId)
    formData.append('bdesc', this.data)
    this.api.postdata(formData, config.banner.updateimage).subscribe((res: any) => {
      if (res.status) {
        Swal.fire({
          icon: "success",
          title: res.message
        }).then((result) => {
          if (result.isConfirmed) {
            this.closeModal();
            this.listing();
          }
        })
      }
    })



  }

  updateBanner() {
  //console.log(this.updateUserId)
  //console.log(this.file)
    var formData = new FormData();
    formData.append('token', config.tokenauth);
    formData.append('id', this.updateUserId)
    formData.append('bname', this.file)
    this.api.postdata(formData, config.banner.updateText).subscribe((res: any) => {
      if (res.status) {
        Swal.fire({
          icon: "success",
          title: res.message
        }).then((result) => {
          if (result.isConfirmed) {
            this.closeModal();
            this.listing();
          }
        })
      }
    })
  }


}
