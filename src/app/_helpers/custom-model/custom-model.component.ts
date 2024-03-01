import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-model',
  templateUrl: './custom-model.component.html',
  styleUrls: ['./custom-model.component.css']
})
export class CustomModelComponent implements OnInit {
  @Input() length:number = 4; 
  @Input() resend:boolean = true;  
  otp = {
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    input6: '',
  }  

  otpp: any;
  public showModal: boolean = false;
  constructor() {

   }

  ngOnInit(): void {
  } 

  clearField() {
    this.otp = {
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: '',
    }
  }

  @Output('onFocusNext') onFocusNext = new EventEmitter<string>();
  moveNext(otpp: any){
    this.otpp = otpp;
    this.onFocusNext.emit();
  }

  getOtp():string{
    return this.otpp;
  }
  closeModal(){
    this.showModal = false;
  }

  @Output('onClickResendOtp') onClickResendOtp = new EventEmitter<string>();
  resendOTP(){
    this.onClickResendOtp.emit();
  }

  // @Output('onFocusNext') onFocusNext = new EventEmitter<string>();
  // moveNext(){
  //   this.onFocusNext.emit();
  // }

  // @Output('onClickResendOtp') onClickResendOtp = new EventEmitter<string>();
  // resendOTP(){
  //   this.onClickResendOtp.emit();
  // }

  // getOtp():string{
  //   return this.otp.input1+this.otp.input2+this.otp.input3+this.otp.input4+this.otp.input5+this.otp.input6;
  // }

  // clearField() {
  //   this.otp = {
  //     input1: '',
  //     input2: '',
  //     input3: '',
  //     input4: '',
  //     input5: '',
  //     input6: '',
  //   }
  // }
}
