import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { RiCustomMdlService } from './ri-custom-mdl.service';

@Component({
  selector: 'ri-custom-mdl',
  templateUrl: './ri-custom-mdl.component.html',
  styleUrls: ['./ri-custom-mdl.component.css']
})
export class RiCustomMdlComponent implements OnInit {

  @Input() id!: string;
  @Input() backdropClose: boolean = false;
  private element: any;

  constructor(private _RiCustomMdlService: RiCustomMdlService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    if (this.backdropClose) {
      this.element.addEventListener('click', (el: any) => {
        if (el.target.className === 'ri-custom-mdl') {
          this.close();
        }
      });
    }

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this._RiCustomMdlService.add(this);
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this._RiCustomMdlService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('ri-custom-mdl-open');
  }

  // close modal
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('ri-custom-mdl-open');
  }
}


// openModal(id: string) {
//   this._RiCustomMdlService.open(id);
// }

// closeModal(id: string) {
//   this._RiCustomMdlService.close(id);
// }