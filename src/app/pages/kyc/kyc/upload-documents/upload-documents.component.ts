import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.css']
})
export class UploadDocumentsComponent implements OnInit {
  form: any = FormGroup;
  userid:any;
  panImage: any;
  adharimgf: any;
  adharimgb: any;
  panno:any;
  pandata:any;
  heading :string ='';   
  panstatus:any="";
  addharpan:any;
  remark:any;
  userdata:any;
  constructor(
    private auth: ApiService,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private route: ActivatedRoute
  ) {
     
    // this.form = this.fb.group({
    //   pannumber: ['', [Validators.required]],
    //   pancard: ['', [Validators.required]],
    //   aadharfront: ['',, [Validators.required]],
    //   aadharback: ['', [Validators.required]]
    // });

      this.form = this.fb.group({
        pannumber: [''],
        pancard: [''],
        aadharfront: [''],
        aadharback: ['']
      });
   
    this.getpandetails(); 
    this.getuserinfo();
   }

  ngOnInit(): void {  
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);    
    this.userid = data.userid;
    this.panno = data.pannumber; 
    this.form.controls["pannumber"].setValue(data.pannumber);  
  }

  handleFileInput1(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.panImage = file;
    }
  }

  handleFileaadharf(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.adharimgf = file;
    //console.log();
      
    }
  }

  handleFileaadharb(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.adharimgb = file;
    }
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    } else {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('userid', this.userid);
      formdata.append('pannumber', this.form.get('pannumber').value);
      formdata.append('panimage', this.panImage);
      if(this.pandata?.reject_type !=0 || this.pandata == undefined ){
        formdata.append('front_image', this.adharimgf, this.adharimgf.name);
        formdata.append('back_image', this.adharimgb, this.adharimgb.name);
      } 
      this.auth.postdata(formdata, config.kyc.uploaddoc).subscribe((res: any) => {
        if (res.statuscode == 200) {
          this.getpandetails();
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
  }

   getpandetails(){
    const formd = new FormData();
    formd.append('token', config.tokenauth);
    this.auth.postdata(formd, config.kyc.getdocs).subscribe((res: any) => { 
      this.pandata = res.data;  
      if(this.pandata){ 
        this.remark=res.data.remarks;
        this.heading = (this.pandata.status === '0'?'Pending ':(this.pandata.status === '1')?'Approved':'Rejected');
      }
      

    })
   }

   getuserinfo(){
    const formdata = new FormData();
    formdata.append('token', config.tokenauth); 
    this.auth.postdata(formdata, config.getsingleuser).subscribe((res: any) => {  
      this.userdata = res.data;
    //console.log(this.userdata['is_kyc']);
      
    })
   }

  get f() { return this.form.controls; }

}
