import { Component, OnInit, Renderer2 } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-matm',
  templateUrl: './list-matm.component.html',
  styleUrls: ['./list-matm.component.css']
})
export class ListMatmComponent implements OnInit {

  showMenu: boolean | undefined;
  data: any;
  subData: any = [];
  constructor(private api: ApiService, private renderer: Renderer2) {

  }

  ngOnInit(): void {
    const formdata = new FormData();
    formdata.append('type', '12');
    formdata.append('token', config.tokenauth);
    this.api.postdata(formdata, config.template.list).subscribe((res: any) => {
      this.data = res.data;
    })

  }

  getData(id: any) {
    // this.subData = []
    const foundIndex = this.data.findIndex((res: any) => res.id == id);
    this.subData = JSON.parse(this.data[foundIndex].commission)

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
