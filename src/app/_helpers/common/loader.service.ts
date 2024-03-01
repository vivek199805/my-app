import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loaderEvent = new EventEmitter();
  constructor() { }

}
