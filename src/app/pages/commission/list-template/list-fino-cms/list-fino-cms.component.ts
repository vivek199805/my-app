import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-fino-cms',
  templateUrl: './list-fino-cms.component.html',
  styleUrls: ['./list-fino-cms.component.css']
})
export class ListFinoCmsComponent implements OnInit {
  showMenu: boolean | undefined;
  data: any;
  subData: any = [];
  constructor(private api: ApiService , private routes: Router) { }

  ngOnInit(): void {
    const formdata = new FormData();
    formdata.append('type', '21');
    formdata.append('token', config.tokenauth);
    this.api.postdata(formdata, config.template.list).subscribe((res: any) => {
      this.data = res.data;
    })
  }

  getData(id: any) {
    // this.subData = []
    const foundIndex = this.data.findIndex((res: any) => res.id == id);
    this.subData = JSON.parse(this.data[foundIndex].commission);
  //console.log(this.subData)
  }

  remove(id:any){
  //console.log(id)
    const formdata = new FormData();
    formdata.append('rowid', id);
    formdata.append('token', config.tokenauth);
    this.api.postdata(formdata, config.template.deleteTemplate).subscribe((res: any) => {
     if (res.statuscode == 200) {  
       Swal.fire({
         icon: 'success',
         title: res.message
       });      
       } else {
         Swal.fire({
           icon: 'error',
           title: res.message
         });
       }
    })
   }
}
