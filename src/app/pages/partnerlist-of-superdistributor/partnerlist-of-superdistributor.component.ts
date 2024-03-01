import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { config } from 'src/app/service/config';
import { CustConfg } from 'src/app/_helpers/common/custom-datepicker/ngx-datePicker-CustConfg';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-partnerlist-of-superdistributor',
  templateUrl: './partnerlist-of-superdistributor.component.html',
  styleUrls: ['./partnerlist-of-superdistributor.component.css']
})
export class PartnerlistOfSuperdistributorComponent implements OnInit {
  @ViewChild('rangePicker') rangePicker: any;
  @ViewChild(DataTableToolsComponent) dt!: DataTableToolsComponent;
  form: any =FormGroup;
  search: any = { startdate: "", enddate: "" };
  maxDate!: Date;
  minDate!: Date;
  chooseOption: any;
  bsCustConfg = CustConfg;
  userid: any;
  distributorId: any;
  partner_id : any;
  partnerId: any;
  data1: any;
  columns: any = [];
  url: any;
  listtype:any;



  constructor(private _activatedRoute: ActivatedRoute , private api: ApiService ) {
    this._activatedRoute.params.subscribe(parameter => {
      this.distributorId = parameter.id;
    })
    const date = new Date();
    this.minDate = new Date(1950, 1, 1);
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    this.data1 = JSON.parse(decode);
  //console.log(this.data1)
  }

  ngOnInit(): void {

    // if (this.data1.usertype == 0 || this.data1.usertype == 1) {
      this.columns = [
        {
          title: 'Username',
          data: 'username'
        },
        {
          title: 'Name',
          data: 'name'
        },
        {
          title: 'Email',
          data: 'email'
        },
        {
          title: 'Phone no',
          data: 'phone'
        },
        {
          title: 'Firm name',
          data: 'firmname'
        },
        {
          title: 'Pincode',
          data: 'pincode'
        },
        {
          title: 'Pan No.',
          data: 'pannumber'
        },
        {
          title: 'Main Balance',
          data: 'cd_balance'
        },
        {
          title: 'Cash balance',
          data: 'balance'
        },
        {
          title: "Date",
          data: 'addeddate',
          pipe: 'date'
        }, {
          title: "Action",
          data: 'id',
          pipe: function (obj: any) {
            return "<a routerLink='/Distributorlist/" + obj.id + "' class='btn btn-primary'>See Distributor</a>";
          }
        }
      ];
      this.listtype ='partner'
      this.url = config.tree.getPartnerList;
      this.userid = this.distributorId;   
    // }

  }


//   download($event: any){
//     let formdata: any = new FormData();
//     formdata.append('token', config.tokenauth);
//     formdata.append('exporttype', 'partner');
//     this.api.postdata(formdata, config.tree.getExportdata).subscribe((res: any) => {
//       if (res.statuscode == 200) {
//         const fileName = 'Distributer-List.xlsx';
//         const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(res['data']);
//         const wb: XLSX.WorkBook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, 'Distributer-List');
//         XLSX.writeFile(wb, fileName);
//       //console.log(res['data']);    
//       }else{
//         Swal.fire({
//           icon: 'error',
//           title: res.message 
//         }) 
//       }
//   });
// }

  filter() {
    let search: any = {};
    search.startdate = this.dt.transform(this.form.get('selectdate')?.value[0]);
    search.enddate = this.dt.transform(this.form.get('selectdate')?.value[1]);
    search.status = this.chooseOption;
    this.dt.filter(search)
  }
  onDateRangePickerShow() {
    // This is a workaround to show previous month
    var prevMonth = new Date();
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    this.rangePicker._datepicker.instance.monthSelectHandler({ date: prevMonth });
  }

}
