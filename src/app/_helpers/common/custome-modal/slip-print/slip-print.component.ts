import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { RiCustomMdlService } from '../ri-custom-mdl/ri-custom-mdl.service';

@Component({
  selector: 'app-slip-print',
  templateUrl: './slip-print.component.html',
  styleUrls: ['./slip-print.component.css']
})
export class SlipPrintComponent implements OnInit {
  logocolor : string = '';
  company_mob:any;
  compay_mail:any;
  company_address:any;
  @Output() closeCallBack = new EventEmitter<any>();
  @Input() riCustomMdlId!: string;
  @Input() recepitListObj: any;
  @Input() dmt: any;

  @Input() dmttran: any;

  originalOrder = (): number => {
    return 0;
  }

  constructor(private _RiCustomMdlService: RiCustomMdlService,    private _auth: ApiService,) { }

  ngOnInit(): void {
    this._auth.validDomian((domainSettings: any) => {

      this.logocolor = domainSettings.logocolor; 
      this.company_mob=domainSettings.mob_no1;
      this.compay_mail=domainSettings.email1;
      this.company_address= domainSettings.address;
      
    }); 
  }
  printInvoice() {
    const printContent: any = document.getElementById("printIt")?.innerHTML;
    const WindowPrt: any = window.open('', '', 'left=0,top=0,width=' + screen.availWidth + ',height=' + screen.availHeight + ',fullscreen=yes,toolbar=0,scrollbars=0,status=0');
    let html = `
    <html>
      <head>
        <title>Print tab</title>
        <style>
        table {
         width:100%;
        }
        table, th, td {
          border:1px solid black;
          text-align:left;
          padding: 10px;
        }
      
        .form_blk tr td {
          width: 50%;
          font-weight: 700;
        }
      
        .form_blk tr td:first-child {
          text-transform: uppercase;
          font-weight: 700;
        }
      
        .hideOnPrint{
          display:none;
        }
        @media print {
        .onprint * {
        visibility: hidden;
  }
        .table {
          width: 100%;
          margin-bottom: 1rem;
          color: #212529;
      }.table tr td{
        padding: 10px;
      }
        </style>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
      
      </head> 
       <body  onload="window.print();">
          ${printContent}
         <div class="alert alert-danger mx-5 d-print-none" role="alert">
          Please close this window.
        </div>
        <div class="text-center d-print-none" >
        <button class="btn btn-secondary ml-2" onclick="window.close()">Close</button>
        </div>
      </body>
    </html>`
    WindowPrt.document.write(html);
    WindowPrt.document.close();
    WindowPrt.focus(); 
  }

  // onPrint() {
  //   var elem:any = document.getElementById("printIt");
  //   var domClone = elem.cloneNode(true)
  //   var $printSection = document.getElementById("printSection");

  //   if (!$printSection) {
  //     let $printSection = document.createElement("div");
  //     $printSection.id = "printSection";
  //     document.body.appendChild($printSection);
  //     $printSection.innerHTML = "";
  //     $printSection.appendChild(domClone);
  //     window.print();    // only modal content should get print
  //   }
  // }
}
