import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject, Input } from '@angular/core';

@Directive({
  selector: '[appFocusToNextInput]'
})
export class FocusToNextInputDirective {
  @Input() focusAfterLastInput: any = null;
  constructor(@Inject(DOCUMENT) private document: Document, private _el: ElementRef,) { }

  @HostListener('keyup', ['$event']) onKeyDown(e: any) {
    // console.log(e.srcElement.maxLength);
    // console.log(e.srcElement.value.length);

    if (e.srcElement.value.length === 1) {

      e.preventDefault();

      // let nextControl: any = e;
      let nextControl: any = e.srcElement.nextElementSibling;
      // let nextControl: any = this._el.nativeElement;
      // Searching for next similar control to set it focus
      // console.log(nextControl);

      // while (true) {
      if (nextControl) {
        if (nextControl.type === e.srcElement.type) {
          nextControl.focus();
          return;
        }
        else {
        //console.log(e);

          // e.blur();
          // nextControl = nextControl.nextElementSibling;
        }
      }
      else {
        this._el.nativeElement.blur();
        if (this.focusAfterLastInput) {
          document.querySelectorAll(this.focusAfterLastInput)[0].focus();
        }
        return;
      }
      // }
    }
  }
}