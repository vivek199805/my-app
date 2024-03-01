import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aepshandler',
  templateUrl: './aepshandler.component.html',
  styleUrls: ['./aepshandler.component.css']
})
export class AepshandlerComponent implements OnInit {
  tab:any = 'cash-withdrawl';
  is_onboard:any;
  constructor(
    private _auth: ApiService,
		private fb: FormBuilder,
    private route: Router
  ) {

   } 

  ngOnInit(): void {  
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);    
    this.is_onboard = data.is_onboard;
    if(data.is_onboard == 0){
      this.route.navigate(['/marchant-onboarding']);
    }
    }

}
