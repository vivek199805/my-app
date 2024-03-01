import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { LoaderService } from 'src/app/service/loader.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PurchaseProdService {
  itemsIn = new BehaviorSubject('');
  itemsInCart = this.itemsIn.asObservable();

  constructor(private _auth: ApiService,
    private loader: LoaderService) { 
      this.getCartProduct(); 
    }

  getCartProduct() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this._auth.postdata(formdata,  config.product1.statusrequest).subscribe((res: any) => {
      if (res.statuscode == 200) {
        // this.loader.isLoading.next(false);
        this.itemsIn.next(res)
      } else {
        Swal.fire(res.message);
      }
    })
  }
}
