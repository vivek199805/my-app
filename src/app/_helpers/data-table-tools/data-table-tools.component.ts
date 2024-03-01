import { Component, Directive, ElementRef, Input, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { config } from 'src/app/service/config';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { UserLoginDtlService } from 'src/app/service/user-login-dtl.service';
import { RiCustomMdlService } from '../common/custome-modal/ri-custom-mdl/ri-custom-mdl.service';
import * as $ from 'jquery';
import { SlipPrintComponent } from '../common/custome-modal/slip-print/slip-print.component';

@Directive({
  selector: 'table#datatable-serverside tr td a[routerlink]'
})

class DataTablesResponse {
  data: any[] | undefined;
  draw: number | undefined;
  recordsFiltered: number | undefined;
  recordsTotal: number | undefined;
}

@Component({
  selector: 'app-data-table-tools',
  templateUrl: './data-table-tools.component.html',
  styleUrls: ['./data-table-tools.component.css']
})

export class DataTableToolsComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  @ViewChild(SlipPrintComponent) sp!: SlipPrintComponent;
  dtOptions: any = {};
  listing: any = [];
  @Input('url')
  url: string = "";
  @Input('userId')
  userId: any = "";
  @Input('type')
  type: any = "";

  @Input('objectforSatement')
  objectforSatement: any = {};

  @Input('listtype')
  listtype: any = "";

  @Output() btnexl: EventEmitter<boolean> = new EventEmitter();


  @Input('columns')
  columns: Array<any> = [];
  @Input('sliptype')
  sliptype: any;

  heading: Array<any> = [];

  search: any = {};
  userType: any;
  heloo: any;
  loginUserId: any;

  mdlId: any = 'testRecipt';
  invoiceObj = [];

  ref:any;

  constructor(private api: ApiService,
    private localsession: UserLoginDtlService,
    private http: HttpClient,
    private datepipe: DatePipe,
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef,
    private router: Router,
    private _RiCustomMdlService: RiCustomMdlService) { }


  ngOnInit(): void {
    this.datatabletools();
    this.localsession.geterUserLoginDtl.subscribe((val: any) => {
      if (val) {
        this.userType = val.usertype;
        this.loginUserId = val.userid
      }
    })
  //console.log(this.userId, 'lllllllllllllllllllllll')
  //console.log(this.listtype, 'lllllllllllllllllllllll')
  // this.getReceipt();
  }
  datatabletools() {
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      columnDefs: [
        {
          // "targets": [0,1,2,3,4, 5, 6, 7, 8],
          "orderable": false,
          
        },
        {
          visible: false
        }
      ],
      ajax: (dataTablesParameters: any, callback: any) => {
        dataTablesParameters.token = config.tokenauth;
        dataTablesParameters.type = this.type;
        if (this.userType == 2) {
        //console.log(this.userId)
          // dataTablesParameters.supdistributor = this.loginUserId;
          // dataTablesParameters.distributor = this.userId;
          if(this.listtype == 'distributor'){
            dataTablesParameters.partner_id = this.userId;
          }
           else if (this.listtype == 'retailer'){
            dataTablesParameters.distributor = this.userId;
          }
        }
      if (this.userType == 3) {
      //console.log(this.userId)
          if (this.listtype == 'retailer'){
          dataTablesParameters.distributor = this.userId;
        //console.log(this.userId)
         
        }
        }
       if (this.userType == 0 || this.userType == 1 || this.userType == 6) {
          if(this.listtype == 'distributor'){
            dataTablesParameters.partner_id = this.userId;
          }else if (this.listtype == 'partner'){
            dataTablesParameters.supdistributor = this.userId;
          //console.log(this.userId)
          } else if (this.listtype == 'retailer'){
            dataTablesParameters.distributor = this.userId;
          }
        }
        if(this.listtype == 'statement'){
          dataTablesParameters.partner_id = this.objectforSatement.partnerId;
           dataTablesParameters.supdistributor = this.objectforSatement.superdistributorId;
           dataTablesParameters.distributor = this.objectforSatement.distributorId;
           dataTablesParameters.retailer = this.objectforSatement.retilerId;
           }
        
        that.http
          .post<DataTablesResponse>(environment.apiBaseUrl + this.url,
            Object.assign(dataTablesParameters, this.search), {}
          ).subscribe((resp: any) => {
            if (resp.data.length > 0) {
              this.btnexl.emit(true);
            } else if (resp.data.length == 0) {
              this.btnexl.emit(false);
            }

            that.listing = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              // recordsFiltered: resp.recordsFiltered,
              recordsFiltered: resp.recordsTotal,
              data: []
            });
          });
      },
      /* columns:this.columns, */
      //dom: '<"row"<"col-md-12"l>><"row"<"col-md-12"<"row"<"col-md-6"B><"col-md-6"f> > ><"col-md-12"rt> <"col-md-12"<"row"<"col-md-5"i><"col-md-7"p>>> >',
      buttons: {
        buttons: [
          { extend: 'copy', className: 'btn' },
          { extend: 'csv', className: 'btn' },
          { extend: 'excel', className: 'btn' },
          { extend: 'print', className: 'btn' }
        ]
      },
      spagingType: 'full_numbers',
      language: {
        paginate: {
          "previous": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
          "next": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
          // "first": 'first', "last": "last"
        },

        search: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
        searchPlaceholder: "Search...",
        lengthMenu: "Results :  _MENU_",
      },
      "lengthMenu": [[10, 100, 200, 300, -1], [10, 100, 200, 300, "All"]],
    };
  }
  filter(search: any): void {
    this.search = search;
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
  transform(date: any) {
    return this.datepipe.transform(date, 'yyyy-MM-dd');
  }
  checkType(type: any) {

    return typeof (type);
  }
  convertIntoHtml(html: any): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  @Output('funObj') funObj: any = new EventEmitter<string>();
  toggleHelp(input: any, e: MouseEvent): void {
    input.helpOpen = !input.helpOpen;
    let target = e.target as HTMLElement;
    if (target.getAttribute('routerlink')) {
      this.router.navigate([target.getAttribute('routerlink')]);
    }
    if (target.getAttribute('(click)')) {
      let fname: any = target.getAttribute('(click)');
      this.funObj.emit({ key: fname, value: input });
    }
  }


  printSlip(list: any) {
    // console.log(this.sliptype);
    // console.log(list.refid);
    let obj: any = {};
    // debugger
    this.columns.forEach((val: any) => {
      if(this.sliptype==='dmt'){
        if (list[val.data]) {
          obj.txnid = list['txnid'];
          obj.acno = list['acno'];
          obj.bankname = list['bankname'];
          obj.benename = list['benename'];
          obj.ifsccode = list['ifsccode'];
          obj.amount = list['amount'];
          obj.dateadded = list['dateadded'];
          obj.remarks = list['remarks'];
          obj.utr = list['utr'];
          obj.status = list['status'];
          obj.transfertype = list['transfertype'];
          obj.username = list['username'];
          obj.mobile = list['mobile'];
          obj.customercharge = list['customercharge'];
          obj.ackno = list['ackno'];
          obj.phone = list['phone'];
          obj.refid = list['refid'];
        }
      }else{
        if (list[val.data]) {
          obj[val.data] = list[val.data];
        }
      }
      
    })
    this.invoiceObj = obj;

    this._RiCustomMdlService.open(this.mdlId); 

  }

  closeMdl() {
    this._RiCustomMdlService.close(this.mdlId);
  }


}
