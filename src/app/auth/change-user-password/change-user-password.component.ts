import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import { PasswordReg } from 'src/app/_helpers/common/custom-validator/password-reg';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-user-password',
  templateUrl: './change-user-password.component.html',
  styleUrls: ['./change-user-password.component.css']
})
export class ChangeUserPasswordComponent implements OnInit {

  changePass: any = FormGroup;
  showErrorBox: boolean = false;
  longitute: string = '';
  latitute: string = '';
  // authToken: any;
  logocolor : string = '';
  constructor(
    private route: Router,
    private fb: FormBuilder,
    private _auth: ApiService, 
  ) { 
    this.changePass = this.fb.group({
      oldPassword: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });

    this.changePass = this.fb.group({
      // password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      oldPassword: ['', Validators.required],
      password: ['', [Validators.required, PasswordReg.patternValidator(/\d/, {
        hasNumber: true
      }),
      // check whether the entered password has upper case letter
      PasswordReg.patternValidator(/[A-Z]/, {
        hasCapitalCase: true
      }),
      // check whether the entered password has a lower case letter
      PasswordReg.patternValidator(/[a-z]/, {
        hasSmallCase: true
      }),
      // check whether the entered password has a special character
      PasswordReg.patternValidator(
        /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        {
          hasSpecialCharacters: true
        }
      ),
      Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: PasswordReg.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    this.getLocation();
    this._auth.validDomian((domainSettings: any) => {

      this.logocolor = domainSettings.logocolor; 

      
    });
  }
  getLocation() {
    this._auth.getLocationService().then(resp => {
      this.longitute = resp.lng;
      this.latitute = resp.lat;

    })
  }

  changePassword() {
    if (!this.changePass.valid) {
      return;
    } else {
        const formdata = new FormData();
        formdata.append('token', config.tokenauth);
        formdata.append('password', this.changePass.get('password').value);
        formdata.append('confirm_password', this.changePass.get('confirmPassword').value);
        formdata.append('old_password', this.changePass.get('oldPassword').value);
        formdata.append('latitude', this.latitute);
        formdata.append('longitude', this.longitute);
        this._auth.postdata(formdata, config.changeuserpassword).subscribe((res: any) => {
         if (res.response == 200) {
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
            localStorage.removeItem('LoginDetails');
            localStorage.clear();

            // let decode: any = EncodeDecode(JSON.stringify(res), 'n');
            // localStorage.setItem('LoginDetails', decode);
            // this.route.navigate(['dashboard']);
            this.route.navigate(['/login']);
          } else {
            Swal.fire({
              icon: 'error',
              title: res.message
            });
          }
        }
        )
    }

  }

  get f() { return this.changePass.controls; }

}
