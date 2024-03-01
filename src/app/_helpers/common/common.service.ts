import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private auth: ApiService,) { }
  getRequestType() {
    const reqType = {
      0: "Cash Deposit",
      1: "NEFT",
      2: "RTGS / IMPS",
      3: "Bank Transfer",
      4: "Cash Pickup",
      5: "Exceptional Request"
    }
    return reqType;
  }
  getRequestType1() {
    const reqType = [
      { name: "Cash Deposit", value: '0' },
      { name: "NEFT", value: '1' },
      { name: "RTGS / IMPS", value: '2' },
      { name: "Bank Transfer", value: '3' },
      { name: "Cash Pickup", value: '4' },
      { name: "Exceptional Request", value: '5' }
    ]
    return reqType;
  }

  getRAPStatusList() {
    const reqType = {
      0: "rejected",
      1: "approved",
      2: "pending",
    }
    return reqType;
  }
  getExcep() {
    const reqType = {
      0: "No",
      1: "Yes",
    }
    return reqType;
  }
  getStatus() {
    const reqType = {
      0: "Rejected",
      1: "Accepted",
      2: "Pending",
    }
    return reqType;
  }

  getPaymentType() {
    const reqType = [
      { name: "CC", value: 'Credit Card' },
      { name: "DC", value: 'Debit Card' },
      { name: "NB", value: 'Net Banking' },
      { name: "Corporate", value: 'Corporate' },
      { name: "EMI", value: 'EMI' },
    ]
    // const reqType = {
    //   CC: "Credit Card",
    //   DC: "Debit Card",
    //   NB: "Net Banking",
    // }
    return reqType;
  }


  convertNumberToWords(amount:any) {
    var words = new Array();
    words[0] = "";
    words[1] = "One";
    words[2] = "Two";
    words[3] = "Three";
    words[4] = "Four";
    words[5] = "Five";
    words[6] = "Six";
    words[7] = "Seven";
    words[8] = "Eight";
    words[9] = "Nine";
    words[10] = "Ten";
    words[11] = "Eleven";
    words[12] = "Twelve";
    words[13] = "Thirteen";
    words[14] = "Fourteen";
    words[15] = "Fifteen";
    words[16] = "Sixteen";
    words[17] = "Seventeen";
    words[18] = "Eighteen";
    words[19] = "Nineteen";
    words[20] = "Twenty";
    words[30] = "Thirty";
    words[40] = "Forty";
    words[50] = "Fifty";
    words[60] = "Sixty";
    words[70] = "Seventy";
    words[80] = "Eighty";
    words[90] = "Ninety";
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
      var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
      var received_n_array = new Array();
      for (var i = 0; i < n_length; i++) {
        received_n_array[i] = number.substr(i, 1);
      }
      for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
        n_array[i] = received_n_array[j];
      }
      for (var i = 0, j = 1; i < 9; i++, j++) {
        if (i == 0 || i == 2 || i == 4 || i == 7) {
          if (n_array[i] == 1) {
            n_array[j] = 10 + parseInt(n_array[j] as any);
            n_array[i] = 0;
          }
        }
      }
      let value;
      for (var i = 0; i < 9; i++) {
        if (i == 0 || i == 2 || i == 4 || i == 7) {
          value = n_array[i] * 10;
        } else {
          value = n_array[i];
        }
        if (value != 0) {
          words_string += words[value] + " ";
        }
        if (
          (i == 1 && value != 0) ||
          (i == 0 && value != 0 && n_array[i + 1] == 0)
        ) {
          words_string += "Crores ";
        }
        if (
          (i == 3 && value != 0) ||
          (i == 2 && value != 0 && n_array[i + 1] == 0)
        ) {
          words_string += "Lakhs ";
        }
        if (
          (i == 5 && value != 0) ||
          (i == 4 && value != 0 && n_array[i + 1] == 0)
        ) {
          words_string += "Thousand ";
        }
        if (
          i == 6 &&
          value != 0 &&
          (n_array[i + 1] != 0 && n_array[i + 2] != 0)
        ) {
          words_string += "Hundred and ";
        } else if (i == 6 && value != 0) {
          words_string += "Hundred ";
        }
      }
      words_string = words_string.split("  ").join(" ");
    }
    return words_string ;
  }
}
