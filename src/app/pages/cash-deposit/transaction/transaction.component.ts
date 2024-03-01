import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  message: any;
  datetime: any;
  amount: any;
  bankrrn: any;
  mobile: any;
  ackno: any;
  constructor(private route: Router) {
    
   }

  ngOnInit(): void {
        if (typeof (localStorage.getItem('cashdeposit')) !== 'undefined' && localStorage.getItem('cashdeposit') !== '' && localStorage.getItem('cashdeposit') !== null) {
      let decode: any = EncodeDecode('n', localStorage.getItem('cashdeposit'));
      let data: any = JSON.parse(decode); 
      this.message = data.message;
      this.datetime = data.datetime;
      this.amount = data.amount;
      this.bankrrn = data.bankrrn;
      this.mobile = data.mobile;
      this.ackno = data.ackno;
    }else {
      this.route.navigate(['cash-deposit']);
    }
  }

}
