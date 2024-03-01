import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  finalModalArr: any = []
  isActive: boolean = false;
  stename: any = '';
  ServicesArray: any = [];
  url: string = config.product1.productlist;
  columns: any = [
    {
      title: 'Product Name',
      data: 'product'
    },
    {
      title: 'Price',
      data: 'price'
    },
    {
      title: "show Service",
      data: 'package_json',
      pipe: function (obj: any) {
        var value;
        if (obj.is_package == 1) {
          value = "<a (click)='uploadeDoc' data-toggle='modal' data-target='#uploadeDoc' class='btn btn-success btn-sm'>Show Services </a>";
        }
        return (obj.is_package == null || obj.is_package == 0) ? 'No Action Found' : value;
      }
    },
    {
      title: 'Description',
      data: 'description'
    },
    {
      title: "Service Type",
      data: 'id',
      pipe: function (obj: any) {
        return (obj.is_package == 1) ? 'Package' : 'single';
      }
    },
    {
      title: 'Image',
      data: 'image',
      pipe: function (obj: any) {
        return "<a href=" + obj.image + " target='_blank'> <img src=" + obj.image + " style='width: 80px;'></a>";
      }
    },
    {
      title: "Action",
      data: 'id',
      pipe: function (obj: any) {
        var editbtn;
        // if (obj.is_package == null) {
          editbtn = "<a routerLink='/update-product/" + obj.id + "' class='btn btn-primary btn-sm'>Edit</a>";
        // }
        return (obj.is_package == 1) ? 'No Action Found' : editbtn;
      },
    },
    {
      title: "Active / In-Active",
      data: 'id',
      pipe: function (obj: any) {
        if (obj.status == 1) {
          return "<a (click)='delete' class='btn btn-success btn-sm'>Deactive </a>";
        } else {
          return "<a (click)='delete' class='btn btn-warning btn-sm'>Active</a>";
        }
      }
    }

  ];

  constructor(private route: Router, private api: ApiService) { }

  ngOnInit(): void {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.api.postdata(formdata, config.product1.productlist).subscribe((res: any) => {
      if (res.statuscode == '200') {
        this.ServicesArray = res.data;
        this.ServicesArray = this.ServicesArray.filter((res: any) => res.is_package == 0)
      }

    })
  }


  funObj(obj: any) {
    var key = obj.key;
    var value = obj.value;
    switch (key) {
      case "delete":
        //console.log(value);  
        this.stename = (value.status == 0) ? 'Deactivate' : 'Activate';
        Swal.fire({
          title: "Are you sure Want to " + this.stename + "?",
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: "Yes, " + this.stename + " it!"
        }).then((result) => {
          if (result.isConfirmed) {
            const formdata = new FormData();
            formdata.append('token', config.tokenauth);
            formdata.append('id', value.id);
            formdata.append('status', (value.status == 0) ? '1' : '0');
            this.api.postdata(formdata, config.product.deleteproduct).subscribe((res: any) => {
              if (res.statuscode == 200) {
                this.api.reloadTo('product-list');
              } else {
                Swal.fire(res.message)
              }
            })
          }
        })

        break;
      case "uploadeDoc":
        this.finalModalArr=[];
        var primaryArr = JSON.parse(value.package_json)
      //   // console.log(primaryArr)
        for (let index = 0; index < primaryArr.length; index++) {
          const foundIndex = this.ServicesArray.findIndex((res: any) => res.id == primaryArr[index]);
          this.finalModalArr.push(this.ServicesArray[foundIndex])
        }
   
      console.log('service',primaryArr)
      console.log('full arr',this.ServicesArray)
         console.log('see',this.finalModalArr)
        break;

    }

  }

}
