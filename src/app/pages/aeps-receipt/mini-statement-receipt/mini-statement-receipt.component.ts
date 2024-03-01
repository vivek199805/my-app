import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { CommonService } from 'src/app/_helpers/common/common.service';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';

@Component({
  selector: 'app-mini-statement-receipt',
  templateUrl: './mini-statement-receipt.component.html',
  styleUrls: ['./mini-statement-receipt.component.css']
})
export class MiniStatementReceiptComponent implements OnInit {
  balanceAmount: any = '0';
  firmname: any;
  ackno: any;
  message: any;
  bankrrn: any
  aadhaar: any;
  bankname: any;
  amount: any = '0'
  datetime: any;
  ministatement: any;
  bankiin: any;
  username:any;
  logocolor : string = '';
  constructor(private routes: Router, private convrtAmt: CommonService,    private _auth: ApiService,) { }

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
    //console.log(this.aadhaar);

      this.balanceAmount = data.balanceamount; 
      this.ackno = data.ackno;
      this.message = data.message;
      this.bankrrn = data.bankrrn;
      this.aadhaar = data.adhaarnumber;
      this.bankname = data.bankname;
      this.datetime = data.datetime;
      this.bankiin = data.bankiin;
      this.ministatement = data.ministatement;
      this.amount = this.convrtAmt.convertNumberToWords(this.balanceAmount);
    } else {
      this.routes.navigate(['/']);
    }
  }

  printPage() {
    const printContent: any = document.getElementById("testPrit");
    const WindowPrt: any = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(`<html>
    <head>
    <title>Print tab</title>
    
    <style>.table-bordered th {text-align: left;}  .table {
          width: 100%;
          margin-bottom: 1rem;
          color: #212529;
      }.table-bordered tr td{
        border:1px solid #d4d4d4;
        padding: 10px;
      }table tr td{
        padding: 10px;
      }
      .table-bordered .table2{
        margin-bottom: 10px
      }
      .table-bordered tr th{
        border: 1px solid #d4d4d4;
        padding: 10px;
      }
      </style></head><body onload="window.print();window.close()">${printContent.innerHTML}</body></html>`);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
  }

}
