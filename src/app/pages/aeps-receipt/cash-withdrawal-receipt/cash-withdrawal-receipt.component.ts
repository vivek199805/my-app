import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';

@Component({
  selector: 'app-cash-withdrawal-receipt',
  templateUrl: './cash-withdrawal-receipt.component.html',
  styleUrls: ['./cash-withdrawal-receipt.component.css']
})
export class CashWithdrawalReceiptComponent implements OnInit {
  balanceAmount:any = '0';
  firmname:any;
  ackno:any;
  message:any;
  bankrrn:any
  aadhaar:any;
  bankname:any;
  amount:any ;
  timestamp:any;
  bankiin:any;
  username:any;
  logocolor : string = '';
  constructor(private routes: Router,    private _auth: ApiService,) { }

  ngOnInit(): void {  
    this._auth.validDomian((domainSettings: any) => {

      this.logocolor = domainSettings.logocolor; 

      
    });
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode); 
    this.firmname = data.firmname;
    this.username = data.username;
    if (typeof (localStorage.getItem('Aepsreceipt')) !== 'undefined' && localStorage.getItem('Aepsreceipt') !== '') {
      let decode: any = EncodeDecode('n', localStorage.getItem('Aepsreceipt'));
      let data: any = JSON.parse(decode);
  //console.log(data);
    this.balanceAmount = data.balanceamount;
    this.ackno = data.ackno;
    this.message = data.message;
    this.bankiin = data.bankiin;
    this.bankrrn = data.bankrrn;
    this.aadhaar = data.aadhaar;
    this.bankname = data.bankname;
    this.amount = data.amount;
    this.timestamp = data.timestamp;
    
    } else {
      this.routes.navigate(['/']);
    } 
  }

  printPage() {
    const printContent: any = document.getElementById("testPrit");
    const WindowPrt: any = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(`<html><head><title>Print tab</title><style>table {
      width:100%;
     }
     table, th, td {
       text-align:left;
       padding: 10px;
     }
   
     .form_blk tr td {
       width: 50%;
     }
   
     .form_blk tr td:first-child {
       text-transform: uppercase;
       font-weight: 700;
     }
   
     .hideOnPrint{
       display:none;
     }
     .table {
       width: 100%;
       margin-bottom: 1rem;
       color: #212529;
   }.table tr td{
     padding: 10px;
   }
    .table tr td p{
      color: #000;
    }</style></head><body onload="window.print();window.close()">${printContent.innerHTML}</body></html>`);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
  }
 

}
