import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { RiCustomMdlService } from 'src/app/_helpers/common/custome-modal/ri-custom-mdl/ri-custom-mdl.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pg-recepit',
  templateUrl: './pg-recepit.component.html',
  styleUrls: ['./pg-recepit.component.css']
})
export class PgRecepitComponent implements OnInit, AfterViewInit, OnDestroy {
  public is_recepit: number = 0;
  public recepitList: any = [];

  mdlId: any = 'testRecipt';
  constructor(
    private auth: ApiService, private route: Router,
    private _RiCustomMdlService: RiCustomMdlService
  ) { }

  ngOnInit(): void {
    this.getReceipt();
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    localStorage.removeItem("Gatewaypg");
  }
  getReceipt() {
    if ("Gatewaypg" in localStorage) {
      this.is_recepit = 2;
      let getRecepreferenceid: any = localStorage.getItem('Gatewaypg');
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('referenceid', getRecepreferenceid);
      this.auth.postdata(formdata, config.pg.pgreceipt).subscribe((res: any) => {
        if (res.statuscode == 200) {
          Swal.fire({
            title: res.message,
            icon: 'success'
          }).then((result) => {
            this.recepitList = res.data;

            this._RiCustomMdlService.open(this.mdlId);
          });

        } else {
          Swal.fire({
            icon: 'error',
            title: res.message
          });
        }
      })
    } else {
      this.is_recepit = 1;
      return;
    }
  }

  slipClose() {
    const url = this.route.url;
    this._RiCustomMdlService.close(this.mdlId);
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      window.close();
    });
  }

  _converData(data: any) {
    return Object.keys(data).map(key => ({ name: key, value: data[key] }));
  }
}
