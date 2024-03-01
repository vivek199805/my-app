import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-callbackurl',
  templateUrl: './callbackurl.component.html',
  styleUrls: ['./callbackurl.component.css']
})
export class CallbackurlComponent implements OnInit {
  resMessage: any;
  constructor(private _activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(parameter => {
      let result: any = EncodeDecode('n', String(parameter.onboardid));
      let value = JSON.parse(result);
      // console.log(value);
      if (value.statuscode === 200) {
        this.resMessage = value.message;

        let localStorageLoginDetails = localStorage.getItem('LoginDetails');
        let LoginDetails: any = EncodeDecode('n', String(localStorageLoginDetails));
        let LoginDetailsPars: any = JSON.parse(LoginDetails);
        // console.log(LoginDetailsPars);

        LoginDetailsPars.is_onboard = '1';

        // console.log(LoginDetailsPars);
        let decode: any = EncodeDecode(JSON.stringify(LoginDetailsPars), 'n');
        localStorage.setItem('LoginDetails', decode);
        setTimeout(() => {
          this.router.navigate(['/aeps/balance-enquiry']);
        }, 2000);

      } else if (value.statuscode === 303) {
        this.resMessage = value.message;
        this.router.navigate(['/marchant-onboarding']);
      } else {
        this.resMessage = value.message;

      }
    })


    // if (this.value.statuscode == 200) {
    //   Swal.fire({
    //     title: res.message,
    //     icon: 'success'
    //   });
    //   this.form.reset();
    //   this.router.navigate(['/payout']);
    // }else{
    //   Swal.fire({
    //     title: res.message,
    //     icon: 'error'
    //   });
    // }
  }

}
