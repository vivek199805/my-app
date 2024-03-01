import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';
import { PurchaseProdService } from './servic/purchase-prod.service';
declare var $: any;
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  finalModalArr: any = [];
  Quantity: any;
  purchaseData: any;
  listform: any = FormGroup;
  userType: any;
  ServicesArray: any;
  isPackage: any;
  public productdata: any = [];
  public cartList: any = [];
  constructor(private api: ApiService, private _PurchaseProdService: PurchaseProdService,) {

  }

  ngOnInit(): void {
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);
    this.userType = data.usertype
  //console.log(this.userType)
    this.getProductList();

  }
  getProductList() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.api.postdata(formdata, config.product1.productlist).subscribe((res: any) => {
    //console.log(this.productdata = res.data);
      if (res.statuscode) {
        this.productdata = res.data
        this.ServicesArray = this.productdata.filter((res: any) => res.is_package === null)
        // this.productdata = res.data.filter((dt: any) => {
        //   return dt.status == 1;
        // })  
        // } 

      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }

    });
  }

  closeModal() {
  //console.log('');
    this.Quantity = '';
    $("#transactionStatus").modal('hide');
  }


  purchase_req1(list: any) {
    this.purchaseData = list;
    this.Quantity = '1';
    this.isPackage = list.is_package
    this.purchase_req();
  }


  purchase_req() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('productid', this.purchaseData.id);
    formdata.append('quantity', this.Quantity);
    formdata.append('is_package', this.isPackage);

    Swal.fire({
      title: 'Do you want to Apply this Buy?',
      showCancelButton: true,
      confirmButtonText: 'Apply',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.api.postdata(formdata, config.product1.request).subscribe((res: any) => {
          if (res.statuscode == 200) {
            Swal.fire(res.message, '', 'success')
            this.getProductList();
            this.closeModal()
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

  purchase_req_other(list: any) {
  //console.log(list)
    this.purchaseData = list;
    this.isPackage = list.is_package
  }

  OpenServices(value: any) {
    this.finalModalArr = [];
    var primaryArr = JSON.parse(value.package_json)
    // console.log(primaryArr)
    for (let index = 0; index < primaryArr.length; index++) {
      const foundIndex = this.ServicesArray.findIndex((res: any) => res.id == primaryArr[index]);
      this.finalModalArr.push(this.ServicesArray[foundIndex])
    }
  //console.log(this.finalModalArr)
  }



}
