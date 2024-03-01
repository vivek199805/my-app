import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoaderServiceService {

  constructor(private spinner: NgxSpinnerService) { 
    /* this.spinner.show(); 
     setTimeout(() => { 
      this.spinner.hide();
    }, 1000); */
  }

  
 /*  showSpinner(data :any) {
    if(data == true){
      this.spinner.show();
    }else{
      this.spinner.hide();
    }
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  } */

}
