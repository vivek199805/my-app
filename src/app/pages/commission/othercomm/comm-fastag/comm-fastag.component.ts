import { Component, ElementRef, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-comm-fastag',
  templateUrl: './comm-fastag.component.html',
  styleUrls: ['./comm-fastag.component.css']
})
export class CommFastagComponent implements OnInit {
  userAutoComData: any;
  userKeyword = 'userdetails';
  prevVal: any;
  dataLength: any;
  subData: any;
  data: any = [];
  val: any = '';
  expression: boolean = false
  userId: any;

  assignData: any;
  assignTempID: any;
  IsFirst: boolean = true;

  constructor(private _auth: ApiService) {

  }

  ngOnInit(): void {
  }


  getServerResponse(val: any) {
    if (val && val != this.prevVal) {
      this.prevVal = val;
      let formdata: any = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('search', val);
      this._auth.postdata(formdata, config.commission.userlist).subscribe((res: any) => {
        if (res.statuscode == 200) {
          this.userAutoComData = res.data;
        } else {
          this.userAutoComData = [];
        }
      });
    }

  }
  searchCleared() {
    this.prevVal = null;
  }

  selectEvent(event: any) {
    if (event !== undefined) {
      this.userId = event.id;
      let formdata: any = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('type', '20');
      formdata.append('userid', this.userId);
      this._auth.postdata(formdata, config.template.getTemplatelist).subscribe((res: any) => {
        if (res.statuscode == 200) {
          this.data = res.data;
          // console.log(this.data)
          this.dataLength = JSON.parse(res.data[0].commission).length;
          // console.log(this.dataLength)
          if (res.assgndata) {
            this.IsFirst = false
            this.assignTempID = res.assgndata.tempid
            this.assignData = res.assgndata.id;
            // this.
          } else {
            this.IsFirst = true
          }

          // this.createForm(res.data);
        } else {
          Swal.fire({
            title: res.message,
            icon: 'error'
          });
        }
      });

    }
  }

  onSubmit(id: any) {
    if (this.IsFirst == true) {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('type', '20');
      formdata.append('userid', this.userId);
      formdata.append('tempid', id);
      this._auth.postdata(formdata, config.template.addtemplateforAssign).subscribe((res: any) => {
        if (res.statuscode == 200) {
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
    } else {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('type', '20');
      formdata.append('userid', this.userId);
      formdata.append('tempid', id);
      formdata.append('commid', this.assignData);
      this._auth.postdata(formdata, config.template.updatetemplateforAssign).subscribe((res: any) => {
        if (res.statuscode == 200) {
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




  getData(id: any) {
    this.subData = []
    const foundIndex = this.data.findIndex((res: any) => res.id == id);
    this.subData = JSON.parse(this.data[foundIndex].commission)

  }
}
