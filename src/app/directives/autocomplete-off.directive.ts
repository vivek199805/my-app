import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[AutocompleteOff]'
})
export class AutocompleteOffDirective  implements AfterViewInit{

  constructor(private el: ElementRef, private  renderer: Renderer2) { }

  ngAfterViewInit() {
    const randomString = Math.random().toString(36).slice(-6);
    this.renderer.setAttribute(this.el.nativeElement, 'name', randomString);
    this.renderer.setAttribute(this.el.nativeElement, 'autocomplete', randomString);
  }

}
