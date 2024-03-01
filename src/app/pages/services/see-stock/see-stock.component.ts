import { Component, OnInit } from '@angular/core';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';
import { Console } from 'console';
@Component({
  selector: 'app-see-stock',
  templateUrl: './see-stock.component.html',
  styleUrls: ['./see-stock.component.css']
})
export class SeeStockComponent implements OnInit {
  details1: any;
  userType: any;
  userKeyword = 'userdetails';
  prevVal: any;
  dataLength: any;
  userAutoComData: any;
  userId: any;
  details: any;
  buyerType: any = '';
  constructor(private _auth: ApiService) {
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);
    this.userType = data.usertype;
  //console.log(this.userType)
  }

  ngOnInit(): void {
    if (this.userType != '0' && this.userType != '5') {
      this.checkStock();
    } else if (this.userType == '0') {
      this.assignfromsuperadmin();
    }

  }

  assignfromsuperadmin() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);

    this._auth.postdata(formdata, config.product1.productlist).subscribe((res: any) => {
      if (res.statuscode == '200') {
        this.details = res.data
        this.details.forEach((element: any, i: any) => {
          element['price1'] = '1';
          element['quantity1'] = '1';
        });
      } else {
        Swal.fire({
          title: 'Hurray!!',
          text: 'there no Product list here!',
          icon: 'error'
        });
      }
    })
  }

  checkStock() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);

    this._auth.postdata(formdata, config.product1.checkStock).subscribe((res: any) => {
      if (res.statuscode == '200') {
        this.details = res.data
        this.details.forEach((element: any, i: any) => {
          element['price1'] = '1';
          element['quantity1'] = '1';
        });
        ////console.log(res.data);

      } else {
        Swal.fire({
          title: 'Hurray!!',
          text: 'there no Product list here!',
          icon: 'error'
        });
      }
    })
  }

  Select(value: any) {
  //console.log(value)
    switch (value) {
      case 'p':
        this.buyerType = '3'

        break;
      case 'r':
        this.buyerType = '5'
        break;
      case 'd':
        this.buyerType = '4'
        break;
    }
  }

  getServerResponse(val: any) {
    if (val && val != this.prevVal) {
      this.prevVal = val;
      let formdata: any = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('search', val);
      // formdata.append('buyertype', this.buyerType);
      this._auth.postdata(formdata, config.product1.userListlower).subscribe((res: any) => {
        if (res.statuscode == 200) {
          this.userAutoComData = res.data;
        } else {
          this.userAutoComData = [];
        }
      });
    }
  }
  searchCleared() {
    this.prevVal = null;
  }

  selectEvent(event: any) {
    if (event !== undefined) {
      this.userId = event.id;
      this.details1 = this.details
    }
  }




  SendService(item: any) {
    if(item.id){
      item.productid = item.id;
    }
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('productid', item.productid);
    formdata.append('quantity', item.quantity1);
    formdata.append('amount', item.price1);
    formdata.append('userid', this.userId);
    Swal.fire({
      title: 'Do you want to Apply this Buy?',
      showCancelButton: true,
      confirmButtonText: 'Apply',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._auth.postdata(formdata, config.product1.requestseller).subscribe((res: any) => {
          if (res.statuscode == 200) {
            Swal.fire(res.message, '', 'success')
            if (this.userType != '0' && this.userType != '5') {
              this.checkStock();
            }
          } else {
            Swal.fire({
              icon: 'error',
              title: res.message
            });
          }
        });

      } else if (result.isDenied) {
        Swal.fire('order not placed', '', 'info')
      }
    })
  }



}
