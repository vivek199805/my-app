import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';

@Component({
  selector: 'app-aeps-receipt',
  templateUrl: './aeps-receipt.component.html',
  styleUrls: ['./aeps-receipt.component.css']
})
export class AepsReceiptComponent implements OnInit {
  // balanceAmount:any = '0';
  // firmname:any;
  // ackno:any;
  // message:any;
  // bankrrn:any
  // aadhaar:any;
  // bankname:any;
  // amount:any = '0'
  // timestamp:any;
  
  constructor(private routes: Router) { }

  ngOnInit(): void {  
    // let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    // let data: any = JSON.parse(decode); 
    // this.firmname = data.firmname;
    
    // if (typeof (localStorage.getItem('Aepsreceipt')) !== 'undefined' && localStorage.getItem('Aepsreceipt') !== '') {
    //   let decode: any = EncodeDecode('n', localStorage.getItem('Aepsreceipt'));
    //   let data: any = JSON.parse(decode);
    // console.log(data);
    // this.balanceAmount = data.balanceamount;
    // this.ackno = data.ackno;
    // this.message = data.message;
    // this.bankrrn = data.bankrrn;
    // this.aadhaar = data.aadhaar;
    // this.bankname = data.bankname;
    // this.amount = data.amount;
    // this.timestamp = data.timestamp;
    
    // } else {
    //   this.routes.navigate(['/']);
    // } 
  }

  // printPage() {
  //   const printContent: any = document.getElementById("testPrit");
  //   const WindowPrt: any = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
  //   WindowPrt.document.write(`<html><head><title>Print tab</title><style>.table-bordered th {text-align: left;}</style></head><body onload="window.print();window.close()">${printContent.innerHTML}</body></html>`);
  //   WindowPrt.document.close();
  //   WindowPrt.focus();
  //   WindowPrt.print();
  // }

}
