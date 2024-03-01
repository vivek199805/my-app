import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-package',
  templateUrl: './create-package.component.html',
  styleUrls: ['./create-package.component.css']
})
export class CreatePackageComponent implements OnInit {
  details: any;
  imageUrl: any;
  productform: any = FormGroup;
  SelectedObj: any = [];
  constructor(private _auth: ApiService, private fb: FormBuilder, private route: Router) {
    this.productform = this.fb.group({
      product: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: [''],
    });
  }

  ngOnInit(): void {
    this.getList();
  }

  handleFileInput(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('name', file);
      this._auth.postdata(formdata, config.uploadimage).subscribe((data: any) => {
      //console.log(data);
        if (data.statuscode == 200) {
          this.imageUrl = data.file;
        } else
          console.error("your image is not uploaded")

      })
    }
  }

  getList() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this._auth.postdata(formdata, config.product1.productlist).subscribe((res: any) => {
      if (res.statuscode == '200') {
        this.details = res.data
        if (this.details && this.details.length > 0) {
          this.details = this.details.filter((res: any) => res.is_package == 0)
          this.details.forEach((element: any, i: any) => {
            element['isSelected'] = true;
          });
        }
      } else {
        Swal.fire({
          title: 'Hurray!!',
          text: 'there no Product list here!',
          icon: 'error'
        });
      }
    })
  }

  onclick() {
    if (!this.productform.valid) {
      return;
    } else {
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('product', this.productform.get('product')?.value);
      formdata.append('description', this.productform.get('description')?.value);
      formdata.append('price', this.productform.get('price')?.value);
      formdata.append('package_json', JSON.stringify(this.SelectedObj));
      // formdata.append('package_json', JSON.stringify(this.SelectedObj);
      formdata.append('image', this.imageUrl);
      formdata.append('is_package', '1');
      this._auth.postdata(formdata, config.product.addproduct).subscribe((res: any) => {
        if (res.statuscode == '200') {
          Swal.fire({
            title: res.message,
            icon: 'success'
          }).then((result) => {
            this.route.navigate(['/product-list'])
          });
        }
      })
    }
  }

  get f() {
    return this.productform.controls
  }

  select(value: any, item: any) {
    if (value == 'select') {
      if (this.SelectedObj.indexOf(item.id) == -1) {
        this.SelectedObj.push(item.id)
      }
      item.isSelected = false;
    } else {
      if (this.SelectedObj.indexOf(item.id) !== -1) {
        this.SelectedObj.forEach((value: any, index: any) => {
          if (value == item.id) this.SelectedObj.splice(index, 1);
        });
      }
      item.isSelected = true;
    }
  //console.log(this.SelectedObj)
  }


}
